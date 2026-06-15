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

function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-24 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent ${className}`}
    />
  );
}

function CrossMark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`relative block h-7 w-7 before:absolute before:left-1/2 before:top-0 before:h-full before:w-px before:-translate-x-1/2 before:bg-current after:absolute after:left-0 after:top-[34%] after:h-px after:w-full after:bg-current ${className}`}
    />
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[300px] sm:w-[340px] lg:w-[390px]">
      <div className="absolute -inset-10 rounded-[4rem] bg-amber-400/20 blur-3xl" />
      <div className="absolute -right-8 top-16 hidden h-48 w-24 rotate-6 rounded-[2rem] border border-white/40 bg-white/15 shadow-2xl backdrop-blur md:block" />
      <div className="absolute -left-10 bottom-20 hidden h-40 w-28 -rotate-6 rounded-[2rem] border border-amber-200/50 bg-parchment-50/60 shadow-xl backdrop-blur md:block" />

      <div className="relative rounded-[3.4rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-3 shadow-[0_40px_90px_rgba(53,35,20,0.35)]">
        <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[2.75rem] bg-[#f7f0df]">
          <div className="relative min-h-[620px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.92),transparent_34%),linear-gradient(135deg,rgba(194,137,54,0.16),transparent_38%),linear-gradient(180deg,#fff9eb_0%,#f3e6ca_100%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(84,55,31,0.08)_1px,transparent_1px),linear-gradient(rgba(84,55,31,0.07)_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative px-5 pb-5 pt-12">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Today
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-bold text-leather-900">
                    Day 142
                  </h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-200 bg-white/70 text-amber-700 shadow-sm">
                  <CrossMark />
                </div>
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-white/70 bg-white/75 p-4 shadow-[0_18px_40px_rgba(92,64,39,0.12)] backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  Saint of the Day
                </p>
                <p className="mt-2 font-display text-xl font-semibold text-leather-900">
                  Saint Augustine
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  Lord, let my heart rest in you.
                </p>
              </div>

              <div className="mt-4 rounded-[1.6rem] border border-amber-100 bg-leather-900 p-4 shadow-[0_20px_44px_rgba(34,24,17,0.25)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-parchment-50">
                    Journey Progress
                  </p>
                  <p className="text-xs text-amber-200">142 of 365</p>
                </div>
                <div className="mt-4 h-2.5 rounded-full bg-white/10">
                  <div className="h-2.5 w-[39%] rounded-full bg-gradient-to-r from-amber-300 to-amber-600" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {['Read', 'Pray', 'Reflect'].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center text-[11px] font-medium text-parchment-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[1.6rem] border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_rgba(92,64,39,0.12)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  Today's Scripture
                </p>
                <p className="mt-2 font-display text-lg leading-relaxed text-leather-900">
                  Your word is a lamp to my feet and a light to my path.
                </p>
                <p className="mt-3 text-xs font-semibold text-stone-500">
                  Psalm 119:105
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-100 bg-white/65 p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-stone-500">
                    Prayer
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-leather-900">
                    Morning Offering
                  </p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-white/65 p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-stone-500">
                    Faith
                  </p>
                  <p className="mt-1 font-display text-base font-semibold text-leather-900">
                    Grace
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-amber-100/80 bg-[#fff8e7]/90 px-4 pb-4 pt-3 backdrop-blur">
              <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-semibold">
                {['Today', 'Journey', 'Bible', 'Faith', 'Profile'].map((item) => (
                  <span
                    key={item}
                    className={item === 'Today' ? 'text-amber-700' : 'text-stone-400'}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/80 bg-white/70 p-5 shadow-[0_24px_60px_rgba(92,64,39,0.13)] backdrop-blur">
      <div className="absolute -right-12 -top-14 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl" />
      <p className="relative text-[11px] font-bold uppercase tracking-[0.22em] text-amber-700">
        {eyebrow}
      </p>
      <h4 className="relative mt-2 font-display text-xl font-semibold text-leather-900">
        {title}
      </h4>
      <div className="relative mt-5">{children}</div>
    </div>
  );
}

function ShowcaseRow({
  eyebrow,
  title,
  description,
  reverse,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid items-center gap-10 md:grid-cols-2 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
          {eyebrow}
        </p>
        <h3 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:text-5xl">
          {title}
        </h3>
        <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
          {description}
        </p>
      </div>
      {children}
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
    <div className="min-h-screen overflow-hidden bg-[#f5ead1] text-leather-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.9),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(214,157,72,0.24),transparent_28%),linear-gradient(180deg,#fff7e4_0%,#f1dfbd_52%,#ead4ad_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(115deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0)_34%),linear-gradient(90deg,rgba(83,54,31,0.09)_1px,transparent_1px),linear-gradient(rgba(83,54,31,0.08)_1px,transparent_1px)] [background-size:100%_100%,28px_28px,28px_28px]" />

      <nav className="fixed inset-x-0 top-0 z-30 border-b border-white/30 bg-[#fff4dc]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-leather-900 text-amber-200 shadow-sm">
              <CrossMark className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold tracking-wide text-leather-900">
              Catholic Journey 365
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-leather-900/75 transition hover:text-leather-900"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={goToApp}
              className="rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-6 py-3 text-sm font-bold text-leather-900 shadow-[0_12px_30px_rgba(161,106,28,0.25)] transition active:scale-[0.99]"
            >
              Begin Your Journey
            </button>
          </div>

          <button
            onClick={goToApp}
            className="rounded-full bg-gradient-to-b from-amber-400 to-amber-600 px-5 py-2.5 text-sm font-bold text-leather-900 shadow-sm md:hidden"
          >
            Begin
          </button>
        </div>
      </nav>

      <header id="top" className="relative min-h-screen overflow-hidden pt-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(106deg,rgba(255,255,255,0.54)_0%,rgba(255,255,255,0)_38%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[1fr_0.88fr] lg:gap-16">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-700">
              Catholic Journey 365
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] text-leather-900 sm:text-6xl lg:text-7xl">
              Start your journey closer to God, one day at a time.
            </h1>

            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-lg leading-8 text-leather-900/80 sm:text-xl lg:mx-0">
              <p>
                You do not need to know everything. You do not need to have all
                the answers.
              </p>
              <p className="font-display text-2xl font-semibold leading-9 text-leather-900">
                Begin with Scripture. Build a life of prayer. Discover the
                Catholic faith.
              </p>
            </div>

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={goToApp}
                className="w-full rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-9 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.28)] transition active:scale-[0.99] sm:w-auto"
              >
                Begin Your Journey
              </button>
              <GoldRule className="hidden sm:block" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-8 bottom-4 h-16 rounded-full bg-leather-900/30 blur-3xl" />
            <PhoneMockup />
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="relative px-5 py-24 sm:px-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="mx-auto max-w-5xl text-center">
            <GoldRule className="mx-auto" />
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-4xl font-semibold leading-tight text-leather-900 md:text-6xl">
              Wanting to grow in faith can feel overwhelming.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              Many people want to begin, but the first step can feel hidden.
              Catholic Journey 365 gives that desire a quiet daily rhythm.
            </p>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                'Where do I start reading the Bible?',
                'How do I pray?',
                'How do I understand my faith?',
              ].map((question) => (
                <div
                  key={question}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/58 p-7 text-left shadow-[0_24px_60px_rgba(92,64,39,0.12)] backdrop-blur"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-300/20 blur-2xl transition group-hover:bg-amber-300/30" />
                  <CrossMark className="text-amber-700" />
                  <p className="relative mt-8 font-display text-2xl font-semibold leading-tight text-leather-900">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="relative px-5 py-24 sm:px-8">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.44)_48%,rgba(255,255,255,0.08))]" />
          <div className="mx-auto max-w-7xl space-y-24">
            <ShowcaseRow
              eyebrow="Journey"
              title="A simple path for the whole year."
              description="Move through a 365 day Catholic journey with daily Scripture, prayer, reflection, and visible progress that helps you return tomorrow."
            >
              <PreviewPanel eyebrow="Day 142" title="The road remains clear">
                <div className="space-y-3">
                  {['Today', 'This Week', 'The Year'].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-[#fffaf0] p-4"
                    >
                      <span
                        className={`h-10 w-10 rounded-full ${
                          index === 0 ? 'bg-amber-500' : 'bg-leather-900'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-leather-900">{item}</p>
                        <div className="mt-2 h-2 rounded-full bg-amber-100">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-600"
                            style={{ width: `${82 - index * 18}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PreviewPanel>
            </ShowcaseRow>

            <ShowcaseRow
              eyebrow="Bible"
              title="Read Scripture in a prayerful place."
              description="The Catholic Bible is presented with calm typography and a focused reading experience so the Word of God can be approached without noise."
              reverse
            >
              <PreviewPanel eyebrow="Today's Scripture" title="Psalm 119">
                <div className="rounded-[1.5rem] bg-leather-900 p-6 text-parchment-50 shadow-inner">
                  <p className="font-display text-2xl leading-relaxed">
                    Your word is a lamp to my feet and a light to my path.
                  </p>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Sacred Scripture
                  </p>
                </div>
              </PreviewPanel>
            </ShowcaseRow>

            <ShowcaseRow
              eyebrow="Faith"
              title="Learn the faith without feeling lost."
              description="Prayer, saints, Mass, sacraments, and Catholic teaching are gathered into a daily rhythm that keeps Mary, the saints, and every devotion pointing to Christ."
            >
              <PreviewPanel eyebrow="Formation" title="Small steps, deep roots">
                <div className="grid grid-cols-2 gap-3">
                  {['Prayer', 'Saints', 'Mass', 'Sacraments'].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-amber-100 bg-[#fffaf0] p-4"
                    >
                      <div className="h-8 w-8 rounded-full bg-gradient-to-b from-amber-300 to-amber-600" />
                      <p className="mt-5 font-display text-lg font-semibold text-leather-900">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </PreviewPanel>
            </ShowcaseRow>

            <ShowcaseRow
              eyebrow="Family"
              title="A journey that can be shared at home."
              description="Walk at your own pace while keeping room for spouses, children, and friends to grow together in Scripture and prayer."
              reverse
            >
              <PreviewPanel eyebrow="Family Journey" title="Together, day by day">
                <div className="space-y-3">
                  {[
                    ['Maria', 'Day 142'],
                    ['Joseph', 'Day 138'],
                    ['Anna', 'Day 145'],
                  ].map(([name, day]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between rounded-2xl border border-amber-100 bg-[#fffaf0] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-full bg-leather-900" />
                        <span className="font-semibold text-leather-900">
                          {name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-amber-700">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </PreviewPanel>
            </ShowcaseRow>
          </div>
        </section>

        <section className="relative px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[radial-gradient(circle_at_15%_0%,rgba(212,164,88,0.24),transparent_30%),linear-gradient(135deg,#24160f_0%,#3a2619_45%,#170f0b_100%)] px-7 py-16 shadow-[0_40px_100px_rgba(36,22,15,0.35)] sm:px-12 md:px-16">
            <div className="grid gap-12 md:grid-cols-[0.72fr_1fr] md:items-center">
              <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-amber-200/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-8">
                <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(45deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="relative flex h-full flex-col justify-between">
                  <CrossMark className="text-amber-300" />
                  <p className="font-display text-4xl font-semibold leading-tight text-parchment-50">
                    Catholic Journey 365 began as the companion I needed.
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
                  Founder Story
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-parchment-50 md:text-6xl">
                  Why I Built Catholic Journey 365
                </h2>
                <div className="mt-8 space-y-6 text-xl leading-9 text-parchment-100/86">
                  <p>
                    I wanted to grow closer to God, but I did not know where to
                    start.
                  </p>
                  <p>
                    Catholic Journey 365 began as the companion I needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 pt-8 sm:px-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-white/50 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_35%),linear-gradient(135deg,rgba(255,247,227,0.94),rgba(230,199,145,0.78))] px-6 py-20 text-center shadow-[0_40px_100px_rgba(92,64,39,0.18)] md:py-28">
            <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <GoldRule className="mx-auto" />
              <h2 className="mt-8 font-display text-5xl font-semibold leading-tight text-leather-900 md:text-7xl">
                Your journey starts today.
              </h2>
              <div className="mx-auto mt-8 max-w-xl space-y-3 font-display text-2xl leading-9 text-leather-900">
                <p>One day.</p>
                <p>One prayer.</p>
                <p>One step closer to God.</p>
              </div>
              <button
                onClick={goToApp}
                className="mt-10 w-full rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-10 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99] sm:w-auto"
              >
                Begin Your Journey
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
