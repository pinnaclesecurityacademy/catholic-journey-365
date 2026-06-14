import { useState } from 'react';
import { useAccount } from '../lib/account';

export default function AuthScreen() {
  const { signIn, signUp } = useAccount();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    setBusy(true);
    try {
      const res =
        mode === 'signup'
          ? await signUp(name, email, password)
          : await signIn(email, password);
      if (res.error) setError(res.error);
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    'mt-1 w-full rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-leather-900 outline-none focus:border-leather-400';

  return (
    <div className="min-h-screen bg-parchment-100 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Catholic Journey 365
          </h1>
          <p className="mt-2 text-leather-600 font-medium">
            {mode === 'signup' ? 'Begin your journey' : 'Welcome back'}
          </p>
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
              placeholder="you@example.com"
              className={inputClass}
            />
          </label>
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

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            onClick={submit}
            disabled={
              busy ||
              !email.trim() ||
              !password.trim() ||
              (mode === 'signup' && !name.trim())
            }
            className="mt-5 w-full rounded-xl bg-leather-600 py-3 font-semibold text-white disabled:opacity-50 active:scale-[0.99] transition"
          >
            {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </div>

        <button
          onClick={() => {
            setError(null);
            setMode(mode === 'signup' ? 'login' : 'signup');
          }}
          className="mt-4 w-full text-sm text-leather-600 font-medium"
        >
          {mode === 'signup'
            ? 'Already have an account? Log in'
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}
