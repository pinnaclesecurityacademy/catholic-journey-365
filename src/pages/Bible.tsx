import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import { getBooks, getBook, loadChapter, BibleChapter } from '../data/bible';

// In-app Bible reader page (route: /bible).
// Lets the reader pick a book and chapter, then displays the verses via the
// shared BibleReader component. Chapters are lazily loaded from static files.

export default function Bible() {
  const navigate = useNavigate();
  const books = getBooks();

  const [bookId, setBookId] = useState(books[0]?.id ?? '');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const book = getBook(bookId);

  // Lazily load only the requested chapter whenever the selection changes.
  useEffect(() => {
    let active = true;
    if (!book) {
      setChapter(null);
      return;
    }
    setLoading(true);
    loadChapter(book.id, chapterNumber).then((result) => {
      if (!active) return;
      setChapter(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [book, chapterNumber]);

  function selectBook(id: string) {
    setBookId(id);
    setChapterNumber(1);
  }

  return (
    <div className="max-w-md mx-auto px-5 pt-6 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="text-leather-600 font-medium mb-6"
      >
        ← Back
      </button>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-stone-400">
          Holy Bible
        </p>
        <h1 className="font-display text-4xl font-bold text-leather-600 leading-tight mt-1">
          Read Scripture
        </h1>
      </header>

      {/* Book selector */}
      <div className="mb-4">
        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
          Book
        </label>
        <div className="flex flex-wrap gap-2">
          {books.map((b) => (
            <button
              key={b.id}
              onClick={() => selectBook(b.id)}
              className={`rounded-full border px-4 py-2 text-sm ${
                b.id === bookId
                  ? 'bg-leather-600 text-white border-leather-600'
                  : 'bg-white text-leather-900 border-parchment-200'
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chapter selector */}
      {book && (
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
            Chapter
          </label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: book.chapterCount }, (_, i) => i + 1).map(
              (n) => (
                <button
                  key={n}
                  onClick={() => setChapterNumber(n)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    n === chapterNumber
                      ? 'bg-leather-600 text-white border-leather-600'
                      : 'bg-white text-leather-900 border-parchment-200'
                  }`}
                >
                  {n}
                </button>
              ),
            )}
          </div>
        </div>
      )}

      {book && loading ? (
        <section className="rounded-2xl bg-white border border-parchment-200 p-5">
          <p className="text-leather-900 leading-relaxed italic">Loading…</p>
        </section>
      ) : book ? (
        <BibleReader book={book} chapter={chapter} />
      ) : (
        <section className="rounded-2xl bg-white border border-parchment-200 p-5">
          <p className="text-leather-900 leading-relaxed">
            The Bible reader will appear here.
          </p>
        </section>
      )}
    </div>
  );
}
