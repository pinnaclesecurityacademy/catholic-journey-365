// Bible reader data source (V3.3).
//
// Translation: World English Bible, Catholic Edition (WEBC), public domain.
//
// Storage model: Scripture text is NOT inlined in this module. Each chapter is
// a separate static JSON file under `public/bible/<bookId>/<chapter>.json` and
// is fetched on demand, so the app only ever holds the requested chapter in
// memory (never the whole Bible). The catalogue below is reference metadata
// only (book ids, names, testament, chapter counts) and contains no Scripture.
//
// Chapter file format (public/bible/<bookId>/<chapter>.json):
//   { "verses": [ { "number": 1, "text": "..." }, ... ] }

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
  /** Stable id used in routes and file paths, e.g. "genesis". */
  id: string;
  /** Display name, e.g. "Genesis". */
  name: string;
  /** Testament grouping for navigation. */
  testament: 'old' | 'new';
  /** Total number of chapters in the book. */
  chapterCount: number;
}

// Full Catholic canon (73 books). Chapter counts follow the WEBC numbering
// (e.g. Baruch 6 includes the Letter of Jeremiah; Daniel 14 and Esther 16
// include the deuterocanonical additions). Reference metadata only.
export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (46)
  { id: 'genesis', name: 'Genesis', testament: 'old', chapterCount: 50 },
  { id: 'exodus', name: 'Exodus', testament: 'old', chapterCount: 40 },
  { id: 'leviticus', name: 'Leviticus', testament: 'old', chapterCount: 27 },
  { id: 'numbers', name: 'Numbers', testament: 'old', chapterCount: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'old', chapterCount: 34 },
  { id: 'joshua', name: 'Joshua', testament: 'old', chapterCount: 24 },
  { id: 'judges', name: 'Judges', testament: 'old', chapterCount: 21 },
  { id: 'ruth', name: 'Ruth', testament: 'old', chapterCount: 4 },
  { id: '1-samuel', name: '1 Samuel', testament: 'old', chapterCount: 31 },
  { id: '2-samuel', name: '2 Samuel', testament: 'old', chapterCount: 24 },
  { id: '1-kings', name: '1 Kings', testament: 'old', chapterCount: 22 },
  { id: '2-kings', name: '2 Kings', testament: 'old', chapterCount: 25 },
  { id: '1-chronicles', name: '1 Chronicles', testament: 'old', chapterCount: 29 },
  { id: '2-chronicles', name: '2 Chronicles', testament: 'old', chapterCount: 36 },
  { id: 'ezra', name: 'Ezra', testament: 'old', chapterCount: 10 },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'old', chapterCount: 13 },
  { id: 'tobit', name: 'Tobit', testament: 'old', chapterCount: 14 },
  { id: 'judith', name: 'Judith', testament: 'old', chapterCount: 16 },
  { id: 'esther', name: 'Esther', testament: 'old', chapterCount: 16 },
  { id: '1-maccabees', name: '1 Maccabees', testament: 'old', chapterCount: 16 },
  { id: '2-maccabees', name: '2 Maccabees', testament: 'old', chapterCount: 15 },
  { id: 'job', name: 'Job', testament: 'old', chapterCount: 42 },
  { id: 'psalms', name: 'Psalms', testament: 'old', chapterCount: 150 },
  { id: 'proverbs', name: 'Proverbs', testament: 'old', chapterCount: 31 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'old', chapterCount: 12 },
  { id: 'song-of-solomon', name: 'Song of Solomon', testament: 'old', chapterCount: 8 },
  { id: 'wisdom', name: 'Wisdom', testament: 'old', chapterCount: 19 },
  { id: 'sirach', name: 'Sirach', testament: 'old', chapterCount: 51 },
  { id: 'isaiah', name: 'Isaiah', testament: 'old', chapterCount: 66 },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'old', chapterCount: 52 },
  { id: 'lamentations', name: 'Lamentations', testament: 'old', chapterCount: 5 },
  { id: 'baruch', name: 'Baruch', testament: 'old', chapterCount: 6 },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'old', chapterCount: 48 },
  { id: 'daniel', name: 'Daniel', testament: 'old', chapterCount: 14 },
  { id: 'hosea', name: 'Hosea', testament: 'old', chapterCount: 14 },
  { id: 'joel', name: 'Joel', testament: 'old', chapterCount: 3 },
  { id: 'amos', name: 'Amos', testament: 'old', chapterCount: 9 },
  { id: 'obadiah', name: 'Obadiah', testament: 'old', chapterCount: 1 },
  { id: 'jonah', name: 'Jonah', testament: 'old', chapterCount: 4 },
  { id: 'micah', name: 'Micah', testament: 'old', chapterCount: 7 },
  { id: 'nahum', name: 'Nahum', testament: 'old', chapterCount: 3 },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'old', chapterCount: 3 },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'old', chapterCount: 3 },
  { id: 'haggai', name: 'Haggai', testament: 'old', chapterCount: 2 },
  { id: 'zechariah', name: 'Zechariah', testament: 'old', chapterCount: 14 },
  { id: 'malachi', name: 'Malachi', testament: 'old', chapterCount: 4 },
  // New Testament (27)
  { id: 'matthew', name: 'Matthew', testament: 'new', chapterCount: 28 },
  { id: 'mark', name: 'Mark', testament: 'new', chapterCount: 16 },
  { id: 'luke', name: 'Luke', testament: 'new', chapterCount: 24 },
  { id: 'john', name: 'John', testament: 'new', chapterCount: 21 },
  { id: 'acts', name: 'Acts', testament: 'new', chapterCount: 28 },
  { id: 'romans', name: 'Romans', testament: 'new', chapterCount: 16 },
  { id: '1-corinthians', name: '1 Corinthians', testament: 'new', chapterCount: 16 },
  { id: '2-corinthians', name: '2 Corinthians', testament: 'new', chapterCount: 13 },
  { id: 'galatians', name: 'Galatians', testament: 'new', chapterCount: 6 },
  { id: 'ephesians', name: 'Ephesians', testament: 'new', chapterCount: 6 },
  { id: 'philippians', name: 'Philippians', testament: 'new', chapterCount: 4 },
  { id: 'colossians', name: 'Colossians', testament: 'new', chapterCount: 4 },
  { id: '1-thessalonians', name: '1 Thessalonians', testament: 'new', chapterCount: 5 },
  { id: '2-thessalonians', name: '2 Thessalonians', testament: 'new', chapterCount: 3 },
  { id: '1-timothy', name: '1 Timothy', testament: 'new', chapterCount: 6 },
  { id: '2-timothy', name: '2 Timothy', testament: 'new', chapterCount: 4 },
  { id: 'titus', name: 'Titus', testament: 'new', chapterCount: 3 },
  { id: 'philemon', name: 'Philemon', testament: 'new', chapterCount: 1 },
  { id: 'hebrews', name: 'Hebrews', testament: 'new', chapterCount: 13 },
  { id: 'james', name: 'James', testament: 'new', chapterCount: 5 },
  { id: '1-peter', name: '1 Peter', testament: 'new', chapterCount: 5 },
  { id: '2-peter', name: '2 Peter', testament: 'new', chapterCount: 3 },
  { id: '1-john', name: '1 John', testament: 'new', chapterCount: 5 },
  { id: '2-john', name: '2 John', testament: 'new', chapterCount: 1 },
  { id: '3-john', name: '3 John', testament: 'new', chapterCount: 1 },
  { id: 'jude', name: 'Jude', testament: 'new', chapterCount: 1 },
  { id: 'revelation', name: 'Revelation', testament: 'new', chapterCount: 22 },
];

