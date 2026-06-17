export interface BibleFormationSection {
  heading: string;
  content: string;
}

export interface BibleSectionIntroduction {
  title: string;
  subtitle: string;
  sections: BibleFormationSection[];
}

export interface BibleBookIntroduction {
  book: string;
  subtitle: string;
  sections: BibleFormationSection[];
}

export const bibleSectionIntroductions: Record<string, BibleSectionIntroduction> = {
  pentateuch: {
    title: 'Pentateuch / Torah',
    subtitle:
      'The beginning of God forming a people and preparing the way for Christ.',
    sections: [
      {
        heading: 'Where this fits',
        content:
          'Placeholder formation note. This section will introduce the first five books as the beginning of salvation history, read in light of Christ and the Tradition of the Church.',
      },
      {
        heading: 'How to read it',
        content:
          'Placeholder formation note. This will help beginners notice creation, covenant, promise, law, worship, and God patiently preparing his people.',
      },
    ],
  },
};

export const bibleBookIntroductions: Record<string, BibleBookIntroduction> = {
  genesis: {
    book: 'Genesis',
    subtitle:
      'The beginning of creation, covenant, promise, and the long road toward Christ.',
    sections: [
      {
        heading: 'Before you begin',
        content:
          "Placeholder formation note. Genesis will be introduced as the opening of God's story, inspired by God and written through human authors.",
      },
      {
        heading: 'Look for Christ',
        content:
          'Placeholder formation note. This will point readers toward how the Old Testament prepares for and is fulfilled in Jesus Christ.',
      },
    ],
  },
};

export function getBibleSectionIntroduction(
  sectionId: string,
): BibleSectionIntroduction | undefined {
  return bibleSectionIntroductions[sectionId];
}

export function getBibleBookIntroduction(
  bookId: string,
): BibleBookIntroduction | undefined {
  return bibleBookIntroductions[bookId];
}
