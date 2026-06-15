import { useState } from 'react';
import { useAccount } from '../lib/account';

export default function JourneySetup() {
  const { createJourney } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // First-time setup is intentionally a single tap: create a journey named
  // "My Journey". Renaming and joining a shared journey live in Profile.
  const begin = async () => {
    setError(null);
    setBusy(true);
    try {
      const res = await createJourney('My Journey');
      if (res.error) setError(res.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Begin your Journey
        </h1>
        <p className="mt-2 text-leather-600">
          Walk through the whole of Scripture, one day at a time.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={begin}
            disabled={busy}
            className="w-full rounded-xl bg-leather-600 py-4 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
          >
            {busy ? 'Preparing…' : 'Begin My Journey'}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
