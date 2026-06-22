import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1';

Deno.serve(async (req) => {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceRoleKey =
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY');

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceRoleKey) {
    return new Response('Stripe webhook is not configured.', { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) return new Response('Missing signature.', { status: 400 });

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2026-02-25.clover',
  });
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret
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

    if (userId && session.customer && subscriptionId) {
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

    if (userId && customerId) {
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
  const plan = subscription.metadata?.plan === 'yearly' ? 'yearly' : 'monthly';

  const { error: subscriptionError } = await supabase.from('billing_subscriptions').upsert(
    {
      user_id: userId,
      status: subscription.status,
      plan,
      trial_ends_at: toIso(subscription.trial_end),
      current_period_end: toIso(item?.current_period_end),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (subscriptionError) throw subscriptionError;

  const { error: statusError } = await supabase.from('account_statuses').upsert(
    {
      user_id: userId,
      status: 'active',
      deactivated_at: null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (statusError) throw statusError;
}

function toIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}
