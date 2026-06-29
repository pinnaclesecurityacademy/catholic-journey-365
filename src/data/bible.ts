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

export interface BibleChapterReference {
  bookId: string;
  chapter: number;
}

// Full Catholic canon (73 books). Chapter counts follow the WEBC numbering
// (e.g. Baruch 6 includes the Letter of Jeremiah; Daniel 14 includes the
// deuterocanonical additions; Esther is the Greek Esther, 10 chapters).
// Reference metadata only.
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
  { id: 'esther', name: 'Esther', testament: 'old', chapterCount: 10 },
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

// --- Bible Library navigation grouping (V3.6) ---
//
// Catholic grouping of the canon into the traditional categories, used only for
// navigation in the Bible Library. Reference metadata only (book ids and short
// category descriptions); no Scripture text. Deuterocanonical books are placed
// in their proper Catholic positions (Tobit, Judith, 1 and 2 Maccabees among
// the Historical Books; Wisdom and Sirach among the Wisdom Books; Baruch among
// the Prophets; the Greek additions to Esther and Daniel are within those books).

export type Testament = 'old' | 'new';

export interface BibleCategory {
  /** Stable id used in navigation, e.g. "pentateuch". */
  id: string;
  /** Display name, e.g. "Pentateuch". */
  name: string;
  /** Testament this category belongs to. */
  testament: Testament;
  /** Short Catholic description of the category (no Scripture text). */
  description: string;
  /** Ordered book ids that belong to this category. */
  bookIds: string[];
}

export const BIBLE_CATEGORIES: BibleCategory[] = [
  {
    id: 'pentateuch',
    name: 'Pentateuch',
    testament: 'old',
    description:
      'The first five books of Moses, telling of creation, the patriarchs, and God forming a people through the covenant and the Law.',
    bookIds: ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'],
  },
  {
    id: 'historical',
    name: 'Historical Books',
    testament: 'old',
    description:
      "The story of God's people in the promised land, from Joshua to the age of the Maccabees.",
    bookIds: [
      'joshua',
      'judges',
      'ruth',
      '1-samuel',
      '2-samuel',
      '1-kings',
      '2-kings',
      '1-chronicles',
      '2-chronicles',
      'ezra',
      'nehemiah',
      'tobit',
      'judith',
      'esther',
      '1-maccabees',
      '2-maccabees',
    ],
  },
  {
    id: 'wisdom',
    name: 'Wisdom Books',
    testament: 'old',
    description:
      'Prayer, poetry, and reflection on how to live wisely before God, including the Psalms prayed by the Church.',
    bookIds: [
      'job',
      'psalms',
      'proverbs',
      'ecclesiastes',
      'song-of-solomon',
      'wisdom',
      'sirach',
    ],
  },
  {
    id: 'prophets',
    name: 'Prophets',
    testament: 'old',
    description:
      "God's messengers calling his people back to faithfulness and pointing forward to the coming of Christ.",
    bookIds: [
      'isaiah',
      'jeremiah',
      'lamentations',
      'baruch',
      'ezekiel',
      'daniel',
      'hosea',
      'joel',
      'amos',
      'obadiah',
      'jonah',
      'micah',
      'nahum',
      'habakkuk',
      'zephaniah',
      'haggai',
      'zechariah',
      'malachi',
    ],
  },
  {
    id: 'gospels',
    name: 'Gospels',
    testament: 'new',
    description:
      'The good news of Jesus Christ, his life, death, and resurrection, told by Matthew, Mark, Luke, and John.',
    bookIds: ['matthew', 'mark', 'luke', 'john'],
  },
  {
    id: 'acts',
    name: 'Acts',
    testament: 'new',
    description:
      'The Acts of the Apostles, the story of the early Church spreading the Gospel by the power of the Holy Spirit.',
    bookIds: ['acts'],
  },
  {
    id: 'letters',
    name: 'Epistles',
    testament: 'new',
    description:
      'Letters of Saint Paul and the other apostles guiding the first Christian communities in faith and love.',
    bookIds: [
      'romans',
      '1-corinthians',
      '2-corinthians',
      'galatians',
      'ephesians',
      'philippians',
      'colossians',
      '1-thessalonians',
      '2-thessalonians',
      '1-timothy',
      '2-timothy',
      'titus',
      'philemon',
      'hebrews',
      'james',
      '1-peter',
      '2-peter',
      '1-john',
      '2-john',
      '3-john',
      'jude',
    ],
  },
  {
    id: 'revelation',
    name: 'Revelation',
    testament: 'new',
    description:
      "A vision of hope, Christ's final victory, and the promise of a new heaven and a new earth.",
    bookIds: ['revelation'],
  },
];

/** Categories for a testament, in canonical order. */
export function getCategories(testament: Testament): BibleCategory[] {
  return BIBLE_CATEGORIES.filter((c) => c.testament === testament);
}

/** A single category by id, or undefined if not found. */
export function getCategory(categoryId: string): BibleCategory | undefined {
  return BIBLE_CATEGORIES.find((c) => c.id === categoryId);
}