/** Returns the list of books, optionally filtered by testament. */
export function getBooks(testament?: 'old' | 'new'): BibleBook[] {
  if (!testament) return BIBLE_BOOKS;
  return BIBLE_BOOKS.filter((b) => b.testament === testament);
}

/** Returns a single book by id, or undefined if not found. */
export function getBook(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

// In-memory cache of chapters already fetched, keyed by `${bookId}:${chapter}`.
// Keeps repeat reads instant without ever holding more than what was opened.
const chapterCache = new Map<string, BibleChapter>();

/** Builds the public URL for a chapter's static JSON file. */
function chapterUrl(bookId: string, chapter: number): string {
  const base = process.env.PUBLIC_URL ?? '';
  return `${base}/bible/${bookId}/${chapter}.json`;
}

/**
 * Lazily loads a single chapter's verses from its static JSON file. Returns the
 * chapter, or null if the book/chapter is invalid or the file is not present
 * yet. Only the requested chapter is fetched and cached.
 */
export async function loadChapter(
  bookId: string,
  chapter: number,
): Promise<BibleChapter | null> {
  const book = getBook(bookId);
  if (!book || chapter < 1 || chapter > book.chapterCount) return null;

  const key = `${bookId}:${chapter}`;
  const cached = chapterCache.get(key);
  if (cached) return cached;

  try {
    const res = await fetch(chapterUrl(bookId, chapter));
    if (!res.ok) return null;
    const data = (await res.json()) as { verses?: BibleVerse[] };
    if (!data.verses) return null;
    const loaded: BibleChapter = { number: chapter, verses: data.verses };
    chapterCache.set(key, loaded);
    return loaded;
  } catch {
    return null;
  }
}
