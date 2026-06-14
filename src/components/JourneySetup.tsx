import { useState } from 'react';
import { useAccount } from '../lib/account';

export default function JourneySetup() {
  const { createJourney, joinJourney } = useAccount();
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const inputClass =
    'mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400';

  const doCreate = async () => {
    setError(null);
    setBusy(true);
    try {
      const res = await createJourney(name);
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
          Create your Journey
        </h1>
        <p className="mt-2 text-leather-600">
          Walk the journey together with family.
        </p>

        {mode === 'choose' && (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setMode('create')}
              className="w-full rounded-xl bg-leather-600 py-4 font-semibold text-white active:scale-[0.99] transition"
            >
              Create Journey
            </button>
            <button
              onClick={() => setMode('join')}
              className="w-full rounded-xl bg-white border border-parchment-200 py-4 font-semibold text-leather-900 active:scale-[0.99] transition"
            >
              Join Journey
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="mt-8 rounded-2xl bg-white border border-parchment-200 p-6 text-left">
            <label className="block text-sm font-semibold text-leather-900">
              Journey name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Chris &amp; Saua Journey"
                className={inputClass}
              />
            </label>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            <button
              onClick={doCreate}
              disabled={busy || !name.trim()}
              className="mt-4 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
            >
              {busy ? 'Creating…' : 'Create'}
            </button>
            <button
              onClick={() => setMode('choose')}
              className="mt-3 w-full text-sm text-leather-600 font-medium"
            >
              ← Back
            </button>
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
                className={inputClass}
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
              onClick={() => setMode('choose')}
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
