import { Link } from 'react-router-dom';
import { PublicGoldRule, PublicSiteLayout } from '../components/PublicSiteLayout';
import { questionArticles } from '../data/questions';

type IconName =
  | 'book'
  | 'church'
  | 'compass'
  | 'prayer'
  | 'scroll'
  | 'spark'
  | 'sun'
  | 'water';

type FeaturedQuestion = {
  icon: IconName;
  title: string;
  description: string;
  href: string;
};

type TopicCard = {
  icon: IconName;
  title: string;
  count: string;
  description: string;
};

const DEFAULT_ARTICLE_PATH = '/questions/how-do-i-become-catholic';

const FEATURED_QUESTIONS: FeaturedQuestion[] = [
  {
    icon: 'compass',
    title: 'How do I become Catholic?',
    description:
      'A simple guide to inquiry, OCIA, the sacraments, and the next faithful step.',
    href: DEFAULT_ARTICLE_PATH,
  },
  {
    icon: 'church',
    title: 'What happens at Mass?',
    description:
      'Understand the shape of Catholic worship, from Scripture to the Eucharist.',
    href: '/questions',
  },
  {
    icon: 'book',
    title: 'What is the Catholic Church?',
    description:
      'Explore the Church as the family Christ founded to teach, sanctify, and guide.',
    href: '/questions',
  },
];

const TOPICS: TopicCard[] = [
  {
    icon: 'prayer',
    title: 'Prayer',
    count: '12 questions',
    description: 'How Catholics pray, what prayer means, and where to begin.',
  },
  {
    icon: 'church',
    title: 'The Mass',
    count: '10 questions',
    description: 'The words, gestures, Scripture, and worship at the heart of Sunday.',
  },
  {
    icon: 'water',
    title: 'Sacraments',
    count: '9 questions',
    description: 'Baptism, Confession, Eucharist, marriage, and healing.',
  },
  {
    icon: 'scroll',
    title: 'Scripture',
    count: '8 questions',
    description: 'The Bible, Catholic interpretation, and salvation history.',
  },
  {
    icon: 'spark',
    title: 'Church Teaching',
    count: '14 questions',
    description: 'Clear explanations of doctrine, Tradition, and moral questions.',
  },
  {
    icon: 'sun',
    title: 'Life & Faith',
    count: '11 questions',
    description: 'Catholic life at home, at work, in doubt, and in daily decisions.',
  },
];

const POPULAR_QUESTIONS = [
  'Why do Catholics ask Mary to pray?',
  'Why do Catholics confess to a priest?',
  'What is the Eucharist?',
  'Can Catholics read the Bible?',
  'What is Purgatory?',
  'Do I have to be Catholic to attend Mass?',
];

