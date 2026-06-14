// Bible reader data source (V3.3 framework only).
//
// This module defines the SHAPE of the in-app Bible and exposes simple
// accessor functions the reader UI builds on. It intentionally contains only
// a tiny amount of PLACEHOLDER sample text so the reader can be developed and
// reviewed before the full Scripture text is sourced and added later.
//
// Real Bible text is large. When it is added it should live in separate data
// files loaded on demand (per book/chapter) rather than being inlined here, so
// the app never loads the whole Bible into memory at once. The accessor
// functions below are the seam where that loader will plug in.

export interface BibleVerse {
  /** Verse number within the chapter (1-based). */
  number: number;
  /** Verse text. */
  text: string;
}

export interface BibleChapter {
  /** Chapter number within the book (1-based). */
  number: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  /** Stable id used in routes, e.g. "genesis". */
  id: string;
  /** Display name, e.g. "Genesis". */
  name: string;
  /** Testament grouping for navigation. */
  testament: 'old' | 'new';
  /** Total number of chapters in the book. */
  chapterCount: number;
}

// Placeholder catalogue. Only a couple of books are listed so the navigation
// framework can be exercised. The real catalogue will cover all 73 books of
// the Catholic canon.
export const BIBLE_BOOKS: BibleBook[] = [
  { id: 'genesis', name: 'Genesis', testament: 'old', chapterCount: 1 },
  { id: 'john', name: 'John', testament: 'new', chapterCount: 1 },
];

// Placeholder chapter text, keyed by `${bookId}:${chapter}`. This is sample
// wording only, NOT canonical Scripture, and exists purely to render the
// reader. It will be removed when real text is loaded.
const SAMPLE_CHAPTERS: Record<string, BibleVerse[]> = {
  'genesis:1': [
    { number: 1, text: 'Sample verse text. Scripture will be added later.' },
    { number: 2, text: 'Sample verse text. Scripture will be added later.' },
    { number: 3, text: 'Sample verse text. Scripture will be added later.' },
  ],
  'john:1': [
    { number: 1, text: 'Sample verse text. Scripture will be added later.' },
    { number: 2, text: 'Sample verse text. Scripture will be added later.' },
  ],
};

/** Returns the list of books, optionally filtered by testament. */
export function getBooks(testament?: 'old' | 'new'): BibleBook[] {
  if (!testament) return BIBLE_BOOKS;
  return BIBLE_BOOKS.filter((b) => b.testament === testament);
}

/** Returns a single book by id, or undefined if not found. */
export function getBook(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

/**
 * Returns a chapter (its verses) for the given book and chapter number, or
 * null if not available. This is the seam where an on-demand loader for the
 * real Scripture text will plug in.
 */
export function getChapter(
  bookId: string,
  chapter: number,
): BibleChapter | null {
  const verses = SAMPLE_CHAPTERS[`${bookId}:${chapter}`];
  if (!verses) return null;
  return { number: chapter, verses };
}
