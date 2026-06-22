import Stripe from 'npm:stripe@18.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1';

Deno.serve(async (req) => {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceRoleKey =
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY');

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    console.error('stripe-webhook missing configuration', {
      has_stripe_key: Boolean(stripeSecretKey),
      has_webhook_secret: Boolean(webhookSecret),
      has_supabase_url: Boolean(supabaseUrl),
      has_service_role_key: Boolean(supabaseServiceRoleKey),
    });
    return new Response('Stripe webhook is not configured.', { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature.', { status: 400 });

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-02-25.clover',
    httpClient: Stripe.createFetchHttpClient(),
  });
  const cryptoProvider = Stripe.createSubtleCryptoProvider();
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      cryptoProvider
    );
  } catch (error) {
    return new Response(error instanceof Error ? error.message : 'Invalid signature.', {
      status: 400,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id || session.metadata?.user_id;
    const subscriptionId =
      typeof session.subscription === 'string' ? session.subscription : null;

    if (!userId || !session.customer || !subscriptionId) {
      console.error('checkout.session.completed missing sync data', {
        session_id: session.id,
        user_id: userId,
        has_customer: Boolean(session.customer),
        subscription_id: subscriptionId,
      });
    } else {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await upsertSubscription(supabase, userId, session.customer.toString(), subscription);
    }
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata?.user_id;
    const customerId =
      typeof subscription.customer === 'string' ? subscription.customer : null;

    if (!userId || !customerId) {
      console.error('subscription event missing sync data', {
        event_type: event.type,
        subscription_id: subscription.id,
        user_id: userId,
        customer_id: customerId,
      });
    } else {
      await upsertSubscription(supabase, userId, customerId, subscription);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

async function upsertSubscription(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription
) {
  const item = subscription.items.data[0];

  const { error: subscriptionError } = await supabase.from('billing_subscriptions').upsert(
    {
      user_id: userId,
      status: subscription.status,
      price_id: item?.price.id ?? null,
      current_period_start: toIso(item?.current_period_start),
      cancel_at_period_end: subscription.cancel_at_period_end,
      trial_ends_at: toIso(subscription.trial_end),
      current_period_end: toIso(item?.current_period_end),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (subscriptionError) {
    console.error('billing_subscriptions upsert failed', {
      user_id: userId,
      subscription_id: subscription.id,
      status: subscription.status,
      error: subscriptionError.message,
    });
    throw subscriptionError;
  }

  const accessStatus = getAccessStatus(subscription.status);
  if (!accessStatus) return;

  const { error: statusError } = await supabase.from('account_statuses').upsert(
    {
      user_id: userId,
      status: accessStatus,
      deactivated_at: null,
      deactivated_by: null,
      deactivation_reason: null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (statusError) {
    console.error('account_statuses upsert failed', {
      user_id: userId,
      status: accessStatus,
      error: statusError.message,
    });
    throw statusError;
  }
}

function toIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

function getAccessStatus(status: string) {
  return status === 'trialing' || status === 'active' ? status : null;
}
