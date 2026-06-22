import Stripe from 'npm:stripe@18.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey =
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || Deno.env.get('SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !supabaseUrl || !supabaseServiceRoleKey) {
      return fail('Stripe sync is not configured.', 500, {
        has_stripe_key: Boolean(stripeSecretKey),
        has_supabase_url: Boolean(supabaseUrl),
        has_service_role_key: Boolean(supabaseServiceRoleKey),
      });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return fail('Not signed in.', 401);

    const { sessionId } = await req.json().catch(() => ({ sessionId: null }));
    if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      return fail('Invalid checkout session.', 400, { sessionId });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return fail('Not signed in.', 401, {
        auth_error: userError?.message,
      });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
      httpClient: Stripe.createFetchHttpClient(),
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = session.client_reference_id || session.metadata?.user_id;
    const subscriptionId =
      typeof session.subscription === 'string' ? session.subscription : null;

    if (!userId) {
      return fail('Stripe checkout session is missing user_id.', 400, {
        session_id: session.id,
      });
    }

    if (userId !== user.id) {
      return fail('Checkout session does not match this account.', 403, {
        session_user_id: userId,
        auth_user_id: user.id,
      });
    }

    if (!session.customer) {
      return fail('Stripe checkout session is missing customer.', 400, {
        session_id: session.id,
        user_id: user.id,
      });
    }

    if (!subscriptionId) {
      return fail('Stripe checkout session is missing subscription.', 400, {
        session_id: session.id,
        user_id: user.id,
      });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await upsertSubscription(supabase, user.id, session.customer.toString(), subscription);

    return json({
      synced: true,
      status: subscription.status,
      user_id: user.id,
      subscription_id: subscription.id,
    });
  } catch (error) {
    return fail(error instanceof Error ? error.message : 'Checkout sync failed.', 500);
  }
});

async function upsertSubscription(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription
) {
  const item = subscription.items.data[0];
  const accessStatus = getAccessStatus(subscription.status);

  const { error: accessError } = await supabase.from('user_access').upsert(
    {
      user_id: userId,
      status: accessStatus,
      current_period_end: toIso(item?.current_period_end),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (accessError) {
    console.error('user_access upsert failed', {
      user_id: userId,
      stripe_customer_id: customerId,
      subscription_id: subscription.id,
      status: accessStatus,
      error: accessError.message,
    });
    throw accessError;
  }

  console.log('user_access upserted', {
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    status: accessStatus,
  });
}

function toIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

function getAccessStatus(status: string) {
  if (status === 'trialing' || status === 'active' || status === 'canceled') {
    return status;
  }
  return 'none';
}

function fail(message: string, status = 500, details?: unknown) {
  console.error('sync-checkout-session failed', { message, details });
  return json({ synced: false, error: message, details }, status);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
