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

/** A visual info button (display only for now, no modal/content yet). */
function InfoButton() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-parchment-200 text-xs font-semibold text-stone-400"
    >
      i
    </span>
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
        {view !== 'home' && (
          <p className="text-xs uppercase tracking-widest text-stone-400">
            {book?.name ?? 'Sacred Scripture'}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          {heading}
        </h1>
        {view === 'home' && (
          <p className="text-leather-900 leading-relaxed mt-3">
            Read the Word of God through the Old and New Testaments. Choose a
            book to begin.
          </p>
        )}
      </header>

      {/* Home: parchment category cards, each holding tappable book rows */}
      {view === 'home' && (
        <div className="space-y-8">
          {testaments.map((t) => (
            <section key={t}>
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                {TESTAMENT_LABEL[t]}
              </p>
              <div className="space-y-3">
                {getCategories(t).map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl bg-white border border-parchment-200 p-5"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-display text-lg font-semibold text-leather-900">
                        {c.name}
                      </h3>
                      <InfoButton />
                    </div>
                    <div className="space-y-1">
                      {getCategoryBooks(c.id).map((b) => (
                        <button
                          key={b.id}
                          onClick={() => openBook(b.id)}
                          className="w-full flex items-center gap-3 rounded-xl px-2 py-3 text-left active:scale-[0.99] transition"
                        >
                          <span aria-hidden="true" className="text-lg">
                            📖
                          </span>
                          <span className="flex-1 font-medium text-leather-900">
                            {b.name}
                          </span>
                          <span aria-hidden="true" className="text-leather-600">
                            ›
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
