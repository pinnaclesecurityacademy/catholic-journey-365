import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicGoldRule, PublicSiteLayout } from '../components/PublicSiteLayout';
import { questionArticles, type QuestionArticle } from '../data/questions';
import {
  formationPillars,
  getQuestionPillar,
  type FormationPillar,
  type FormationPillarIcon,
  type FormationPillarId,
} from '../data/questions/pillars';
import { buildQuestionsLandingSchema, useSeo } from '../lib/seo';

type IconName =
  | 'book'
  | 'church'
  | 'compass'
  | 'cross'
  | 'heart'
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
      {type === 'cross' && (
        <>
          <path {...shared} d="M12 3v18" />
          <path {...shared} d="M6.5 8.2h11" />
          <path {...shared} d="M8.5 21h7" />
        </>
      )}
      {type === 'heart' && (
        <>
          <path {...shared} d="M12 20.5s-7.5-4.4-8.7-9.2c-.7-2.9 1-5.5 3.8-5.8 1.8-.2 3.4.7 4.4 2.1 1-1.4 2.6-2.3 4.4-2.1 2.8.3 4.5 2.9 3.8 5.8C19.5 16.1 12 20.5 12 20.5z" />
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

type ArticleRow = {
  article: QuestionArticle;
  href: string;
  pillar: FormationPillar;
};

function getPillarIcon(icon: FormationPillarIcon): IconName {
  return icon;
}

function formatQuestionCount(count: number) {
  return `${count} ${count === 1 ? 'article' : 'articles'}`;
}

function getArticleExcerpt(article: QuestionArticle) {
  return article.description;
}

export default function Questions() {
  const [activePillarId, setActivePillarId] = useState<FormationPillarId | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const publishedQuestionCount = questionArticles.length;
  const structuredData = useMemo(() => buildQuestionsLandingSchema(), []);

  useSeo({
    title: 'Catholic Questions | Catholic Journey 365',
    description:
      'Search a faithful Catholic formation library with clear answers for beginners, seekers, and returning Catholics.',
    canonicalPath: '/questions',
    structuredData,
  });

  const articleRows = useMemo(
    () =>
      questionArticles.map((article): ArticleRow => ({
        article,
        href: `/questions/${article.slug}`,
        pillar: getQuestionPillar(article),
      })),
    []
  );

  const pillarCounts = useMemo(() => {
    return articleRows.reduce<Record<FormationPillarId, number>>((counts, { pillar }) => {
      counts[pillar.id] = (counts[pillar.id] ?? 0) + 1;
      return counts;
    }, {} as Record<FormationPillarId, number>);
  }, [articleRows]);

  const activePillar = useMemo(
    () => formationPillars.find((pillar) => pillar.id === activePillarId) ?? null,
    [activePillarId]
  );

  const visibleArticles = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (query) {
      return articleRows.filter(({ article, pillar }) => {
        return (
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          pillar.title.toLowerCase().includes(query)
        );
      });
    }

    if (activePillar) {
      return articleRows.filter(({ pillar }) => pillar.id === activePillar.id);
    }

    return articleRows.slice(0, 10);
  }, [activePillar, articleRows, searchTerm]);

  const sectionTitle = searchTerm.trim()
    ? 'Search Results'
    : activePillar?.title ?? 'Latest Formation Articles';

  const sectionDescription = searchTerm.trim()
    ? `${formatQuestionCount(visibleArticles.length)} match your search.`
    : activePillar?.description ??
      'The newest formation articles from the Catholic Questions library.';

  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden border-b border-amber-100/70 bg-[#fbf6ea] pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.96),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(212,165,93,0.18),transparent_28%),linear-gradient(180deg,#fffaf0_0%,#f5ead1_100%)]" />
        <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="max-w-4xl">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-leather-900/48"
            >
              <a href="/" className="transition hover:text-amber-800">
                Home
              </a>
              <span aria-hidden="true" className="text-amber-700/55">
                &gt;
              </span>
              <span className="text-leather-900/68">Catholic Questions</span>
            </nav>
            <PublicGoldRule />
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-leather-950 sm:text-6xl">
              Catholic Questions
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-leather-900/72">
              Simple Catholic answers to help you grow closer to Jesus Christ.
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

            <p className="mt-5 text-sm font-semibold text-leather-900/58">
              {formatQuestionCount(publishedQuestionCount)} organized into four formation pillars.
            </p>
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
                  Formation Library
                </p>
                <p className="mt-2 font-display text-3xl font-semibold leading-none text-leather-950">
                  {formatQuestionCount(publishedQuestionCount)}
                </p>
                <p className="mt-2 text-sm leading-6 text-leather-900/64">
                  Built for quick answers and deeper formation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-8 sm:px-8 md:py-10">
        <section className="mx-auto max-w-[1440px]">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {formationPillars.map((pillar) => {
              const selected = activePillarId === pillar.id && !searchTerm.trim();
              return (
                <button
                  key={pillar.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setSearchTerm('');
                    setActivePillarId(pillar.id);
                    window.setTimeout(() => {
                      document
                        .getElementById('formation-results')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 0);
                  }}
                  className={`group flex min-h-[17rem] w-full flex-col justify-between rounded-[1.7rem] border p-5 text-left shadow-[0_18px_58px_rgba(92,64,39,0.1)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(92,64,39,0.14)] sm:p-6 ${
                    selected
                      ? 'border-amber-300 bg-[linear-gradient(145deg,#fff8e7,#efd7a6)]'
                      : 'border-amber-100/80 bg-white/76 hover:border-amber-200'
                  }`}
                >
                  <span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 transition group-hover:bg-amber-200/80">
                      <IconMark type={getPillarIcon(pillar.icon)} className="h-6 w-6" />
                    </span>
                    <span className="mt-5 block font-display text-3xl font-semibold leading-tight text-leather-950">
                      {pillar.title}
                    </span>
                    <span className="mt-3 block text-base leading-7 text-leather-900/66">
                      {pillar.description}
                    </span>
                  </span>
                  <span className="mt-5 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    <span>{formatQuestionCount(pillarCounts[pillar.id] ?? 0)}</span>
                    <Arrow />
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section id="formation-results" className="mx-auto mt-10 max-w-[1440px] scroll-mt-28">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
                Formation Library
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-leather-950">
                {sectionTitle}
              </h2>
              <p className="mt-2 max-w-3xl text-base leading-7 text-leather-900/66">
                {sectionDescription}
              </p>
            </div>
            {(activePillar || searchTerm.trim()) && (
              <button
                type="button"
                onClick={() => {
                  setActivePillarId(null);
                  setSearchTerm('');
                }}
                className="self-start rounded-full border border-amber-200 bg-white/76 px-4 py-2 text-sm font-bold text-leather-900 transition hover:border-amber-400 hover:bg-white sm:self-auto"
              >
                View latest
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded-[1.7rem] border border-amber-100/80 bg-white/82 shadow-[0_18px_58px_rgba(92,64,39,0.1)] backdrop-blur">
            {visibleArticles.length > 0 ? (
              <div className="divide-y divide-amber-100/80">
                {visibleArticles.map(({ article, href, pillar }) => (
                  <Link
                    key={article.slug}
                    to={href}
                    className="group flex items-start gap-4 px-4 py-5 transition hover:bg-[#fff8e7] sm:px-5"
                  >
                    <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                      <IconMark type={getPillarIcon(pillar.icon)} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-2xl font-semibold leading-tight text-leather-950">
                        {article.title}
                      </span>
                      <span className="mt-1 block text-base leading-7 text-leather-900/66">
                        {getArticleExcerpt(article)}
                      </span>
                      <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                        {pillar.title}
                      </span>
                    </span>
                    <Arrow />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-5 py-10 text-center">
                <p className="font-display text-2xl font-semibold text-leather-950">
                  No formation article matches this search yet.
                </p>
                <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-leather-900/64">
                  Try another word or choose one of the four formation pillars.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActivePillarId(null);
                    setSearchTerm('');
                  }}
                  className="mt-5 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-bold text-leather-900 transition hover:border-amber-400"
                >
                  View latest articles
                </button>
              </div>
            )}
          </div>
        </section>

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
