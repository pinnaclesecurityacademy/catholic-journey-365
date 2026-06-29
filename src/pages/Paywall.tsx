import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../lib/account';
import { SubscriptionPlan } from '../lib/billing';

const PREMIUM_FEATURES = [
  'Daily Formation',
  'Dive Deeper reflections',
  'Saints',
  'Rosary',
  'Mass Guide',
  'Prayer Library',
  'Regular formation content updates',
];

export default function Paywall() {
  const { startSubscription, signOut } = useAccount();
  const [loadingPlan, setLoadingPlan] = useState<SubscriptionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startPlan = async (plan: SubscriptionPlan) => {
    setError(null);
    setLoadingPlan(plan);
    try {
      const result = await startSubscription(plan);
      if (result.error) setError(result.error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="min-h-screen bg-parchment-100 px-5 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-[1.75rem] border border-parchment-200 bg-white/90 p-6 shadow-[0_24px_56px_rgba(74,55,40,0.12)]">
          <h1 className="font-display text-3xl font-bold leading-tight text-leather-900">
            Dive Deeper is a Premium feature.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Continue your journey with full access to:
          </p>
          <ul className="mt-4 space-y-2 text-sm font-medium text-leather-800">
            {PREMIUM_FEATURES.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span
                  className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-gold"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-stone-600">
            For just 20 cents a day, continue your journey closer to Jesus
            Christ.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-parchment-200 bg-parchment-50 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-leather-900">
                  Monthly
                </h2>
                <p className="font-semibold text-leather-700">$5.99/month</p>
              </div>
              <button
                type="button"
                onClick={() => startPlan('monthly')}
                disabled={loadingPlan !== null}
                aria-label="Continue with Premium monthly"
                className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
              >
                {loadingPlan === 'monthly'
                  ? 'Opening checkout...'
                  : 'Continue with Premium'}
              </button>
            </div>

            <div className="rounded-2xl border border-gold/40 bg-white p-4 shadow-[0_12px_28px_rgba(74,55,40,0.08)]">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-leather-900">
                  Yearly
                </h2>
                <p className="font-semibold text-leather-700">$49.99/year</p>
              </div>
              <button
                type="button"
                onClick={() => startPlan('yearly')}
                disabled={loadingPlan !== null}
                aria-label="Continue with Premium yearly"
                className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
              >
                {loadingPlan === 'yearly'
                  ? 'Opening checkout...'
                  : 'Continue with Premium'}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <p className="mt-5 text-xs leading-relaxed text-stone-500">
            The app helps you learn and pray, but it does not replace your
            parish, your priest, or the Sacraments.
          </p>

          <Link
            to="/bible"
            className="mt-5 block w-full rounded-xl border border-parchment-200 bg-parchment-50 py-3 text-center font-semibold text-leather-700 transition active:scale-[0.99]"
          >
            Continue Bible in a Year
          </Link>

          <button
            type="button"
            onClick={signOut}
            className="mt-5 w-full rounded-xl border border-parchment-200 bg-white py-3 font-semibold text-stone-500 transition active:scale-[0.99]"
          >
            Sign out
          </button>
        </div>
      </div>
    </main>
  );
}
