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
  wisdom: {
    title: 'Wisdom Literature',
    subtitle: 'Learning to pray, suffer, worship, and live with God',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'Wisdom Literature is different from the story books of the Bible. These books teach us how to live with God in the middle of ordinary life: joy, suffering, work, family, prayer, worship, justice, temptation, and death. They include poetry, songs, prayers, proverbs, reflections, and deep questions about life. They show that faith is not only about knowing history. It is also about learning how to love God, trust Him, and walk with Him each day.',
      },
      {
        heading: 'Historical background',
        content:
          'The Wisdom books grew from the prayer and reflection of God\'s people over many generations. Some are connected with King David and King Solomon, while others come from later periods of Israel\'s life. They were prayed, sung, taught, and treasured by the people of God. They speak from real human experience: grief, praise, confusion, repentance, patience, and hope.',
      },
      {
        heading: 'Importance to the Jewish people',
        content:
          'For the Jewish people, these books helped form daily faith. The Psalms became the prayer book of Israel. Proverbs taught practical wisdom. Job wrestled with suffering. Ecclesiastes faced the limits of earthly life. These writings helped God\'s people bring every part of life before the Lord.',
      },
      {
        heading: 'How Jesus and the early Christians understood it',
        content:
          'Jesus prayed the Psalms and used the language of Israel\'s wisdom. The early Christians continued praying the Psalms and saw in them the voice of Christ, the suffering Messiah, and the prayer of the Church. They understood true wisdom as more than cleverness. True wisdom is found in God and fulfilled in Jesus Christ.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics still pray these books today, especially in the Psalms and the Liturgy of the Hours. They teach us that God welcomes honest prayer. We can bring Him praise, sorrow, fear, repentance, confusion, and trust. Wisdom Literature helps Catholics learn not only what to believe, but how to live faithfully.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'Wisdom Literature shows the heart of God\'s people being formed. After God gives His people a covenant, a land, worship, and a kingdom, He also teaches them how to pray, suffer, repent, praise, and hope. These books prepare us to recognise Jesus as the Wisdom of God and the one who teaches us how to live as children of the Father.',
      },
    ],
  },
  prophets: {
    title: 'Prophets',
    subtitle: 'God calls His people back and promises restoration',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'The Prophets are books where God speaks to His people through chosen messengers. The prophets warned Israel and Judah when they turned away from God, but they also gave hope. They called people back to covenant faithfulness, justice, mercy, true worship, and trust in the Lord. These books can feel difficult at first because they include poetry, visions, warnings, historical events, and promises. But at their heart, the prophets reveal God\'s love for His people and His desire to bring them home.',
      },
      {
        heading: 'Historical background',
        content:
          'Many prophetic books come from the time of the divided kingdoms, the threat of foreign empires, the destruction of Jerusalem, the exile, and the hope of return. Israel and Judah faced powerful nations such as Assyria, Babylon, and Persia. The prophets spoke into real moments of crisis. They helped God\'s people understand that exile was not the end of the story. God remained faithful and would restore His people.',
      },
      {
        heading: 'Importance to the Jewish people',
        content:
          'For the Jewish people, the prophets preserved God\'s call to holiness and covenant faithfulness. They reminded Israel that worship of God must be joined with justice, mercy, repentance, and care for the poor. The prophets also kept alive the hope that God would send a future king, restore His people, forgive sin, and bring peace.',
      },
      {
        heading: 'How Jesus and the early Christians understood it',
        content:
          'Jesus often spoke in the language of the prophets. He announced the Kingdom of God, called people to repentance, showed mercy to sinners, and fulfilled the hope of restoration. The early Christians read the prophets as pointing toward Jesus: His birth, mission, suffering, death, resurrection, and the gathering of all nations into God\'s covenant family.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics read the prophets as inspired Scripture that reveals both God\'s justice and His mercy. They teach us that sin matters, repentance is necessary, and God never stops calling His people back. The prophets also help us understand the Mass, the Church\'s mission, care for the poor, and the hope of Christ\'s return.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Prophets show the journey: Covenant, Unfaithfulness, Warning, Exile, Hope, Restoration, Messiah. They prepare God\'s people to recognise Jesus Christ as the fulfilment of God\'s promises.',
      },
    ],
  },
  gospels: {
    title: 'The Gospels',
    subtitle: "Jesus Christ, the fulfilment of God's promises",
    sections: [
      {
        heading: 'What is this section?',
        content:
          'The Gospels tell the life, teachings, death, and resurrection of Jesus Christ. The word Gospel means "good news". The four Gospels are Matthew, Mark, Luke, and John. Each Gospel gives a faithful witness to Jesus while highlighting different aspects of His mission. They are not simply biographies. They are inspired testimonies written so that we may know Jesus, believe in Him, and follow Him.',
      },
      {
        heading: 'Historical background',
        content:
          'The Gospels take place in the first century, when the Jewish people lived under Roman rule. Many were waiting for God to fulfil His promises: the coming of the Messiah, the restoration of Israel, forgiveness of sins, and the arrival of God\'s Kingdom. Into this world, Jesus came. He taught, healed, forgave sins, gathered disciples, challenged hearts, and revealed the love of the Father.',
      },
      {
        heading: 'Importance to the Jewish people',
        content:
          'Jesus was born into the Jewish people and lived within the faith, worship, and Scriptures of Israel. The Gospels show how the promises given through the Law, Prophets, and writings of Israel reach their fulfilment in Him. Jesus did not reject God\'s earlier covenant promises. He brought them to their intended fulfilment.',
      },
      {
        heading: 'How Jesus and the early Christians understood it',
        content:
          'Jesus revealed Himself as the centre of God\'s saving plan. After His resurrection, His disciples came to understand more fully how the Scriptures pointed toward Him. The early Church proclaimed that Jesus is the promised Messiah, the Son of God, who conquered sin and death through His cross and resurrection.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'For Catholics, the Gospels hold a unique place because they contain the words and actions of Jesus Christ Himself. At Mass, we stand for the Gospel reading as a sign of special reverence. Through the Gospels, Catholics encounter Jesus, learn His teachings, and discover what it means to become His disciples.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Gospels are the turning point of the entire Bible. The journey becomes: Promise, Preparation, Incarnation, Cross, Resurrection, New Covenant. Everything before Christ prepares for Him. Everything after Christ flows from Him. Jesus is the centre of God\'s plan to bring humanity back to Himself.',
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
