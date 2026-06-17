import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BibleReader } from '../components/BibleReader';
import {
  BibleCategory,
  getBook,
  getCategories,
  getCategoryBooks,
  loadChapter,
  BibleChapter,
  Testament,
} from '../data/bible';
import {
  BibleBookIntroduction,
  BibleSectionIntroduction,
  getBibleBookIntroduction,
  getBibleSectionIntroduction,
} from '../data/bibleFormation';
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

function InfoButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-parchment-200 bg-parchment-50 text-xs font-semibold text-stone-400"
    >
      i
    </button>
  );
}

function FormationIntroCard({
  label,
  intro,
}: {
  label: string;
  intro: BibleBookIntroduction | BibleSectionIntroduction;
}) {
  const title = 'book' in intro ? intro.book : intro.title;

  return (
    <SacredCard className="p-0 overflow-hidden">
      <div className="border-b border-parchment-200 bg-parchment-50/70 px-5 py-4">
        <p className="text-[0.65rem] uppercase tracking-widest text-stone-400">
          {label}
        </p>
        <h3 className="font-display text-xl font-bold text-leather-900 mt-1">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-stone-500">
          {intro.subtitle}
        </p>
      </div>

      <div className="divide-y divide-parchment-200">
        {intro.sections.map((section, index) => (
          <details key={section.heading} open={index === 0} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left">
              <span className="font-semibold text-leather-900">
                {section.heading}
              </span>
              <span
                aria-hidden="true"
                className="text-lg leading-none text-gold transition group-open:rotate-90"
              >
                &rsaquo;
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm leading-relaxed text-stone-600">
              {section.content}
            </p>
          </details>
        ))}
      </div>
    </SacredCard>
  );
}

function SectionInfoModal({
  intro,
  onClose,
}: {
  intro: BibleSectionIntroduction;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end overflow-hidden bg-leather-900/45 px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-16 backdrop-blur-sm sm:items-center sm:justify-center sm:pb-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bible-section-title"
        className="flex max-h-[calc(100dvh-5rem)] w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-parchment-200 bg-parchment-50 shadow-[0_28px_70px_rgba(28,25,23,0.28)]"
      >
        <div className="shrink-0 border-b border-parchment-200 bg-white/75 px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-widest text-stone-400">
                Bible Section
              </p>
              <h2
                id="bible-section-title"
                className="mt-1 font-display text-2xl font-bold text-leather-900"
              >
                {intro.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close section introduction"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-parchment-200 bg-white text-lg leading-none text-leather-600 shadow-sm"
            >
              &times;
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            {intro.subtitle}
          </p>
        </div>

        <div className="min-h-0 flex-1 divide-y divide-parchment-200 overflow-y-auto overscroll-contain pb-[calc(5rem+env(safe-area-inset-bottom))]">
          {intro.sections.map((section, index) => (
            <details key={section.heading} open={index === 0} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left">
                <span className="font-semibold text-leather-900">
                  {section.heading}
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg leading-none text-gold transition group-open:rotate-90"
                >
                  &rsaquo;
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm leading-relaxed text-stone-600">
                {section.content}
              </p>
            </details>
          ))}
        </div>
      </div>
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
  const [sectionInfo, setSectionInfo] = useState<BibleSectionIntroduction | null>(
    null,
  );

  useEffect(() => {
    if (!sectionInfo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sectionInfo]);

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
  const bookIntro = book ? getBibleBookIntroduction(book.id) : undefined;

  function openSectionInfo(category: BibleCategory) {
    const intro = getBibleSectionIntroduction(category.id);
    if (intro) setSectionInfo(intro);
  }

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
                      {getBibleSectionIntroduction(c.id) && (
                        <InfoButton
                          label={`About ${c.name}`}
                          onClick={() => openSectionInfo(c)}
                        />
                      )}
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
          {bookIntro && (
            <section className="mb-7">
              <p className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                Before You Read
              </p>
              <div className="space-y-3">
                <FormationIntroCard label="Book Introduction" intro={bookIntro} />
              </div>
            </section>
          )}

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

      {sectionInfo && (
        <SectionInfoModal
          intro={sectionInfo}
          onClose={() => setSectionInfo(null)}
        />
      )}
    </div>
  );
}
