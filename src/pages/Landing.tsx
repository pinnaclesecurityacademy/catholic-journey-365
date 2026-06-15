// Public marketing landing page (route: "/"). The authenticated app lives at
// "/app". This page is intentionally outside the app's BrowserRouter so it can
// be shown to visitors while the authenticated experience stays under /app.

function goToApp() {
  window.location.href = '/app';
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

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[235px] sm:w-[265px]">
      <div className="absolute -inset-8 rounded-[3.5rem] bg-amber-300/20 blur-3xl" />
      <div className="relative rounded-[2.8rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-2.5 shadow-[0_32px_70px_rgba(36,22,15,0.34)]">
        <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[2.3rem] bg-[#f7f0df]">
          <div className="relative min-h-[470px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9),transparent_35%),linear-gradient(180deg,#fff9eb_0%,#f1dfbd_100%)]" />
            <div className="relative px-4 pb-5 pt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700">
                Today
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-leather-900">
                Day 142
              </h3>

              <div className="mt-5 rounded-[1.4rem] border border-white/70 bg-white/78 p-4 shadow-[0_16px_34px_rgba(92,64,39,0.12)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">
                  Scripture
                </p>
                <p className="mt-2 font-display text-base leading-relaxed text-leather-900">
                  Your word is a lamp to my feet and a light to my path.
                </p>
                <p className="mt-3 text-xs font-semibold text-stone-500">
                  Psalm 119:105
                </p>
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-amber-100 bg-leather-900 p-4 shadow-[0_18px_38px_rgba(34,24,17,0.24)]">
                <p className="text-sm font-semibold text-parchment-50">
                  Prayer for Today
                </p>
                <p className="mt-2 text-sm leading-relaxed text-parchment-100/84">
                  Lord, guide my next step and keep my heart close to you.
                </p>
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-white/70 bg-white/78 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-leather-900">
                    Journey Progress
                  </p>
                  <p className="text-xs text-amber-700">142 of 365</p>
                </div>
                <div className="mt-4 h-2 rounded-full bg-amber-100">
                  <div className="h-2 w-[39%] rounded-full bg-gradient-to-r from-amber-300 to-amber-600" />
                </div>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-amber-100/80 bg-[#fff8e7]/90 px-3 pb-4 pt-3 backdrop-blur">
              <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-semibold">
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

function ImagePanel({
  src,
  alt,
  className = '',
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.5rem] border border-amber-100/50 shadow-[0_34px_90px_rgba(58,38,25,0.2)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-leather-900/58 via-leather-800/22 to-amber-900/26" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_12%,rgba(255,255,255,0.28),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f5ead1] via-[#f5ead1]/48 to-transparent" />
      {children}
    </div>
  );
}

function JourneyImageSection({
  id,
  title,
  text,
  src,
  alt,
  reverse,
}: {
  id: string;
  title: string;
  text: string;
  src: string;
  alt: string;
  reverse?: boolean;
}) {
  return (
    <section id={id} className="relative px-5 py-9 sm:px-8 md:py-20">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-2 lg:gap-8 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="rounded-[2.5rem] border border-white/54 bg-white/52 p-5 shadow-[0_24px_70px_rgba(92,64,39,0.11)] backdrop-blur sm:p-8 md:p-10">
          <GoldRule />
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-7 md:text-6xl">
            {title}
          </h2>
          <p className="mt-4 text-xl leading-9 text-leather-900/82 md:mt-6">{text}</p>
        </div>

        <ImagePanel src={src} alt={alt} className="min-h-[380px] md:min-h-[500px]" />
      </div>
    </section>
  );
}

const NAV_LINKS = [
  { label: 'Journey', href: '#journey' },
  { label: 'Scripture', href: '#scripture' },
  { label: 'Prayer', href: '#prayer' },
  { label: 'Story', href: '#story' },
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

      <header id="top" className="relative min-h-screen overflow-hidden">
        <img
          src="/images/landing/jesus-welcome.png"
          alt="Jesus welcoming people in a field of warm light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-leather-900/90 via-leather-900/45 via-40% to-transparent to-70%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5ead1] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(245,190,83,0.24),transparent_34%)]" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-6 px-5 pb-14 pt-24 sm:px-8 md:pb-20 lg:grid-cols-[1.08fr_0.72fr] lg:gap-10 lg:pb-24 lg:pt-28">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-200">
              Daily faith. Daily growth. Every day.
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] text-parchment-50 drop-shadow-xl sm:text-6xl md:mt-6 lg:text-7xl">
              God is calling you closer.
            </h1>

            <div className="mx-auto mt-5 max-w-2xl space-y-3 text-lg leading-8 text-parchment-100/90 [text-shadow:0_2px_14px_rgba(20,12,8,0.6)] sm:text-xl md:mt-8 md:space-y-5 lg:mx-0">
              <p className="font-display text-2xl font-semibold leading-9 text-white">
                Begin your Catholic journey one day, one prayer, and one step at
                a time.
              </p>
              <p>
                You do not need to know everything. You do not need to have all
                the answers. Begin where you are.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:mt-9 md:gap-4 lg:justify-start">
              <button
                onClick={goToApp}
                className="w-full rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-9 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(0,0,0,0.28)] transition active:scale-[0.99] sm:w-auto"
              >
                Begin Your Journey
              </button>
              <GoldRule className="hidden sm:block" />
            </div>
          </div>

          <div className="hidden justify-end lg:flex">
            <div className="rounded-[3rem] border border-amber-200/25 bg-leather-900/24 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="journey" className="relative px-5 py-10 sm:px-8 md:py-20 lg:py-28">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f5ead1] to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
            <div className="relative">
              <GoldRule />
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-8 md:text-6xl">
                Faith has always been a journey.
              </h2>
              <div className="mt-5 space-y-3 text-xl leading-9 text-leather-900/82 md:mt-8 md:space-y-5">
                <p>Abraham followed God into the unknown.</p>
                <p>The prophets called people back to Him.</p>
                <p>The Saints kept walking toward Christ.</p>
                <p className="font-display text-3xl font-semibold text-leather-900">
                  Now it is your turn.
                </p>
              </div>
            </div>

            <ImagePanel
              src="/images/landing/pilgrimage-path.png"
              alt="A pilgrim walking toward a Catholic church at sunset"
              className="min-h-[430px] md:min-h-[560px]"
            >
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">
                <div className="max-w-md rounded-[2rem] border border-white/28 bg-leather-900/62 p-6 text-parchment-50 shadow-2xl backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                    Salvation History
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold leading-tight">
                    Follow the story that leads to Christ.
                  </p>
                </div>
              </div>
            </ImagePanel>
          </div>
        </section>

        <JourneyImageSection
          id="scripture"
          title="Begin with Scripture."
          text="Follow salvation history through God's Word using the World English Bible Catholic Edition and the Catholic canon of Scripture."
          src="/images/landing/bible-morning.png"
          alt="Morning light over an open Bible and rosary"
        />

        <JourneyImageSection
          id="prayer"
          title="Build a life of prayer."
          text="Build prayer habits and enter your personal conversation with God through the Father, Son and Holy Spirit."
          src="/images/landing/prayer-church.png"
          alt="A couple praying inside a Catholic church"
          reverse
        />

        <JourneyImageSection
          id="faith"
          title="Discover the Catholic faith."
          text="Learn through the Saints, prayers of the Church, Catholic tradition, and a life centred on Christ."
          src="/images/landing/first-communion.png"
          alt="A child receiving First Holy Communion in a Catholic church"
        />

        <section className="relative px-5 py-10 sm:px-8 md:py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-8">
            <div className="rounded-[2.5rem] border border-white/54 bg-white/58 p-6 shadow-[0_24px_70px_rgba(92,64,39,0.11)] backdrop-blur sm:p-8 md:p-10">
              <GoldRule />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-7 md:text-6xl">
                Walk with others.
              </h2>
              <p className="mt-4 text-xl leading-9 text-leather-900/82 md:mt-6">
                Invite your family to continue the journey together.
              </p>
              <p className="mt-3 text-lg leading-8 text-stone-600 md:mt-5">
                Catholic Journey 365 keeps the app quietly beside the deeper
                invitation: read, pray, learn, and keep walking toward God. It
                is a companion app, not a replacement for Mass, the Sacraments,
                priests, or parish community.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.8rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-6 shadow-[0_34px_90px_rgba(92,64,39,0.16)] sm:p-8">
              <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(83,54,31,0.08)_1px,transparent_1px),linear-gradient(rgba(83,54,31,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative grid gap-5 md:grid-cols-[0.72fr_0.28fr] md:items-center md:gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                    Companion
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900">
                    A gentle guide for each day.
                  </h3>
                  <p className="mt-3 text-lg leading-8 text-stone-600 md:mt-5">
                    Built with reference to Scripture, the Catechism, the
                    Saints, and Catholic tradition, it helps organise the next
                    faithful step.
                  </p>
                </div>
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="relative px-5 py-10 sm:px-8 md:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[radial-gradient(circle_at_16%_0%,rgba(232,184,103,0.26),transparent_32%),linear-gradient(135deg,#20140e_0%,#3a2619_46%,#150d09_100%)] p-4 shadow-[0_44px_110px_rgba(36,22,15,0.38)] sm:p-6">
            <div className="grid gap-5 md:grid-cols-[0.38fr_0.62fr] md:items-stretch">
              <div className="relative min-h-80 overflow-hidden rounded-[2.4rem] border border-amber-200/24">
                <img
                  src="/images/landing/founder-journey.png"
                  alt="A man praying beside Scripture, a candle, and a rosary"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-leather-900/74 via-leather-900/46 to-amber-900/20" />
                <div className="relative flex h-full min-h-80 flex-col justify-between gap-8 p-6 sm:p-8 md:gap-16 md:p-10">
                  <CrossMark className="text-amber-200" />
                  <p className="font-display text-3xl font-semibold leading-tight text-parchment-50 sm:text-4xl">
                    I built the companion I needed.
                  </p>
                </div>
              </div>

              <div className="rounded-[2.4rem] border border-amber-100 bg-[#fff8e7] p-6 shadow-[0_28px_70px_rgba(21,13,9,0.22)] sm:p-8 md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Founder Story
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:text-5xl">
                  I built Catholic Journey 365 for myself.
                </h2>
                <div className="mt-5 space-y-4 text-xl leading-9 text-leather-900/86 md:mt-8 md:space-y-6 md:text-2xl md:leading-10">
                  <p>
                    I felt God calling me closer, but I did not know where to
                    begin.
                  </p>
                  <p>So I built the companion I needed.</p>
                  <p>God calls each of us.</p>
                  <p className="font-display text-3xl font-semibold leading-tight text-leather-900">
                    Maybe this is the beginning of your journey too.
                  </p>
                </div>
                <GoldRule className="mt-6 md:mt-9" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-10 sm:px-8 md:py-16 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/54 bg-white/58 p-6 shadow-[0_24px_70px_rgba(92,64,39,0.11)] backdrop-blur sm:p-8 md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-7 md:text-6xl">
                Start free. Keep walking for life.
              </h2>
              <p className="mt-4 text-xl leading-9 text-leather-900/82 md:mt-6">
                Begin with a 14 day free trial. Unlock Catholic Journey 365 for
                life with a one time $19.99 lifetime unlock. No monthly
                subscription.
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-10 sm:px-8 md:py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <GoldRule />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-7 md:text-6xl">
                Questions before you begin.
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
              <div className="rounded-[2rem] border border-white/54 bg-white/58 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  Does this replace Church?
                </h3>
                <p className="mt-3 text-lg leading-8 text-stone-600 md:mt-4">
                  No. Catholic Journey 365 is a companion app. It does not
                  replace Mass, the Sacraments, priests, or parish community.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/54 bg-white/58 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  What Bible translation?
                </h3>
                <p className="mt-3 text-lg leading-8 text-stone-600 md:mt-4">
                  Catholic Journey 365 uses the World English Bible Catholic
                  Edition and follows the Catholic canon of Scripture.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/54 bg-white/58 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  Was AI used?
                </h3>
                <p className="mt-3 text-lg leading-8 text-stone-600 md:mt-4">
                  AI tools assisted development and organisation. The foundation
                  is Scripture, Catholic teaching, and tradition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-4 sm:px-8 md:pb-28 md:pt-8">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-white/50 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_35%),linear-gradient(135deg,rgba(255,247,227,0.94),rgba(230,199,145,0.78))] px-6 py-12 text-center shadow-[0_40px_100px_rgba(92,64,39,0.18)] md:py-28">
            <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <GoldRule className="mx-auto" />
              <h2 className="mt-5 font-display text-5xl font-semibold leading-tight text-leather-900 md:mt-8 md:text-7xl">
                Your journey starts today.
              </h2>
              <div className="mx-auto mt-5 max-w-xl space-y-2 text-xl leading-9 text-leather-900/86 md:mt-8 md:space-y-3">
                <p>Not perfectly.</p>
                <p>Not all at once.</p>
              </div>
              <div className="mx-auto mt-5 max-w-xl space-y-2 font-display text-2xl leading-9 text-leather-900 md:mt-8 md:space-y-3">
                <p>One day.</p>
                <p>One prayer.</p>
                <p>One step closer to God.</p>
              </div>
              <button
                onClick={goToApp}
                className="mt-7 w-full rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-10 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99] sm:w-auto md:mt-10"
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
