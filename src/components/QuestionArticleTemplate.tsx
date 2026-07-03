import { Fragment, useEffect, useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  PublicBeginButton,
  PublicGoldRule,
  PublicSiteLayout,
} from './PublicSiteLayout';
import { getQuestionArticle, type QuestionArticle, type RelatedQuestion } from '../data/questions';
import { getQuestionPillar } from '../data/questions/pillars';
import {
  buildQuestionArticleSchema,
  getArticleSeoDescription,
  getArticleSeoTitle,
  useSeo,
} from '../lib/seo';

const INLINE_LINK_ALIASES: Record<string, string> = {
  'apostolic-succession': 'what-is-apostolic-succession',
  baptism: 'what-is-baptism',
  bible: 'how-do-catholics-read-the-bible',
  church: 'what-is-the-church',
  confession: 'how-do-i-go-to-confession',
  confirmation: 'what-is-confirmation',
  eucharist: 'what-is-the-eucharist',
  'holy-communion': 'what-is-holy-communion',
  'holy-spirit': 'who-is-the-holy-spirit',
  mass: 'what-is-the-mass',
  ocia: 'what-is-ocia',
  pope: 'why-does-the-catholic-church-have-a-pope',
  prayer: 'what-is-prayer',
  sacraments: 'what-are-the-seven-sacraments',
  scripture: 'how-do-catholics-read-the-bible',
};

const INLINE_LINK_CLASS_NAME =
  'font-semibold text-amber-800 underline decoration-amber-400/55 decoration-2 underline-offset-4 transition hover:text-leather-900 hover:decoration-amber-700';

const AUTO_INLINE_LINKS: Array<{ pattern: RegExp; slug: string }> = [
  { pattern: /\bapostolic succession\b/i, slug: 'what-is-apostolic-succession' },
  { pattern: /\bCatholic Church\b/i, slug: 'what-is-the-church' },
  { pattern: /\bJesus Christ\b/i, slug: 'who-is-jesus-christ' },
  { pattern: /\bHoly Communion\b/i, slug: 'what-is-holy-communion' },
  { pattern: /\bHoly Spirit\b/i, slug: 'who-is-the-holy-spirit' },
  { pattern: /\bthe Eucharist\b/i, slug: 'what-is-the-eucharist' },
  { pattern: /\bConfession\b/i, slug: 'how-do-i-go-to-confession' },
  { pattern: /\bConfirmation\b/i, slug: 'what-is-confirmation' },
  { pattern: /\bSacraments\b/i, slug: 'what-are-the-seven-sacraments' },
  { pattern: /\bScripture\b/i, slug: 'how-do-catholics-read-the-bible' },
  { pattern: /\bBaptism\b/i, slug: 'what-is-baptism' },
  { pattern: /\bEucharist\b/i, slug: 'what-is-the-eucharist' },
  { pattern: /\bthe Mass\b/i, slug: 'what-is-the-mass' },
  { pattern: /\bPrayer\b/i, slug: 'what-is-prayer' },
  { pattern: /\bprayer\b/i, slug: 'what-is-prayer' },
  { pattern: /\bthe Church\b/i, slug: 'what-is-the-church' },
  { pattern: /\bChurch\b/i, slug: 'what-is-the-church' },
  { pattern: /\bMary\b/i, slug: 'who-was-mary' },
  { pattern: /\bsaints\b/i, slug: 'who-are-the-saints' },
  { pattern: /\bOCIA\b/i, slug: 'what-is-ocia' },
  { pattern: /\bPope\b/i, slug: 'why-does-the-catholic-church-have-a-pope' },
];

const MAX_AUTO_INLINE_LINKS_PER_PARAGRAPH = 2;

