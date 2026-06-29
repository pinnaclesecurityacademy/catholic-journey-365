import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from './BackButton';
import { SacredCard } from './SacredCard';
import type { QuestionArticle } from '../data/questions';

function AppPhoneMockup() {
  return (
    <div className="w-24 shrink-0 rounded-[1.7rem] border border-black/70 bg-gradient-to-b from-stone-950 via-black to-stone-900 p-1 shadow-[0_18px_40px_rgba(20,12,8,0.38)]">
      <div className="relative overflow-hidden rounded-[1.35rem] bg-parchment-100">
        <div className="relative" style={{ aspectRatio: '921 / 2048' }}>
          <img
            src="/images/landing/app-today-real-screen.jpeg"
            alt="Catholic Journey 365 app screen"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain object-center"
          />
        </div>
        <div className="absolute left-1/2 top-1.5 h-2 w-10 -translate-x-1/2 rounded-full bg-black/90" />
      </div>
    </div>
  );
}

function AppPromotion() {
  return (
    <section className="my-5 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-leather-900 via-leather-800 to-leather-700 p-5 text-white shadow-[0_22px_50px_rgba(74,55,40,0.2)]">
      <div className="flex items-center gap-4">
        <AppPhoneMockup />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Catholic Journey 365
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight">
            Continue Your Journey
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-parchment-100">
            Build a daily rhythm with Scripture, prayer, formation, and guided
            next steps as you grow closer to Jesus Christ.
          </p>
          <a
            href="/app/login"
            className="mt-4 inline-flex rounded-xl bg-gold px-4 py-2 text-sm font-semibold text-leather-950 transition active:scale-[0.99]"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
}

function ContinueLearning({ article }: { article: QuestionArticle }) {
  return (
    <SacredCard className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Continue Learning
      </p>
      <h2 className="mt-2 font-display text-xl font-bold text-leather-900">
        Related questions
      </h2>
      <div className="mt-4 space-y-2">
        {article.relatedQuestions.map((question) => (
          <Link
            key={question.title}
            to={question.slug ? `/questions/${question.slug}` : '/questions'}
            className="flex items-center justify-between gap-3 rounded-xl border border-parchment-200 bg-parchment-50 px-4 py-3 text-sm font-semibold text-leather-900 transition active:scale-[0.99]"
          >
            <span>{question.title}</span>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
              Soon
            </span>
          </Link>
        ))}
      </div>
    </SacredCard>
  );
}

export function QuestionArticleTemplate({ article }: { article: QuestionArticle }) {
  const promotionAfterSection = Math.min(
    Math.max(article.appPromotionAfterSection ?? Math.ceil(article.sections.length / 2), 1),
    article.sections.length
  );

  return (
    <article className="mx-auto min-h-screen max-w-md bg-parchment-100 px-4 pt-5 pb-6">
      <div className="mb-4">
        <BackButton fallback="/questions" label="Questions" />
      </div>

      <SacredCard className="mb-5 bg-gradient-to-br from-white to-parchment-50">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          {article.category}
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-leather-900">
          {article.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {article.description}
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
          {article.readTime}
        </p>
      </SacredCard>

      <div className="space-y-4">
        {article.sections.map((section, index) => (
          <Fragment key={section.heading}>
            <section className="rounded-2xl border border-parchment-200 bg-white/90 p-5 shadow-[0_12px_32px_rgba(74,55,40,0.08)]">
              <h2 className="font-display text-xl font-bold leading-tight text-leather-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-relaxed text-stone-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
            {index + 1 === promotionAfterSection && <AppPromotion />}
          </Fragment>
        ))}
      </div>

      <ContinueLearning article={article} />
    </article>
  );
}
