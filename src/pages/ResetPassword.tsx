import { useEffect, useMemo, useState } from 'react';
import { useAccount } from '../lib/account';
import { supabase } from '../lib/supabase';

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
  const { loading, user, updatePassword, signOut } = useAccount();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [linkChecking, setLinkChecking] = useState(true);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const arrivedFromResetEmail = useMemo(hasRecoveryParams, []);

  useEffect(() => {
    let active = true;

    const checkRecoverySession = async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));

      if (
        url.searchParams.has('error') ||
        url.searchParams.has('error_code') ||
        hash.has('error') ||
        hash.has('error_code')
      ) {
        if (!active) return;
        setLinkError('This reset link is invalid or expired.');
        setLinkChecking(false);
        return;
      }

      const code = url.searchParams.get('code');
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!active) return;
        if (exchangeError) {
          setLinkError('This reset link is invalid or expired.');
        } else {
          setSessionReady(true);
          window.history.replaceState({}, document.title, '/app/reset-password');
        }
        setLinkChecking(false);
        return;
      }

      const accessToken = hash.get('access_token');
      const refreshToken = hash.get('refresh_token');
      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (!active) return;
        if (sessionError) {
          setLinkError('This reset link is invalid or expired.');
        } else {
          setSessionReady(true);
          window.history.replaceState({}, document.title, '/app/reset-password');
        }
        setLinkChecking(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSessionReady(Boolean(data.session));
      if (window.location.hash) {
        window.history.replaceState({}, document.title, '/app/reset-password');
      }
      setLinkChecking(false);
    };

    void checkRecoverySession();

    return () => {
      active = false;
    };
  }, []);

  const goToLogin = async () => {
    await signOut();
    window.location.href = '/app/login';
  };

  const submit = async () => {
    setError(null);
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 8) {
      setError('Please enter a password with at least 8 characters.');
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

  const canUpdatePassword = Boolean(user) || sessionReady;

  if (loading || linkChecking) {
    return (
      <main className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-parchment-200 bg-white p-6 text-center shadow-[0_18px_42px_rgba(74,55,40,0.08)]">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Checking reset link
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Please wait while we prepare your password reset.
          </p>
        </div>
      </main>
    );
  }

  if (linkError || !canUpdatePassword) {
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
            <span className="mt-1 flex rounded-xl border border-parchment-200 bg-parchment-50 focus-within:border-leather-400">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-l-xl bg-transparent px-4 py-3 text-leather-900 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="px-4 text-sm font-medium text-leather-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </span>
          </label>
          <label className="mt-3 block text-sm font-semibold text-leather-900">
            Confirm new password
            <span className="mt-1 flex rounded-xl border border-parchment-200 bg-parchment-50 focus-within:border-leather-400">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="w-full rounded-l-xl bg-transparent px-4 py-3 text-leather-900 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="px-4 text-sm font-medium text-leather-600"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </span>
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
