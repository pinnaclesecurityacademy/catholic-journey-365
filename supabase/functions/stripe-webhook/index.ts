import Stripe from 'npm:stripe@18.0.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1';

type SupabaseClient = ReturnType<typeof createClient>;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

  try {
    await handleEvent(stripe, supabase, event);
  } catch (error) {
    console.error('stripe-webhook event processing failed', {
      event_id: event.id,
      event_type: event.type,
      error: describeUnknownError(error),
    });
  }

  return json({
    received: true,
    event_id: event.id,
    event_type: event.type,
  });
});

async function handleEvent(
  stripe: Stripe,
  supabase: SupabaseClient,
  event: Stripe.Event
) {
  if (event.type === 'checkout.session.completed') {
    await handleCheckoutCompleted(stripe, supabase, event);
    return;
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    await handleSubscriptionUpsert(stripe, supabase, event);
    return;
  }

  if (event.type === 'customer.subscription.deleted') {
    await handleSubscriptionDeleted(supabase, event);
    return;
  }

  console.log('stripe-webhook ignored event type', {
    event_id: event.id,
    event_type: event.type,
  });
}

async function handleCheckoutCompleted(
  stripe: Stripe,
  supabase: SupabaseClient,
  event: Stripe.Event
) {
  const session = event.data.object as Stripe.Checkout.Session;
  const metadataUserId = normalizeUserId(
    session.client_reference_id || session.metadata?.user_id
  );
  const customerId = getCustomerId(session.customer);
  const subscriptionId = getSubscriptionId(session.subscription);

  if (!customerId || !subscriptionId) {
    console.warn('checkout.session.completed skipped missing Stripe IDs', {
      event_id: event.id,
      session_id: session.id,
      has_customer: Boolean(customerId),
      has_subscription: Boolean(subscriptionId),
    });
    return;
  }

  const userId = await resolveUserId(supabase, {
    eventId: event.id,
    eventType: event.type,
    candidateUserId: metadataUserId,
    rawUserId: session.client_reference_id || session.metadata?.user_id,
    customerId,
    subscriptionId,
  });

  if (!userId) {
    console.warn('checkout.session.completed skipped missing local user', {
      event_id: event.id,
      session_id: session.id,
      raw_user_id: session.client_reference_id || session.metadata?.user_id || null,
      customer_id: customerId,
      subscription_id: subscriptionId,
    });
    return;
  }

  const subscription = await retrieveSubscription(stripe, subscriptionId, {
    event_id: event.id,
    event_type: event.type,
  });

  if (!subscription) return;

  await upsertSubscriptionState(supabase, userId, customerId, subscription, {
    eventId: event.id,
    eventType: event.type,
  });
}

async function handleSubscriptionUpsert(
  stripe: Stripe,
  supabase: SupabaseClient,
  event: Stripe.Event
) {
  const incomingSubscription = event.data.object as Stripe.Subscription;
  const subscription =
    (await retrieveSubscription(stripe, incomingSubscription.id, {
      event_id: event.id,
      event_type: event.type,
    })) || incomingSubscription;
  const customerId = getCustomerId(subscription.customer);
  const metadataUserId = normalizeUserId(subscription.metadata?.user_id);

  if (!customerId) {
    console.warn('subscription event skipped missing customer', {
      event_id: event.id,
      event_type: event.type,
      subscription_id: subscription.id,
    });
    return;
  }

  const userId = await resolveUserId(supabase, {
    eventId: event.id,
    eventType: event.type,
    candidateUserId: metadataUserId,
    rawUserId: subscription.metadata?.user_id,
    customerId,
    subscriptionId: subscription.id,
  });

  if (!userId) {
    console.warn('subscription event skipped missing local user', {
      event_id: event.id,
      event_type: event.type,
      raw_user_id: subscription.metadata?.user_id || null,
      customer_id: customerId,
      subscription_id: subscription.id,
    });
    return;
  }

  await upsertSubscriptionState(supabase, userId, customerId, subscription, {
    eventId: event.id,
    eventType: event.type,
  });
}

async function handleSubscriptionDeleted(
  supabase: SupabaseClient,
  event: Stripe.Event
) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = getCustomerId(subscription.customer);
  const metadataUserId = normalizeUserId(subscription.metadata?.user_id);

  const userId = await resolveUserId(supabase, {
    eventId: event.id,
    eventType: event.type,
    candidateUserId: metadataUserId,
    rawUserId: subscription.metadata?.user_id,
    customerId,
    subscriptionId: subscription.id,
    allowMissingUser: true,
  });

  if (!userId) {
    console.warn('subscription deleted skipped missing local subscription or user', {
      event_id: event.id,
      event_type: event.type,
      raw_user_id: subscription.metadata?.user_id || null,
      customer_id: customerId,
      subscription_id: subscription.id,
    });
    return;
  }

  await markSubscriptionCanceled(supabase, userId, customerId, subscription, {
    eventId: event.id,
    eventType: event.type,
  });
}

