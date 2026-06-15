import { useState } from 'react';
import { useAccount } from '../lib/account';

export default function JourneySetup() {
  const { createJourney, joinJourney } = useAccount();
  const [mode, setMode] = useState<'choose' | 'join'>('choose');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Start a personal journey in one tap, no naming required.
  const startMine = async () => {
    setError(null);
    setBusy(true);
    try {
      const res = await createJourney('My Journey');
      if (res.error) setError(res.error);
    } finally {
      setBusy(false);
    }
  };

  const doJoin = async () => {
    setError(null);
    setBusy(true);
    try {
      const ok = await joinJourney(code);
      if (!ok) setError('No journey found with that code.');
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

        {mode === 'choose' && (
          <div className="mt-8 space-y-3 text-left">
            <button
              onClick={startMine}
              disabled={busy}
              className="w-full rounded-2xl bg-leather-600 p-5 text-white disabled:opacity-50 active:scale-[0.99] transition"
            >
              <span className="block font-semibold">
                {busy ? 'Preparing…' : 'Start My Journey'}
              </span>
              <span className="mt-1 block text-sm text-white/80">
                Begin your own Catholic Journey 365.
              </span>
            </button>

            <button
              onClick={() => {
                setError(null);
                setMode('join');
              }}
              disabled={busy}
              className="w-full rounded-2xl bg-white border border-parchment-200 p-5 text-leather-900 disabled:opacity-50 active:scale-[0.99] transition"
            >
              <span className="block font-semibold">Join a Family Journey</span>
              <span className="mt-1 block text-sm text-leather-600">
                Enter an invite from family or friends.
              </span>
            </button>

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}
          </div>
        )}

        {mode === 'join' && (
          <div className="mt-8 rounded-2xl bg-white border border-parchment-200 p-6 text-left">
            <label className="block text-sm font-semibold text-leather-900">
              Invite code
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="CJ365-ABCD"
                className="mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
              />
            </label>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <button
              onClick={doJoin}
              disabled={busy || !code.trim()}
              className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
            >
              {busy ? 'Joining…' : 'Join'}
            </button>
            <button
              onClick={() => {
                setError(null);
                setMode('choose');
              }}
              className="mt-3 w-full text-sm text-leather-600 font-medium"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