/** The books belonging to a category, in canonical order. */
export function getCategoryBooks(categoryId: string): BibleBook[] {
  const category = getCategory(categoryId);
  if (!category) return [];
  return category.bookIds
    .map((id) => getBook(id))
    .filter((b): b is BibleBook => Boolean(b));
}

// --- Reading reference parsing (Bible Journey integration, V3.3) ---
//
// Turns a Journey day's reading references (e.g. "Genesis 1-2", "Psalm 19",
// "Proverbs 1:1-7", "Esther 15, 6-7", "2 John, 3 John") into an ordered list of
// chapter steps for the one-chapter-at-a-time Scripture flow. This does not
// define readings; it only interprets the existing Journey plan strings.

export interface ReadingStep {
  bookId: string;
  chapter: number;
}

// Book names sorted longest-first so multi-word names ("Song of Solomon",
// "1 Kings") match before shorter ones. "Psalm" is an alias for "Psalms".
const REFERENCE_BOOK_NAMES = [...BIBLE_BOOKS.map((b) => b.name), 'Psalm'].sort(
  (a, b) => b.length - a.length,
);

function resolveBookId(name: string): string | undefined {
  const key = name.toLowerCase();
  if (key === 'psalm') return 'psalms';
  return BIBLE_BOOKS.find((b) => b.name.toLowerCase() === key)?.id;
}

// Expands the chapter portion of a reference (the part after the book name).
// "19" -> [19]; "1-2" -> [1,2]; "1:1-7" -> [1] (verse range, one chapter);
// "" -> [1] (single-chapter books with no number).
function parseChapters(rest: string, maxChapter: number): number[] {
  const text = rest.trim();
  if (!text) return [1];
  if (text.includes(':')) {
    const ch = parseInt(text, 10);
    return Number.isNaN(ch) ? [] : [ch];
  }
  const range = text.match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) {
    const start = parseInt(range[1], 10);
    const end = parseInt(range[2], 10);
    const out: number[] = [];
    for (let i = start; i <= end && i <= maxChapter; i += 1) out.push(i);
    return out;
  }
  const single = parseInt(text, 10);
  return Number.isNaN(single) ? [] : [single];
}

/**
 * Parses one reading field into ordered chapter steps. Comma-separated parts
 * either name a new book or continue the previous book (e.g. "Esther 15, 6-7").
 */
export function parseReadingReference(field: string): ReadingStep[] {
  const steps: ReadingStep[] = [];
  if (!field || !field.trim()) return steps;

  let currentBookId: string | undefined;
  const segments = field
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  for (const segment of segments) {
    let bookId: string | undefined;
    let rest = segment;
    const lower = segment.toLowerCase();
    for (const name of REFERENCE_BOOK_NAMES) {
      const n = name.toLowerCase();
      if (lower === n || lower.startsWith(`${n} `)) {
        bookId = resolveBookId(name);
        rest = segment.slice(name.length).trim();
        break;
      }
    }
    if (bookId) currentBookId = bookId;
    const id = bookId ?? currentBookId;
    if (!id) continue;
    const book = getBook(id);
    if (!book) continue;
    for (const chapter of parseChapters(rest, book.chapterCount)) {
      steps.push({ bookId: id, chapter });
    }
  }
  return steps;
}

/**
 * Builds the full ordered chapter sequence for a Journey day from its existing
 * reading fields (reading_one, reading_two, psalm_proverb).
 */
export function getReadingSteps(fields: {
  reading_one?: string;
  reading_two?: string;
  psalm_proverb?: string;
}): ReadingStep[] {
  return [fields.reading_one, fields.reading_two, fields.psalm_proverb]
    .filter((f): f is string => Boolean(f && f.trim()))
    .flatMap(parseReadingReference);
}

/** Returns the list of books, optionally filtered by testament. */
export function getBooks(testament?: 'old' | 'new'): BibleBook[] {
  if (!testament) return BIBLE_BOOKS;
  return BIBLE_BOOKS.filter((b) => b.testament === testament);
}

/** Returns a single book by id, or undefined if not found. */
export function getBook(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

/** Returns the next chapter in canonical order, or null at the end. */
export function getNextChapterReference(
  bookId: string,
  chapter: number,
): BibleChapterReference | null {
  const bookIndex = BIBLE_BOOKS.findIndex((b) => b.id === bookId);
  if (bookIndex === -1) return null;

  const book = BIBLE_BOOKS[bookIndex];
  const currentChapter = Math.floor(chapter);
  if (
    !Number.isFinite(currentChapter) ||
    currentChapter < 1 ||
    currentChapter > book.chapterCount
  ) {
    return null;
  }

  if (currentChapter < book.chapterCount) {
    return { bookId: book.id, chapter: currentChapter + 1 };
  }

  const nextBook = BIBLE_BOOKS[bookIndex + 1];
  return nextBook ? { bookId: nextBook.id, chapter: 1 } : null;
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
