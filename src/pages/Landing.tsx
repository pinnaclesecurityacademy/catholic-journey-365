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

/* A small reusable gold divider used between sections. */
function GoldRule() {
  return (
    <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-leather-400 to-transparent" />
  );
}

/* A device frame that previews the app's Today screen. Built entirely in CSS so
   no screenshots are needed. Display only. */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px]">
      {/* soft glow behind the device */}
      <div className="absolute -inset-6 rounded-[3rem] bg-leather-400/20 blur-2xl" />

      <div className="relative rounded-[2.6rem] border border-parchment-200 bg-leather-900 p-2.5 shadow-2xl">
        <div className="overflow-hidden rounded-[2.1rem] bg-parchment-100">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-leather-800/70">
            <span>9:41</span>
            <span className="h-1.5 w-16 rounded-full bg-leather-900/10" />
          </div>

          {/* screen content */}
          <div className="px-4 pb-5 pt-2">
            <p className="text-[11px] uppercase tracking-wider text-stone-400">
              Sunday, Day 142
            </p>
            <h3 className="font-display text-lg font-bold text-leather-900">
              Good morning
            </h3>

            {/* Saint of the day */}
            <div className="mt-3 rounded-2xl bg-white border border-parchment-200 p-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-leather-400 font-semibold">
                Saint of the Day
              </p>
              <p className="mt-0.5 font-display text-sm font-semibold text-leather-900">
                Saint Augustine
              </p>
              <p className="mt-1 text-[11px] leading-snug text-stone-500">
                Late have I loved you, beauty so ancient and so new.
              </p>
            </div>

            {/* Journey progress */}
            <div className="mt-3 rounded-2xl bg-white border border-parchment-200 p-3 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-leather-900">
                  Journey Progress
                </p>
                <p className="text-[11px] text-stone-400">142 / 365</p>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-parchment-200">
                <div className="h-2 w-[39%] rounded-full bg-gradient-to-r from-leather-400 to-leather-600" />
              </div>
            </div>

            {/* Scripture */}
            <div className="mt-3 rounded-2xl bg-leather-900 p-3 shadow-sm">
              <p className="text-[10px] uppercase tracking-wider text-leather-400 font-semibold">
                Today's Scripture
              </p>
              <p className="mt-1 font-display text-[13px] leading-snug text-parchment-100">
                Your word is a lamp to my feet and a light to my path.
              </p>
              <p className="mt-1 text-[10px] text-parchment-200/70">Psalm 119</p>
            </div>
          </div>

          {/* bottom nav hint */}
          <div className="flex items-center justify-around border-t border-parchment-200 bg-parchment-50 px-2 py-2 text-[9px] font-medium">
            <span className="text-leather-600">Today</span>
            <span className="text-stone-400">Journey</span>
            <span className="text-stone-400">Bible</span>
            <span className="text-stone-400">Faith</span>
            <span className="text-stone-400">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* A feature showcase row. Alternates the visual side on desktop. */
