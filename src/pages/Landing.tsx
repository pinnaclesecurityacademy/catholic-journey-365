// Public marketing landing page (route: "/"). The authenticated app lives at
// "/app". This page is intentionally outside the app's BrowserRouter so it can
// be shown to visitors while the authenticated experience stays under /app.

function goToApp() {
  window.location.href = '/app/login';
}

function GoldRule({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent ${className}`}
    />
  );
}

function CrossMark({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/landing/jerusalem-cross.png"
      alt=""
      aria-hidden="true"
      className={`block h-7 w-7 object-contain ${className}`}
    />
  );
}

// Shared primary call to action. Used in every major section so a visitor can
// begin from wherever they are on the page.
function BeginButton({
  label = 'Start Your Journey Today',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      onClick={goToApp}
      className={`rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-9 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99] ${className}`}
    >
      {label}
    </button>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[255px] sm:w-[292px]">
      <div className="absolute -inset-8 rounded-[3.5rem] bg-amber-300/20 blur-3xl" />
      <div className="relative rounded-[2.8rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-2.5 shadow-[0_32px_70px_rgba(36,22,15,0.34)]">
        <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[2.3rem] bg-[#f7f0df]">
          <div
            className="relative overflow-hidden bg-[#f7f0df]"
            style={{ aspectRatio: '921 / 2048' }}
          >
            <img
              src="/images/landing/app-today-real-screen.jpeg"
              alt="Catholic Journey 365 Today screen"
              className="absolute inset-0 h-full w-full object-contain object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const AUDIENCE_CHIPS = [
  'Exploring Catholicism',
  'Starting OCIA / RCIA',
  'Returning to the Church',
  'Wanting to understand your faith',
  'Building a daily prayer life',
];

const DAILY_STEPS = [
  {
    title: 'Morning Prayer',
    text: 'Begin the day by turning your heart to God.',
  },
  {
    title: 'Scripture Journey',
    text: 'One guided reading on a clear path through the Bible.',
  },
  {
    title: 'Dive Deeper',
    text: 'A short reflection that opens up what you just read.',
  },
  {
    title: 'Faith Formation',
    text: 'Learn one part of Catholic teaching at a time.',
  },
  {
    title: 'Saint of the Day',
    text: 'Meet a saint who walked the faith before you.',
  },
  {
    title: 'Personal Prayer',
    text: 'Quiet space to bring your own life to God.',
  },
  {
    title: 'Evening Prayer',
    text: 'Close the day with gratitude and rest in Him.',
  },
];

const COMPARISON_ROWS: { need: string; others: boolean; ours: boolean }[] = [
  { need: 'Daily prayers and devotions', others: true, ours: true },
  { need: 'Rosary', others: true, ours: true },
  { need: 'Bible access', others: true, ours: true },
  { need: '365 day guided Scripture path', others: false, ours: true },
  { need: 'Daily faith formation', others: false, ours: true },
  { need: 'Mass explained step by step', others: false, ours: true },
  { need: 'Sacraments explained', others: false, ours: true },
  { need: 'Built for beginners and returning Catholics', others: false, ours: true },
  { need: 'Helps you understand why Catholics believe', others: false, ours: true },
  { need: 'Daily Catholic rhythm and checklist', others: false, ours: true },
];

function CheckIcon({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M4 10.5l4 4 8-9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="sr-only">yes</span>
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-stone-500/10 text-stone-400">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
        <path
          d="M5 5l10 10M15 5L5 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">no</span>
    </span>
  );
}

const NAV_LINKS = [
  { label: 'The path', href: '#path' },
  { label: 'Different', href: '#different' },
  { label: 'Trust', href: '#trust' },
  { label: 'Pricing', href: '#pricing' },
];

const FAQ_ITEMS = [
  {
    q: 'Does this replace Church?',
    a: 'No. It is a companion. It does not replace Mass, the Sacraments, your priest, or parish life.',
  },
  {
    q: 'Is this only for Catholics?',
    a: 'No. It is for Catholics, returning Catholics, people exploring Catholicism, and people starting OCIA / RCIA.',
  },
  {
    q: 'What Bible translation is used?',
    a: 'World English Bible Catholic Edition.',
  },
  {
    q: 'Was AI used?',
    a: 'AI tools assisted development and organisation. The foundation is Scripture, Catholic teaching, the Catechism, and Catholic tradition.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f5ead1] text-leather-900">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.92),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(214,157,72,0.2),transparent_28%),linear-gradient(180deg,#fff7e4_0%,#f1dfbd_52%,#ead4ad_100%)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(83,54,31,0.09)_1px,transparent_1px),linear-gradient(rgba(83,54,31,0.08)_1px,transparent_1px)] [background-size:30px_30px]" />

      <nav className="fixed inset-x-0 top-0 z-30 border-b border-white/30 bg-[#fff4dc]/76 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-leather-900 text-amber-200 shadow-sm">
              <CrossMark className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-wide text-leather-900">
              Catholic Journey <span className="text-amber-600">365</span>
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

      {/* 1. Hero */}
      <header id="top" className="relative min-h-[78vh] overflow-hidden md:min-h-[82vh]">
        <img
          src="/images/landing/jesus-welcome.png"
          alt="Christ welcoming people in warm sacred light"
          className="absolute inset-0 h-full w-full object-cover opacity-90 saturate-[0.66]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-leather-950/96 from-4% via-leather-900/72 via-44% to-transparent to-84%" />
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_6%_44%,rgba(18,11,7,0.74),transparent_56%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,190,83,0.16),transparent_36%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5ead1] via-[#f5ead1]/12 to-transparent" />

        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-5 px-5 pb-10 pt-24 sm:px-8 md:min-h-[82vh] md:pb-12 lg:grid-cols-[1.08fr_0.72fr] lg:gap-8 lg:pb-14 lg:pt-24">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-200">
              Catholic Journey 365
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] text-parchment-50 drop-shadow-xl sm:text-6xl md:mt-5 lg:text-7xl">
              You are Catholic. Now understand why.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-parchment-100/90 [text-shadow:0_2px_14px_rgba(20,12,8,0.6)] sm:text-xl md:mt-6 lg:mx-0">
              Catholic Journey 365 is a simple daily path through Scripture,
              prayer, the Mass, and Catholic teaching.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              {AUDIENCE_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-amber-200/40 bg-leather-900/40 px-4 py-2 text-sm font-semibold text-parchment-100 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
              <BeginButton className="w-full sm:w-auto" />
              <p className="text-sm font-semibold text-parchment-100/85 [text-shadow:0_2px_12px_rgba(20,12,8,0.6)]">
                14 days free. Cancel anytime.
              </p>
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="rounded-[2.5rem] border border-amber-200/25 bg-leather-900/28 p-4 shadow-[0_28px_72px_rgba(0,0,0,0.26)] backdrop-blur">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 2. Problem */}
        <section className="relative px-5 pt-9 sm:px-8 md:pt-12">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-100 bg-[#fff8e7]/90 p-6 text-center shadow-[0_20px_54px_rgba(92,64,39,0.12)] backdrop-blur sm:p-8 md:p-10">
            <GoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Faith can feel overwhelming.
            </h2>
            <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">
              <p>
                The Bible is long. The Catechism is deep. The Mass can feel
                unfamiliar. Catholic teaching can feel hard to understand when
                nobody has walked you through it.
              </p>
              <p className="font-display text-2xl font-semibold leading-9 text-leather-900">
                Most people do not need more random information. They need a
                path.
              </p>
            </div>
            <BeginButton label="Start Where You Are" className="mt-6 w-full sm:w-auto" />
          </div>
        </section>

        {/* 3. Daily path */}
        <section id="path" className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                A daily Catholic rhythm.
              </h2>
              <p className="mt-4 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">
                Each day gives you one clear step so you can learn, pray,
                reflect, and keep walking.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
              {DAILY_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-[1.6rem] border border-white/54 bg-white/62 p-5 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-amber-200 bg-leather-900 font-display text-lg font-semibold text-amber-200">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-leather-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base leading-7 text-stone-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <BeginButton label="Begin Day 1" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 4. Transformation */}
        <section className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_16%_0%,rgba(232,184,103,0.22),transparent_32%),linear-gradient(135deg,#20140e_0%,#3a2619_46%,#150d09_100%)] px-6 py-10 shadow-[0_36px_92px_rgba(36,22,15,0.34)] md:px-10 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <CrossMark className="mx-auto text-amber-200" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-parchment-50 md:text-5xl">
                Not just information. Formation.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
              {[
                { day: 'Day 1', text: 'I do not know where to start.' },
                { day: 'Day 90', text: 'I am beginning to understand my faith.' },
                { day: 'Day 365', text: 'I am building a daily Catholic life.' },
              ].map((stage) => (
                <div
                  key={stage.day}
                  className="rounded-[1.8rem] border border-amber-200/24 bg-leather-900/40 p-6 text-center backdrop-blur"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                    {stage.day}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold leading-tight text-parchment-50">
                    {stage.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <BeginButton label="Start Today" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 5. Difference */}
        <section id="different" className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                What makes Catholic Journey 365 different?
              </h2>
            </div>

            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/54 bg-white/62 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur md:mt-10">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-amber-200/50 bg-[#fff8e7]/70">
                    <th className="px-4 py-4 text-sm font-bold text-leather-900 sm:px-6 md:text-base">
                      What you need
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-stone-500 sm:px-4 md:text-sm">
                      Other Catholic Apps
                    </th>
                    <th className="px-2 py-4 text-center text-xs font-bold text-amber-700 sm:px-4 md:text-sm">
                      Catholic Journey 365
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.need}
                      className={i % 2 === 1 ? 'bg-white/30' : ''}
                    >
                      <td className="px-4 py-3.5 text-sm font-semibold leading-6 text-leather-900/90 sm:px-6 md:text-base">
                        {row.need}
                      </td>
                      <td className="px-2 py-3.5 text-center sm:px-4">
                        <div className="flex justify-center">
                          <CheckIcon on={row.others} />
                        </div>
                      </td>
                      <td className="px-2 py-3.5 text-center sm:px-4">
                        <div className="flex justify-center">
                          <CheckIcon on={row.ours} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-leather-900/82 md:mt-8 md:text-xl md:leading-9">
              Other Catholic apps are great tools. Catholic Journey 365 is
              different. It gives you a path to understand the faith and live it
              one day at a time.
            </p>

            <div className="mt-6 flex justify-center md:mt-8">
              <BeginButton label="Start Your Journey" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 6. Trust */}
        <section id="trust" className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-7">
            <div className="rounded-[2rem] border border-white/54 bg-white/62 p-6 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-8">
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Rooted in the Catholic faith.
              </h2>
              <ul className="mt-5 space-y-3 md:mt-6">
                {[
                  'Built around Sacred Scripture',
                  'Uses Catholic teaching and the Catechism',
                  'Encourages parish life and the Sacraments',
                  'Supports OCIA / RCIA but does not replace it',
                  'Does not replace your priest, parish, or the Church',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex-none">
                      <CheckIcon on />
                    </span>
                    <span className="text-lg leading-8 text-leather-900/86 md:text-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <BeginButton label="Begin Today" className="mt-6 w-full sm:w-auto" />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/50 shadow-[0_28px_72px_rgba(58,38,25,0.18)] min-h-[320px] md:min-h-[440px]">
              <img
                src="/images/landing/first-communion.png"
                alt="A child receiving First Holy Communion in a Catholic church"
                className="absolute inset-0 h-full w-full object-cover saturate-[0.82]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-leather-950/74 via-leather-900/36 to-amber-950/34" />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f5ead1] via-[#f5ead1]/42 to-transparent" />
            </div>
          </div>
        </section>

        {/* 7. Founder story (moved lower, shortened) */}
        <section id="story" className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_16%_0%,rgba(232,184,103,0.22),transparent_32%),linear-gradient(135deg,#20140e_0%,#3a2619_46%,#150d09_100%)] p-3 shadow-[0_36px_92px_rgba(36,22,15,0.34)] sm:p-5">
            <div className="grid gap-5 md:grid-cols-[0.38fr_0.62fr] md:items-stretch">
              <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-amber-200/24">
                <img
                  src="/images/landing/founder-journey.png"
                  alt="A man praying beside Scripture, a candle, and a rosary"
                  className="absolute inset-0 h-full w-full object-cover saturate-[0.78]"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-leather-950/82 via-leather-900/54 to-amber-950/28" />
                <div className="relative flex h-full min-h-72 flex-col justify-between gap-8 p-6 sm:p-7 md:gap-12 md:p-8">
                  <CrossMark className="text-amber-200" />
                  <p className="font-display text-2xl font-semibold leading-tight text-parchment-50 sm:text-3xl">
                    I am building this as someone still on the journey.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-amber-100 bg-[#fff8e7] p-6 shadow-[0_24px_62px_rgba(21,13,9,0.2)] sm:p-8 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Founder note
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-5xl">
                  Built because I needed it too.
                </h2>
                <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/86 md:mt-6 md:text-xl md:leading-9">
                  <p>
                    I built Catholic Journey 365 because I was Catholic, but I
                    still struggled with prayer, Scripture, understanding the
                    Mass, and living my faith each day.
                  </p>
                  <p>
                    I am not building this as someone who has arrived. I am
                    building it as someone still on the journey.
                  </p>
                </div>
                <BeginButton label="Walk the Journey" className="mt-6 w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* 8. Pricing */}
        <section id="pricing" className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-6 text-center shadow-[0_28px_72px_rgba(92,64,39,0.14)] sm:p-8 md:p-10">
            <GoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Try the full journey.
            </h2>
            <p className="mt-4 text-lg leading-8 text-leather-900/86 md:mt-5 md:text-xl md:leading-9">
              Start free for 14 days. If it helps, continue for $5.99 monthly or
              $49.99 yearly. Cancel anytime.
            </p>
            <BeginButton className="mt-6 w-full sm:w-auto" />
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="relative px-5 py-9 sm:px-8 md:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Questions before you begin.
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.q}
                  className="rounded-[1.6rem] border border-white/54 bg-white/62 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur"
                >
                  <h3 className="font-display text-2xl font-semibold text-leather-900">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="px-5 pb-12 pt-4 sm:px-8 md:pb-20 md:pt-6">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] border border-white/50 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_35%),linear-gradient(135deg,rgba(255,247,227,0.94),rgba(230,199,145,0.78))] px-6 py-10 text-center shadow-[0_34px_86px_rgba(92,64,39,0.16)] md:py-16">
            <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-6xl">
                Your faith journey does not have to wait.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-leather-900/86 md:mt-6 md:text-xl md:leading-9">
                Not perfectly. Not all at once. One prayer. One reading. One step
                closer to God.
              </p>
              <BeginButton className="mt-6 w-full sm:w-auto md:mt-8" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-100/70 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-leather-900/70 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="font-display text-lg font-semibold text-leather-900">
            Catholic Journey 365
          </a>
          <div className="flex flex-wrap gap-4">
            <a className="font-semibold transition hover:text-leather-900" href="/privacy">
              Privacy
            </a>
            <a className="font-semibold transition hover:text-leather-900" href="/terms">
              Terms
            </a>
            <a className="font-semibold transition hover:text-leather-900" href="/support">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
