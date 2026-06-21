import { useMemo, useState } from 'react';
import { useAccount } from '../lib/account';

function hasRecoveryParams() {
  if (typeof window === 'undefined') return false;
  const url = new URL(window.location.href);
  return (
    url.searchParams.get('type') === 'recovery' ||
    url.searchParams.has('code') ||
    url.hash.includes('type=recovery') ||
    url.hash.includes('access_token=')
  );
}

export default function ResetPassword() {
  const { user, updatePassword, signOut } = useAccount();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const arrivedFromResetEmail = useMemo(hasRecoveryParams, []);

  const goToLogin = async () => {
    await signOut();
    window.location.href = '/app/login';
  };

  const submit = async () => {
    setError(null);
    if (password.length < 6) {
      setError('Please enter a password with at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const res = await updatePassword(password);
      if (res.error) setError(res.error);
      else setSuccess(true);
    } finally {
      setBusy(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-parchment-200 bg-white p-6 text-center shadow-[0_18px_42px_rgba(74,55,40,0.08)]">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Reset link unavailable
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            This reset link may be invalid or expired. Please request a new
            password reset email and try again.
          </p>
          {!arrivedFromResetEmail && (
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              Open the reset link directly from your email inbox.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              window.location.href = '/app/login';
            }}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Back to log in
          </button>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-parchment-200 bg-white p-6 text-center shadow-[0_18px_42px_rgba(74,55,40,0.08)]">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Password updated
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Your password has been updated successfully.
          </p>
          <button
            type="button"
            onClick={goToLogin}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99]"
          >
            Back to log in
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Set a new password
          </h1>
          <p className="mt-2 text-leather-600 font-medium">
            Choose a password for Catholic Journey 365.
          </p>
        </div>
        <div className="rounded-2xl border border-parchment-200 bg-white p-6">
          <label className="block text-sm font-semibold text-leather-900">
            New password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
            />
          </label>
          <label className="mt-3 block text-sm font-semibold text-leather-900">
            Confirm new password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              className="mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400"
            />
          </label>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="button"
            disabled={busy || !password || !confirmPassword}
            onClick={submit}
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white transition active:scale-[0.99] disabled:opacity-50"
          >
            {busy ? 'Updating...' : 'Update password'}
          </button>
        </div>
      </div>
    </main>
  );
}
