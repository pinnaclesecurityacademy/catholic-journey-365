import { BibleBook, BibleChapter } from '../data/bible';

// Reusable Bible reader display (V3.3 framework only).
// Presentation only: it renders whatever book/chapter is passed in. All data
// loading and selection logic lives in the page that uses it.

export function BibleReader({
  book,
  chapter,
}: {
  book: BibleBook;
  chapter: BibleChapter | null;
}) {
  return (
    <section className="rounded-2xl bg-white border border-parchment-200 p-6">
      <header className="mb-5">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          {book.name}
        </p>
        {chapter && (
          <h2 className="font-display text-2xl font-semibold text-leather-600 mt-1">
            Chapter {chapter.number}
          </h2>
        )}
      </header>

      {chapter ? (
        <div className="space-y-3">
          {chapter.verses.map((verse) => (
            <p
              key={verse.number}
              className="text-leather-900 text-[1.0625rem] leading-loose"
            >
              <sup className="text-gold/80 text-[0.625rem] font-semibold align-super mr-1.5 select-none">
                {verse.number}
              </sup>
              {verse.text}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-leather-900 leading-relaxed italic">
          This chapter is not available yet.
        </p>
      )}
    </section>
  );
}
