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

/* A thin gold rule used as a quiet divider between thoughts. */
function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-20 bg-gradient-to-r from-transparent via-leather-400 to-transparent ${className}`}
    />
  );
}

/* Small line-art marks drawn in CSS so the page needs no image assets. They
   give each product section a quiet, devotional accent rather than an emoji. */
function Mark({ kind }: { kind: 'path' | 'book' | 'flame' | 'people' }) {
  const common = 'h-6 w-6 text-leather-600';
  if (kind === 'book') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v15H6a1 1 0 0 0-1 1z" />
        <path d="M5 19a1 1 0 0 0 1 1h12" />
        <path d="M12 6v6" />
        <path d="M9.5 8.5h5" />
      </svg>
    );
  }
  if (kind === 'flame') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.7-2.5 1.4-3.3C10 9 11.5 7 12 3z" />
        <path d="M12 21c-3 0-5-2-5-4.5" />
        <path d="M12 21c3 0 5-2 5-4.5" />
      </svg>
    );
  }
  if (kind === 'people') {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3 2.5-4.5 6-4.5" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M14 20c0-2.5 1.7-4 4-4" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c4 0 4-7 7-7s3 7 7 7" />
      <circle cx="5" cy="19" r="1.4" />
      <circle cx="19" cy="19" r="1.4" />
    </svg>
  );
}

/* The full device frame previewing the app's Today screen. */
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px]">
      <div className="absolute -inset-8 rounded-[3.5rem] bg-leather-400/25 blur-3xl" />
      <div className="relative rounded-[2.8rem] border border-parchment-200 bg-leather-900 p-2.5 shadow-2xl">
        <div className="overflow-hidden rounded-[2.3rem] bg-parchment-100">
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-leather-800/70">
            <span>9:41</span>
            <span className="h-1.5 w-16 rounded-full bg-leather-900/10" />
          </div>

          <div className="px-4 pb-5 pt-2">
            <p className="text-[11px] uppercase tracking-wider text-stone-400">
              Sunday, Day 142
            </p>
            <h3 className="font-display text-lg font-bold text-leather-900">
              Good morning
            </h3>

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

/* A compact app preview used inside each product column. */
function ProductColumn({
  mark,
  title,
  description,
  preview,
}: {
  mark: 'path' | 'book' | 'flame' | 'people';
  title: string;
  description: string;
  preview: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-3xl bg-parchment-50 border border-parchment-200 p-6 shadow-sm">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-parchment-200 shadow-sm">
        <Mark kind={mark} />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-leather-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-500">
        {description}
      </p>
      <div className="mt-5">{preview}</div>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Journey', href: '#journey' },
  { label: 'Bible', href: '#bible' },
  { label: 'Faith', href: '#faith' },
  { label: 'About', href: '#about' },
];

export default function Landing() {
  const { loading, user } = useAccount();

  useEffect(() => {
    if (!loading && user) {
      window.location.replace('/app');
    }
  }, [loading, user]);

  return (
    <div className="min-h-screen bg-parchment-100 text-leather-900">
      {/* 1. TOP NAVIGATION */}
      <nav className="sticky top-0 z-30 border-b border-parchment-200 bg-parchment-100/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-leather-600 text-sm font-bold text-white shadow-sm">
              C
            </span>
            <span className="font-display text-lg font-bold text-leather-900">
              Catholic Journey 365
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-leather-800 transition hover:text-leather-600"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={goToApp}
              className="rounded-xl bg-leather-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99]"
            >
              Begin Your Journey
            </button>
          </div>

          <button
            onClick={goToApp}
            className="rounded-xl bg-leather-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] md:hidden"
          >
            Begin
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <header id="top" className="relative overflow-hidden">
        {/* atmosphere: warm Scripture light, drawn with gradients only */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-parchment-50 via-parchment-100 to-parchment-100" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-leather-400/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-leather-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex flex-col items-center gap-14 md:flex-row md:gap-12">
            {/* Left */}
            <div className="w-full text-center md:w-1/2 md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-leather-400">
                Catholic Journey 365
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-leather-900 md:text-5xl lg:text-6xl">
                Start your journey closer to God, one day at a time.
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-leather-800">
                You do not need to know everything. You do not need to have all
                the answers.
              </p>

              <p className="mt-5 font-display text-xl font-semibold leading-relaxed text-leather-900">
                Begin with Scripture. Build a life of prayer. Discover the
                Catholic faith.
              </p>

              <GoldRule className="mt-7 md:mx-0 mx-auto" />

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <button
                  onClick={goToApp}
                  className="w-full rounded-2xl bg-leather-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-leather-600/20 transition active:scale-[0.99] sm:w-auto"
                >
                  Begin Your Journey
                </button>
                <span className="text-sm text-stone-400">
                  Free to begin. Walk at your own pace.
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/2">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </header>

      {/* 3. FAITH STRUGGLE */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-20 text-center">
        <GoldRule className="mx-auto" />
        <h2 className="mt-6 font-display text-3xl font-semibold leading-snug text-leather-900 md:text-4xl">
          Wanting to grow in faith can feel overwhelming.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            'Where do I start reading the Bible?',
            'How do I pray?',
            'What does the Church teach?',
            'How do I build a relationship with God?',
          ].map((q) => (
            <div
              key={q}
              className="rounded-2xl bg-white border border-parchment-200 p-5 text-left shadow-sm"
            >
              <p className="font-display text-lg leading-snug text-leather-900">
                {q}
              </p>
            </div>
          ))}
        </div>

        <figure className="relative mx-auto mt-12 max-w-2xl overflow-hidden rounded-3xl bg-leather-900 p-10 shadow-xl">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-leather-400/20 blur-2xl" />
          <blockquote className="relative font-display text-2xl leading-relaxed text-parchment-100 md:text-3xl">
            Your word is a lamp to my feet and a light to my path.
          </blockquote>
          <figcaption className="relative mt-4 text-sm uppercase tracking-wider text-leather-400">
            Psalm 119:105
          </figcaption>
        </figure>
      </section>

      {/* 4. PRODUCT JOURNEY */}
      <section
        id="journey"
        className="scroll-mt-20 border-y border-parchment-200 bg-parchment-50"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-leather-400">
              The Experience
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-leather-900 md:text-4xl">
              A companion for every step
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ProductColumn
              mark="path"
              title="A Path Through Scripture"
              description="A 365 day journey through Scripture and the story of salvation, one reading at a time."
              preview={
                <div className="rounded-2xl bg-white border border-parchment-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-leather-900">
                      The Bible Timeline
                    </span>
                    <span className="text-[11px] text-stone-400">Day 142</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {['Creation', 'The Exodus', 'The Gospel'].map((p, i) => (
                      <div key={p} className="flex items-center gap-2.5">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                            i < 2
                              ? 'bg-leather-600 text-white'
                              : 'bg-parchment-200 text-leather-800'
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-[13px] text-leather-900">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />

            <ProductColumn
              mark="book"
              title="Encounter God Through His Word"
              description="Explore Sacred Scripture with all 73 books of the Catholic Bible in a calm, prayerful reader."
              preview={
                <div className="rounded-2xl bg-leather-900 p-4 shadow-sm">
                  <p className="text-[10px] uppercase tracking-wider text-leather-400 font-semibold">
                    Psalm 23
                  </p>
                  <p className="mt-2 font-display text-[15px] leading-relaxed text-parchment-100">
                    The Lord is my shepherd; there is nothing I shall want.
                  </p>
                  <p className="mt-3 text-[10px] text-parchment-200/70">
                    Old Testament
                  </p>
                </div>
              }
            />

            <ProductColumn
              mark="flame"
              title="Learn, Pray, and Grow"
              description="Build a personal relationship with God through prayer, and discover the lives of the saints."
              preview={
                <div className="grid grid-cols-2 gap-2.5">
                  {['Prayer', 'Saints', 'Mass', 'Sacraments'].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-xl border border-parchment-200 p-3 shadow-sm ${
                        i % 3 === 0 ? 'bg-white' : 'bg-parchment-50'
                      }`}
                    >
                      <p className="text-[13px] font-semibold text-leather-900">
                        {item}
                      </p>
                      <div className="mt-2 h-1 w-8 rounded-full bg-leather-400/60" />
                    </div>
                  ))}
                </div>
              }
            />

            <ProductColumn
              mark="people"
              title="Your Journey, Your Pace"
              description="Track your progress and invite your family to walk the same journey alongside you."
              preview={
                <div className="rounded-2xl bg-white border border-parchment-200 p-4 shadow-sm">
                  <p className="text-xs font-semibold text-leather-900">
                    Family Journey
                  </p>
                  <div className="mt-3 space-y-2">
                    {[
                      { name: 'Maria', day: 'Day 142' },
                      { name: 'Joseph', day: 'Day 138' },
                      { name: 'Anna', day: 'Day 145' },
                    ].map((m) => (
                      <div
                        key={m.name}
                        className="flex items-center justify-between rounded-lg bg-parchment-50 px-3 py-1.5"
                      >
                        <span className="text-[13px] text-leather-900">
                          {m.name}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {m.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Anchor targets for Bible / Faith nav links land within the experience. */}
      <span id="bible" className="block scroll-mt-20" />
      <span id="faith" className="block scroll-mt-20" />

      {/* 5. WHY I BUILT THIS */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-leather-900 p-10 shadow-xl md:p-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-leather-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-leather-400/10 blur-3xl" />

          <p className="relative text-xs font-semibold uppercase tracking-wider text-leather-400">
            A Personal Note
          </p>
          <h2 className="relative mt-3 font-display text-3xl font-bold text-parchment-100 md:text-4xl">
            Why I Built Catholic Journey 365
          </h2>

          <div className="relative mt-7 space-y-5 text-lg leading-relaxed text-parchment-100/90 md:text-xl">
            <p>
              I wanted to grow closer to God, but I did not know where to start.
            </p>
            <p>
              I felt overwhelmed by where to begin reading the Bible, how to
              pray, and how to understand my faith.
            </p>
            <p>
              So I built Catholic Journey 365 as the companion I needed. A simple
              way to take that first step every day.
            </p>
            <p className="font-display text-parchment-100">
              My prayer is that it helps you on your journey too.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-leather-800 to-leather-900 px-6 py-20 text-center shadow-2xl">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-leather-400/25 blur-3xl" />

          <h2 className="relative font-display text-4xl font-bold text-parchment-100 md:text-5xl">
            Your journey starts today.
          </h2>

          <div className="relative mx-auto mt-8 max-w-md space-y-4 text-lg leading-relaxed text-parchment-100/85">
            <p>
              Not perfectly. Not all at once.
            </p>
            <p className="font-display text-xl text-parchment-100">
              One day. One prayer. One step closer to God.
            </p>
          </div>

          <GoldRule className="relative mx-auto mt-10" />

          <button
            onClick={goToApp}
            className="relative mt-10 w-full rounded-2xl bg-parchment-50 px-8 py-4 text-lg font-semibold text-leather-900 shadow-lg transition active:scale-[0.99] sm:w-auto"
          >
            Begin Your Journey
          </button>

          <p className="relative mt-12 text-xs uppercase tracking-wider text-parchment-200/60">
            Catholic Journey 365
          </p>
        </div>
      </section>
    </div>
  );
}
