import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import {
  getBook,
  getCategories,
  getCategoryBooks,
  loadChapter,
  BibleChapter,
  Testament,
} from '../data/bible';

// Bible Library (route: /bible), V3.6.1 access polish.
//
// A faster path into Sacred Scripture:
//   home (books grouped by category) -> chapter picker -> reader
//
// The reader itself (BibleReader) and lazy chapter loading (loadChapter) are
// reused unchanged, so the existing reader behaviour and one-chapter-at-a-time
// loading are preserved. No Scripture text is bundled here. WEBC attribution
// continues to live in the reader.

type View = 'home' | 'chapters' | 'reader';

const TESTAMENT_LABEL: Record<Testament, string> = {
  old: 'Old Testament',
  new: 'New Testament',
};

/** A category heading with a visual info button (no content yet, V3.6.1). */
function CategoryHeading({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 mt-7 mb-3 first:mt-0">
      <h3 className="font-display text-base font-semibold text-leather-900">
        {name}
      </h3>
      <span
        aria-hidden="true"
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-parchment-200 text-[10px] font-semibold text-stone-400"
      >
        i
      </span>
    </div>
  );
}

export default function Bible() {
  const navigate = useNavigate();

  const [view, setView] = useState<View>('home');
  const [bookId, setBookId] = useState<string>('');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const book = getBook(bookId);

  // Lazily load only the requested chapter, and only while the reader is shown.
  useEffect(() => {
    let active = true;
    if (view !== 'reader' || !book) return;
    setLoading(true);
    loadChapter(book.id, chapterNumber).then((result) => {
      if (!active) return;
      setChapter(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [view, book, chapterNumber]);

  // Contextual back: step one level up the library, or leave the tab from home.
  function goBack() {
    if (view === 'reader') return setView('chapters');
    if (view === 'chapters') return setView('home');
    navigate(-1);
  }

  function openBook(id: string) {
    setBookId(id);
    setChapterNumber(1);
    setView('chapters');
  }

  function openChapter(n: number) {
    setChapterNumber(n);
    setView('reader');
  }

  // Header label changes with depth, matching the existing reverent style.
  const eyebrow = view === 'home' ? 'Holy Bible' : book?.name ?? 'Sacred Scripture';

  const heading = view === 'home' ? 'Sacred Scripture' : book?.name ?? '';

  const testaments: Testament[] = ['old', 'new'];

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={goBack}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          {heading}
        </h1>
        {view === 'home' && (
          <p className="text-leather-900 leading-relaxed mt-3">
            The Word of God in the Old and New Testaments, given to the Church
            to lead us to Jesus Christ. Choose a book to begin.
          </p>
        )}
      </header>

      {/* Home: books grouped by testament and category */}
      {view === 'home' && (
        <div className="space-y-8">
          {testaments.map((t) => (
            <section key={t}>
              <p className="text-xs uppercase tracking-widest text-stone-400 border-b border-parchment-200 pb-2">
                {TESTAMENT_LABEL[t]}
              </p>
              {getCategories(t).map((c) => (
                <div key={c.id}>
                  <CategoryHeading name={c.name} />
                  <div className="flex flex-wrap gap-2">
                    {getCategoryBooks(c.id).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => openBook(b.id)}
                        className="rounded-full border px-4 py-2 text-sm bg-white text-leather-900 border-parchment-200 active:scale-[0.99] transition"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </div>
      )}

      {/* Book: choose a chapter */}
      {view === 'chapters' && book && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
            Chapter
          </label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: book.chapterCount }, (_, i) => i + 1).map(
              (n) => (
                <button
                  key={n}
                  onClick={() => openChapter(n)}
                  className="rounded-full border px-4 py-2 text-sm bg-white text-leather-900 border-parchment-200 active:scale-[0.99] transition"
                >
                  {n}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {/* Reader: the existing BibleReader, lazily loaded */}
      {view === 'reader' &&
        book &&
        (loading ? (
          <section className="rounded-2xl bg-white border border-parchment-200 p-5">
            <p className="text-leather-900 leading-relaxed italic">Loading…</p>
          </section>
        ) : (
          <BibleReader book={book} chapter={chapter} />
        ))}
    </div>
  );
}
