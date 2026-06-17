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
          'The Gospels tell the life, teachings, death, and resurrection of Jesus Christ. The word Gospel means "good news". The four Gospels are Matthew, Mark, Luke, and John. Each gives a faithful witness to Jesus while highlighting different aspects of His life and mission. They are not simply biographies. They are inspired testimonies written so that we may know Jesus, believe in Him, and follow Him.',
      },
      {
        heading: 'Historical background',
        content:
          'The Gospels take place in the first century, when the Jewish people lived under Roman rule. Many were waiting for God to fulfil His promises: the coming of the Messiah, the restoration of Israel, forgiveness of sins, and the arrival of God\'s Kingdom. Jesus was born into this world and lived within the faith, worship, and Scriptures of Israel. He taught, healed, forgave sins, gathered disciples, challenged hearts, and revealed the love of the Father.',
      },
      {
        heading: 'How the early Christians understood it',
        content:
          'The first Christians did not see Jesus as the beginning of a new, disconnected religion. They understood Him as the fulfilment of God\'s promises throughout the Scriptures of Israel. The Apostles proclaimed that through His life, death, and resurrection, Jesus fulfilled God\'s plan of salvation and opened the way for all people to enter into covenant with God. The Gospels were preserved and proclaimed by the early Church so future generations could encounter Christ and follow Him.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'For Catholics, the Gospels hold a unique place because they contain the words and actions of Jesus Christ Himself. At Mass, we stand for the Gospel reading as a sign of special reverence. Through the Gospels, Catholics encounter Jesus, listen to His teachings, and learn what it means to become His disciples. The Church continues to preserve and proclaim the Gospel message handed down from the Apostles.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Gospels are the turning point of the entire Bible. The journey becomes: Promise, Preparation, Incarnation, Cross, Resurrection, New Covenant. Everything before Christ prepares for Him. Everything after Christ flows from Him. Jesus is the centre of God\'s plan to bring humanity back to Himself.',
      },
    ],
  },
  acts: {
    title: 'Acts of the Apostles',
    subtitle: 'The Holy Spirit guides the birth of the Church',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'Acts continues the story after the resurrection and ascension of Jesus. It shows how the apostles, filled with the Holy Spirit, began proclaiming the Gospel and carrying Christ\'s mission into the world. Acts tells the story of the early Church: prayer, preaching, miracles, persecution, conversion, and the spread of the faith. It shows that Jesus\' work continues through His Church.',
      },
      {
        heading: 'Historical background',
        content:
          'Acts takes place in the first century world of the Roman Empire. After Jesus\' ascension, His followers began in Jerusalem and gradually carried the Gospel beyond the Jewish people to all nations. The book follows key moments in the growth of the Church, especially through the ministry of Peter and Paul. It shows the challenges faced by the first Christians as they followed Christ and shared the Gospel.',
      },
      {
        heading: 'How the early Christians understood it',
        content:
          'The early Christians understood Acts as the continuation of Jesus\' mission through the power of the Holy Spirit. They believed Christ remained present with His Church and continued to guide His people. Through preaching, baptism, prayer, the breaking of bread, and apostolic leadership, the Church carried forward the mission Jesus entrusted to His followers. The spread of the Gospel to all nations showed that God\'s plan of salvation was always meant for the whole world.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics see Acts as the beginning of the visible mission of the Church. Acts shows the importance of the Apostles, the guidance of the Holy Spirit, the unity of believers, and the life of the early Christian community. It helps Catholics understand the Church as apostolic, meaning connected to the faith handed down from the Apostles.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'Acts continues the journey: Resurrection, Ascension, Pentecost, Church, Mission, All nations. The same Holy Spirit who guided the apostles continues to guide the Church today. The story of God\'s salvation continues through the life and mission of Christ\'s Church.',
      },
    ],
  },
  letters: {
    title: 'Epistles',
    subtitle: 'The Apostles teach the Church how to live in Christ',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'The Epistles are letters written to early Christian communities, leaders, and believers. They explain what it means to follow Jesus after His resurrection and ascension. These letters teach about faith, grace, the Church, the sacraments, love, suffering, holiness, unity, and hope. They show the first Christians learning how to live as the Body of Christ in the world.',
      },
      {
        heading: 'Historical background',
        content:
          'The Epistles were written during the first century as the Gospel spread through the Roman Empire. Early Christians faced many challenges: persecution, confusion, division, false teaching, moral struggles, and questions about how Jewish and Gentile believers belonged together in Christ. The Apostles and early Church leaders wrote to guide, correct, encourage, and strengthen these communities.',
      },
      {
        heading: 'How the early Christians understood it',
        content:
          'The early Christians received these letters as apostolic teaching. They were read aloud in Christian gatherings and helped shape the faith, worship, and moral life of the Church. The letters reminded believers that following Jesus meant more than private belief. It meant belonging to His Church, living in charity, remaining faithful in suffering, and growing in holiness.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics read the Epistles as inspired Scripture and as part of the apostolic faith handed down by the Church. They help us understand grace, salvation, the Eucharist, baptism, the Church as the Body of Christ, Christian morality, and the call to holiness. These letters also remind Catholics that the Christian life is lived in community, not alone.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'The Epistles show the Church learning to live the New Covenant. The journey continues: Christ, Apostles, Church, Teaching, Holiness, Mission, Hope of glory. Through these letters, the Apostles continue teaching the Church how to remain faithful to Jesus until He comes again.',
      },
    ],
  },
  revelation: {
    title: 'Revelation',
    subtitle: 'Christ is victorious and God makes all things new',
    sections: [
      {
        heading: 'What is this section?',
        content:
          'Revelation is the final book of the Bible. It is a book of prophecy, vision, worship, warning, hope, and victory. At first, Revelation can feel confusing because it uses symbols, numbers, beasts, angels, heavenly worship, and dramatic images. But its central message is clear: Jesus Christ is Lord, evil will not win, and God will bring His people safely into the fullness of His Kingdom.',
      },
      {
        heading: 'Historical background',
        content:
          'Revelation was written to Christians facing pressure, suffering, and persecution. The early Church lived in a world where the Roman Empire appeared powerful and permanent. Revelation helped believers see beyond earthly power and remember that Christ, not any empire, rules history. Its symbols draw deeply from the Old Testament, especially the prophets, Exodus, temple worship, and images of God\'s final victory.',
      },
      {
        heading: 'How the early Christians understood it',
        content:
          'The early Christians received Revelation as a message of hope and endurance. It reminded them that their suffering was not forgotten by God. They saw heavenly worship, the victory of the Lamb, and the final defeat of evil as encouragement to remain faithful to Christ. They understood that Jesus had already conquered through His death and resurrection, even while the Church still waited for the final fulfilment of God\'s Kingdom.',
      },
      {
        heading: 'Catholic understanding today',
        content:
          'Catholics read Revelation carefully and reverently, not as a codebook for guessing dates or predicting every world event. The Church sees Revelation as inspired Scripture that reveals Christ\'s victory, the seriousness of evil, the hope of heaven, and the final renewal of creation. Revelation also gives Catholics a powerful vision of worship: angels, saints, prayers rising before God, and the Lamb who was slain. It reminds us that the Mass on earth is joined to the worship of heaven.',
      },
      {
        heading: 'How it fits into salvation history',
        content:
          'Revelation brings the Bible\'s story to its final hope. The journey becomes: Creation, Fall, Covenant, Christ, Church, Victory, New Creation. The Bible begins with creation and ends with new creation. God does not abandon His people or His world. In Christ, all things are brought to fulfilment, and God makes all things new.',
      },
    ],
  },
};