function normalizeInlineLinkLabel(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function getInlineLinkSlug(label: string, explicitSlug?: string) {
  const requestedSlug = explicitSlug?.trim().replace(/^\/questions\//, '');

  if (requestedSlug && getQuestionArticle(requestedSlug)) {
    return requestedSlug;
  }

  const normalizedLabel = normalizeInlineLinkLabel(label);
  const aliasSlug = INLINE_LINK_ALIASES[normalizedLabel];

  if (aliasSlug && getQuestionArticle(aliasSlug)) {
    return aliasSlug;
  }

  const article = getQuestionArticle(normalizedLabel);
  return article?.slug;
}

function renderArticleLink(slug: string, label: string, key: string) {
  return (
    <Link
      key={key}
      to={`/questions/${slug}`}
      className={INLINE_LINK_CLASS_NAME}
    >
      {label}
    </Link>
  );
}

function renderAutoLinkedText(
  text: string,
  currentSlug: string,
  linkedSlugs: Set<string>,
  keyPrefix: string
): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  let automaticLinkCount = 0;

  while (cursor < text.length && automaticLinkCount < MAX_AUTO_INLINE_LINKS_PER_PARAGRAPH) {
    let bestMatch:
      | { index: number; label: string; slug: string; length: number }
      | undefined;

    for (const { pattern, slug } of AUTO_INLINE_LINKS) {
      if (slug === currentSlug || linkedSlugs.has(slug) || !getQuestionArticle(slug)) {
        continue;
      }

      const match = pattern.exec(text.slice(cursor));

      if (!match || match.index === undefined) {
        continue;
      }

      const index = cursor + match.index;
      const label = match[0];
      const candidate = { index, label, slug, length: label.length };

      if (
        !bestMatch ||
        candidate.index < bestMatch.index ||
        (candidate.index === bestMatch.index && candidate.length > bestMatch.length)
      ) {
        bestMatch = candidate;
      }
    }

    if (!bestMatch) {
      break;
    }

    if (bestMatch.index > cursor) {
      parts.push(text.slice(cursor, bestMatch.index));
    }

    parts.push(
      renderArticleLink(
        bestMatch.slug,
        bestMatch.label,
        `${keyPrefix}-auto-${bestMatch.slug}-${bestMatch.index}`
      )
    );
    linkedSlugs.add(bestMatch.slug);
    automaticLinkCount += 1;
    cursor = bestMatch.index + bestMatch.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts.length > 0 ? parts : [text];
}

function renderInlineArticleLinks(paragraph: string, currentSlug: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const inlineLinkPattern = /\[([^\]]+)\](?:\(([^)]+)\))?/g;
  const linkedSlugs = new Set<string>();
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineLinkPattern.exec(paragraph)) !== null) {
    const [fullMatch, label, explicitSlug] = match;
    const slug = getInlineLinkSlug(label, explicitSlug);

    if (match.index > lastIndex) {
      parts.push(
        ...renderAutoLinkedText(
          paragraph.slice(lastIndex, match.index),
          currentSlug,
          linkedSlugs,
          `${match.index}-before`
        )
      );
    }

    if (slug && slug !== currentSlug) {
      parts.push(renderArticleLink(slug, label, `${slug}-${match.index}`));
      linkedSlugs.add(slug);
    } else {
      parts.push(label);
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < paragraph.length) {
    parts.push(
      ...renderAutoLinkedText(
        paragraph.slice(lastIndex),
        currentSlug,
        linkedSlugs,
        `${lastIndex}-after`
      )
    );
  }

  return parts.length > 0 ? parts : [paragraph];
}

