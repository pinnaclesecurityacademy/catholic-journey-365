import { supabase } from './supabase';

export type SubscriptionPlan = 'monthly' | 'yearly';
export type PromoAccessType = 'founder' | 'clergy' | 'review' | 'premium';
export type PremiumAccessSource =
  | 'trial'
  | 'subscription'
  | 'included'
  | 'promo';

export const PREMIUM_TRIAL_DAYS = 14;

export interface PremiumTrialStatus {
  trialStart: string | null;
  trialEnd: string | null;
  trialActive: boolean;
  trialExpired: boolean;
  daysRemaining: number;
}

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

export interface PromoAccessRecord {
  access_type: PromoAccessType;
  redeemed_code: string;
  lifetime_access: boolean;
  access_expires_at: string | null;
  redeemed_at: string;
}

interface PromoCodeValidationResponse {
  valid: boolean;
  message: string;
  access_type: PromoAccessType | null;
  duration_days: number | null;
  lifetime_access: boolean;
  expires_at: string | null;
}

interface PromoCodeRedemptionResponse {
  success: boolean;
  message: string;
  access_type: PromoAccessType | null;
  access_expires_at: string | null;
  lifetime_access: boolean;
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
  if (status === 'free') return 'Premium access';
  if (status === 'past_due') return 'Payment needs attention';
  if (status === 'canceled') return 'Canceled';
  if (status === 'incomplete') return 'Checkout not completed';
  if (status === 'unpaid') return 'Unpaid';
  return status.replace(/_/g, ' ');
}

export function normalizePromoCode(code: string) {
  return code.trim().replace(/\s+/g, '').toUpperCase();
}

export function promoAccessTypeLabel(type: PromoAccessType | null | undefined) {
  if (type === 'founder') return 'Founder';
  if (type === 'clergy') return 'Clergy';
  if (type === 'review') return 'Review';
  if (type === 'premium') return 'Premium';
  return 'Promotional';
}

function firstRpcRow<T>(data: T | T[] | null): T | null {
  return Array.isArray(data) ? data[0] ?? null : data;
}

export function getPremiumTrialStatus(
  userCreatedAt: string | null | undefined,
  now = new Date()
): PremiumTrialStatus {
  if (!userCreatedAt) {
    return {
      trialStart: null,
      trialEnd: null,
      trialActive: false,
      trialExpired: false,
      daysRemaining: 0,
    };
  }

  const start = new Date(userCreatedAt);
  if (Number.isNaN(start.getTime())) {
    return {
      trialStart: null,
      trialEnd: null,
      trialActive: false,
      trialExpired: false,
      daysRemaining: 0,
    };
  }

  const trialEndTime =
    start.getTime() + PREMIUM_TRIAL_DAYS * 24 * 60 * 60 * 1000;
  const end = new Date(trialEndTime);
  const remainingMs = trialEndTime - now.getTime();
  const trialActive = remainingMs > 0;

  return {
    trialStart: start.toISOString(),
    trialEnd: end.toISOString(),
    trialActive,
    trialExpired: !trialActive,
    daysRemaining: trialActive
      ? Math.max(1, Math.ceil(remainingMs / (24 * 60 * 60 * 1000)))
      : 0,
  };
}

export function getSubscriptionAccessSource(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined
): Exclude<PremiumAccessSource, 'trial' | 'promo'> | null {
  if (!subscription) return null;
  if (!currentUserId || subscription.user_id !== currentUserId) return null;
  if (subscription.status === 'free') return 'included';
  if (subscription.status === 'trialing' || subscription.status === 'active') {
    return 'subscription';
  }
  return null;
}

export function isPromoAccessActive(
  promoAccess: PromoAccessRecord | null | undefined,
  now = new Date()
) {
  if (!promoAccess) return false;
  if (promoAccess.lifetime_access) return true;
  if (!promoAccess.access_expires_at) return false;
  return new Date(promoAccess.access_expires_at).getTime() > now.getTime();
}

export function getActivePromoAccess(
  redemptions: PromoAccessRecord[] | null | undefined,
  now = new Date()
) {
  return (
    redemptions?.find((redemption) => isPromoAccessActive(redemption, now)) ??
    null
  );
}

export function hasSubscriptionAccess(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined
) {
  return getSubscriptionAccessSource(subscription, currentUserId) !== null;
}

export function getPremiumAccessSource(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined,
  userCreatedAt: string | null | undefined,
  now = new Date()
): PremiumAccessSource | null {
  const subscriptionSource = getSubscriptionAccessSource(
    subscription,
    currentUserId
  );
  if (subscriptionSource) return subscriptionSource;

  const trial = getPremiumTrialStatus(userCreatedAt, now);
  return trial.trialActive ? 'trial' : null;
}

export function hasPremiumAccess(
  subscription: SubscriptionStatus | null,
  currentUserId: string | null | undefined,
  userCreatedAt: string | null | undefined,
  now = new Date()
) {
  return (
    getPremiumAccessSource(subscription, currentUserId, userCreatedAt, now) !==
    null
  );
}

export async function validatePromoCode(code: string) {
  const normalized = normalizePromoCode(code);
  if (!normalized) return {};

  const { data, error } = await supabase.rpc('validate_promo_code', {
    p_code: normalized,
  });

  if (error) {
    return {
      error:
        error.message ||
        'Promo code could not be checked. Please try again.',
    };
  }

  const result = firstRpcRow(
    data as PromoCodeValidationResponse[] | PromoCodeValidationResponse | null
  );

  if (!result?.valid) {
    return { error: result?.message || 'That promo code is not valid.' };
  }

  return { code: normalized, promo: result };
}

export async function redeemPromoCode(code: string) {
  const normalized = normalizePromoCode(code);
  if (!normalized) return { error: 'Enter a promo code.' };

  const { data, error } = await supabase.rpc('redeem_promo_code', {
    p_code: normalized,
  });

  if (error) {
    return {
      error:
        error.message ||
        'Promo code could not be redeemed. Please try again.',
    };
  }

  const result = firstRpcRow(
    data as PromoCodeRedemptionResponse[] | PromoCodeRedemptionResponse | null
  );

  if (!result?.success) {
    return { error: result?.message || 'That promo code is not valid.' };
  }

  return {
    message: result.message,
    promoAccess: result.access_type
      ? {
          access_type: result.access_type,
          redeemed_code: normalized,
          lifetime_access: result.lifetime_access,
          access_expires_at: result.access_expires_at,
          redeemed_at: new Date().toISOString(),
        }
      : null,
  };
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
