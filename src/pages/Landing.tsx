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

// Shared primary call to action. Large, thumb friendly, and consistent so a
// visitor can begin from wherever they are on the page.
function BeginButton({
  label = 'Start Your 14 Day Journey',
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

// A single phone frame. `screenshot` images are letterboxed (object-contain);
// in-app artwork is filled (object-cover) so the supporting phones read as
// real app screens.
function PhoneFrame({
  src,
  alt,
  screenshot = false,
  className = '',
}: {
  src: string;
  alt: string;
  screenshot?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.2rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-1.5 shadow-[0_30px_70px_rgba(20,12,8,0.5)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.8rem] bg-[#f7f0df]">
        <div className="relative" style={{ aspectRatio: '921 / 2048' }}>
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full object-center ${
              screenshot ? 'object-contain' : 'object-cover'
            }`}
          />
        </div>
        <div className="absolute left-1/2 top-2 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}

// Overlapping, fanned phone stack for the hero. Today screenshot in front,
// supporting app screens fanned behind for premium SaaS depth.
function HeroPhoneStack() {
  return (
    <div className="relative mx-auto h-[420px] w-[300px] sm:h-[500px] sm:w-[420px]">
      <div className="absolute -inset-10 rounded-[4rem] bg-amber-300/20 blur-3xl" />
      <PhoneFrame
        src="/images/faith/rosary-devotions.webp"
        alt="Rosary and devotions in the app"
        className="absolute left-1/2 top-0 z-0 w-[150px] -translate-x-1/2 -rotate-2 opacity-90 sm:w-[200px]"
      />
      <PhoneFrame
        src="/images/journey/creation.webp"
        alt="Scripture Journey in the app"
        className="absolute left-0 top-12 z-10 w-[160px] -rotate-[11deg] sm:w-[215px]"
      />
      <PhoneFrame
        src="/images/faith/mass.webp"
        alt="Mass Guide in the app"
        className="absolute right-0 top-12 z-10 w-[160px] rotate-[11deg] sm:w-[215px]"
      />
      <PhoneFrame
        src="/images/landing/app-today-real-screen.jpeg"
        alt="Catholic Journey 365 Today screen"
        screenshot
        className="absolute left-1/2 top-8 z-20 w-[185px] -translate-x-1/2 sm:w-[250px]"
      />
    </div>
  );
}

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
        <span className="sr-only">included</span>
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
      <span className="sr-only">not included</span>
    </span>
  );
}

const NAV_LINKS = [
  { label: 'The path', href: '#path' },
  { label: 'Features', href: '#features' },
  { label: 'Questions', href: '/questions' },
  { label: 'Different', href: '#different' },
  { label: 'Pricing', href: '#pricing' },
];

const QUESTION_CARDS = [
  {
    q: 'Why do Catholics honour Mary?',
    a: 'Catholics do not worship Mary. Catholics honour her as the mother of Jesus and see her as someone who always points us closer to Him.',
    footer: 'Continue the journey inside Catholic Journey 365.',
  },
  {
    q: 'Why do Catholics ask saints to pray?',
    a: "Catholics believe the family of God includes those in Heaven. Asking saints for prayer is asking members of Christ's family to pray with us.",
    footer: 'Discover the deeper meaning step by step.',
  },
  {
    q: 'Why confess sins to a priest?',
    a: 'Catholics believe Jesus gave the Church the ministry of reconciliation, where God offers forgiveness and healing through Confession.',
    footer: 'Learn the biblical roots inside the journey.',
  },
  {
    q: 'Why is the Mass different?',
    a: 'Catholics believe the Mass is more than a service. It is worship centred on Christ, Scripture, and the Eucharist.',
    footer: 'Understand each part of the Mass in Catholic Journey 365.',
  },
  {
    q: 'Where did the Bible come from?',
    a: 'The Bible did not appear as one complete book. The early Church preserved, prayed with, and recognised the books of Sacred Scripture.',
    footer: 'Explore Scripture and salvation history through the journey.',
  },
];

const PAIN_CARDS = [
  { title: 'The Bible', text: 'Where do I even start?' },
  { title: 'The Mass', text: 'Why do we do this?' },
  { title: 'Prayer', text: 'Am I doing this right?' },
  { title: 'Catholic teaching', text: 'Why do Catholics believe that?' },
];

const DAILY_STEPS = [
  'Morning Prayer',
  'Scripture Journey',
  'Dive Deeper',
  'Faith Formation',
  'Saint of the Day',
  'Reflection',
  'Evening Prayer',
];

const FEATURE_TILES = [
  {
    title: 'Bible Journey',
    text: 'Follow salvation history one day at a time.',
    img: '/images/journey/creation.webp',
  },
  {
    title: 'Dive Deeper',
    text: 'Understand what you read.',
    img: '/images/journey/christ-connections.webp',
  },
  {
    title: 'Faith Formation',
    text: 'Learn Catholic teaching in simple language.',
    img: '/images/faith/begin-here.webp',
  },
  {
    title: 'Mass Guide',
    text: 'Understand every part of the Mass.',
    img: '/images/faith/mass.webp',
  },
  {
    title: 'Sacraments',
    text: 'Learn the gifts Christ gave His Church.',
    img: '/images/faith/sacraments.webp',
  },
  {
    title: 'Prayer Library',
    text: 'Build a real prayer life.',
    img: '/images/faith/prayer.webp',
  },
  {
    title: 'Saints',
    text: 'Walk with those who followed Christ before us.',
    img: '/images/faith/saints.webp',
  },
  {
    title: 'Rosary',
    text: 'Pray with structure, mystery, and meaning.',
    img: '/images/faith/rosary-devotions.webp',
  },
];

const OTHER_APP_FEATURES = ['Prayers', 'Bible', 'Devotions', 'Content library'];

const OUR_FEATURES = [
  'Daily formation path',
  'Scripture explained',
  'Mass explained',
  'Sacraments explained',
  'Catholic questions answered',
  'Beginner friendly progression',
  'Daily habit building',
];

const PROGRESSION = [
  { day: 'Day 1', text: 'Begin with one prayer, one reading, one step.' },
  { day: 'Day 90', text: 'Understand more of Scripture, Mass, and Catholic teaching.' },
  { day: 'Day 365', text: 'Build a daily Catholic life with confidence.' },
];

const TESTIMONIALS = [
  {
    name: 'Sally',
    journey: 'Exploring Catholicism',
    quote:
      'My husband is Catholic, but I did not grow up in the Catholic Church. I had so many questions about the Mass, traditions, and why Catholics believe what they believe. Catholic Journey 365 helped me understand the faith step by step. It answered questions I was afraid to ask and helped me feel more comfortable walking into a Catholic church. Now I have started OCIA and continue learning more every day.',
  },
  {
    name: 'Chris',
    journey: 'Returning Catholic',
    quote:
      'I was baptised Catholic as a child, but I spent most of my life away from the Church. When I started my own family, I felt called to come closer to God, but going back to Mass felt intimidating. I did not know when to sit, stand, kneel, or why Catholics did certain things. Catholic Journey 365 helped me understand the Mass, follow along, and discover the meaning behind what was happening. For the first time, I felt like I could truly participate.',
  },
  {
    name: 'Michael',
    journey: 'Lifelong Catholic',
    quote:
      'I have always gone to Mass because that is what my family did. It was part of my life, but I never really understood the meaning behind everything we believed and practised. Catholic Journey 365 helped me go deeper. It explained the reasons behind the faith, the Mass, Scripture, and Catholic traditions in a way I could finally understand. For the first time, I am not just going through the motions. I understand why I am Catholic.',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-1" aria-label="Five out of five">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-4 w-4 text-amber-500"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.47 5.18 5.7.62-4.25 3.86 1.16 5.62L10 13.9l-5.08 2.9 1.16-5.62L1.83 7.3l5.7-.62L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

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
    q: 'Is this useful for OCIA / RCIA?',
    a: 'Yes. It supports your formation and helps you understand the faith, but it does not replace your parish programme.',
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
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
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

      {/* 1. Hero - app focused, premium SaaS */}
      <header
        id="top"
        className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(58,38,25,0.16),transparent_42%),linear-gradient(180deg,#fff7e4_0%,#f4e3bf_100%)]"
      >
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_72%_38%,rgba(214,157,72,0.28),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-14 pt-28 sm:px-8 md:pb-16 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20">
          <div className="max-w-2xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.34em] text-amber-700">
              Catholic Journey 365
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.98] text-leather-900 sm:text-6xl md:mt-5 lg:text-7xl">
              Understand your Catholic faith.
              <span className="block text-amber-600">One day at a time.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-leather-900/80 sm:text-xl md:mt-6 lg:mx-0">
              Scripture, prayer, the Mass, and Catholic teaching guided through
              one simple daily journey.
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
              <BeginButton label="Start Day 1 Free" className="w-full sm:w-auto" />
              <p className="text-sm font-semibold text-leather-900/65">
                14 days free. Begin where you are.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroPhoneStack />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f5ead1] to-transparent" />
      </header>

      <main>
        {/* 2. Question hook */}
        <section className="relative px-5 pt-10 sm:px-8 md:pt-14">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Have you ever wondered why?
              </h2>
              <p className="mt-4 text-base font-semibold text-leather-900/65">
                Tap any question to reveal the answer.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-start gap-4 md:mt-10">
              {QUESTION_CARDS.map((card, i) => (
                <details
                  key={card.q}
                  className="group w-full self-start rounded-[1.6rem] border border-amber-100/70 bg-[linear-gradient(160deg,#fffaf0,#f6e9cf)] p-5 shadow-[0_18px_48px_rgba(92,64,39,0.1)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/80 hover:shadow-[0_28px_64px_rgba(92,64,39,0.18)] open:border-amber-300/80 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-amber-300/70 bg-leather-900 font-display text-base font-semibold text-amber-200">
                      {i + 1}
                    </span>
                    <span className="font-display text-xl font-semibold leading-snug text-leather-900">
                      {card.q}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      className="ml-auto h-5 w-5 flex-none text-amber-600 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="mt-3 border-t border-amber-300/40 pt-3">
                    <p className="text-base leading-7 text-leather-900/75">
                      {card.a}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-amber-700">
                      {card.footer}
                    </p>
                  </div>
                </details>
              ))}
              <div className="flex w-full flex-col justify-center self-start rounded-[1.6rem] border border-amber-200/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.7),transparent_40%),linear-gradient(135deg,#fff8e7,#e4c797)] p-5 shadow-[0_18px_48px_rgba(92,64,39,0.12)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]">
                <p className="text-lg font-semibold leading-7 text-leather-900/86">
                  Catholic Journey 365 helps you discover the answers step by
                  step.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:mt-10">
              <a
                href="/questions"
                className="rounded-full border border-amber-500/50 bg-white/60 px-9 py-4 text-center text-base font-bold text-leather-900 shadow-[0_14px_34px_rgba(92,64,39,0.1)] transition hover:bg-white/80 active:scale-[0.99]"
              >
                Read Catholic Questions
              </a>
              <BeginButton label="Start Understanding Your Faith" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 3. Pain */}
        <section className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div>
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Faith should not feel impossible to begin.
              </h2>
              <p className="mt-5 font-display text-xl font-semibold leading-8 text-leather-900/82 md:text-2xl md:leading-9">
                You do not need another list of resources. You need a journey.
              </p>
              <BeginButton label="Start Where You Are" className="mt-6 w-full sm:w-auto" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PAIN_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.6rem] border border-white/54 bg-white/62 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(92,64,39,0.16)]"
                >
                  <h3 className="font-display text-2xl font-semibold text-leather-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-base italic leading-7 text-stone-600">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Daily product - dark church band */}
        <section id="path" className="relative overflow-hidden px-5 py-14 sm:px-8 md:py-20">
          <img
            src="/images/hero/church-home.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#150d09_0%,#251710_50%,#0f0907_100%)] opacity-[0.93]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(245,190,83,0.16),transparent_40%)]" />

          <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
            <div className="flex justify-center">
              <div className="rounded-[2.5rem] border border-amber-200/20 bg-black/20 p-4 shadow-[0_36px_88px_rgba(0,0,0,0.5)] backdrop-blur">
                <PhoneMockup />
              </div>
            </div>

            <div>
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-parchment-50 md:mt-6 md:text-5xl">
                Your daily Catholic path.
              </h2>
              <p className="mt-4 text-lg leading-8 text-parchment-100/85 md:mt-5 md:text-xl md:leading-9">
                One clear step each day. Pray, read, understand, reflect, and
                keep walking.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {DAILY_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-[1.4rem] border border-amber-200/20 bg-white/5 p-4 backdrop-blur transition hover:border-amber-200/40 hover:bg-white/10"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-amber-300/60 bg-amber-500/15 font-display text-base font-semibold text-amber-200">
                      {i + 1}
                    </span>
                    <span className="font-display text-lg font-semibold text-parchment-50">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              <BeginButton label="Try Day 1 Free" className="mt-7 w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 5. Depth / product proof */}
        <section id="features" className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Everything connected. One journey.
              </h2>
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-leather-900/72 md:text-xl">
              See the journey before you read about it. Every part of the app is
              connected into one daily path.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
              {FEATURE_TILES.map((tile) => (
                <div
                  key={tile.title}
                  className="group overflow-hidden rounded-[1.6rem] border border-white/54 bg-white/62 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-amber-200/70 hover:shadow-[0_28px_64px_rgba(92,64,39,0.18)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={tile.img}
                      alt={tile.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-leather-950/55 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-leather-900">
                      {tile.title}
                    </h3>
                    <p className="mt-1.5 text-base leading-7 text-stone-600">
                      {tile.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <BeginButton label="Explore the Full Journey" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 6. Difference */}
        <section id="different" className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Resources tell you where to look. A journey shows you where to
                go.
              </h2>
            </div>

            <div className="mt-8 grid items-stretch gap-4 md:mt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-5">
              <div className="rounded-[2rem] border border-white/54 bg-white/55 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.08)] backdrop-blur sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-stone-500">
                  Other Catholic apps
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                  {OTHER_APP_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckIcon on />
                      <span className="text-lg leading-7 text-leather-900/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-amber-200/60 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.7),transparent_36%),linear-gradient(135deg,#fff8e7,#ecd2a3)] p-6 shadow-[0_28px_72px_rgba(92,64,39,0.16)] sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Catholic Journey 365
                </p>
                <p className="mt-2 text-base font-semibold text-leather-900/70">
                  Everything in other apps, plus a guided path:
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {OUR_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <CheckIcon on />
                      <span className="text-lg font-semibold leading-7 text-leather-900">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-leather-900/82 md:mt-8 md:text-xl md:leading-9">
              Other Catholic apps can be great tools. Catholic Journey 365 is
              different because it gives you a guided path through the faith.
            </p>

            <div className="mt-6 flex justify-center md:mt-8">
              <BeginButton label="Start Your Journey" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 7. Transformation */}
        <section className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_16%_0%,rgba(232,184,103,0.22),transparent_32%),linear-gradient(135deg,#20140e_0%,#3a2619_46%,#150d09_100%)] px-6 py-10 shadow-[0_36px_92px_rgba(36,22,15,0.34)] md:px-10 md:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <CrossMark className="mx-auto text-amber-200" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-parchment-50 md:text-5xl">
                Imagine one year from today.
              </h2>
            </div>

            <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2 md:mt-10">
              <div className="rounded-[1.8rem] border border-amber-200/24 bg-leather-900/40 p-6 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                  Before
                </p>
                <p className="mt-3 font-display text-2xl font-semibold leading-tight text-parchment-50">
                  I do not understand my faith.
                </p>
              </div>
              <div className="rounded-[1.8rem] border border-amber-200/40 bg-amber-500/10 p-6 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                  After
                </p>
                <p className="mt-3 font-display text-2xl font-semibold leading-tight text-parchment-50">
                  I know why I am Catholic, and I am learning to live it each
                  day.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
              {PROGRESSION.map((stage) => (
                <div
                  key={stage.day}
                  className="rounded-[1.8rem] border border-amber-200/24 bg-leather-900/40 p-6 text-center backdrop-blur"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
                    {stage.day}
                  </p>
                  <p className="mt-3 text-lg leading-7 text-parchment-100/90">
                    {stage.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:mt-10">
              <BeginButton label="Begin the Journey" className="w-full sm:w-auto" />
            </div>
          </div>
        </section>

        {/* 8. Trust */}
        <section id="trust" className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
            <div className="rounded-[2rem] border border-white/54 bg-white/62 p-6 shadow-[0_20px_58px_rgba(92,64,39,0.1)] backdrop-blur sm:p-8">
              <GoldRule />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Faithful. Simple. Built to lead you deeper.
              </h2>
              <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl md:leading-9">
                <p>
                  Catholic Journey 365 is built around Sacred Scripture, the
                  Catechism, Catholic teaching, prayer, the Sacraments, and
                  parish life.
                </p>
                <p>
                  It does not replace the Church, your priest, the Sacraments, or
                  OCIA / RCIA.
                </p>
                <p>
                  It helps you take the next step toward Christ and His Church.
                </p>
              </div>
              <BeginButton label="Begin Today" className="mt-6 w-full sm:w-auto" />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-amber-100/50 shadow-[0_28px_72px_rgba(58,38,25,0.18)] min-h-[320px] md:min-h-[460px]">
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

        {/* 9. Founder */}
        <section id="story" className="relative px-5 py-10 sm:px-8 md:py-16">
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
                    I am building this as someone still walking.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-amber-100 bg-[#fff8e7] p-6 shadow-[0_24px_62px_rgba(21,13,9,0.2)] sm:p-8 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Founder note
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-5xl">
                  Built by someone still on the journey.
                </h2>
                <div className="mt-4 space-y-3 text-lg leading-8 text-leather-900/86 md:mt-6 md:text-xl md:leading-9">
                  <p>
                    I built Catholic Journey 365 because I was Catholic, but I
                    still struggled with prayer, Scripture, understanding the
                    Mass, and living my faith each day.
                  </p>
                  <p>
                    I am not building this as someone who has arrived. I am
                    building it as someone still walking.
                  </p>
                </div>
                <BeginButton label="Walk the Journey" className="mt-6 w-full sm:w-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <GoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Real journeys. Real questions. One step at a time.
              </h2>
              <p className="mt-4 text-lg leading-8 text-leather-900/82 md:mt-5 md:text-xl">
                Everyone begins somewhere.
              </p>
            </div>

            <div className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-10">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="flex w-[85%] flex-none snap-center flex-col rounded-[2rem] border border-amber-100/70 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.7),transparent_38%),linear-gradient(135deg,#fff8e7,#f1ddb4)] p-6 shadow-[0_24px_62px_rgba(92,64,39,0.14)] sm:w-[480px] sm:p-8"
                >
                  <StarRating />
                  <blockquote className="relative mt-5 flex-1">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 -top-6 font-display text-6xl leading-none text-amber-400/45"
                    >
                      &ldquo;
                    </span>
                    <p className="relative text-lg leading-8 text-leather-900/86">
                      {t.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-amber-200/50 pt-5">
                    <p className="font-display text-xl font-semibold text-leather-900">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {t.journey}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-2 text-center text-sm font-semibold text-leather-900/55">
              Swipe to read more
            </p>
          </div>
        </section>

        {/* 10. Pricing */}
        <section id="pricing" className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-6 text-center shadow-[0_28px_72px_rgba(92,64,39,0.14)] sm:p-8 md:p-10">
            <GoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Try the full journey for 14 days.
            </h2>
            <p className="mt-4 text-lg leading-8 text-leather-900/86 md:mt-5 md:text-xl md:leading-9">
              Start with full access. If it helps you grow closer to God,
              continue for $5.99 monthly or $49.99 yearly. If not, cancel
              anytime.
            </p>
            <BeginButton label="Start My 14 Day Journey" className="mt-6 w-full sm:w-auto" />
          </div>
        </section>

        {/* 11. FAQ */}
        <section className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <GoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Questions before you begin.
            </h2>
          </div>

          <div className="mx-auto mt-6 max-w-3xl space-y-3 md:mt-8">
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="group rounded-[1.4rem] border border-white/54 bg-white/62 px-5 py-4 shadow-[0_14px_40px_rgba(92,64,39,0.08)] backdrop-blur transition hover:border-amber-200/70 open:bg-white/80 sm:px-7 sm:py-5"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-xl font-semibold leading-snug text-leather-900 sm:text-2xl">
                    {item.q}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className="ml-auto h-5 w-5 flex-none text-amber-600 transition-transform duration-300 group-open:rotate-180"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-base leading-7 text-stone-600 md:text-lg md:leading-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 12. Final spiritual CTA - Christ */}
        <section className="px-5 pb-12 pt-4 sm:px-8 md:pb-20 md:pt-6">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2.6rem] border border-amber-200/30 shadow-[0_40px_96px_rgba(20,12,8,0.4)]">
            <img
              src="/images/landing/jesus-welcome.png"
              alt="Christ welcoming people in warm sacred light"
              className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.78]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,9,7,0.78)_0%,rgba(20,12,8,0.55)_45%,rgba(15,9,7,0.82)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,190,83,0.2),transparent_45%)]" />

            <div className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
              <CrossMark className="mx-auto text-amber-200" />
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-parchment-50 drop-shadow-xl md:text-6xl">
                Your journey toward Christ can begin today.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-parchment-100/90 [text-shadow:0_2px_14px_rgba(20,12,8,0.6)] md:mt-6 md:text-xl">
                Begin, and learn as you walk. One prayer. One reading. One step
                closer to God.
              </p>
              <BeginButton label="Start Day 1 Free" className="mt-7 w-full sm:w-auto md:mt-8" />
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
            <a className="font-semibold transition hover:text-leather-900" href="/questions">
              Questions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
