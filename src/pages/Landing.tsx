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
      className={`relative overflow-hidden rounded-[2rem] border border-amber-100/50 shadow-[0_28px_72px_rgba(58,38,25,0.18)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover saturate-[0.82]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-leather-950/74 via-leather-900/36 to-amber-950/34" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_12%,rgba(255,248,230,0.2),transparent_34%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f5ead1] via-[#f5ead1]/42 to-transparent" />
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
    <section id={id} className="relative px-5 py-7 sm:px-8 md:py-14">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-5 lg:grid-cols-2 lg:gap-7 ${
          reverse ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div className="rounded-[2rem] border border-white/54 bg-white/58 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7 md:p-8">
          <GoldRule />
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">{text}</p>
        </div>

        <ImagePanel src={src} alt={alt} className="min-h-[300px] md:min-h-[430px]" />
      </div>
    </section>
  );
}

const NAV_LINKS = [
  { label: 'Journey', href: '#journey' },
  { label: 'Scripture', href: '#scripture' },
  { label: 'Why', href: '#story' },
  { label: 'Trust', href: '#trust' },
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

      <header id="top" className="relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
        <img
          src="/images/landing/jesus-welcome.png"
          alt="Christ welcoming people in warm sacred light"
          className="absolute inset-0 h-full w-full object-cover opacity-90 saturate-[0.66]"
        />
        {/* Warm candlelight gradient: dark leather on the left softening to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-leather-950/96 from-4% via-leather-900/72 via-44% to-transparent to-84%" />
        {/* Soft left-side vignette so the text rests in shadow, not on a hard banner */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_6%_44%,rgba(18,11,7,0.74),transparent_56%)]" />
        {/* Gentle gold candle glow near Christ */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,190,83,0.16),transparent_36%)]" />
        {/* Blend the base of the image into the parchment background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5ead1] via-[#f5ead1]/12 to-transparent" />

        <div className="relative mx-auto grid min-h-[72vh] max-w-7xl items-center gap-5 px-5 pb-10 pt-24 sm:px-8 md:min-h-[78vh] md:pb-12 lg:grid-cols-[1.08fr_0.72fr] lg:gap-8 lg:pb-14 lg:pt-24">
          <div className="max-w-3xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-200">
              Catholic Journey 365
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] text-parchment-50 drop-shadow-xl sm:text-6xl md:mt-5 lg:text-7xl">
              Begin the journey home.
            </h1>

            <div className="mx-auto mt-5 max-w-2xl space-y-3 text-lg leading-8 text-parchment-100/90 [text-shadow:0_2px_14px_rgba(20,12,8,0.6)] sm:text-xl md:mt-6 md:space-y-4 lg:mx-0">
              <p className="font-display text-2xl font-semibold leading-9 text-white">
                Start where you are. Walk deeper into the Catholic faith.
              </p>
              <p>
                For Catholics, returning Catholics, and anyone trying to
                understand the beauty, history and heart of the Catholic
                Church, one step at a time.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:mt-8 md:gap-4 lg:justify-start">
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
            <div className="rounded-[2.5rem] border border-amber-200/25 bg-leather-900/28 p-4 shadow-[0_28px_72px_rgba(0,0,0,0.26)] backdrop-blur">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative px-5 pt-7 sm:px-8 md:pt-10">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-100 bg-[#fff8e7]/90 p-5 shadow-[0_20px_54px_rgba(92,64,39,0.12)] backdrop-blur sm:p-7 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-leather-900 text-amber-200 shadow-sm">
                <CrossMark className="h-4 w-4" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                Why I built this
              </p>
            </div>
            <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/86 md:text-xl md:leading-9">
              <p>I built Catholic Journey 365 because I need it too.</p>
              <p>
                I am Catholic, but I still struggle with consistency, prayer,
                understanding the Mass and living my faith every day.
              </p>
              <p>
                I am not building this as someone who has arrived. I am building
                it as someone still on the journey.
              </p>
            </div>
            <GoldRule className="mt-5" />
            <p className="mt-5 font-display text-xl font-semibold leading-8 text-leather-900 md:text-2xl">
              Catholic Journey 365 is here to walk with you, not replace your
              parish, priest, RCIA, or the Sacraments.
            </p>
          </div>
        </section>

        <section id="journey" className="relative px-5 py-8 sm:px-8 md:py-14 lg:py-16">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f5ead1] to-transparent" />
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-8">
            <div className="relative">
              <GoldRule />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                A place to begin, return, and keep walking.
              </h2>
              <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/82 md:mt-6 md:space-y-4 md:text-xl md:leading-9">
                <p>
                  Catholic Journey 365 is for people who are Catholic, returning
                  to the faith, new to Catholicism, or trying to understand the
                  Church but do not know where to start.
                </p>
                <p>
                  It is here to help you take the next step: learn, pray,
                  understand, and find your way deeper into the Church.
                </p>
                <p className="font-display text-3xl font-semibold text-leather-900">
                  You can begin from here.
                </p>
              </div>
            </div>

            <ImagePanel
              src="/images/landing/pilgrimage-path.png"
              alt="A pilgrim walking toward a Catholic church at sunset"
              className="min-h-[320px] md:min-h-[470px]"
            >
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="max-w-md rounded-[1.6rem] border border-white/28 bg-leather-900/70 p-5 text-parchment-50 shadow-2xl backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                    One step at a time
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold leading-tight">
                    Read, pray, learn, return, and keep walking toward Christ.
                  </p>
                </div>
              </div>
            </ImagePanel>
          </div>
        </section>

        <JourneyImageSection
          id="scripture"
          title="Bible Journey"
          text="Find your place again when life interrupts the routine. Walk through Scripture in a steady way, using the World English Bible Catholic Edition and the Catholic canon."
          src="/images/landing/bible-morning.png"
          alt="Morning light over an open Bible and rosary"
        />

        <JourneyImageSection
          id="prayer"
          title="Prayer Journey"
          text="Learn how to pray when you do not know where to start. Begin with simple daily prayer and keep returning to the Father, Son and Holy Spirit."
          src="/images/landing/prayer-church.png"
          alt="A couple praying inside a Catholic church"
          reverse
        />

        <JourneyImageSection
          id="faith"
          title="Mass, Saints, and Catholic basics"
          text="Understand what is happening at Mass, meet the men and women who followed Christ before us, and explore the questions many people are afraid to ask."
          src="/images/landing/first-communion.png"
          alt="A child receiving First Holy Communion in a Catholic church"
        />

        <section id="trust" className="relative px-5 py-8 sm:px-8 md:py-14">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-7">
            <div className="rounded-[2rem] border border-white/54 bg-white/62 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7 md:p-8">
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                A companion, not a replacement for the Church.
              </h2>
              <p className="mt-4 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">
                Catholic Journey 365 is not here to replace your parish, your
                priest, RCIA, or the Sacraments.
              </p>
              <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                For the Sacraments, RCIA, confession, spiritual guidance, or
                personal questions, speak with your local priest or parish.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-5 shadow-[0_28px_72px_rgba(92,64,39,0.14)] sm:p-7">
              <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(83,54,31,0.08)_1px,transparent_1px),linear-gradient(rgba(83,54,31,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="relative grid gap-5 md:grid-cols-[0.72fr_0.28fr] md:items-center md:gap-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                    Daily help
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-4xl">
                    Small steps for ordinary days.
                  </h3>
                  <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                    Built with reference to Scripture, the Catechism, the
                    Saints, and Catholic tradition, it helps you keep the next
                    faithful step in front of you.
                  </p>
                </div>
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="relative px-5 py-8 sm:px-8 md:py-14">
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

              <div className="rounded-[2rem] border border-amber-100 bg-[#fff8e7] p-5 shadow-[0_24px_62px_rgba(21,13,9,0.2)] sm:p-7 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Founder note
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-5xl">
                  Why I built this
                </h2>
                <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/86 md:mt-6 md:space-y-4 md:text-xl md:leading-9">
                  <p>
                    I built Catholic Journey 365 because I need it too. I am
                    Catholic, but I still struggle with consistency, prayer,
                    understanding the Mass, Scripture, and living the faith each
                    day.
                  </p>
                  <p>
                    I am not building this as someone who has arrived. I am
                    building it as someone still on the journey.
                  </p>
                  <p>
                    As a husband and father, I want to lead my family closer to
                    God, but I am still learning how to do that myself.
                  </p>
                </div>
                <GoldRule className="mt-5 md:mt-7" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-8 sm:px-8 md:py-12">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/54 bg-white/62 p-5 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-7 md:p-9">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Try the full journey. If it helps, continue.
              </h2>
              <p className="mt-4 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">
                Catholic Journey 365 is $5.99 monthly or $49.99 yearly.
              </p>
            </div>
          </div>
        </section>

        <section className="relative px-5 py-8 sm:px-8 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Questions before you begin.
              </h2>
            </div>

            <div className="mt-5 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
              <div className="rounded-[1.6rem] border border-white/54 bg-white/62 p-5 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-6">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  Does this replace Church?
                </h3>
                <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                  No. Catholic Journey 365 is a companion app. It does not
                  replace Mass, the Sacraments, priests, or parish community.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-white/54 bg-white/62 p-5 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-6">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  What Bible translation?
                </h3>
                <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                  Catholic Journey 365 uses the World English Bible Catholic
                  Edition and follows the Catholic canon of Scripture.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-white/54 bg-white/62 p-5 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-6">
                <h3 className="font-display text-2xl font-semibold text-leather-900">
                  Was AI used?
                </h3>
                <p className="mt-3 text-base leading-7 text-stone-600 md:mt-4 md:text-lg md:leading-8">
                  AI tools assisted development and organisation. The foundation
                  is Scripture, Catholic teaching, and tradition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 pt-4 sm:px-8 md:pb-20 md:pt-6">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] border border-white/50 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.95),transparent_35%),linear-gradient(135deg,rgba(255,247,227,0.94),rgba(230,199,145,0.78))] px-6 py-10 text-center shadow-[0_34px_86px_rgba(92,64,39,0.16)] md:py-16">
            <div className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-6xl">
                Take the next step today.
              </h2>
              <div className="mx-auto mt-4 max-w-xl space-y-2 text-lg leading-8 text-leather-900/86 md:mt-6 md:space-y-3 md:text-xl md:leading-9">
                <p>Not perfectly.</p>
                <p>Not all at once.</p>
              </div>
              <div className="mx-auto mt-4 max-w-xl space-y-2 font-display text-2xl leading-9 text-leather-900 md:mt-6 md:space-y-3">
                <p>One day.</p>
                <p>One prayer.</p>
                <p>One step closer to God.</p>
              </div>
              <button
                onClick={goToApp}
                className="mt-6 w-full rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-10 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99] sm:w-auto md:mt-8"
              >
                Begin Your Journey
              </button>
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
