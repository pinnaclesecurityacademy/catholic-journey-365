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
    subtitle: "The beginning of God's covenant story",
    sections: [
      {
        heading: 'What is this section?',
        content:
          'The first five books of the Bible are called the Pentateuch, also known as the Torah, meaning "instruction" or "teaching". These books are Genesis, Exodus, Leviticus, Numbers, and Deuteronomy. They tell the beginning of God\'s relationship with humanity: creation, the fall of mankind, God\'s promises, the calling of Abraham, the birth of Israel, freedom from slavery in Egypt, and the covenant God makes with His people. This is not just ancient history. It is the beginning of the story of salvation.',
      },
      {
        heading: 'Historical background',
        content:
          'The events of the Pentateuch take us into the ancient world of the Middle East, among cultures very different from our own. People lived among powerful kingdoms, worshipped many gods, and explained their identity through family, land, and covenant promises. Into this world, Scripture reveals the one true God who creates, calls, guides, and enters into relationship with His people. Catholic tradition has long associated these books with Moses. The Church also recognises that God worked through human authors, traditions, and communities who preserved these sacred writings.',
      },
      {
        heading: 'Importance to the Jewish people',
        content:
          'For the Jewish people, the Torah is the foundation of faith and identity. It explains who God is, why humanity needs healing, why Israel was chosen, and how God called His people to live. The laws, sacrifices, feasts, and commandments formed Israel into a people set apart for God.',
      },
      {
        heading: 'How Jesus and the early Christians understood it',
        content:
          'Jesus knew and loved these Scriptures. He taught that the Law and the Prophets pointed toward Him. The early Christians saw many moments in the Pentateuch as preparing the way for Christ. They saw Adam pointing toward humanity\'s need for a new beginning, Abraham\'s promise fulfilled through Jesus, the Passover lamb pointing toward Christ\'s sacrifice, and the Exodus as a sign of freedom from sin. The story that begins here reaches its fulfilment in Jesus.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics read the Pentateuch as the inspired Word of God. The Church recognises that these books contain different forms of writing, including history, law, poetry, and theological reflection. The purpose is not only to tell us what happened, but to reveal who God is and His plan to bring humanity back to Himself.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Pentateuch begins the great journey of the Bible: Creation, Fall, Covenant, Promise, Rescue, Preparation. God begins with one family, Abraham\'s family, through whom He prepares a blessing for the whole world. That blessing is ultimately Jesus Christ.',
      },
    ],
  },
  historical: {
    title: 'Historical Books',
    subtitle: 'God forms, guides, and prepares His people',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'The Historical Books continue the story after the first five books of the Bible. They follow Israel as God leads His people into the Promised Land, forms them as a nation, gives them kings, allows them to experience the consequences of turning away, and continues preparing the way for the Messiah. These books show real people struggling with faith, obedience, failure, repentance, and trust in God. They are not just records of events. They reveal how God remains faithful throughout human history.',
      },
      {
        heading: 'Historical background',
        content:
          'These books cover many centuries of Israel\'s story. They include the time of Joshua, the judges, the united kingdom under Saul, David, and Solomon, the divided kingdoms of Israel and Judah, exile from the land, and the eventual return of God\'s people. The events happen among powerful ancient nations and empires surrounding Israel. Understanding this history helps us understand why the people of Israel longed for rescue, restoration, and a promised King.',
      },
      {
        heading: 'Importance to the Jewish people',
        content:
          'For the Jewish people, these books preserve the story of God\'s covenant relationship with Israel. They remember moments of victory and blessing, but also times when the people turned away from God. The stories of the kings, prophets, temple, exile, and return shaped Israel\'s hope that God would one day restore His people.',
      },
      {
        heading: 'How Jesus and the early Christians understood it',
        content:
          'Jesus and the first Christians knew these stories deeply. They saw God\'s promises to Israel, especially the promises connected to King David, as leading toward Christ. Jesus is understood as the Son of David, the true King whose kingdom is not limited to one nation but offered to the whole world.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics read the Historical Books as inspired Scripture that reveals God working through human history. The Church recognises the victories, failures, holiness, and sins of the people within these books. They remind us that God works through imperfect people and never abandons His plan of salvation.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Historical Books show the journey: Promised Land, Kingdom, Temple, Division, Exile, Return, Waiting for the Messiah. God prepares His people step by step for the coming of Jesus Christ.',
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
