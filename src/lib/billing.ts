import { supabase } from './supabase';

export type SubscriptionPlan = 'monthly' | 'yearly';

export interface SubscriptionStatus {
  user_id: string;
  status: string;
  plan?: SubscriptionPlan | null;
  trial_ends_at?: string | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type AccountStatus = 'active' | 'deactivated';

export interface AccountStatusRecord {
  user_id: string;
  status: AccountStatus;
  deactivated_at: string | null;
}

export function planLabel(plan: SubscriptionPlan | null | undefined) {
  if (plan === 'monthly') return 'Monthly';
  if (plan === 'yearly') return 'Yearly';
  return 'No plan selected';
}

export function statusLabel(status: string | null | undefined) {
  if (!status) return 'No active subscription';
  if (status === 'trialing') return 'Free trial active';
  if (status === 'active') return 'Subscription active';
  if (status === 'free') return 'Free account';
  if (status === 'past_due') return 'Payment needs attention';
  if (status === 'canceled') return 'Canceled';
  if (status === 'incomplete') return 'Checkout not completed';
  if (status === 'unpaid') return 'Unpaid';
  return status.replace(/_/g, ' ');
}

export function hasSubscriptionAccess(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined
) {
  if (!subscription) return false;
  if (!currentUserId || subscription.user_id !== currentUserId) return false;
  return ['free', 'trialing', 'active'].includes(subscription.status);
}

export async function startCheckout(plan: SubscriptionPlan) {
  const { data, error } = await supabase.functions.invoke(
    'create-checkout-session',
    { body: { plan } }
  );

  if (error) {
    return {
      error:
        error.message ||
        'Stripe Checkout is not configured yet. Please add the billing function and Stripe environment variables.',
    };
  }

  const url = (data as { url?: string } | null)?.url;
  if (!url) {
    return {
      error:
        'Stripe Checkout is not configured yet. The checkout function did not return a URL.',
    };
  }

  window.location.href = url;
  return {};
}

export async function openCustomerPortal() {
  const { data, error } = await supabase.functions.invoke(
    'create-portal-session'
  );

  // Supabase wraps non-2xx responses in a FunctionsHttpError, hiding the
  // function's JSON body. Read the response to surface the friendly message.
  if (error) {
    let message: string | null = null;
    const context = (error as { context?: Response }).context;
    if (context && typeof context.json === 'function') {
      try {
        const body = await context.json();
        message = (body as { error?: string } | null)?.error ?? null;
      } catch {
        message = null;
      }
    }
    return {
      error:
        message ||
        error.message ||
        'We could not find an active subscription for this account.',
    };
  }

  const url = (data as { url?: string } | null)?.url;
  if (!url) {
    return {
      error: 'We could not find an active subscription for this account.',
    };
  }

  window.location.href = url;
  return {};
}