async function upsertSubscriptionState(
  supabase: SupabaseClient,
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
  context: { eventId: string; eventType: string }
) {
  await upsertBillingSubscription(supabase, userId, customerId, subscription, context);
  await upsertUserAccess(supabase, userId, customerId, subscription, context);
}

async function upsertBillingSubscription(
  supabase: SupabaseClient,
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
  context: { eventId: string; eventType: string }
) {
  const { error } = await supabase.from('billing_subscriptions').upsert(
    {
      user_id: userId,
      status: subscription.status,
      plan: getPlan(subscription),
      trial_ends_at: toIso(subscription.trial_end),
      current_period_end: getCurrentPeriodEnd(subscription),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    console.error('billing_subscriptions upsert failed', {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      stripe_customer_id: customerId,
      subscription_id: subscription.id,
      error: describeSupabaseError(error),
    });
    return;
  }

  console.log('billing_subscriptions upserted', {
    event_id: context.eventId,
    event_type: context.eventType,
    user_id: userId,
    stripe_customer_id: customerId,
    subscription_id: subscription.id,
    status: subscription.status,
  });
}

async function upsertUserAccess(
  supabase: SupabaseClient,
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription,
  context: { eventId: string; eventType: string }
) {
  const accessStatus = getAccessStatus(subscription.status);

  const { error } = await supabase.from('user_access').upsert(
    {
      user_id: userId,
      status: accessStatus,
      current_period_end: getCurrentPeriodEnd(subscription),
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );

  if (error) {
    console.error('user_access upsert failed', {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      stripe_customer_id: customerId,
      subscription_id: subscription.id,
      status: accessStatus,
      error: describeSupabaseError(error),
    });
    return;
  }

  console.log('user_access upserted', {
    event_id: context.eventId,
    event_type: context.eventType,
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscription.id,
    status: accessStatus,
  });
}

async function markSubscriptionCanceled(
  supabase: SupabaseClient,
  userId: string,
  customerId: string | null,
  subscription: Stripe.Subscription,
  context: { eventId: string; eventType: string }
) {
  const now = new Date().toISOString();
  const accessUpdate: Record<string, unknown> = {
    status: 'canceled',
    current_period_end: getCurrentPeriodEnd(subscription),
    stripe_subscription_id: subscription.id,
    updated_at: now,
  };
  const billingUpdate: Record<string, unknown> = {
    status: 'canceled',
    trial_ends_at: toIso(subscription.trial_end),
    current_period_end: getCurrentPeriodEnd(subscription),
    stripe_subscription_id: subscription.id,
    updated_at: now,
  };

  if (customerId) {
    accessUpdate.stripe_customer_id = customerId;
    billingUpdate.stripe_customer_id = customerId;
  }

  const accessUpdated = await updateExistingRow(
    supabase,
    'user_access',
    userId,
    accessUpdate,
    subscription,
    context
  );
  const billingUpdated = await updateExistingRow(
    supabase,
    'billing_subscriptions',
    userId,
    billingUpdate,
    subscription,
    context
  );

  if (!accessUpdated && !billingUpdated) {
    console.warn('subscription deleted found no local rows to update', {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      stripe_customer_id: customerId,
      subscription_id: subscription.id,
    });
  }
}

async function updateExistingRow(
  supabase: SupabaseClient,
  table: 'user_access' | 'billing_subscriptions',
  userId: string,
  values: Record<string, unknown>,
  subscription: Stripe.Subscription,
  context: { eventId: string; eventType: string }
) {
  const { data, error } = await supabase
    .from(table)
    .update(values)
    .eq('user_id', userId)
    .select('user_id')
    .maybeSingle();

  if (error) {
    console.error(`${table} cancel update failed`, {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      subscription_id: subscription.id,
      error: describeSupabaseError(error),
    });
    return false;
  }

  if (!data) {
    console.warn(`${table} cancel update skipped missing row`, {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      subscription_id: subscription.id,
    });
    return false;
  }

  console.log(`${table} marked canceled`, {
    event_id: context.eventId,
    event_type: context.eventType,
    user_id: userId,
    subscription_id: subscription.id,
  });
  return true;
}

async function resolveUserId(
  supabase: SupabaseClient,
  input: {
    eventId: string;
    eventType: string;
    candidateUserId: string | null;
    rawUserId: string | null | undefined;
    customerId: string | null;
    subscriptionId: string | null;
    allowMissingUser?: boolean;
  }
) {
  if (input.rawUserId && !input.candidateUserId) {
    console.warn('stripe-webhook ignored invalid user_id', {
      event_id: input.eventId,
      event_type: input.eventType,
      raw_user_id: input.rawUserId,
      customer_id: input.customerId,
      subscription_id: input.subscriptionId,
    });
  }

  const userId =
    input.candidateUserId ||
    (await findLocalUserId(supabase, input.subscriptionId, input.customerId, input));

  if (!userId) return null;

  if (await authUserExists(supabase, userId, input)) {
    return userId;
  }

  if (input.allowMissingUser) {
    console.warn('stripe-webhook skipped missing auth user', {
      event_id: input.eventId,
      event_type: input.eventType,
      user_id: userId,
      customer_id: input.customerId,
      subscription_id: input.subscriptionId,
    });
    return null;
  }

  console.warn('stripe-webhook skipped upsert for missing auth user', {
    event_id: input.eventId,
    event_type: input.eventType,
    user_id: userId,
    customer_id: input.customerId,
    subscription_id: input.subscriptionId,
  });
  return null;
}

async function findLocalUserId(
  supabase: SupabaseClient,
  subscriptionId: string | null,
  customerId: string | null,
  context: { eventId: string; eventType: string }
) {
  const lookups: Array<{
    table: 'user_access' | 'billing_subscriptions';
    column: 'stripe_subscription_id' | 'stripe_customer_id';
    value: string | null;
  }> = [
    { table: 'user_access', column: 'stripe_subscription_id', value: subscriptionId },
    {
      table: 'billing_subscriptions',
      column: 'stripe_subscription_id',
      value: subscriptionId,
    },
    { table: 'user_access', column: 'stripe_customer_id', value: customerId },
    { table: 'billing_subscriptions', column: 'stripe_customer_id', value: customerId },
  ];

  for (const lookup of lookups) {
    if (!lookup.value) continue;

    const { data, error } = await supabase
      .from(lookup.table)
      .select('user_id')
      .eq(lookup.column, lookup.value)
      .maybeSingle();

    if (error) {
      console.error('stripe-webhook local user lookup failed', {
        event_id: context.eventId,
        event_type: context.eventType,
        table: lookup.table,
        column: lookup.column,
        value: lookup.value,
        error: describeSupabaseError(error),
      });
      continue;
    }

    const userId = normalizeUserId(data?.user_id);
    if (userId) return userId;
  }

  return null;
}

async function authUserExists(
  supabase: SupabaseClient,
  userId: string,
  context: { eventId: string; eventType: string; customerId: string | null; subscriptionId: string | null }
) {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(userId);

    if (error || !user) {
      console.warn('stripe-webhook auth user lookup failed', {
        event_id: context.eventId,
        event_type: context.eventType,
        user_id: userId,
        customer_id: context.customerId,
        subscription_id: context.subscriptionId,
        error: error?.message || 'User not found.',
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error('stripe-webhook auth user lookup threw', {
      event_id: context.eventId,
      event_type: context.eventType,
      user_id: userId,
      customer_id: context.customerId,
      subscription_id: context.subscriptionId,
      error: describeUnknownError(error),
    });
    return false;
  }
}

async function retrieveSubscription(
  stripe: Stripe,
  subscriptionId: string,
  context: { event_id: string; event_type: string }
) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('stripe subscription retrieve failed', {
      ...context,
      subscription_id: subscriptionId,
      error: describeUnknownError(error),
    });
    return null;
  }
}

function getCustomerId(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null | undefined
) {
  if (!customer) return null;
  if (typeof customer === 'string') return customer;
  return customer.id || null;
}

function getSubscriptionId(
  subscription: string | Stripe.Subscription | null | undefined
) {
  if (!subscription) return null;
  if (typeof subscription === 'string') return subscription;
  return subscription.id || null;
}

function normalizeUserId(value: unknown) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return UUID_RE.test(trimmed) ? trimmed : null;
}

function getCurrentPeriodEnd(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0] as
    | { current_period_end?: number | null }
    | undefined;
  return toIso(item?.current_period_end);
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

function getPlan(subscription: Stripe.Subscription) {
  if (subscription.metadata?.plan === 'monthly' || subscription.metadata?.plan === 'yearly') {
    return subscription.metadata.plan;
  }

  const interval = subscription.items.data[0]?.price?.recurring?.interval;
  if (interval === 'month') return 'monthly';
  if (interval === 'year') return 'yearly';
  return null;
}

function describeSupabaseError(error: {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}) {
  return {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
  };
}

function describeUnknownError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  return { message: String(error) };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
