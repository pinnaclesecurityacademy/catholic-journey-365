import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicGoldRule, PublicSiteLayout } from '../components/PublicSiteLayout';
import { questionArticles, type QuestionArticle } from '../data/questions';

type IconName =
  | 'book'
  | 'church'
  | 'compass'
  | 'prayer'
  | 'scroll'
  | 'spark'
  | 'sun'
  | 'water';

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

type TopicFilter =
  | 'All Questions'
  | 'Becoming Catholic'
  | 'The Mass'
  | 'Prayer'
  | 'Sacraments'
  | 'Scripture'
  | 'Church Teaching'
  | 'Life & Faith'
  | 'Returning Catholics';

const TOPIC_FILTERS: TopicFilter[] = [
  'All Questions',
  'Becoming Catholic',
  'The Mass',
  'Prayer',
  'Sacraments',
  'Scripture',
  'Church Teaching',
  'Life & Faith',
  'Returning Catholics',
];

const TOPIC_STATS: Record<TopicFilter, { count: number; icon: IconName }> = {
  'All Questions': { count: 246, icon: 'spark' },
  'Becoming Catholic': { count: 38, icon: 'compass' },
  'The Mass': { count: 31, icon: 'church' },
  Prayer: { count: 31, icon: 'prayer' },
  Sacraments: { count: 34, icon: 'water' },
  Scripture: { count: 27, icon: 'scroll' },
  'Church Teaching': { count: 46, icon: 'book' },
  'Life & Faith': { count: 24, icon: 'sun' },
  'Returning Catholics': { count: 15, icon: 'spark' },
};

const ARTICLE_TOPIC_BY_SLUG: Record<string, TopicFilter> = {
  'how-do-i-become-catholic': 'Becoming Catholic',
  'how-do-i-hear-god': 'Prayer',
  'how-do-i-pray': 'Prayer',
  'why-become-catholic': 'Becoming Catholic',
  'what-do-catholics-believe': 'Church Teaching',
  'what-is-the-church': 'Church Teaching',
  'what-is-the-trinity': 'Church Teaching',
  'who-is-god': 'Church Teaching',
  'who-is-jesus-christ': 'Church Teaching',
  'who-is-the-holy-spirit': 'Church Teaching',
};

function getArticleTopic(article: QuestionArticle): TopicFilter {
  return ARTICLE_TOPIC_BY_SLUG[article.slug] ?? 'Church Teaching';
}