function AppPhoneMockup() {
  return (
    <div className="mx-auto w-36 shrink-0 rounded-[2.1rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-1.5 shadow-[0_30px_70px_rgba(20,12,8,0.5)] sm:w-44 lg:mx-0">
      <div className="relative overflow-hidden rounded-[1.7rem] bg-[#f7f0df]">
        <div className="relative" style={{ aspectRatio: '921 / 2048' }}>
          <img
            src="/images/landing/app-today-real-screen.jpeg"
            alt="Catholic Journey 365 app screen"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>
        <div className="absolute left-1/2 top-2 h-3 w-14 -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}

function AppPromotion() {
  return (
    <section className="my-10 overflow-hidden rounded-[2.2rem] border border-amber-200/30 bg-leather-950 text-white shadow-[0_40px_96px_rgba(20,12,8,0.36)]">
      <div className="grid items-center gap-8 bg-[radial-gradient(circle_at_80%_10%,rgba(245,190,83,0.22),transparent_38%),linear-gradient(135deg,#2b1b13,#5b3a23)] px-6 py-8 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 lg:py-10">
        <AppPhoneMockup />
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">
            Catholic Journey 365
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-parchment-50 md:text-5xl">
            Continue Your Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-parchment-100/88 lg:mx-0">
            Build a daily rhythm with Scripture, prayer, formation, and guided
            next steps as you grow closer to Jesus Christ.
          </p>
          <a
            href="/app/login"
            className="mt-6 inline-flex rounded-full bg-gradient-to-b from-amber-300 to-amber-600 px-9 py-4 text-base font-bold text-leather-900 shadow-[0_20px_45px_rgba(161,106,28,0.26)] transition active:scale-[0.99]"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
}

function ContinueLearning({ article }: { article: QuestionArticle }) {
  const relatedQuestions = article.relatedQuestions.map((question) => ({
    question,
    publishedArticle: question.slug ? getQuestionArticle(question.slug) : undefined,
  }));

  return (
    <section className="mt-12 rounded-[2rem] border border-amber-100/70 bg-white/62 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-8 lg:relative lg:left-1/2 lg:w-[min(72rem,calc(100vw-4rem))] lg:-translate-x-1/2">
      <PublicGoldRule />
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
        Continue Learning
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-4xl">
        Related questions
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-leather-900/64">
        If this was helpful, continue with one of these connected formation pages.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {relatedQuestions.map(({ question, publishedArticle }) => (
          <RelatedQuestionCard
            key={`${question.title}-${question.slug ?? 'missing'}`}
            question={question}
            isPublished={Boolean(publishedArticle)}
          />
        ))}
      </div>
    </section>
  );
}

function RelatedQuestionCard({
  question,
  isPublished,
}: {
  question: RelatedQuestion;
  isPublished: boolean;
}) {
  const cardClassName =
    'flex min-h-32 flex-col justify-between rounded-[1.4rem] border border-amber-100/70 bg-[linear-gradient(160deg,#fffaf0,#f6e9cf)] p-5 text-leather-900 shadow-[0_14px_40px_rgba(92,64,39,0.08)] transition';

  const content = (
    <>
      <span className="font-display text-xl font-semibold leading-snug">
        {question.title}
      </span>
      <span className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
        {isPublished ? 'Read answer' : 'Coming soon'}
      </span>
    </>
  );

  if (isPublished && question.slug) {
    return (
      <Link
        to={`/questions/${question.slug}`}
        className={`${cardClassName} hover:-translate-y-0.5 hover:border-amber-300/80`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`${cardClassName} cursor-default opacity-72`} aria-disabled="true">
      {content}
    </div>
  );
}

export function QuestionArticleTemplate({ article }: { article: QuestionArticle }) {
  const promotionAfterSection = Math.min(
    Math.max(article.appPromotionAfterSection ?? Math.ceil(article.sections.length / 2), 1),
    article.sections.length
  );
  const pillar = useMemo(() => getQuestionPillar(article), [article]);
  const structuredData = useMemo(() => buildQuestionArticleSchema(article), [article]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.slug]);

  useSeo({
    title: getArticleSeoTitle(article),
    description: getArticleSeoDescription(article),
    canonicalPath: `/questions/${article.slug}`,
    type: 'article',
    structuredData,
  });

  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(58,38,25,0.16),transparent_42%),linear-gradient(180deg,#fff7e4_0%,#f4e3bf_100%)]">
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_72%_38%,rgba(214,157,72,0.28),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-28 sm:px-8 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-5xl text-center">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-leather-900/48"
            >
              <a href="/" className="transition hover:text-amber-800">
                Home
              </a>
              <span aria-hidden="true" className="text-amber-700/55">
                &gt;
              </span>
              <Link to="/questions" className="transition hover:text-amber-800">
                Catholic Questions
              </Link>
              <span aria-hidden="true" className="text-amber-700/55">
                &gt;
              </span>
              <span className="text-leather-900/68">{article.title}</span>
            </nav>
            <PublicGoldRule className="mx-auto" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.34em] text-amber-700">
              {pillar.title}
            </p>
            <h1 className="mx-auto mt-4 max-w-5xl font-display text-5xl font-semibold leading-[0.98] text-leather-900 sm:text-6xl md:mt-5 lg:text-7xl">
              {article.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-leather-900/80 sm:text-xl md:mt-6">
              {article.description}
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-leather-900/48">
              {article.readTime}
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f5ead1] to-transparent" />
      </header>

      <main className="px-5 py-10 sm:px-8 md:py-16">
        <article className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {article.sections.map((section, index) => (
              <Fragment key={section.heading}>
                <section className="rounded-[1.8rem] border border-amber-100/70 bg-white/62 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-8">
                  <h2 className="font-display text-3xl font-semibold leading-tight text-leather-900 md:text-4xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-lg leading-8 text-leather-900/74"
                      >
                        {renderInlineArticleLinks(paragraph, article.slug)}
                      </p>
                    ))}
                    {section.quotes?.map((quote) => (
                      <blockquote
                        key={`${quote.text}-${quote.citation ?? ''}`}
                        className="rounded-[1.4rem] border border-amber-200/70 bg-[linear-gradient(135deg,#fff8e7,#f2dfb6)] p-5 shadow-[0_14px_36px_rgba(92,64,39,0.08)]"
                      >
                        <p className="font-display text-2xl font-semibold leading-snug text-leather-900">
                          "{quote.text}"
                        </p>
                        {quote.citation && (
                          <cite className="mt-3 block text-sm font-bold uppercase tracking-[0.16em] text-amber-700 not-italic">
                            {quote.citation}
                          </cite>
                        )}
                      </blockquote>
                    ))}
                  </div>
                </section>
                {index + 1 === promotionAfterSection && <AppPromotion />}
              </Fragment>
            ))}
          </div>

          <ContinueLearning article={article} />

          <section className="mt-12 rounded-[2rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-6 text-center shadow-[0_28px_72px_rgba(92,64,39,0.14)] sm:p-8 md:p-10">
            <PublicGoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Keep learning with a daily rhythm.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-leather-900/86 md:mt-5 md:text-xl md:leading-9">
              Scripture, prayer, formation, and reflection can help the answer
              become part of your life.
            </p>
            <PublicBeginButton label="Begin the Journey" className="mt-6 w-full sm:w-auto" />
          </section>
        </article>
      </main>
    </PublicSiteLayout>
  );
}
