import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import {
  getBook,
  getCategories,
  getCategory,
  getCategoryBooks,
  loadChapter,
  BibleChapter,
  Testament,
} from '../data/bible';

// Bible Library (route: /bible), V3.6 navigation foundation.
//
// A browsable path into Sacred Scripture:
//   home -> testament -> category -> book -> chapter -> reader
//
// The reader itself (BibleReader) and lazy chapter loading (loadChapter) are
// reused unchanged, so the existing reader behaviour and one-chapter-at-a-time
// loading are preserved. No Scripture text is bundled here.

type View = 'home' | 'testament' | 'category' | 'chapters' | 'reader';

const TESTAMENT_LABEL: Record<Testament, string> = {
  old: 'Old Testament',
  new: 'New Testament',
};

/** A tappable card used throughout the library (title plus optional blurb). */
function NavCard({
  title,
  description,
  onClick,
}: {
  title: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white border border-parchment-200 p-5 active:scale-[0.99] transition"
    >
      <h2 className="font-display text-lg font-semibold text-leather-900">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-stone-500 leading-relaxed">
          {description}
        </p>
      )}
    </button>
  );
}

export default function Bible() {
  const navigate = useNavigate();

  const [view, setView] = useState<View>('home');
  const [testament, setTestament] = useState<Testament>('old');
  const [categoryId, setCategoryId] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const category = getCategory(categoryId);
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
    if (view === 'chapters') return setView('category');
    if (view === 'category') return setView('testament');
    if (view === 'testament') return setView('home');
    navigate(-1);
  }

  function openTestament(t: Testament) {
    setTestament(t);
    setView('testament');
  }

  function openCategory(id: string) {
    setCategoryId(id);
    setView('category');
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
  const eyebrow =
    view === 'home'
      ? 'Holy Bible'
      : view === 'testament'
      ? TESTAMENT_LABEL[testament]
      : view === 'category'
      ? category?.name ?? 'Sacred Scripture'
      : book?.name ?? 'Sacred Scripture';

  const heading =
    view === 'home'
      ? 'Sacred Scripture'
      : view === 'testament'
      ? TESTAMENT_LABEL[testament]
      : view === 'category'
      ? category?.name ?? ''
      : book?.name ?? '';

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
            to lead us to Jesus Christ. Choose a testament to begin.
          </p>
        )}
        {view === 'category' && category && (
          <p className="text-sm text-stone-500 leading-relaxed mt-3">
            {category.description}
          </p>
        )}
      </header>

      {/* Home: choose a testament */}
      {view === 'home' && (
        <div className="space-y-3">
          <NavCard
            title="Old Testament"
            description="From creation and the covenant with Israel to the prophets who awaited the Messiah."
            onClick={() => openTestament('old')}
          />
          <NavCard
            title="New Testament"
            description="The life of Jesus Christ and the faith of the early Church, the fulfilment of God's promises."
            onClick={() => openTestament('new')}
          />
        </div>
      )}

      {/* Testament: choose a category */}
      {view === 'testament' && (
        <div className="space-y-3">
          {getCategories(testament).map((c) => (
            <NavCard
              key={c.id}
              title={c.name}
              description={c.description}
              onClick={() => openCategory(c.id)}
            />
          ))}
        </div>
      )}

      {/* Category: choose a book */}
      {view === 'category' && (
        <div className="flex flex-wrap gap-2">
          {getCategoryBooks(categoryId).map((b) => (
            <button
              key={b.id}
              onClick={() => openBook(b.id)}
              className="rounded-full border px-4 py-2 text-sm bg-white text-leather-900 border-parchment-200 active:scale-[0.99] transition"
            >
              {b.name}
            </button>
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
