import { useState } from 'react';
import { useAccount } from '../lib/account';

// Existing production progress namespaces that a new account can claim.
const LEGACY = [
  { id: 'chris', label: 'Chris' },
  { id: 'saua', label: 'Saua' },
];

export default function ClaimScreen() {
  const { user, claim } = useAccount();
  const [busy, setBusy] = useState(false);

  const choose = async (namespace: string) => {
    setBusy(true);
    try {
      await claim(namespace);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-3xl font-bold text-leather-900">
          Import existing journey?
        </h1>
        <p className="mt-2 text-leather-600">
          Claim previous progress, or start fresh.
        </p>

        <div className="mt-8 space-y-3">
          {LEGACY.map((l) => (
            <button
              key={l.id}
              disabled={busy}
              onClick={() => choose(l.id)}
              className="w-full rounded-xl bg-white border border-parchment-200 py-4 font-semibold text-leather-900 active:scale-[0.99] transition disabled:opacity-50"
            >
              I am {l.label}, import this progress
            </button>
          ))}
          <button
            disabled={busy || !user}
            onClick={() => user && choose(user.id)}
            className="w-full rounded-xl bg-leather-600 py-4 font-semibold text-white active:scale-[0.99] transition disabled:opacity-50"
          >
            Start Fresh
          </button>
        </div>
      </div>
    </div>
  );
}