function IconMark({ type, className = '' }: { type: IconName; className?: string }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 ${className}`}>
      {type === 'book' && (
        <>
          <path {...shared} d="M5 5.5c2.2-.9 4.2-.7 6 0v14c-1.8-.7-3.8-.9-6 0z" />
          <path {...shared} d="M13 5.5c1.8-.7 3.8-.9 6 0v14c-2.2-.9-4.2-.7-6 0z" />
          <path {...shared} d="M11 5.5h2v14h-2z" />
        </>
      )}
      {type === 'church' && (
        <>
          <path {...shared} d="M12 3v4" />
          <path {...shared} d="M10.4 5h3.2" />
          <path {...shared} d="M4 20h16" />
          <path {...shared} d="M6 20V9.8L12 6l6 3.8V20" />
          <path {...shared} d="M10 20v-5a2 2 0 0 1 4 0v5" />
        </>
      )}
      {type === 'compass' && (
        <>
          <circle {...shared} cx="12" cy="12" r="8" />
          <path {...shared} d="m14.8 8.9-1.9 4-4 1.9 1.9-4z" />
        </>
      )}
      {type === 'prayer' && (
        <>
          <path {...shared} d="M8 20c1.8-3.8 2-8.1.6-13.1-.2-.8.2-1.6 1-1.9.8-.2 1.5.2 1.8 1l1.1 3.7" />
          <path {...shared} d="M16 20c-1.8-3.8-2-8.1-.6-13.1.2-.8-.2-1.6-1-1.9-.8-.2-1.5.2-1.8 1l-1.1 3.7" />
          <path {...shared} d="M9.5 12h5" />
        </>
      )}
      {type === 'scroll' && (
        <>
          <path {...shared} d="M7 5.5h9a3 3 0 0 1 3 3V18H8a3 3 0 0 1-3-3V7.5a2 2 0 0 1 2-2z" />
          <path {...shared} d="M8 9h7" />
          <path {...shared} d="M8 12h6" />
          <path {...shared} d="M8 15h4" />
        </>
      )}
      {type === 'spark' && (
        <>
          <path {...shared} d="M12 3l1.4 5.1L18 10l-4.6 1.9L12 17l-1.4-5.1L6 10l4.6-1.9z" />
          <path {...shared} d="M5 16l.7 2.1L8 19l-2.3.9L5 22l-.7-2.1L2 19l2.3-.9z" />
        </>
      )}
      {type === 'sun' && (
        <>
          <circle {...shared} cx="12" cy="12" r="4" />
          <path {...shared} d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </>
      )}
      {type === 'water' && (
        <>
          <path {...shared} d="M12 3.5s6 6 6 10.1a6 6 0 0 1-12 0C6 9.5 12 3.5 12 3.5z" />
          <path {...shared} d="M9.2 14.2A3.1 3.1 0 0 0 12 16.8" />
        </>
      )}
    </svg>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-200 bg-white/70 text-lg text-amber-800 transition group-hover:translate-x-1 group-hover:border-amber-300 group-hover:bg-amber-50"
    >
      &rarr;
    </span>
  );
}

function PhoneMockup({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[2.35rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-2 shadow-[0_30px_80px_rgba(20,12,8,0.38)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-[#f7f0df]">
        <div className="relative" style={{ aspectRatio: '921 / 2048' }}>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>
        <div className="absolute left-1/2 top-2.5 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}

function StoreButton({ label }: { label: string }) {
  return (
    <a
      href="/app/login"
      className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-leather-900/12 bg-leather-950 px-6 py-4 text-white shadow-[0_18px_45px_rgba(20,12,8,0.22)] transition hover:-translate-y-0.5 hover:bg-leather-900 sm:w-auto"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-amber-200">
        <IconMark type="spark" />
      </span>
      <span className="text-sm font-bold">{label}</span>
    </a>
  );
}

export default function Questions() {
  const becomeCatholicArticle =
    questionArticles.find((article) => article.slug === 'how-do-i-become-catholic') ??
    questionArticles[0];
  const becomeCatholicPath = becomeCatholicArticle
    ? `/questions/${becomeCatholicArticle.slug}`
    : DEFAULT_ARTICLE_PATH;
  const featuredQuestions = FEATURED_QUESTIONS.map((question) =>
    question.title === 'How do I become Catholic?'
      ? { ...question, href: becomeCatholicPath }
      : question
  );

  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden bg-[#fbf6ea] pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.96),transparent_30%),radial-gradient(circle_at_80%_6%,rgba(212,165,93,0.24),transparent_34%),linear-gradient(180deg,#fffaf0_0%,#f5ead1_100%)]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 pt-10 sm:px-8 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.88fr)] lg:items-center">
          <div className="max-w-3xl">
            <PublicGoldRule />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.32em] text-amber-700">
              Clear answers. Deeper faith.
            </p>
            <h1 className="mt-5 font-display text-6xl font-semibold leading-[0.94] text-leather-950 sm:text-7xl lg:text-8xl">
              Catholic Questions
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-leather-900/74">
              Explore simple, faithful answers to the questions people ask most
              about the Catholic faith.
            </p>

            <div className="mt-9 max-w-2xl rounded-[2rem] border border-amber-100 bg-white/90 p-2 shadow-[0_28px_80px_rgba(92,64,39,0.14)] backdrop-blur">
              <label htmlFor="question-search" className="sr-only">
                Search Catholic Questions
              </label>
              <div className="flex items-center gap-3 rounded-[1.55rem] border border-leather-900/6 bg-[#fffdf8] px-5 py-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path
                      d="M10.7 18.1a7.4 7.4 0 1 1 0-14.8 7.4 7.4 0 0 1 0 14.8z"
                      stroke="currentColor"
                      strokeWidth="1.9"
                    />
                    <path
                      d="m16.2 16.2 4.1 4.1"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <input
                  id="question-search"
                  type="search"
                  placeholder="Search Catholic Questions..."
                  className="min-w-0 flex-1 bg-transparent text-lg font-semibold text-leather-950 outline-none placeholder:text-leather-900/42"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[3rem] bg-amber-200/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/72 bg-white p-3 shadow-[0_34px_100px_rgba(60,43,28,0.22)]">
              <div className="relative overflow-hidden rounded-[2rem] bg-leather-950">
                <img
                  src="/images/landing/catholic-questions-hero.webp"
                  alt="A person sitting quietly in a Catholic church"
                  className="h-[28rem] w-full object-cover object-center sm:h-[34rem] lg:h-[40rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-leather-950/42 via-transparent to-white/6" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/40 bg-white/85 p-4 shadow-[0_18px_50px_rgba(20,12,8,0.16)] backdrop-blur-xl sm:left-8 sm:right-auto sm:max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Knowledge Library
              </p>
              <p className="mt-2 font-display text-2xl font-semibold leading-tight text-leather-950">
                Faithful answers for beginners, seekers, and returning Catholics.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <PublicGoldRule />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Featured Questions
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-leather-950 md:text-5xl">
                  Start with the questions people ask first.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-leather-900/66 md:text-lg md:leading-8">
                Short, careful explanations designed for clarity, not noise.
              </p>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {featuredQuestions.map((question) => (
                <Link
                  key={question.title}
                  to={question.href}
                  className="group flex min-h-[22rem] flex-col rounded-[2rem] border border-amber-100/80 bg-white/85 p-7 shadow-[0_22px_70px_rgba(92,64,39,0.1)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_34px_90px_rgba(92,64,39,0.16)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                    <IconMark type={question.icon} />
                  </span>
                  <span className="mt-8 block font-display text-3xl font-semibold leading-tight text-leather-950">
                    {question.title}
                  </span>
                  <span className="mt-4 block flex-1 text-base leading-7 text-leather-900/66">
                    {question.description}
                  </span>
                  <span className="mt-7 flex items-center justify-between border-t border-amber-100 pt-5">
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                      Read answer
                    </span>
                    <Arrow />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto max-w-[1440px] rounded-[2.5rem] border border-white/70 bg-[#fff9ed]/75 p-5 shadow-[0_28px_90px_rgba(92,64,39,0.12)] backdrop-blur sm:p-8 md:p-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                  Browse by Topic
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-leather-950 md:text-5xl">
                  A library built around real questions.
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-leather-900/66 md:text-lg md:leading-8">
                Move through Catholic teaching by topic, with answers written
                for ordinary people taking the next step.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {TOPICS.map((topic) => (
                <a
                  key={topic.title}
                  href="/questions"
                  className="group rounded-[1.7rem] border border-amber-100 bg-white/80 p-6 shadow-[0_16px_45px_rgba(92,64,39,0.08)] transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leather-950 text-amber-200">
                      <IconMark type={topic.icon} />
                    </span>
                    <Arrow />
                  </span>
                  <span className="mt-6 block font-display text-3xl font-semibold text-leather-950">
                    {topic.title}
                  </span>
                  <span className="mt-2 block text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                    {topic.count}
                  </span>
                  <span className="mt-4 block text-base leading-7 text-leather-900/66">
                    {topic.description}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 md:py-20">
          <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-xl">
              <PublicGoldRule />
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-amber-700">
                Popular Questions
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-leather-950 md:text-5xl">
                Clear answers without the noise.
              </h2>
              <p className="mt-5 text-lg leading-8 text-leather-900/66">
                Common Catholic questions deserve careful answers that are
                calm, faithful, and easy to return to.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {POPULAR_QUESTIONS.map((question) => (
                <a
                  key={question}
                  href="/questions"
                  className="group flex min-h-[5.25rem] items-center justify-between gap-5 rounded-[1.35rem] border border-amber-100 bg-white/80 px-5 py-4 text-leather-950 shadow-[0_12px_36px_rgba(92,64,39,0.08)] transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white"
                >
                  <span className="text-base font-semibold leading-6">{question}</span>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 pt-8 sm:px-8 md:pb-24 md:pt-12">
          <div className="mx-auto overflow-hidden rounded-[2.8rem] border border-amber-100/60 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.86),transparent_30%),linear-gradient(135deg,#fff8e7,#e8c98f)] shadow-[0_40px_120px_rgba(92,64,39,0.18)]">
            <div className="grid min-h-[34rem] gap-8 px-6 py-10 sm:px-8 md:p-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:p-16">
              <div className="max-w-2xl">
                <PublicGoldRule />
                <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-leather-950 md:text-6xl">
                  Keep learning. Keep walking the journey.
                </h2>
                <p className="mt-6 text-lg leading-8 text-leather-900/72 md:text-xl md:leading-9">
                  Catholic Journey 365 helps you grow through daily Scripture,
                  prayer, guided formation and simple explanations of the
                  Catholic faith.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <StoreButton label="Download on the App Store" />
                  <StoreButton label="Get it on Google Play" />
                </div>
              </div>

              <div className="relative mx-auto h-[31rem] w-full max-w-[34rem]">
                <div className="absolute inset-x-6 bottom-2 h-24 rounded-full bg-leather-950/18 blur-3xl" />
                <PhoneMockup
                  src="/images/landing/app-today-real-screen.jpeg"
                  alt="Catholic Journey 365 Today screen"
                  className="absolute left-[8%] top-6 z-20 w-[13.5rem] -rotate-6 sm:w-[15.5rem]"
                />
                <PhoneMockup
                  src="/images/landing/app-today-real-screen.jpeg"
                  alt="Catholic Journey 365 app journey screen"
                  className="absolute right-[8%] top-16 z-10 w-[12.5rem] rotate-6 opacity-95 sm:w-[14.5rem]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicSiteLayout>
  );
}
