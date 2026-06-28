import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../lib/account';
import { SubscriptionPlan } from '../lib/billing';

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
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-parchment-50 text-2xl font-semibold text-gold">
            +
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Premium access
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-leather-900">
            Continue the full journey
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            Bible in a Year remains free forever. Premium includes Daily
            Formation, Saints, Dive Deeper, prayer features, the Rosary, and
            the Mass guide after your 14-day account trial.
          </p>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-parchment-200 bg-parchment-50 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-leather-900">
                  Monthly
                </h2>
                <p className="font-semibold text-leather-700">$5.99/month</p>
              </div>
              <p className="mt-1 text-sm text-stone-500">
                Monthly access to Premium features. Cancel anytime.
              </p>
              <button
                type="button"
                onClick={() => startPlan('monthly')}
                disabled={loadingPlan !== null}
                className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
              >
                {loadingPlan === 'monthly'
                  ? 'Opening checkout...'
                  : 'Subscribe monthly'}
              </button>
            </div>

            <div className="rounded-2xl border border-gold/40 bg-white p-4 shadow-[0_12px_28px_rgba(74,55,40,0.08)]">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-leather-900">
                  Yearly
                </h2>
                <p className="font-semibold text-leather-700">$49.99/year</p>
              </div>
              <p className="mt-1 text-sm text-stone-500">
                Best value for a full year of Premium features.
              </p>
              <button
                type="button"
                onClick={() => startPlan('yearly')}
                disabled={loadingPlan !== null}
                className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
              >
                {loadingPlan === 'yearly'
                  ? 'Opening checkout...'
                  : 'Subscribe yearly'}
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
