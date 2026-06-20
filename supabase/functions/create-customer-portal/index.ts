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
    const returnUrl = Deno.env.get('STRIPE_PORTAL_RETURN_URL');

    if (!stripeSecretKey || !supabaseUrl || !supabaseServiceRoleKey || !returnUrl) {
      return json({ error: 'Stripe customer portal is not configured.' }, 500);
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Not signed in.' }, 401);

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return json({ error: 'Not signed in.' }, 401);

    const { data: subscription } = await supabase
      .from('billing_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!subscription?.stripe_customer_id) {
      return json({ error: 'No Stripe customer is linked to this account yet.' }, 400);
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
    });
    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: returnUrl,
    });

    return json({ url: session.url });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : 'Portal failed.' }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
