import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { SacredCard } from '../components/SacredCard';
import { questionArticles } from '../data/questions';

export default function Questions() {
  return (
    <main className="mx-auto min-h-screen max-w-md bg-parchment-100 px-4 pt-5 pb-6">
      <div className="mb-4">
        <BackButton fallback="/" />
      </div>

      <header className="mb-5 px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Questions
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-leather-900">
          Catholic Questions
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          Clear, faithful answers for the first steps and common questions on
          the Catholic journey.
        </p>
      </header>

      <div className="mb-5">
        <label htmlFor="question-search" className="sr-only">
          Search questions
        </label>
        <input
          id="question-search"
          type="search"
          placeholder="Search questions"
          className="w-full rounded-2xl border border-parchment-200 bg-white/90 px-4 py-3 text-sm font-medium text-leather-900 shadow-[0_10px_28px_rgba(74,55,40,0.07)] outline-none transition placeholder:text-stone-400 focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
        />
      </div>

      <div className="space-y-3">
        {questionArticles.map((article) => (
          <Link
            key={article.slug}
            to={`/questions/${article.slug}`}
            className="block rounded-2xl border border-parchment-200 bg-white/90 p-5 text-left shadow-[0_12px_32px_rgba(74,55,40,0.08)] transition active:scale-[0.99]"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {article.category}
            </span>
            <span className="mt-2 block font-display text-xl font-bold leading-tight text-leather-900">
              {article.title}
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-stone-500">
              {article.description}
            </span>
            <span className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
              <span>{article.readTime}</span>
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>

      {questionArticles.length === 0 && (
        <SacredCard>
          <p className="text-sm leading-relaxed text-stone-600">
            More questions are being prepared.
          </p>
        </SacredCard>
      )}
    </main>
  );
}
