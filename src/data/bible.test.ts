import { getNextChapterReference } from './bible';

describe('Bible chapter navigation', () => {
  it('moves to the next chapter in the same book', () => {
    expect(getNextChapterReference('leviticus', 13)).toEqual({
      bookId: 'leviticus',
      chapter: 14,
    });
  });

  it('moves from the end of a book to the first chapter of the next book', () => {
    expect(getNextChapterReference('leviticus', 27)).toEqual({
      bookId: 'numbers',
      chapter: 1,
    });
  });

  it('returns null after the last available chapter', () => {
    expect(getNextChapterReference('revelation', 22)).toBeNull();
  });
});
