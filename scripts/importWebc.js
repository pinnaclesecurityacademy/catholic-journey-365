/* eslint-disable */
// One-off importer for the World English Bible, Catholic Edition (WEBC).
//
// Source: bible.helloao.org Free Use Bible API, translation `eng_webc`
//   (World English Bible (Catholic), public domain — https://ebible.org/eng-web-c/).
//
// Writes one static chapter file per chapter to:
//   public/bible/<bookId>/<chapter>.json   ->  { "verses": [ { number, text } ] }
//
// matching the book ids in src/data/bible.ts. Run with: node scripts/importWebc.js
// This script does not modify wording; it only extracts verse text verbatim.

const fs = require('fs');
const path = require('path');

const API = 'https://bible.helloao.org/api/eng_webc';
const OUT = path.join(__dirname, '..', 'public', 'bible');

// [ sourceBookId, destBookId, chapterCount ] for the full Catholic canon (73).
const BOOKS = [
  ['GEN', 'genesis', 50], ['EXO', 'exodus', 40], ['LEV', 'leviticus', 27],
  ['NUM', 'numbers', 36], ['DEU', 'deuteronomy', 34], ['JOS', 'joshua', 24],
  ['JDG', 'judges', 21], ['RUT', 'ruth', 4], ['1SA', '1-samuel', 31],
  ['2SA', '2-samuel', 24], ['1KI', '1-kings', 22], ['2KI', '2-kings', 25],
  ['1CH', '1-chronicles', 29], ['2CH', '2-chronicles', 36], ['EZR', 'ezra', 10],
  ['NEH', 'nehemiah', 13], ['TOB', 'tobit', 14], ['JDT', 'judith', 16],
  ['ESG', 'esther', 10], ['1MA', '1-maccabees', 16], ['2MA', '2-maccabees', 15],
  ['JOB', 'job', 42], ['PSA', 'psalms', 150], ['PRO', 'proverbs', 31],
  ['ECC', 'ecclesiastes', 12], ['SNG', 'song-of-solomon', 8], ['WIS', 'wisdom', 19],
  ['SIR', 'sirach', 51], ['ISA', 'isaiah', 66], ['JER', 'jeremiah', 52],
  ['LAM', 'lamentations', 5], ['BAR', 'baruch', 6], ['EZK', 'ezekiel', 48],
  ['DAG', 'daniel', 14], ['HOS', 'hosea', 14], ['JOL', 'joel', 3],
  ['AMO', 'amos', 9], ['OBA', 'obadiah', 1], ['JON', 'jonah', 4],
  ['MIC', 'micah', 7], ['NAM', 'nahum', 3], ['HAB', 'habakkuk', 3],
  ['ZEP', 'zephaniah', 3], ['HAG', 'haggai', 2], ['ZEC', 'zechariah', 14],
  ['MAL', 'malachi', 4], ['MAT', 'matthew', 28], ['MRK', 'mark', 16],
  ['LUK', 'luke', 24], ['JHN', 'john', 21], ['ACT', 'acts', 28],
  ['ROM', 'romans', 16], ['1CO', '1-corinthians', 16], ['2CO', '2-corinthians', 13],
  ['GAL', 'galatians', 6], ['EPH', 'ephesians', 6], ['PHP', 'philippians', 4],
  ['COL', 'colossians', 4], ['1TH', '1-thessalonians', 5], ['2TH', '2-thessalonians', 3],
  ['1TI', '1-timothy', 6], ['2TI', '2-timothy', 4], ['TIT', 'titus', 3],
  ['PHM', 'philemon', 1], ['HEB', 'hebrews', 13], ['JAS', 'james', 5],
  ['1PE', '1-peter', 5], ['2PE', '2-peter', 3], ['1JN', '1-john', 5],
  ['2JN', '2-john', 1], ['3JN', '3-john', 1], ['JUD', 'jude', 1],
  ['REV', 'revelation', 22],
];

// Join a verse's content array into plain text, verbatim. Strings are kept as
// they are; objects carrying display text (e.g. poetry lines) contribute their
// `.text`; footnote markers and other non-text objects are skipped.
function verseText(content) {
  const parts = [];
  for (const item of content || []) {
    if (typeof item === 'string') parts.push(item);
    else if (item && typeof item === 'object' && typeof item.text === 'string')
      parts.push(item.text);
  }
  return parts.join(' ').replace(/\s+/g, ' ').trim();
}

async function fetchJson(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (_) {}
    await new Promise((r) => setTimeout(r, 400 * (i + 1)));
  }
  throw new Error('failed: ' + url);
}

async function importChapter(src, dest, ch) {
  const data = await fetchJson(`${API}/${src}/${ch}.json`);
  const verses = [];
  for (const node of data.chapter.content) {
    if (node.type === 'verse') {
      verses.push({ number: node.number, text: verseText(node.content) });
    }
  }
  const dir = path.join(OUT, dest);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, `${ch}.json`),
    JSON.stringify({ verses }, null, 2) + '\n',
  );
  return verses.length;
}

async function main() {
  let files = 0;
  let verses = 0;
  for (const [src, dest, count] of BOOKS) {
    // Modest concurrency per book keeps it fast without hammering the API.
    const jobs = [];
    for (let ch = 1; ch <= count; ch++) jobs.push([src, dest, ch]);
    const POOL = 8;
    for (let i = 0; i < jobs.length; i += POOL) {
      const slice = jobs.slice(i, i + POOL);
      const counts = await Promise.all(
        slice.map(([s, d, c]) => importChapter(s, d, c)),
      );
      files += counts.length;
      verses += counts.reduce((a, b) => a + b, 0);
    }
    process.stdout.write(`${dest} (${count})  `);
  }
  console.log(`\nDONE: ${files} chapter files, ${verses} verses.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
