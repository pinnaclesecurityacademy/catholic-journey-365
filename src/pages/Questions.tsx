import { Link } from 'react-router-dom';
import {
  PublicBeginButton,
  PublicGoldRule,
  PublicSiteLayout,
} from '../components/PublicSiteLayout';
import { questionArticles } from '../data/questions';

export default function Questions() {
  return (
    <PublicSiteLayout>
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_85%_18%,rgba(58,38,25,0.16),transparent_42%),linear-gradient(180deg,#fff7e4_0%,#f4e3bf_100%)]">
        <div className="absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_72%_38%,rgba(214,157,72,0.28),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-28 text-center sm:px-8 md:pb-20 md:pt-32">
          <PublicGoldRule className="mx-auto" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.34em] text-amber-700">
            Catholic Journey 365
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-leather-900 sm:text-6xl md:mt-5 lg:text-7xl">
            Catholic Questions
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-leather-900/80 sm:text-xl md:mt-6">
            Clear, faithful answers for the first steps and common questions on
            the Catholic journey.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <label htmlFor="question-search" className="sr-only">
              Search questions
            </label>
            <input
              id="question-search"
              type="search"
              placeholder="Search Catholic questions"
              className="w-full rounded-full border border-amber-200/70 bg-white/76 px-6 py-4 text-base font-semibold text-leather-900 shadow-[0_18px_48px_rgba(92,64,39,0.1)] outline-none backdrop-blur transition placeholder:text-leather-900/45 focus:border-amber-400 focus:ring-4 focus:ring-amber-300/20"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f5ead1] to-transparent" />
      </header>

      <main>
        <section className="relative px-5 py-10 sm:px-8 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <PublicGoldRule className="mx-auto" />
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
                Start with the question in front of you.
              </h2>
              <p className="mt-4 text-base font-semibold leading-7 text-leather-900/65 md:text-lg md:leading-8">
                These public guides are designed for seekers, returning
                Catholics, spouses, parents, and anyone learning the faith one
                step at a time.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 xl:grid-cols-3">
              {questionArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/questions/${article.slug}`}
                  className="group flex min-h-[19rem] flex-col rounded-[1.8rem] border border-amber-100/70 bg-[linear-gradient(160deg,#fffaf0,#f6e9cf)] p-6 shadow-[0_18px_48px_rgba(92,64,39,0.1)] transition duration-300 hover:-translate-y-1 hover:border-amber-300/80 hover:shadow-[0_28px_64px_rgba(92,64,39,0.18)]"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
                    {article.category}
                  </span>
                  <span className="mt-5 block font-display text-3xl font-semibold leading-tight text-leather-900">
                    {article.title}
                  </span>
                  <span className="mt-4 block flex-1 text-base leading-7 text-leather-900/72">
                    {article.description}
                  </span>
                  <span className="mt-6 flex items-center justify-between border-t border-amber-300/40 pt-4 text-sm font-bold uppercase tracking-[0.16em] text-amber-700">
                    <span>{article.readTime}</span>
                    <span
                      className="transition group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 sm:px-8 md:pb-20">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-amber-100/50 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,0.78),transparent_34%),linear-gradient(135deg,#fff8e7,#e4c797)] p-6 text-center shadow-[0_28px_72px_rgba(92,64,39,0.14)] sm:p-8 md:p-10">
            <PublicGoldRule className="mx-auto" />
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-leather-900 md:mt-6 md:text-5xl">
              Keep walking after the answer.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-leather-900/86 md:mt-5 md:text-xl md:leading-9">
              Catholic Journey 365 turns learning into a daily rhythm of
              Scripture, prayer, formation, and reflection.
            </p>
            <PublicBeginButton label="Start Your Journey" className="mt-6 w-full sm:w-auto" />
          </div>
        </section>
      </main>
    </PublicSiteLayout>
  );
}