export default function Questions() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>('All Questions');
  const [searchTerm, setSearchTerm] = useState('');

  const articleRows = useMemo(
    () =>
      questionArticles.map((article) => {
        const topic = getArticleTopic(article);
        return {
          article,
          href: `/questions/${article.slug}`,
          icon: TOPIC_STATS[topic].icon,
          topic,
        };
      }),
    []
  );

  const filteredArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return articleRows.filter(({ article, topic }) => {
      const matchesTopic =
        activeTopic === 'All Questions' || topic === activeTopic;
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        topic.toLowerCase().includes(query);

      return matchesTopic && matchesSearch;
    });
  }, [activeTopic, articleRows, searchTerm]);

  const activeQuestionCount = TOPIC_STATS[activeTopic].count;

  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden border-b border-amber-100/70 bg-[#fbf6ea] pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.96),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(212,165,93,0.18),transparent_28%),linear-gradient(180deg,#fffaf0_0%,#f5ead1_100%)]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="max-w-4xl">
            <PublicGoldRule />
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-leather-950 sm:text-6xl">
              Catholic Questions
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-leather-900/72">
              Search a calm, faithful library of Catholic answers organized for
              beginners, seekers, and returning Catholics.
            </p>

            <div className="mt-7 max-w-3xl rounded-[1.6rem] border border-amber-100 bg-white/92 p-2 shadow-[0_20px_60px_rgba(92,64,39,0.12)] backdrop-blur">
              <label htmlFor="question-search" className="sr-only">
                Search Catholic Questions
              </label>
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-leather-900/6 bg-[#fffdf8] px-5 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
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
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search Catholic Questions..."
                  className="min-w-0 flex-1 bg-transparent text-base font-semibold text-leather-950 outline-none placeholder:text-leather-900/42 sm:text-lg"
                />
              </div>
            </div>

            <div className="-mx-5 mt-5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
              <div className="flex min-w-max gap-2">
                {TOPIC_FILTERS.map((topic) => {
                  const selected = activeTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActiveTopic(topic)}
                      aria-pressed={selected}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        selected
                          ? 'border-leather-900 bg-leather-950 text-white shadow-[0_12px_30px_rgba(20,12,8,0.16)]'
                          : 'border-amber-100 bg-white/72 text-leather-900/72 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/70 bg-white/72 p-3 shadow-[0_22px_70px_rgba(92,64,39,0.13)] backdrop-blur">
              <img
                src="/images/landing/catholic-questions-hero.webp"
                alt="A person sitting quietly in a Catholic church"
                className="h-40 w-full rounded-[1.25rem] object-cover object-center"
              />
              <div className="px-2 pb-2 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
                  Knowledge Library
                </p>
                <p className="mt-2 font-display text-3xl font-semibold leading-none text-leather-950">
                  240+ questions
                </p>
                <p className="mt-2 text-sm leading-6 text-leather-900/64">
                  Organized by topic for quick, faithful answers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-8 sm:px-8 md:py-10">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                  {activeTopic}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-leather-950">
                  Published answers
                </h2>
              </div>
              <p className="text-sm font-semibold text-leather-900/58">
                {activeQuestionCount}+ questions organized{' '}
                {activeTopic === 'All Questions' ? 'across the library' : 'in this topic'}
              </p>
            </div>

            <div className="overflow-hidden rounded-[1.7rem] border border-amber-100/80 bg-white/82 shadow-[0_18px_58px_rgba(92,64,39,0.1)] backdrop-blur">
              {filteredArticles.length > 0 ? (
                <div className="divide-y divide-amber-100/80">
                  {filteredArticles.map(({ article, href, icon, topic }) => (
                    <Link
                      key={article.slug}
                      to={href}
                      className="group flex items-start gap-4 px-4 py-4 transition hover:bg-[#fff8e7] sm:px-5"
                    >
                      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                        <IconMark type={icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-2xl font-semibold leading-tight text-leather-950">
                          {article.title}
                        </span>
                        <span className="mt-1 block text-base leading-7 text-leather-900/66">
                          {article.description}
                        </span>
                        <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                          {topic}
                        </span>
                      </span>
                      <Arrow />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="font-display text-2xl font-semibold text-leather-950">
                    No published answer matches this filter yet.
                  </p>
                  <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-leather-900/64">
                    Try another topic or search term. New Catholic Questions
                    articles are being added regularly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTopic('All Questions');
                      setSearchTerm('');
                    }}
                    className="mt-5 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-leather-900 transition hover:border-amber-400"
                  >
                    View all questions
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
              <section className="rounded-[1.5rem] border border-amber-100/80 bg-white/72 p-5 shadow-[0_16px_44px_rgba(92,64,39,0.08)] backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Popular Topics
                </p>
                <div className="mt-4 space-y-1">
                  {TOPIC_FILTERS.filter((topic) => topic !== 'All Questions').map(
                    (topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setActiveTopic(topic)}
                        className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-[#fff8e7]"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                            <IconMark type={TOPIC_STATS[topic].icon} className="h-4 w-4" />
                          </span>
                          <span className="truncate text-sm font-bold text-leather-900">
                            {topic}
                          </span>
                        </span>
                        <span className="text-xs font-bold text-leather-900/45">
                          {TOPIC_STATS[topic].count}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-amber-100/80 bg-[linear-gradient(145deg,#fff8e7,#ecd39f)] p-5 shadow-[0_18px_48px_rgba(92,64,39,0.1)]">
                <p className="font-display text-2xl font-semibold leading-tight text-leather-950">
                  Can't find your question?
                </p>
                <p className="mt-2 text-sm leading-6 text-leather-900/66">
                  Search broadly, then choose the closest topic. The library is
                  built to make faithful answers easier to find.
                </p>
              </section>
            </div>
          </aside>
        </div>

        <section className="mx-auto mt-10 max-w-[1440px] pb-8">
          <div className="rounded-[1.6rem] border border-amber-100/70 bg-white/68 p-5 shadow-[0_14px_40px_rgba(92,64,39,0.08)] backdrop-blur md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                Catholic Journey 365
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-leather-950">
                Keep learning after the answer.
              </h2>
              <p className="mt-2 max-w-3xl text-base leading-7 text-leather-900/66">
                Grow through daily Scripture, prayer, guided formation, and
                simple explanations of the Catholic faith.
              </p>
            </div>
            <a
              href="/app/login"
              className="mt-5 inline-flex rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-7 py-3 text-sm font-bold text-leather-900 shadow-[0_14px_34px_rgba(161,106,28,0.2)] transition active:scale-[0.99] md:mt-0"
            >
              Begin Your Journey
            </a>
          </div>
        </section>
      </main>
    </PublicSiteLayout>
  );
}