function FeatureRow({
  eyebrow,
  title,
  description,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-center ${
        reverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="md:w-1/2">
        <p className="text-xs font-semibold uppercase tracking-wider text-leather-400">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-leather-900">
          {title}
        </h3>
        <p className="mt-3 text-stone-500 leading-relaxed">{description}</p>
      </div>
      <div className="md:w-1/2">{visual}</div>
    </div>
  );
}

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
      {/* Warm radial wash at the very top for depth. */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-parchment-50 to-parchment-100" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-leather-400/20 blur-3xl" />

        {/* HERO */}
        <header className="relative mx-auto max-w-5xl px-6 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-10">
            {/* Left */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leather-400">
                Catholic Journey 365
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-leather-900 md:text-5xl">
                Start your journey closer to God, one day at a time.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-leather-800">
                You do not need to know everything. You do not need to have all
                the answers.
              </p>
              <p className="mt-3 text-stone-500 leading-relaxed">
                Begin with Scripture. Build a life of prayer. Discover the
                Catholic faith.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start md:justify-start">
                <button
                  onClick={goToApp}
                  className="w-full rounded-2xl bg-leather-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-leather-600/20 transition active:scale-[0.99] sm:w-auto"
                >
                  Begin Your Journey
                </button>
                <span className="text-sm text-stone-400">
                  Free to begin. No pressure.
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/2">
              <PhoneMockup />
            </div>
          </div>
        </header>
      </div>

      {/* INVITATION / OVERWHELM */}
      <section className="mx-auto max-w-3xl px-6 py-14 text-center">
        <GoldRule />
        <h2 className="mt-6 font-display text-3xl font-semibold text-leather-900">
          Wanting to grow in faith can feel overwhelming.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            'Where do I start reading the Bible?',
            'How do I pray?',
            'How do I understand my faith?',
          ].map((q) => (
            <div
              key={q}
              className="rounded-2xl bg-white border border-parchment-200 p-5 shadow-sm"
            >
              <p className="font-display text-lg text-leather-900 leading-snug">
                {q}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg text-leather-800 leading-relaxed">
          Catholic Journey 365 was created to help guide the first step.
        </p>
      </section>

      {/* FEATURE SHOWCASE */}
      <section className="bg-parchment-50 border-y border-parchment-200">
        <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
          <FeatureRow
            eyebrow="Journey"
            title="A guided path through Scripture."
            description="A clear, day by day walk through the story of salvation. Each day gives you a reading, a reflection, and a simple step forward, so you always know where to begin."
            visual={
              <div className="rounded-3xl bg-white border border-parchment-200 p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-leather-900">
                    The Bible Timeline
                  </p>
                  <span className="text-xs text-stone-400">Day 142</span>
                </div>
                <div className="mt-4 space-y-3">
                  {['Creation', 'The Exodus', 'The Kingdom', 'The Gospel'].map(
                    (period, i) => (
                      <div key={period} className="flex items-center gap-3">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                            i < 3
                              ? 'bg-leather-600 text-white'
                              : 'bg-parchment-200 text-leather-800'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-leather-900">
                          {period}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            }
          />

          <FeatureRow
            reverse
            eyebrow="Bible"
            title="Encounter God through His Word."
            description="Read Sacred Scripture book by book and chapter by chapter in a calm, distraction free reader designed for prayerful reading rather than scrolling."
            visual={
              <div className="rounded-3xl bg-leather-900 p-6 shadow-md">
                <p className="text-xs uppercase tracking-wider text-leather-400 font-semibold">
                  Psalm 23
                </p>
                <p className="mt-3 font-display text-xl leading-relaxed text-parchment-100">
                  The Lord is my shepherd; there is nothing I shall want. He
                  makes me lie down in green pastures.
                </p>
                <p className="mt-4 text-xs text-parchment-200/70">
                  Old Testament
                </p>
              </div>
            }
          />

          <FeatureRow
            eyebrow="Faith"
            title="Grow in Catholic life through prayer, saints, and the Church."
            description="Find the prayers of the Church, the lives of the saints, and the riches of Catholic devotion gathered in one place, ready whenever you want to draw closer to God."
            visual={
              <div className="grid grid-cols-2 gap-3">
                {['Prayer', 'Saints', 'Mass', 'Sacraments'].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-2xl border border-parchment-200 p-4 shadow-sm ${
                      i % 3 === 0 ? 'bg-white' : 'bg-parchment-50'
                    }`}
                  >
                    <p className="font-display text-base font-semibold text-leather-900">
                      {item}
                    </p>
                    <div className="mt-2 h-1 w-10 rounded-full bg-leather-400/60" />
                  </div>
                ))}
              </div>
            }
          />

          <FeatureRow
            reverse
            eyebrow="Family"
            title="Walk together in faith."
            description="Invite your family to share the same journey. Encourage one another, keep one another close in prayer, and grow in faith side by side."
            visual={
              <div className="rounded-3xl bg-white border border-parchment-200 p-6 shadow-md">
                <p className="font-display text-lg font-semibold text-leather-900">
                  Family Journey
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    { name: 'Maria', progress: 'Day 142' },
                    { name: 'Joseph', progress: 'Day 138' },
                    { name: 'Anna', progress: 'Day 145' },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between rounded-xl bg-parchment-50 px-3 py-2"
                    >
                      <span className="text-sm text-leather-900">{m.name}</span>
                      <span className="text-xs text-stone-400">
                        {m.progress}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* FOUNDER */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-leather-900 p-8 shadow-xl md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-leather-400/20 blur-2xl" />
          <p className="relative text-xs font-semibold uppercase tracking-wider text-leather-400">
            Why I Built This
          </p>
          <blockquote className="relative mt-4 space-y-4 font-display text-xl leading-relaxed text-parchment-100 md:text-2xl">
            <p>
              I wanted to grow closer to God, but I did not know where to start.
            </p>
            <p>
              Catholic Journey 365 began as the companion I needed. A simple way
              to take one step closer to God each day.
            </p>
          </blockquote>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <GoldRule />
        <h2 className="mt-6 font-display text-3xl font-bold text-leather-900">
          Your journey starts today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-stone-500 leading-relaxed">
          Use Catholic Journey 365 in your browser or install it on your phone
          for an app experience.
        </p>
        <div className="mx-auto mt-4 max-w-md space-y-1 text-sm text-stone-500 leading-relaxed">
          <p>On iPhone, open Safari and choose Add to Home Screen.</p>
          <p>On Android, choose Install App.</p>
        </div>

        <button
          onClick={goToApp}
          className="mt-8 w-full rounded-2xl bg-leather-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-leather-600/20 transition active:scale-[0.99] sm:w-auto"
        >
          Begin Your Journey
        </button>

        <p className="mt-10 text-xs text-stone-400">
          Catholic Journey 365
        </p>
      </section>
    </div>
  );
}