export const bibleBookIntroductions: Record<string, BibleBookIntroduction> = {
  genesis: {
    book: 'Genesis',
    subtitle: 'The beginning of creation, covenant, and the promise of salvation',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Genesis is the very beginning of the Bible. Its name means "beginning", and that is exactly what it gives us: the beginning of the world, of humanity, of sin, and of God\'s plan to save us. Genesis moves from the creation of all things to the calling of one family through whom God will bless the whole world. By the end, we are ready to follow this family into Egypt, where the next book, Exodus, begins.',
      },
      {
        heading: 'Historical setting',
        content:
          'Genesis reaches back to the earliest times and into the world of the ancient Near East, a world of shepherds, tribes, and great cities. The stories of Abraham, Isaac, Jacob, and Joseph are set among the lands of Mesopotamia, Canaan, and Egypt. The Church teaches that Genesis communicates true religious meaning about God, creation, and humanity. It uses the language and imagery of its time to reveal who God is and who we are before Him.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Jewish and Catholic tradition have long connected Genesis with Moses and the first five books of the Bible. The Church also recognises that God worked through human authors and faithful communities who treasured and handed on these sacred writings. Above all, Genesis is inspired by God. It is His word given through real human history, and it opens the long story that leads to Jesus Christ.',
      },
      {
        heading: 'Main themes',
        content:
          'Creation: God makes all things good, and makes humanity in His own image. Original Sin: Adam and Eve turn away from God, and sin wounds the whole human family. Promise: even after the fall, God promises that one will come to crush evil. Covenant: God binds Himself to Abraham and his descendants in love and faithfulness. Providence: through the story of Joseph, we see that God can bring good even out of human sin.',
      },
      {
        heading: 'Important people and events',
        content:
          'Adam and Eve are the first parents of the human family, created in friendship with God. Noah is preserved through the flood as God renews His care for the world. Abraham is called by God and believes the promise of a great family and a blessing for all nations. Isaac and Jacob carry that promise forward, and Jacob is given the name Israel. Joseph, sold by his brothers, rises in Egypt and saves his family, preparing the way for the book of Exodus.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Genesis in the light of Jesus Christ. The promise after the fall, that the offspring of the woman will crush the serpent, has long been seen as the first glimpse of the Gospel and a pointer to Christ and His Mother. The blessing promised to Abraham, that all nations would be blessed through his family, is fulfilled in Jesus, a son of Abraham. The near sacrifice of Isaac, carrying the wood up the mountain, quietly foreshadows the Son who carries His cross.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Genesis answers the deepest questions of the human heart: where we come from, why the world is wounded, and whether there is hope. It teaches us that creation is good, that every person is made in God\'s image, and that sin is real but never the end of the story. Most of all, Genesis shows a God who makes promises and keeps them, beginning the journey of salvation that will reach its fullness in Jesus Christ.',
      },
    ],
  },
  exodus: {
    book: 'Exodus',
    subtitle: 'God rescues His people and forms them in covenant',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Exodus continues the story after Genesis. At the end of Genesis, the family of Jacob, also called Israel, has gone down into Egypt. By the beginning of Exodus, their descendants have grown into a large people, but they are enslaved. God hears their cry and raises up Moses to lead them out of slavery. Exodus is the story of rescue, covenant, worship, and God forming His people.',
      },
      {
        heading: 'Historical setting',
        content:
          'Exodus takes place in the ancient world of Egypt and the wilderness. Egypt was one of the great powers of the ancient world, with kings, temples, armies, and many gods. Against this background, the Lord reveals that He alone is God. He rescues Israel not because they are powerful, but because He is faithful to His promises. The journey from Egypt to Mount Sinai becomes one of the most important memories in Israel\'s faith.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Jewish and Catholic tradition have long connected Exodus with Moses and the first five books of the Bible. The Church also recognises that God worked through human authors, traditions, and communities who preserved these sacred writings. Exodus is inspired Scripture, written through real human history, and handed down as part of God\'s saving revelation.',
      },
      {
        heading: 'Main themes',
        content:
          'Rescue from slavery: God hears the suffering of His people and acts to save them. Passover: The blood of the lamb marks God\'s people and becomes a lasting sign of deliverance. Covenant: At Mount Sinai, God gives His people the Law and calls them to live as His holy people. Worship: The tabernacle, priesthood, sacrifices, and sacred worship show that God wants to dwell among His people. Trust: In the wilderness, Israel must learn to trust God day by day.',
      },
      {
        heading: 'Important people and events',
        content:
          'Moses is called by God to lead Israel out of Egypt. Aaron assists Moses and becomes connected with the priesthood of Israel. Pharaoh resists God\'s command and shows the hardness of a heart turned against the Lord. The plagues reveal that the Lord is greater than the false gods and powers of Egypt. The Passover, the crossing of the Red Sea, the manna in the wilderness, the Ten Commandments, and the building of the tabernacle all become central moments in the story of salvation.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Exodus in the light of Jesus Christ. The Passover lamb points toward Jesus, the Lamb of God, who saves us through His sacrifice. The crossing of the Red Sea has long been seen as a sign of Baptism, where God brings His people from slavery into new life. The manna in the wilderness prepares us to understand the Eucharist, the true bread from heaven. The tabernacle points toward God dwelling with His people, fulfilled most deeply in Christ and continued in the life of the Church.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Exodus teaches us that God hears His people and rescues them. It helps Catholics understand the Mass, the Eucharist, Baptism, covenant, priesthood, sacrifice, and worship. It also reminds us that freedom is not just escape from slavery. True freedom is being brought into covenant with God. Exodus is the story of God leading His people out of bondage so they can worship Him and live as His own.',
      },
    ],
  },
  leviticus: {
    book: 'Leviticus',
    subtitle: 'A holy God teaches His people how to live and worship',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Leviticus picks up right where Exodus leaves off. God has rescued Israel from Egypt and met them at Mount Sinai, and now He wants to dwell among them. Leviticus is largely God speaking from the tabernacle, teaching His people how to worship Him and how to live as His own. Many readers find this book difficult because it is full of laws about sacrifices, priests, and purity. But underneath it all is a beautiful truth: the holy God wants to be close to His people.',
      },
      {
        heading: 'Historical setting',
        content:
          'Leviticus belongs to the time when Israel was camped at Sinai, freshly freed from slavery and still learning to be God\'s people. In the ancient world, every nation had its temples, priests, and sacrifices. Leviticus shows how Israel\'s worship was different, because it was given by the one true God. Its detailed instructions about offerings and holiness were the practical shape of a people set apart to belong to the Lord.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Jewish and Catholic tradition connect Leviticus with Moses and the first five books of the Bible. The Church also recognises that God formed this Scripture through human authors and the worshipping life of Israel, who preserved these sacred laws. Leviticus is inspired by God, and though much of it concerns worship long since fulfilled in Christ, it still reveals God\'s holiness and His desire to draw near to us.',
      },
      {
        heading: 'Main themes',
        content:
          'Holiness: God is holy, and He calls His people to be holy too. Sacrifice: offerings express worship, thanksgiving, and sorrow for sin, and point to a deeper need for atonement. Priesthood: through Aaron and his sons, God gives Israel mediators who lead worship and offer sacrifice. Atonement: especially on the Day of Atonement, God provides a way for the sins of the people to be covered. Presence: every law serves one goal, that a holy God may dwell among His people.',
      },
      {
        heading: 'Important people and events',
        content:
          'Aaron and his sons are set apart as priests to serve at the tabernacle and offer sacrifice for the people. The various offerings, including burnt offerings, peace offerings, and sin offerings, teach Israel how to approach God. The Day of Atonement stands at the heart of the book, when the high priest enters the holy place and the sins of the people are placed on the scapegoat. Through these moments, Israel learns that drawing near to God is both a gift and a serious thing.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Leviticus in the light of Jesus Christ, and the Letter to the Hebrews helps us see how. The sacrifices of Leviticus could never take away sin completely. They pointed forward to the one perfect sacrifice of Jesus, the true Lamb, who offers Himself for us. The priesthood of Aaron foreshadows Christ, our great High Priest, who enters the true sanctuary of heaven. The Day of Atonement finds its fulfilment in the Cross, where Jesus reconciles us to God once and for all.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Leviticus can feel distant, but it teaches us that worship matters and that holiness is real. It helps Catholics understand the Mass, where Christ\'s one sacrifice is made present, and the priesthood that serves at the altar. It reminds us that God is holy, that sin is serious, and that He has gone to great lengths to bring us close to Him. Read with Christ in view, Leviticus becomes a quiet preparation for the Gospel.',
      },
    ],
  },
  numbers: {
    book: 'Numbers',
    subtitle: 'God leads His people through the wilderness with patient love',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Numbers follows Israel as they leave Mount Sinai and journey through the wilderness toward the Promised Land. The book takes its name from the counting, or census, of the people, but its real story is the long road between rescue and rest. Along the way, Israel struggles to trust God, and a journey that could have been short stretches into forty years. Numbers is the story of a people learning, slowly and painfully, to walk with the Lord.',
      },
      {
        heading: 'Historical setting',
        content:
          'Numbers is set in the deserts between Egypt and the land of Canaan, a harsh world of wandering, tents, and dependence on God for water and food. Israel travels as a great company, organised around the tabernacle that stands at their centre. This was a formative time in Israel\'s memory, when they had been freed but had not yet arrived, living each day on God\'s provision.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Jewish and Catholic tradition connect Numbers with Moses and the first five books of the Bible. The Church also recognises that God worked through human authors and the remembered experience of Israel, handed down faithfully across generations. Numbers is inspired Scripture, and its honest account of failure and grace continues to teach the people of God.',
      },
      {
        heading: 'Main themes',
        content:
          'Trust: God asks His people to believe His promises, even when the way is hard. Rebellion: again and again, Israel grumbles and turns away, and we see how unbelief wounds the journey. God\'s patience: though the people fail, God does not abandon them, and He provides for them day by day. Preparation: through testing and time, God forms a new generation ready to enter the land. Hope: the Promised Land stays on the horizon, a sign of the rest God intends for His people.',
      },
      {
        heading: 'Important people and events',
        content:
          'Moses continues to lead, interceding for the people even when they turn against him. The twelve spies are sent into the land, and the fearful report of ten of them leads Israel to doubt God, while Joshua and Caleb trust His promise. The people\'s rebellions, the gift of manna and water, and the strange episode of the bronze serpent all mark the wilderness years. Through it all, God remains faithful, leading a stubborn people toward their inheritance.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Numbers in the light of Jesus Christ. Jesus Himself pointed to the bronze serpent lifted up in the wilderness as a sign of His own being lifted up on the Cross, so that all who look to Him in faith may live. The manna that fed Israel each day prepares us to understand the Eucharist, the true bread from heaven. And the long journey toward the Promised Land becomes an image of our own pilgrimage through life toward the rest God has prepared for us in Christ.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Numbers speaks honestly to anyone who has found the life of faith to be a long journey with setbacks. It teaches us that grumbling and unbelief lead us away from God, while trust keeps us walking with Him. Most of all, it reveals a God whose patience is greater than our failures, who feeds us along the way and never gives up on leading us home. Our own life is a kind of wilderness journey, and God walks it with us.',
      },
    ],
  },
  deuteronomy: {
    book: 'Deuteronomy',
    subtitle: "Moses' final words: remember the covenant and choose life",
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Deuteronomy stands at the edge of the Promised Land. The wilderness journey is over, Moses is nearing the end of his life, and a new generation is about to enter the land God promised. The book is mostly Moses speaking to the people, looking back on all God has done and urging them to stay faithful. Its name means "second law", because Moses repeats and renews the covenant for those who will cross over without him.',
      },
      {
        heading: 'Historical setting',
        content:
          'Deuteronomy is set on the plains of Moab, just across the river from the land of Canaan. Israel pauses here on the threshold of a new life, no longer slaves and no longer wanderers, but not yet settled. In this in between place, Moses gathers the people for his final teaching, preparing their hearts before they take hold of the promise.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Jewish and Catholic tradition connect Deuteronomy with Moses and the first five books of the Bible. The Church also recognises that God formed this Scripture through human authors and the faithful memory of Israel, who preserved Moses\' teaching for later generations. Deuteronomy is inspired by God, and its call to love the Lord with all our heart still speaks at the centre of the life of faith.',
      },
      {
        heading: 'Main themes',
        content:
          'Remembering: Moses calls the people to recall all that God has done, so gratitude shapes their lives. Covenant: God renews His bond with Israel and calls them to faithful love. The greatest commandment: "Love the Lord your God with all your heart" stands at the heart of the book. Choosing: Moses sets before the people life and death, blessing and curse, and urges them to choose life. Faithfulness: the land is a gift, and Israel is called to live in it as God\'s grateful people.',
      },
      {
        heading: 'Important people and events',
        content:
          'Moses gives his great farewell speeches, the work of a lifetime poured out in love for the people. He proclaims the Shema, the call to love God with all one\'s heart, soul, and strength. Joshua is appointed to lead Israel into the land after Moses. At the end, Moses is allowed to see the Promised Land from a mountain but not to enter it, and he dies as a faithful servant of the Lord, leaving the people on the brink of the promise.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Deuteronomy in the light of Jesus Christ. When tempted in the desert, Jesus answered the devil with words from Deuteronomy, showing that He lived by every word from the mouth of God. When asked for the greatest commandment, Jesus drew on this book: to love God with all our heart. In Christ, the covenant is not only renewed but fulfilled, and the love that Deuteronomy commands becomes possible through His grace poured into our hearts.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Deuteronomy invites us to remember God\'s faithfulness and to respond with wholehearted love. It teaches that faith is a daily choice, lived in gratitude rather than taken for granted. Its call to love God above all is the very heart of the Christian life, repeated by Jesus and lived out in the Church. Standing with Israel on the edge of the promise, we hear Moses inviting us, too, to choose life and to follow the Lord.',
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
