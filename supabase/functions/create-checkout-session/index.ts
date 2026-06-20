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
    const supabaseServiceRoleKey = Deno.env.get('SERVICE_ROLE_KEY');
    const monthlyPriceId = Deno.env.get('STRIPE_MONTHLY_PRICE_ID');
    const yearlyPriceId = Deno.env.get('STRIPE_YEARLY_PRICE_ID');
    const successUrl = Deno.env.get('STRIPE_SUCCESS_URL');
    const cancelUrl = Deno.env.get('STRIPE_CANCEL_URL');

    if (
      !stripeSecretKey ||
      !supabaseUrl ||
      !supabaseServiceRoleKey ||
      !monthlyPriceId ||
      !yearlyPriceId ||
      !successUrl ||
      !cancelUrl
    ) {
      return json({ error: 'Stripe Checkout is not configured.' }, 500);
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Not signed in.' }, 401);

    const body = await req.json().catch(() => ({}));
    const plan = body.plan === 'yearly' ? 'yearly' : 'monthly';
    const price = plan === 'yearly' ? yearlyPriceId : monthlyPriceId;

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return json({ error: 'Not signed in.' }, 401);
    }

    const { data: existing } = await supabase
      .from('billing_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: existing?.stripe_customer_id || undefined,
      customer_email: existing?.stripe_customer_id ? undefined : user.email,
      client_reference_id: user.id,
      line_items: [{ price, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { user_id: user.id, plan },
      },
      metadata: { user_id: user.id, plan },
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    });

    return json({ url: session.url });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Checkout failed.' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
