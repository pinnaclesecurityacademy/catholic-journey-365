import { useState } from 'react';
import { useAccount } from '../lib/account';

type Mode = 'login' | 'signup' | 'forgot';

export default function AuthScreen() {
  const { signIn, signUp, resetPassword } = useAccount();
  const [mode, setMode] = useState<Mode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const inputClass =
    'mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400';

  const switchMode = (next: Mode) => {
    setError(null);
    setConfirmSent(false);
    setResetSent(false);
    setMode(next);
  };

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      if (mode === 'signup') {
        const res = await signUp(name, email, password);
        if (res.error) setError(res.error);
        else setConfirmSent(true);
      } else if (mode === 'forgot') {
        const res = await resetPassword(email);
        if (res.error) setError(res.error);
        else setResetSent(true);
      } else {
        const res = await signIn(email, password);
        if (res.error) setError(res.error);
      }
    } finally {
      setBusy(false);
    }
  };

  // Post-signup confirmation message.
  if (confirmSent) {
    return (
      <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-3xl font-bold text-leather-900">
            Almost there
          </h1>
          <div className="mt-6 rounded-2xl bg-white border border-parchment-200 p-6">
            <p className="text-leather-900 leading-relaxed">
              Check your email to confirm your account.
            </p>
          </div>
          <button
            onClick={() => switchMode('login')}
            className="mt-4 w-full text-sm text-leather-600 font-medium"
          >
            Back to log in
          </button>
        </div>
      </div>
    );
  }

  const title =
    mode === 'signup'
      ? 'Begin your journey'
      : mode === 'forgot'
      ? 'Reset your password'
      : 'Welcome back';

  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Catholic Journey 365
          </h1>
          <p className="mt-2 text-leather-600 font-medium">{title}</p>
        </div>

        <div className="rounded-2xl bg-white border border-parchment-200 p-6">
          {mode === 'signup' && (
            <label className="block mb-3 text-sm font-semibold text-leather-900">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
          )}

          <label className="block mb-3 text-sm font-semibold text-leather-900">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && mode === 'forgot' && submit()}
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>

          {mode !== 'forgot' && (
            <label className="block text-sm font-semibold text-leather-900">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="••••••••"
                className={inputClass}
              />
            </label>
          )}

          {mode === 'login' && (
            <button
              onClick={() => switchMode('forgot')}
              className="mt-3 text-sm text-leather-600 font-medium"
            >
              Forgot Password?
            </button>
          )}

          {resetSent && (
            <p className="mt-3 text-sm text-leather-900">
              Check your email for a link to reset your password.
            </p>
          )}
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            onClick={submit}
            disabled={
              busy ||
              !email.trim() ||
              (mode !== 'forgot' && !password.trim()) ||
              (mode === 'signup' && !name.trim())
            }
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
          >
            {busy
              ? 'Please wait…'
              : mode === 'signup'
              ? 'Create account'
              : mode === 'forgot'
              ? 'Send reset link'
              : 'Log in'}
          </button>
        </div>

        {mode === 'forgot' ? (
          <button
            onClick={() => switchMode('login')}
            className="mt-4 w-full text-sm text-leather-600 font-medium"
          >
            ← Back to log in
          </button>
        ) : (
          <button
            onClick={() => switchMode(mode === 'signup' ? 'login' : 'signup')}
            className="mt-4 w-full rounded-xl px-4 py-3 text-sm text-leather-600 font-medium active:scale-[0.99] transition"
          >
            {mode === 'signup' ? (
              <>
                Already have an account?{' '}
                <span className="font-bold text-gold underline underline-offset-4">
                  Log in here
                </span>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <span className="font-bold text-gold underline underline-offset-4">
                  Create an account
                </span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
