import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  PublicBeginButton,
  PublicGoldRule,
  PublicSiteLayout,
} from './PublicSiteLayout';
import type { QuestionArticle } from '../data/questions';

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
  return (
    <section className="mt-12 rounded-[2rem] border border-amber-100/70 bg-white/62 p-6 shadow-[0_18px_48px_rgba(92,64,39,0.09)] backdrop-blur sm:p-8">
      <PublicGoldRule />
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
        Continue Learning
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-leather-900 md:text-4xl">
        Related questions
      </h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {article.relatedQuestions.map((question) => (
          <Link
            key={question.title}
            to={question.slug ? `/questions/${question.slug}` : '/questions'}
            className="flex min-h-32 flex-col justify-between rounded-[1.4rem] border border-amber-100/70 bg-[linear-gradient(160deg,#fffaf0,#f6e9cf)] p-5 text-leather-900 shadow-[0_14px_40px_rgba(92,64,39,0.08)] transition hover:-translate-y-0.5 hover:border-amber-300/80"
          >
            <span className="font-display text-xl font-semibold leading-snug">
              {question.title}
            </span>
            <span className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
              Coming soon
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function QuestionArticleTemplate({ article }: { article: QuestionArticle }) {
  const promotionAfterSection = Math.min(
    Math.max(article.appPromotionAfterSection ?? Math.ceil(article.sections.length / 2), 1),
    article.sections.length
  );

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription =
      document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? null;
    const descriptionTag = metaDescription ?? document.createElement('meta');
    const createdDescriptionTag = !metaDescription;

    if (createdDescriptionTag) {
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    document.title = article.metaTitle ?? `${article.title} | Catholic Journey 365`;
    descriptionTag.setAttribute(
      'content',
      article.metaDescription ?? article.description
    );

    return () => {
      document.title = previousTitle;
      if (createdDescriptionTag) {
        descriptionTag.remove();
      } else if (previousDescription === null) {
        descriptionTag.removeAttribute('content');
      } else {
        descriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, [article]);

  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(58,38,25,0.16),transparent_42%),linear-gradient(180deg,#fff7e4_0%,#f4e3bf_100%)]">
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_72%_38%,rgba(214,157,72,0.28),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-28 sm:px-8 md:pb-20 md:pt-32">
          <div className="mx-auto max-w-5xl text-center">
            <PublicGoldRule className="mx-auto" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.34em] text-amber-700">
              {article.category}
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
