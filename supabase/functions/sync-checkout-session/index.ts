import Stripe from 'https://esm.sh/stripe@18.0.0?target=deno';
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
      return json({ error: 'Stripe sync is not configured.' }, 500);
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Not signed in.' }, 401);

    const { sessionId } = await req.json().catch(() => ({ sessionId: null }));
    if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
      return json({ error: 'Invalid checkout session.' }, 400);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) return json({ error: 'Not signed in.' }, 401);

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const userId = session.client_reference_id || session.metadata?.user_id;
    const subscriptionId =
      typeof session.subscription === 'string' ? session.subscription : null;

    if (userId !== user.id || !session.customer || !subscriptionId) {
      return json({ error: 'Checkout session does not match this account.' }, 403);
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await upsertSubscription(supabase, user.id, session.customer.toString(), subscription);

    return json({ ok: true, status: subscription.status });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : 'Checkout sync failed.' },
      500
    );
  }
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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
