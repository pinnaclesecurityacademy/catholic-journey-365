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
    <section className="rounded-2xl bg-white border border-parchment-200 p-5">
      <h2 className="font-display text-2xl font-semibold text-leather-600 mb-4">
        {book.name} {chapter ? chapter.number : ''}
      </h2>

      {chapter ? (
        <div className="space-y-2">
          {chapter.verses.map((verse) => (
            <p key={verse.number} className="text-leather-900 leading-relaxed">
              <sup className="text-gold font-semibold mr-1">{verse.number}</sup>
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
