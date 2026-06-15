import { useEffect } from 'react';
import { useAccount } from '../lib/account';

// Public marketing landing page (route: "/"). The authenticated app lives at
// "/app". This page is intentionally outside the app's BrowserRouter so it can
// be shown to logged-out visitors. Anyone already signed in is forwarded to the
// app, and Supabase email-confirmation / recovery links (which establish a
// session in the URL on load) are picked up by AccountProvider here and then
// carried into the app by the same redirect.

function goToApp() {
  window.location.href = '/app';
}

const FEATURES: { title: string; description: string }[] = [
  { title: 'Journey', description: 'A guided path through Scripture.' },
  { title: 'Bible', description: 'Encounter God through His Word.' },
  {
    title: 'Faith',
    description: 'Grow in Catholic life through prayer, saints, and the Church.',
  },
  { title: 'Family Journey', description: 'Walk together in faith.' },
];

export default function Landing() {
  const { loading, user } = useAccount();

  // Already signed in (or just confirmed an email): continue into the app.
  useEffect(() => {
    if (!loading && user) {
      window.location.replace('/app');
    }
  }, [loading, user]);

  return (
    <div className="min-h-screen bg-parchment-100 text-leather-900">
      <div className="max-w-md mx-auto px-5">
        {/* Hero */}
        <header className="pt-16 pb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-leather-900">
            Catholic Journey 365
          </h1>
          <p className="mt-4 text-lg text-leather-800">
            Start your journey closer to God, one day at a time.
          </p>

          <p className="mt-6 text-stone-500 leading-relaxed">
            You do not need to know everything. You do not need to have all the
            answers.
          </p>
          <p className="mt-4 text-stone-500 leading-relaxed">
            Begin with Scripture. Build a life of prayer. Discover the Catholic
            faith.
          </p>

          <button
            onClick={goToApp}
            className="mt-8 w-full rounded-2xl bg-leather-600 py-4 font-semibold text-white text-lg active:scale-[0.99] transition"
          >
            Begin Your Journey
          </button>
        </header>

        {/* Overwhelm section */}
        <section className="rounded-2xl bg-white border border-parchment-200 p-6 mb-10">
          <h2 className="font-display text-2xl font-semibold text-leather-900">
            Wanting to grow in faith can feel overwhelming.
          </h2>
          <div className="mt-4 space-y-2 text-stone-500 leading-relaxed">
            <p>Where do I start reading the Bible?</p>
            <p>How do I pray?</p>
            <p>How do I understand my faith?</p>
          </div>
          <p className="mt-4 text-leather-800 leading-relaxed">
            Catholic Journey 365 was created to help guide the first step.
          </p>
        </section>

        {/* Features */}
        <section className="mb-10">
          <div className="space-y-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white border border-parchment-200 p-5"
              >
                <h3 className="font-display text-xl font-semibold text-leather-900">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-stone-500">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section className="rounded-2xl bg-parchment-50 border border-parchment-200 p-6 mb-10">
          <h2 className="font-display text-2xl font-semibold text-leather-900">
            Why I Built This
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed">
            I wanted to grow closer to God, but I did not know where to start.
          </p>
          <p className="mt-4 text-stone-500 leading-relaxed">
            Catholic Journey 365 began as the companion I needed. A simple way to
            take one step closer to God each day.
          </p>
        </section>

        {/* Install */}
        <section className="text-center mb-12">
          <h2 className="font-display text-2xl font-semibold text-leather-900">
            Your journey starts today.
          </h2>
          <p className="mt-4 text-stone-500 leading-relaxed">
            Use Catholic Journey 365 in your browser or install it on your phone
            for an app experience.
          </p>
          <div className="mt-4 space-y-2 text-stone-500 leading-relaxed">
            <p>On iPhone, open Safari and choose Add to Home Screen.</p>
            <p>On Android, choose Install App.</p>
          </div>

          <button
            onClick={goToApp}
            className="mt-8 w-full rounded-2xl bg-leather-600 py-4 font-semibold text-white text-lg active:scale-[0.99] transition"
          >
            Begin Your Journey
          </button>
        </section>
      </div>
    </div>
  );
}
