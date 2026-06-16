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
import { SacredCard } from '../components/SacredCard';

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
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-parchment-200 bg-parchment-50 text-xs font-semibold text-stone-400"
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
    <div className="mx-auto max-w-md px-4 pt-5 pb-12">
      <button
        onClick={goBack}
        className="mb-5 rounded-xl border border-parchment-200 bg-white/80 px-4 py-2 text-sm font-semibold text-leather-600 shadow-[0_10px_28px_rgba(74,55,40,0.07)] transition active:scale-[0.99]"
      >
        &larr; Back
      </button>

      <header className="mb-6 px-1">
        {view !== 'home' && (
          <p className="text-xs uppercase tracking-widest text-stone-400">
            {book?.name ?? 'Sacred Scripture'}
          </p>
        )}
        <h1 className="font-display text-3xl font-bold text-leather-900 mt-1">
          {heading}
        </h1>
        {view === 'home' && (
          <p className="text-stone-500 leading-relaxed mt-2">
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
                  <SacredCard
                    key={c.id}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="font-display text-xl font-bold text-leather-900">
                        {c.name}
                      </h2>
                      <InfoButton />
                    </div>
                    <div className="divide-y divide-parchment-200">
                      {getCategoryBooks(c.id).map((b) => (
                        <button
                          key={b.id}
                          onClick={() => openBook(b.id)}
                          className="w-full flex items-center justify-between py-3 text-left active:scale-[0.99] transition"
                        >
                          <span className="font-medium text-leather-900">
                            {b.name}
                          </span>
                          <span aria-hidden="true" className="text-leather-600">
                            &rsaquo;
                          </span>
                        </button>
                      ))}
                    </div>
                  </SacredCard>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Book: choose a chapter (large, comfortable tap targets) */}
      {view === 'chapters' && book && (
        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-3">
            Chapters
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {Array.from({ length: book.chapterCount }, (_, i) => i + 1).map(
              (n) => (
                <button
                  key={n}
                  onClick={() => openChapter(n)}
                  className="flex h-14 min-w-[3.5rem] items-center justify-center rounded-2xl border border-parchment-200 bg-white/90 text-xl font-semibold text-leather-900 shadow-[0_10px_28px_rgba(74,55,40,0.07)] transition active:scale-[0.97]"
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
          <SacredCard>
            <p className="text-leather-900 leading-relaxed italic">Loading...</p>
          </SacredCard>
        ) : (
          <BibleReader book={book} chapter={chapter} />
        ))}
    </div>
  );
}
