import { supabase } from './supabase';

export type SubscriptionPlan = 'monthly' | 'yearly';

export interface SubscriptionStatus {
  user_id: string;
  status: string;
  plan: SubscriptionPlan | null;
  trial_ends_at: string | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
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
  if (status === 'trialing') return 'Trial active';
  if (status === 'active') return 'Active';
  if (status === 'past_due') return 'Payment needs attention';
  if (status === 'canceled') return 'Canceled';
  if (status === 'incomplete') return 'Checkout not completed';
  if (status === 'unpaid') return 'Unpaid';
  return status.replace(/_/g, ' ');
}

function isFutureDate(value: string | null | undefined) {
  if (!value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time > Date.now();
}

export function hasSubscriptionAccess(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined
) {
  if (!subscription) return false;
  if (!currentUserId || subscription.user_id !== currentUserId) return false;
  if (subscription.status !== 'trialing' && subscription.status !== 'active') return false;
  return (
    subscription.current_period_end === null ||
    isFutureDate(subscription.current_period_end)
  );
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
    'create-customer-portal'
  );

  if (error) {
    return {
      error:
        error.message ||
        'Subscription management is not configured yet. Please add the Stripe customer portal function and environment variables.',
    };
  }

  const url = (data as { url?: string } | null)?.url;
  if (!url) {
    return {
      error:
        'Subscription management is not configured yet. The portal function did not return a URL.',
    };
  }

  window.location.href = url;
  return {};
}
