import {
  getActivePromoAccess,
  getPremiumAccessSource,
  getPremiumTrialStatus,
  isPromoAccessActive,
  normalizePromoCode,
} from './billing';
import type { PromoAccessRecord, SubscriptionStatus } from './billing';

function subscription(status: string, userId = 'user-1'): SubscriptionStatus {
  return {
    user_id: userId,
    status,
    plan: null,
    trial_ends_at: null,
    current_period_end: null,
    stripe_customer_id: null,
    stripe_subscription_id: null,
    created_at: null,
    updated_at: null,
  };
}

function promoAccess(
  accessExpiresAt: string | null,
  lifetimeAccess = false
): PromoAccessRecord {
  return {
    access_type: 'premium',
    redeemed_code: 'TEST-CODE',
    lifetime_access: lifetimeAccess,
    access_expires_at: accessExpiresAt,
    redeemed_at: '2026-06-01T00:00:00.000Z',
  };
}

describe('premium access', () => {
  it('keeps a new user in the 14-day account trial', () => {
    const trial = getPremiumTrialStatus(
      '2026-06-01T00:00:00.000Z',
      new Date('2026-06-10T00:00:00.000Z')
    );

    expect(trial.trialActive).toBe(true);
    expect(trial.trialExpired).toBe(false);
    expect(trial.trialEnd).toBe('2026-06-15T00:00:00.000Z');
    expect(trial.daysRemaining).toBe(5);
  });

  it('expires the account trial exactly 14 days after signup', () => {
    const trial = getPremiumTrialStatus(
      '2026-06-01T00:00:00.000Z',
      new Date('2026-06-15T00:00:00.000Z')
    );

    expect(trial.trialActive).toBe(false);
    expect(trial.trialExpired).toBe(true);
    expect(trial.daysRemaining).toBe(0);
  });

  it('keeps paid and included access after the account trial expires', () => {
    const now = new Date('2026-06-30T00:00:00.000Z');
    const signup = '2026-06-01T00:00:00.000Z';

    expect(
      getPremiumAccessSource(subscription('active'), 'user-1', signup, now)
    ).toBe('subscription');
    expect(
      getPremiumAccessSource(subscription('trialing'), 'user-1', signup, now)
    ).toBe('subscription');
    expect(
      getPremiumAccessSource(subscription('free'), 'user-1', signup, now)
    ).toBe('included');
  });

  it('does not grant premium access after an expired trial without access', () => {
    expect(
      getPremiumAccessSource(
        subscription('canceled'),
        'user-1',
        '2026-06-01T00:00:00.000Z',
        new Date('2026-06-30T00:00:00.000Z')
      )
    ).toBeNull();
  });

  it('ignores subscription rows for another user', () => {
    expect(
      getPremiumAccessSource(
        subscription('active', 'user-2'),
        'user-1',
        '2026-06-01T00:00:00.000Z',
        new Date('2026-06-30T00:00:00.000Z')
      )
    ).toBeNull();
  });

  it('normalizes promo codes before validation or redemption', () => {
    expect(normalizePromoCode('  founder 365  ')).toBe('FOUNDER365');
  });

  it('treats lifetime promo access as active', () => {
    expect(
      isPromoAccessActive(
        promoAccess(null, true),
        new Date('2026-06-30T00:00:00.000Z')
      )
    ).toBe(true);
  });

  it('ignores expired promo redemptions', () => {
    expect(
      getActivePromoAccess(
        [
          promoAccess('2026-06-10T00:00:00.000Z'),
          promoAccess('2026-07-10T00:00:00.000Z'),
        ],
        new Date('2026-06-30T00:00:00.000Z')
      )?.access_expires_at
    ).toBe('2026-07-10T00:00:00.000Z');
  });
});
