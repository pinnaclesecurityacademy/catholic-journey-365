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
  joshua: {
    book: 'Joshua',
    subtitle: 'God brings His people into the land He promised',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Joshua takes up the story right after the death of Moses. Israel has wandered the wilderness for a generation, and now they finally cross the Jordan River into the land God promised to Abraham long ago. Joshua, who served at Moses\' side, is chosen to lead them. This book is about a promise being kept, as God settles His people in the land and calls them to remain faithful to Him.',
      },
      {
        heading: 'Historical setting',
        content:
          'Joshua is set in the land of Canaan, a region of fortified towns, local kings, and many gods. Israel enters as a people freed from slavery, learning to live as a nation under the Lord. The wars described in this book belong to that ancient world, and they are remembered as part of how Israel came to dwell in the land that God had pledged to give them.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Tradition links this book with Joshua and the memory of those early days in the land, and it was treasured and handed down within Israel over time. The Church receives Joshua as inspired Scripture without settling every question about exactly how and when it reached its final form. What matters most is its witness: God is faithful, and He keeps His word to His people.',
      },
      {
        heading: 'Main themes',
        content:
          'Faithfulness of God: the Lord keeps the promise He made to the patriarchs. Covenant: Israel is called to obey God and worship Him alone in the new land. Courage and trust: Joshua is told again and again to be strong and not to be afraid, because God goes with him. The hard conquest accounts are part of this book, and we read them honestly, remembering that they belong to a particular moment in salvation history and are not a pattern for how God\'s people live today. Christ would later reveal the full way of mercy and love of enemies.',
      },
      {
        heading: 'Important people and events',
        content:
          'Joshua leads Israel with quiet faith and obedience to God. Rahab of Jericho shows surprising faith and is welcomed among God\'s people, later remembered as an ancestor in the family line of Jesus. The crossing of the Jordan on dry ground echoes the crossing of the Red Sea, and the fall of Jericho shows that the victory belongs to God. At the end, Joshua gathers the people and calls them to choose whom they will serve.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Joshua in the light of Jesus Christ. The name Joshua is the same name as Jesus, and it means "the Lord saves". Joshua led Israel into an earthly promised land, but Jesus, the true Joshua, leads us into the lasting promised land of heaven. The faith of Rahab, woven into the lineage of David and of Jesus, reminds us that God draws people of every background into His family.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Joshua assures us that God keeps His promises, even when they take a long time to unfold. It encourages us to be courageous and trusting, knowing the Lord goes with us. Read with Christ in view, it points us beyond any earthly land toward the salvation Jesus wins for us. Like Israel, we are invited to choose, each day, to serve the Lord.',
      },
    ],
  },
  judges: {
    book: 'Judges',
    subtitle: 'God rescues a wayward people again and again',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Judges covers the long, unsettled time after Joshua and before Israel had kings. The people are living in the land, but they keep drifting away from God and falling into trouble. Into this disorder, God raises up leaders called judges to rescue them. This book shows both the weakness of the human heart and the patient mercy of God who refuses to give up on His people.',
      },
      {
        heading: 'Historical setting',
        content:
          'Judges is set in the early days of Israel in Canaan, when the tribes lived loosely together without a central king. Surrounded by other peoples and their gods, Israel was often tempted to abandon the Lord. It was a rough and often violent era, and the book describes it honestly, including some of its darkest moments.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'This book gathers the memory of Israel\'s judges, handed down and preserved within the people of God. The Church receives Judges as inspired Scripture while leaving open the details of how it was composed. Its lasting message is clear: when God\'s people forget Him, they lose their way, and only His mercy brings them back.',
      },
      {
        heading: 'Main themes',
        content:
          'A repeating cycle: the people turn from God, fall into hardship, cry out, and God sends a deliverer, only for the cycle to begin again. Repentance: again and again, God responds to the people when they return to Him. God\'s mercy: the Lord keeps rescuing a people who do not deserve it. The need for faithful leadership: the closing chapters, where everyone does as they see fit, reveal how much Israel needs both a faithful king and, ultimately, God Himself as their true king.',
      },
      {
        heading: 'Important people and events',
        content:
          'Deborah, a prophetess and judge, leads Israel with wisdom and courage. Gideon is called from fear to trust as God uses a small band to win an unlikely victory. Samson, gifted with great strength yet weakened by his own choices, still serves God\'s purposes in the end. Through these flawed and very human leaders, God shows that deliverance comes from Him, not from human strength alone.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Judges in the light of Jesus Christ. The judges were partial saviors who rescued Israel for a time, but the people always slid back. Their limits awaken a longing for a Savior who can truly free us from sin once and for all. That Savior is Jesus, the faithful King and Deliverer, whose victory never fades and whose rescue reaches the heart.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Judges is honest about how easily we wander from God and how mercifully He calls us back. It gently warns us against the cycle of forgetting the Lord when life is comfortable. Most of all, it stirs in us a hunger for the leadership and salvation that only Christ can give, and it reminds us that God never tires of welcoming us home.',
      },
    ],
  },
  ruth: {
    book: 'Ruth',
    subtitle: 'Quiet faithfulness woven into the family of the Messiah',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Ruth is a short and beautiful story set during the time of the judges, but its tone is completely different from the turmoil around it. It follows an ordinary family touched by loss and a foreign woman whose loyalty changes everything. Amid a chaotic age, Ruth shows that God is quietly at work in faithful, everyday lives, weaving them into His larger plan of salvation.',
      },
      {
        heading: 'Historical setting',
        content:
          'The story moves between Moab and the town of Bethlehem in a time of famine and recovery. Ruth is a Moabite, an outsider to Israel, which makes her welcome among God\'s people all the more striking. The customs of the book, such as gleaning in the fields and a kinsman redeeming the family, belong to the village world of ancient Israel.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Ruth was cherished and passed down within Israel, in part because it leads to the family of King David. The Church receives it as inspired Scripture without needing to settle every question about its author or date. What it reveals is timeless: God honors loyalty, faithfulness, and love.',
      },
      {
        heading: 'Main themes',
        content:
          'Loyalty: Ruth\'s pledge to stay with Naomi is one of the most moving promises in Scripture. Faithfulness: in small, steady acts of love, God\'s goodness shines through. Redemption: Boaz acts as a redeemer who rescues the family from loss. Welcome: a foreign woman is drawn into the people of God, showing that His covenant has room for all who come to Him in faith.',
      },
      {
        heading: 'Important people and events',
        content:
          'Naomi, emptied by grief, slowly rediscovers hope. Ruth refuses to abandon her mother in law and embraces Naomi\'s God as her own. Boaz, a generous and upright man, becomes the family redeemer and marries Ruth. Their child becomes the grandfather of King David, placing this humble story right inside the royal line that leads to the Messiah.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Ruth in the light of Jesus Christ. Ruth and Boaz are ancestors of David, and so of Jesus, the Son of David, and Ruth is named in the Gospel genealogy of Christ. Boaz the redeemer foreshadows Jesus, our Redeemer, who buys us back and makes us His own. That a Moabite woman belongs to the Messiah\'s family quietly proclaims that salvation in Christ is offered to all peoples.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Ruth reminds us that faithfulness in ordinary life truly matters to God. It comforts those who have known loss with the promise that God can bring new life out of sorrow. And it shows that no one is too much of an outsider to be welcomed into God\'s family, a welcome made complete in Jesus Christ.',
      },
    ],
  },
  '1-samuel': {
    book: '1 Samuel',
    subtitle: 'From judges to kings, and the search for a faithful heart',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'First Samuel stands at a turning point in Israel\'s story. The age of the judges is ending, and the people ask for a king so they can be like the nations around them. Through the prophet Samuel, God guides this transition, anointing first Saul and then David. The book asks a deep question that runs through all of Scripture: what does it mean to be ruled, and to live, under God.',
      },
      {
        heading: 'Historical setting',
        content:
          'First Samuel is set as Israel moves from a loose union of tribes toward a kingdom, under pressure from powerful neighbors such as the Philistines. Worship still centers on the sanctuary where the ark of God is kept. It is a time of change, when Israel longs for stability and seeks it in a king.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The books of Samuel preserve the remembered history of Samuel, Saul, and David, handed down and treasured in Israel. The Church receives them as inspired Scripture while leaving open the questions of exactly who shaped them and when. Their enduring lesson is that God looks not at outward appearance but at the heart.',
      },
      {
        heading: 'Main themes',
        content:
          'Listening to God: from the boy Samuel saying "Speak, for your servant is listening," the book honors those who hear and obey the Lord. True leadership: Saul looks the part of a king but turns from God, while David, though imperfect, seeks God\'s heart. God\'s choice: the Lord raises up the lowly and judges by the heart, not by appearances. Trust over power: David facing Goliath shows that the battle belongs to God.',
      },
      {
        heading: 'Important people and events',
        content:
          'Samuel, prophet and judge, anoints Israel\'s first kings and calls the people back to God. Saul begins well but unravels through disobedience and fear. David is anointed as a young shepherd, defeats Goliath in the Lord\'s name, and patiently waits for God\'s timing even while Saul pursues him. These stories reveal what kind of heart God seeks in a leader.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read First Samuel in the light of Jesus Christ. David, the shepherd anointed as king and chosen for his heart, foreshadows Jesus, the Good Shepherd and the true Anointed One, the Messiah. David\'s victory over Goliath points to Christ\'s greater victory over sin and death, won not by worldly might but by trust in God.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'First Samuel teaches us to listen for God\'s voice and to value the heart over outward appearances. It shows that real leadership means faithfulness to God, not impressive strength. And in David it gives us a young shepherd who points us toward Christ, the Shepherd King who leads us with a faithful heart.',
      },
    ],
  },
  '2-samuel': {
    book: '2 Samuel',
    subtitle: 'King David and a promise that reaches to Christ',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Second Samuel tells the story of David as king. He unites the tribes, makes Jerusalem the heart of the nation, and brings the ark of God into the city. Here God makes a remarkable promise to David about an everlasting kingdom. Yet the book is also honest about David\'s sins and their painful consequences, showing a great king who is still a man in need of mercy.',
      },
      {
        heading: 'Historical setting',
        content:
          'Second Samuel is set as Israel becomes an established kingdom with Jerusalem as its capital. David secures the nation against its enemies and gathers the people around the worship of God. It is the high point of Israel\'s monarchy, remembered ever after as a golden age tied to David\'s name.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Like First Samuel, this book preserves Israel\'s remembered history of David, handed down within the people of God. The Church receives it as inspired Scripture without settling every detail of its composition. Its heart is the covenant God makes with David, a promise that shapes Israel\'s hope for centuries.',
      },
      {
        heading: 'Main themes',
        content:
          'The Davidic covenant: God promises David a house and a kingdom that will endure forever. Worship: David longs for God to dwell at the center of the nation\'s life. Human weakness: David\'s sin with Bathsheba and its aftermath show that even the greatest can fall. Repentance: confronted by the prophet Nathan, David humbles himself and turns back to God, becoming a model of contrition.',
      },
      {
        heading: 'Important people and events',
        content:
          'David reigns as Israel\'s great king, bringing the ark to Jerusalem with joy. God\'s promise through Nathan that David\'s throne will last forever becomes a cornerstone of Israel\'s hope. David\'s grave sins bring suffering on his household, yet his sincere repentance, echoed in the psalms, reveals a heart that returns to God even after failing badly.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Second Samuel in the light of Jesus Christ. The promise of an everlasting kingdom to David is fulfilled in Jesus, the Son of David, whose reign truly has no end. Where David fell into sin, Christ remains perfectly faithful, the sinless King who saves His people. David\'s repentance points us to the mercy that Jesus offers to every sinner.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Second Samuel shows that God can build His purposes even through flawed people, and that no sin is beyond His mercy when we truly repent. Its promise to David fills us with hope, because we know who fulfills it. And David\'s honest return to God after grievous failure encourages us never to despair, but to seek the forgiveness Christ freely gives.',
      },
    ],
  },
  '1-kings': {
    book: '1 Kings',
    subtitle: 'Wisdom, the temple, and a kingdom that begins to divide',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'First Kings opens with the reign of Solomon, David\'s son, who builds the temple in Jerusalem and leads Israel to its height of glory. But the story soon turns. After Solomon, the kingdom splits in two, and many kings lead the people away from God. Into this decline God sends prophets to call the people back, beginning a long struggle between faithfulness and idolatry.',
      },
      {
        heading: 'Historical setting',
        content:
          'First Kings is set in the era of Israel\'s monarchy, from the splendor of Solomon\'s reign to the division of the nation into a northern kingdom of Israel and a southern kingdom of Judah. Temples, royal courts, and rival worship shape the world of the book. It is a time of wealth and influence, but also of growing unfaithfulness.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The books of Kings gather Israel\'s remembered history of its rulers, handed down and shaped within the people of God. The Church receives them as inspired Scripture while leaving open the questions of their precise authorship and dating. Their steady measure of each king is simple: did he lead the people toward God or away from Him.',
      },
      {
        heading: 'Main themes',
        content:
          'Wisdom: Solomon famously asks God for an understanding heart to govern well. The temple: God\'s house in Jerusalem becomes the center of worship and a sign of His presence. Division: pride and idolatry tear the kingdom apart. The prophets: figures like Elijah arise to confront false worship and call the people back to the Lord, showing that God never abandons His people even in their unfaithfulness.',
      },
      {
        heading: 'Important people and events',
        content:
          'Solomon receives wisdom from God and builds the temple, yet later lets foreign worship lead his heart astray. After him the kingdom divides, and a line of kings, many of them unfaithful, follows. The prophet Elijah stands out boldly, challenging the worship of false gods and calling Israel to return to the Lord, even at great personal risk.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read First Kings in the light of Jesus Christ. Solomon\'s wisdom and his temple point toward Jesus, who is greater than Solomon and who is Himself the true temple where God and humanity meet. The prophets who called Israel back prepare the way for Christ, the final and perfect prophet, who speaks the Father\'s word and gathers a divided people into one.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'First Kings shows that God\'s gifts, even wisdom and worship, must be matched by a faithful heart. It warns how easily comfort and compromise can pull us away from the Lord. And in the prophets it reminds us that God keeps calling His people home, a call that reaches its fullness in Jesus Christ.',
      },
    ],
  },
  '2-kings': {
    book: '2 Kings',
    subtitle: 'Prophets, exile, and a faithful God who does not forget',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Second Kings follows the two kingdoms of Israel and Judah through their decline and fall. Prophets continue to plead with the people, but unfaithfulness deepens. In the end the northern kingdom and then Judah are conquered, and the people are carried into exile. It is a sobering book, yet even here God\'s promises quietly endure beneath the ruins.',
      },
      {
        heading: 'Historical setting',
        content:
          'Second Kings is set in the later years of the divided monarchy, amid the rise of great empires like Assyria and Babylon. These powers eventually conquer Israel and Judah, destroy Jerusalem and its temple, and take the people into exile. It is one of the most painful chapters in Israel\'s history.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Like First Kings, this book preserves Israel\'s remembered history, handed down and gathered within the people of God. The Church receives it as inspired Scripture without settling every detail of its origin. Its message is searching but hopeful: turning from the covenant brings ruin, yet God remains faithful to His promises.',
      },
      {
        heading: 'Main themes',
        content:
          'The prophets: figures like Elisha continue God\'s work of calling, warning, and showing His care. Consequences: abandoning the covenant leads, over time, to loss and exile. Judgment and mercy: God allows the painful results of sin, yet never fully withdraws His love. Enduring hope: even as Jerusalem falls, the promise to David is not erased, and God\'s plan continues beneath the sorrow.',
      },
      {
        heading: 'Important people and events',
        content:
          'Elisha carries on the prophetic mission of Elijah, working signs of God\'s mercy and power. Faithful kings like Hezekiah and Josiah bring times of renewal, but the long drift continues. The fall of the northern kingdom, and finally the destruction of Jerusalem and the exile to Babylon, bring the story to a heavy close, even as a small note of hope remains for David\'s line.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Second Kings in the light of Jesus Christ. The exile reveals how deeply God\'s people need a Savior who can heal the human heart, not just restore a kingdom. The promise to David survives the collapse and waits to be fulfilled in Jesus, the Son of David, who gathers the scattered people of God and leads us out of the deeper exile of sin.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Second Kings teaches honestly that sin has real consequences and that turning from God wounds our lives. Yet it also assures us that God never abandons His promises, even when everything seems lost. It deepens our hope in Christ, who restores what was broken and brings His people home.',
      },
    ],
  },
  '1-chronicles': {
    book: '1 Chronicles',
    subtitle: 'Remembering who we are, worship, and the covenant with David',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'First Chronicles retells much of Israel\'s history, especially the reign of David, from the perspective of a later age. Written for people who had returned from exile, it helps them remember who they are and where they belong. Rather than dwelling on failures, it lifts up worship, the temple, and God\'s faithful covenant, encouraging a wounded people to take heart.',
      },
      {
        heading: 'Historical setting',
        content:
          'First Chronicles speaks to the community of Israel after the Babylonian exile, as they rebuild their life and faith in the land. They needed to recover their identity, their worship, and their hope. The book looks back to David and the temple to remind them of the foundations God had laid.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Chronicles was composed to retell Israel\'s story for the restored community, drawing on earlier records treasured within the people of God. The Church receives it as inspired Scripture while leaving open the questions of its exact author and date. Its purpose is clear: to renew identity, worship, and trust in God\'s covenant faithfulness.',
      },
      {
        heading: 'Main themes',
        content:
          'Remembering identity: the long genealogies anchor the people in God\'s family and story. David: his reign is recalled with a focus on his devotion and his plans for worship. Temple worship: great attention is given to the temple, the priests, and the praise of God. Covenant faithfulness: God\'s promise to David is held up as a sure hope, encouraging the people to trust the Lord again.',
      },
      {
        heading: 'Important people and events',
        content:
          'The opening genealogies trace Israel from Adam onward, reminding the people that they belong to a story far larger than the exile. David takes center stage, not chiefly as a warrior but as the one who longs for God\'s house and arranges for its worship and priesthood. The bringing of the ark and the preparations for the temple highlight a kingdom centered on the praise of God.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read First Chronicles in the light of Jesus Christ. Its hope rests on God\'s covenant with David, fulfilled in Jesus, the Son of David and everlasting King. Its love for the temple and for worship points to Christ, the true temple, and to the worship of the Church, where He is praised. The genealogies that lead toward David ultimately lead to the Messiah.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'First Chronicles reminds us that remembering our place in God\'s family gives us strength, especially after hard times. It teaches that worship is at the heart of who we are as God\'s people. And by holding fast to the promise to David, it deepens our hope in Christ, in whom that promise comes true and in whom our worship finds its home.',
      },
    ],
  },
  '2-chronicles': {
    book: '2 Chronicles',
    subtitle: 'The temple, the kings of Judah, and a hope that survives exile',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Second Chronicles continues the retelling of Israel\'s history, focusing on the temple in Jerusalem and the kings of Judah who came from David\'s line. Written for people rebuilding their faith after exile, it traces the nation from Solomon\'s glorious temple to the destruction of Jerusalem. Even as the book ends in loss, it closes with a note of hope: permission for the exiles to return home.',
      },
      {
        heading: 'Historical setting',
        content:
          'Second Chronicles looks back across the years of the southern kingdom of Judah, from Solomon to the Babylonian exile, and speaks to the community that returned afterward. Temple worship, faithful and unfaithful kings, and the call of the prophets fill its pages. The book gathers these memories to help a restored people understand who they are before God.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Chronicles was composed to retell Israel\'s story for the community after the exile, drawing on earlier records treasured within the people of God. The Church receives it as inspired Scripture while leaving open the questions of its exact author and date. Its purpose shines through clearly: to renew worship, identity, and trust in God\'s faithfulness.',
      },
      {
        heading: 'Main themes',
        content:
          'The temple: Solomon\'s building and dedication of God\'s house stand at the heart of the book. Worship: right worship of the Lord is the measure of the nation\'s health. Covenant faithfulness: kings are remembered by whether they sought God or turned away. Exile and hope: unfaithfulness leads to ruin, yet the book ends looking forward, as God stirs a king to let His people return and rebuild.',
      },
      {
        heading: 'Important people and events',
        content:
          'Solomon builds and dedicates the temple, and God\'s glory fills the house of prayer. Later kings rise and fall, with faithful reformers like Hezekiah and Josiah bringing renewal, while others lead the people astray. The story moves through warning and repentance to the fall of Jerusalem, and then to the closing decree that opens the way home, keeping hope alive.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Second Chronicles in the light of Jesus Christ. The temple, where God dwelt with His people, points to Jesus, the true temple and the meeting place of God and humanity. The faithful kings of David\'s line foreshadow the perfect King, the Son of David, and the hope of return after exile points to the deeper homecoming Christ wins for us from the exile of sin.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Second Chronicles reminds us that worship and faithfulness shape the life of God\'s people. It shows that turning from God brings loss, but that He always leaves a door open for return. Its closing hope encourages us to trust that no exile is the end of the story, because in Christ God brings His people home.',
      },
    ],
  },
  ezra: {
    book: 'Ezra',
    subtitle: 'Coming home to rebuild the temple and renew the covenant',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Ezra begins where the exile ends. The people of Judah are allowed to return from Babylon to Jerusalem, and the book tells how they rebuild the temple and restore the worship of God. Ezra himself is a priest and scribe who leads the people back to the Scriptures and the covenant. It is a story of new beginnings and of a people learning again to live as God\'s own.',
      },
      {
        heading: 'Historical setting',
        content:
          'Ezra is set after the Babylonian exile, when the Persian Empire allowed displaced peoples to return to their homelands. The returning Jews face hardship, opposition, and the long work of rebuilding both the temple and their community. It is a fragile, hopeful time of restoration.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is tied to the memory and mission of Ezra and was preserved within the worshipping life of Israel. The Church receives it as inspired Scripture while leaving open the details of how it was composed and joined with Nehemiah. Its enduring witness is the renewal of worship and faithfulness to God\'s word.',
      },
      {
        heading: 'Main themes',
        content:
          'Return: God brings His people back from exile, keeping His promise. Rebuilding the temple: worship is restored at the heart of the community. Scripture: Ezra leads the people to hear and treasure God\'s law again. Covenant renewal: the people recommit themselves to the Lord, turning from past unfaithfulness and seeking to live as God asks.',
      },
      {
        heading: 'Important people and events',
        content:
          'The first returning exiles lay the foundation of the new temple amid both joy and tears. Despite opposition, the temple is completed and worship resumes. Ezra arrives later, devoted to teaching God\'s law, and leads the people in repentance and renewed commitment to the covenant. Through him, the community is reformed around Scripture and faithful worship.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Ezra in the light of Jesus Christ. The rebuilt temple points beyond itself to Jesus, the true temple, and to the worship He makes possible. Ezra\'s devotion to God\'s word prepares us for Christ, the living Word, who opens the Scriptures to us. The return from exile foreshadows the homecoming Christ gives, leading us back to the Father.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Ezra encourages us that God can restore what seems lost and lead His people into new beginnings. It shows the importance of worship and of returning to Scripture to renew our faith. It reminds us that renewal often means humble repentance and recommitment, a path that finds its fulfillment in following Christ.',
      },
    ],
  },
  nehemiah: {
    book: 'Nehemiah',
    subtitle: 'Rebuilding the walls and the life of a faithful people',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Nehemiah continues the story of return from exile, alongside Ezra. While Ezra focused on the temple and the law, Nehemiah leads the rebuilding of Jerusalem\'s broken walls and the renewal of the community within them. It is a very human story of leadership, hard work, opposition, and prayer, showing how God restores not only worship but the whole life of His people.',
      },
      {
        heading: 'Historical setting',
        content:
          'Nehemiah is set in the same Persian era as Ezra, when Jerusalem lay vulnerable with its walls in ruins. Nehemiah, a Jew serving in the Persian court, returns to organize and protect the city. The book reflects the real struggles of a small community trying to rebuild amid threats and discouragement.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book draws on the memoirs and mission of Nehemiah and was treasured within Israel, closely linked to Ezra. The Church receives it as inspired Scripture while leaving open the questions of its precise composition. Its lasting message is one of perseverance, prayerful leadership, and communal renewal under God.',
      },
      {
        heading: 'Main themes',
        content:
          'Rebuilding: the walls of Jerusalem are restored as a sign of security and identity. Leadership: Nehemiah leads with courage, wisdom, and constant prayer. Perseverance: the work continues despite ridicule, threats, and weariness. Communal renewal: the people gather to hear God\'s word, repent, and recommit to living as His covenant family.',
      },
      {
        heading: 'Important people and events',
        content:
          'Nehemiah hears of Jerusalem\'s broken walls and is moved to act, praying and then seeking permission to return. He organizes the people to rebuild, facing mockery and danger with steady trust in God. When the walls are finished, the community gathers as Ezra reads the law aloud, and the people respond with worship, repentance, and renewed dedication to the Lord.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Nehemiah in the light of Jesus Christ. The rebuilding of the city points toward the gathering and restoring of God\'s people, which Christ accomplishes fully. Nehemiah\'s prayerful, self giving leadership foreshadows the Good Shepherd who lays down his life for his flock. The renewal of the community around God\'s word looks ahead to the Church gathered around Christ, the living Word.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Nehemiah inspires us to persevere in good work even when it is hard and others oppose us. It shows that faithful leadership is rooted in prayer and trust in God. And it reminds us that God cares about the whole life of His people, drawing us together and renewing us around His word, a renewal made complete in Christ and his Church.',
      },
    ],
  },
  tobit: {
    book: 'Tobit',
    subtitle: 'Quiet faithfulness, prayer, and the providence of God',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Tobit is a warm and tender story set among the Israelites living in exile. It follows a faithful man named Tobit and his family as they strive to do what is right in a foreign land, and it shows how God lovingly guides their lives, even sending an angel to help. Tobit is one of the deuterocanonical books, part of the Catholic canon of Scripture, and it offers a beautiful picture of holiness lived at home.',
      },
      {
        heading: 'Historical setting',
        content:
          'Tobit is set during the exile, when many Israelites lived far from their homeland among the nations. In that setting, staying faithful to God, caring for the poor, and burying the dead could be difficult and even dangerous. The book paints an intimate portrait of family life and devotion in the midst of these challenges.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Tobit was cherished among God\'s people and is received by the Catholic Church as inspired Scripture, one of the deuterocanonical books included in the Catholic canon. It reads like a faith filled story meant to teach and encourage, and the Church does not claim to settle every question about its author or date. Its value lies in the holiness and trust it inspires.',
      },
      {
        heading: 'Main themes',
        content:
          'Faithfulness in exile: Tobit clings to God and to good works even when it costs him. Prayer: the heartfelt prayers of Tobit and Sarah rise to God and are heard. Family and marriage: love, fidelity, and honoring parents shine throughout the story. Charity: caring for the poor and burying the dead are shown as holy duties. Providence and angels: God quietly arranges all things, working through the angel Raphael to bring healing and joy.',
      },
      {
        heading: 'Important people and events',
        content:
          'Tobit is a devout man who suffers misfortune yet keeps trusting God. His son Tobias sets out on a journey, accompanied by a mysterious companion who is the angel Raphael in disguise. Sarah, burdened by deep sorrow, becomes Tobias\' faithful wife. Through their prayers and Raphael\'s guidance, God brings healing, marriage, and homecoming, revealing His loving care over every detail.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Tobit in the light of Jesus Christ. Its love of prayer, mercy to the poor, and care for the dead reflect the heart of the Gospel that Jesus would teach and live. The angel Raphael, sent to heal and guide, reminds us that God watches over us with tender care, a care made fully visible in Christ, who heals us and leads us home to the Father.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Tobit speaks gently to everyday life, showing that holiness grows in the home through prayer, fidelity, and kindness. It comforts those who suffer with the assurance that God hears their prayers and guides their steps. And it encourages works of mercy, especially toward the poor and the dead, as a beautiful part of a life lived close to God.',
      },
    ],
  },
  judith: {
    book: 'Judith',
    subtitle: 'Courage and trust in God when His people are in danger',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Judith is a dramatic story of God\'s people facing a deadly threat and of one faithful woman whose courage and trust bring deliverance. When a mighty army surrounds her town and hope seems lost, Judith steps forward in prayer and bravery. It is one of the deuterocanonical books, part of the Catholic canon, and it celebrates how God saves the lowly who rely on Him.',
      },
      {
        heading: 'Historical setting',
        content:
          'Judith is set against the backdrop of a great empire threatening God\'s people, with a vast army laying siege to a small town. The book is told in a vivid, almost theatrical way to highlight its message rather than to serve as a precise historical chronicle. Its world is one of fear, faith, and the surprising power of trust in God.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Judith was treasured among God\'s people and is received by the Catholic Church as inspired Scripture, one of the deuterocanonical books in the Catholic canon. It reads as a powerful faith story meant to strengthen trust in God, and the Church leaves open the questions of its exact author and historical details. Its purpose is to proclaim that God defends those who hope in Him.',
      },
      {
        heading: 'Main themes',
        content:
          'Courage: Judith acts boldly when others have given up. Trust in God: she relies not on weapons or strength but on the Lord. Deliverance: God saves His people through an unlikely instrument. Faith under threat: the story shows that fidelity and prayer matter most when danger is greatest, and that God lifts up the humble to confound the powerful.',
      },
      {
        heading: 'Important people and events',
        content:
          'As an enemy army besieges her town and the people lose heart, Judith, a devout widow, rebukes their despair and calls them to trust God. With prayer and daring, she goes into the enemy camp and, through God\'s help, delivers her people from their commander. Her victory becomes a song of praise to God, who saves by His own power.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Judith in the light of Jesus Christ. Her humble courage and her role in crushing the enemy of God\'s people have long reminded the Church of Mary, whose faith helps bring the Savior into the world. Above all, Judith\'s deliverance points to the greater victory of Christ, who saves us not by force but through humble obedience and trust in the Father.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Judith encourages us to be brave and to trust God when we feel small or overwhelmed. It teaches that real strength comes from faith and prayer, not from worldly power. And it assures us that God watches over His people and can bring deliverance in surprising ways, a hope fulfilled in Christ our Savior.',
      },
    ],
  },
  esther: {
    book: 'Esther',
    subtitle: "God's hidden hand protecting His people",
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Esther tells how God\'s people, living under a foreign empire, are saved from destruction through the courage of a young queen. God is never mentioned by name in the main story, yet His quiet providence is felt on every page. It is a story of timing, bravery, and trust, showing that the Lord watches over His people even when He seems hidden.',
      },
      {
        heading: 'Historical setting',
        content:
          'Esther is set in the Persian Empire, where many Jews lived after the exile. The story unfolds in the royal court, full of intrigue, danger, and reversals of fortune. In this setting, a hidden plot threatens the Jewish people, and their survival hangs on the choices of a few faithful hearts.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Esther was treasured among God\'s people and is received as inspired Scripture. The Catholic version includes additional passages, found in the Greek tradition, that make explicit the prayers and faith at work in the story. The Church leaves open the questions of its precise authorship and date, while honoring its witness to God\'s saving care.',
      },
      {
        heading: 'Main themes',
        content:
          'Hidden providence: God works quietly behind ordinary events to protect His people. Courage: Esther risks her life to plead for her people. Right timing: small decisions and turns of events combine to bring deliverance. Protection of God\'s people: even under threat in a foreign land, the Lord preserves those who are His, often through the brave faithfulness of unlikely heroes.',
      },
      {
        heading: 'Important people and events',
        content:
          'Esther, a young Jewish woman, becomes queen of Persia without revealing her people. Her wise relative Mordecai uncovers a plot to destroy the Jews. Urged on by the famous words that she may have come to her position for such a time as this, Esther bravely approaches the king and exposes the danger. The threat is turned aside, and the people are saved, an event remembered with joy.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Esther in the light of Jesus Christ. Esther steps forward to intercede for her people at the risk of her own life, foreshadowing the way Christ intercedes for us and offers Himself to save us. Her story reassures us that God is always at work for our salvation, even when His hand is hidden, a saving plan brought to fullness in Jesus.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Esther reminds us that God is present and active even when we cannot see Him clearly. It encourages courage and trust in the moments where we are called to stand up for what is right. And it assures us that the Lord cares for His people and can bring rescue through faithful hearts, a care perfectly revealed in Christ.',
      },
    ],
  },
  '1-maccabees': {
    book: '1 Maccabees',
    subtitle: 'Faithful courage when the covenant is under attack',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'First Maccabees tells how God\'s people resisted a fierce effort to stamp out their faith and force them into pagan worship. When their freedom to follow the Lord was threatened, a courageous family led a struggle to defend the covenant and restore true worship in the temple. It is one of the deuterocanonical books, part of the Catholic canon, and it shines with faithfulness under pressure.',
      },
      {
        heading: 'Historical setting',
        content:
          'First Maccabees is set in the centuries between the Old and New Testaments, when a Greek empire ruled the land and a ruler tried to force the Jews to abandon their faith. The temple was desecrated and the law forbidden. Out of this crisis arose the Maccabean resistance, fighting for the freedom to worship the one true God.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'First Maccabees records the history of this struggle and was treasured among God\'s people. The Catholic Church receives it as inspired Scripture, one of the deuterocanonical books in the Catholic canon. It reads as a serious account of real events, and the Church honors its witness to fidelity, while not depending on settling every historical detail.',
      },
      {
        heading: 'Main themes',
        content:
          'Persecution: God\'s people suffer for refusing to give up their faith. Courage: ordinary believers risk everything to remain faithful. Resistance to forced pagan worship: they refuse to bow to false gods, even under threat of death. Rededication of the temple: after great struggle, the temple is cleansed and worship restored, a joyful triumph remembered to this day.',
      },
      {
        heading: 'Important people and events',
        content:
          'The crisis begins when a foreign ruler outlaws the practice of the faith and defiles the temple. The priest Mattathias and his sons, especially Judas Maccabeus, rise to defend the covenant. Through hardship and battle, they reclaim Jerusalem and cleanse and rededicate the temple, restoring the worship of God. This rededication is remembered in the celebration of Hanukkah.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read First Maccabees in the light of Jesus Christ. The longing for the temple to be cleansed and for God\'s people to be free points toward Jesus, who purifies worship and sets us free from sin. The faithful courage of those who would not abandon God prepares us for the witness of the martyrs and for Christ Himself, who remained faithful unto death.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'First Maccabees encourages us to hold fast to our faith even when the world pressures us to let it go. It honors the courage of those who suffer for believing in God. And it reminds us that the freedom to worship the Lord is a treasure worth defending, while pointing us to Christ, in whom true worship and true freedom are found.',
      },
    ],
  },
  '2-maccabees': {
    book: '2 Maccabees',
    subtitle: 'Martyrs, the hope of resurrection, and prayer for the dead',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Second Maccabees revisits the same time of persecution as First Maccabees, but with a deeper focus on faith, martyrdom, and hope beyond death. It tells unforgettable stories of believers who chose to die rather than betray God, trusting that He would raise them to new life. It is one of the deuterocanonical books, part of the Catholic canon, and it offers some of the clearest Old Testament hope in the resurrection.',
      },
      {
        heading: 'Historical setting',
        content:
          'Second Maccabees is set during the same struggle against a Greek ruler who tried to force the Jews to forsake their faith. Rather than a continuous history, it gathers powerful episodes that highlight fidelity and trust in God. Its world is one of suffering, courage, and unshakable hope in God\'s power over death.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Second Maccabees presents itself as a heartfelt retelling drawn from earlier records, written to encourage faith. The Catholic Church receives it as inspired Scripture, one of the deuterocanonical books in the Catholic canon. The Church honors its witness without depending on settling every question about its sources or composition.',
      },
      {
        heading: 'Main themes',
        content:
          'Martyrdom: believers, including a mother and her seven sons, die rather than abandon God. Resurrection hope: the martyrs trust that God will raise them to everlasting life. Fidelity under persecution: faith is shown to be worth more than life itself. Prayer and sacrifice for the dead: the book bears witness to praying for those who have died, a practice the Church continues with love.',
      },
      {
        heading: 'Important people and events',
        content:
          'The book recounts the courage of faithful Jews, including the elderly Eleazar and a mother who watches her seven sons die rather than deny God, all confessing their hope in the resurrection. It also describes Judas Maccabeus arranging prayers and an offering for soldiers who had died, so that they might be freed from their sin, a striking sign of belief in life beyond death.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Second Maccabees in the light of Jesus Christ. The martyrs\' hope in the resurrection looks forward to Christ, who rose from the dead and opened eternal life to us. The practice of praying and offering sacrifice for the dead, recorded here, helps us understand why Catholics pray for the faithful departed: out of love, trusting that God can purify and welcome them. In Christ, this hope for the dead finds its sure foundation.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Second Maccabees strengthens us to remain faithful to God even at great cost. It fills us with hope in the resurrection, assuring us that death does not have the final word. And it gently lights the way for one of the Church\'s most loving practices, praying for those who have died, a hope fulfilled and secured in the risen Christ.',
      },
    ],
  },
  job: {
    book: 'Job',
    subtitle: 'Holding on to God in the mystery of suffering',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Job is the first of the Wisdom books, and it wrestles with one of the deepest questions of the human heart: why do good people suffer. It tells of a faithful man who loses nearly everything and pours out his pain honestly before God. Job is poetry and sacred drama more than a simple history, and it invites us to bring our own struggles into the presence of the Lord.',
      },
      {
        heading: 'Historical setting',
        content:
          'Job is set in an ancient world outside the main story of Israel, in the land of Uz, giving it a timeless quality that speaks to people everywhere. Its style is largely poetic, framed by a story at the beginning and end. Rather than recording dated events, it explores a question that belongs to every age and every life.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Job was treasured among the wisdom writings of Israel and is received by the Church as inspired Scripture. Its author is unknown, and the Church leaves open questions about when and how it was composed. What matters is its inspired wisdom, which gently teaches us how to trust God even when life does not make sense.',
      },
      {
        heading: 'Main themes',
        content:
          'Suffering: Job\'s pain is real, and the book does not offer easy answers. Faith in the dark: even while questioning, Job refuses to turn away from God. The limits of human understanding: Job\'s friends try to explain his suffering and get it wrong. The mystery of God\'s wisdom: in the end, God reveals His greatness, and Job learns to trust the One whose ways are higher than ours.',
      },
      {
        heading: 'Important people and events',
        content:
          'Job is a righteous man who suffers staggering losses yet continues to seek God. His friends come to comfort him but end up accusing him, insisting his suffering must be punishment. Job cries out honestly, longing for answers. At last God speaks from the whirlwind, not explaining everything but revealing His majesty, and Job humbly entrusts himself to the Lord.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Job in the light of Jesus Christ. Job, the innocent sufferer who pleads for one to stand between him and God, points toward Christ, the truly innocent One who suffers for us and becomes our mediator. On the Cross, Jesus enters fully into human pain, and in His resurrection He gives suffering a hidden meaning and a sure hope that Job could only reach toward.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Job speaks to everyone who has ever asked why a loving God allows pain. It gives us permission to bring our questions and sorrows honestly to the Lord. And it teaches that faith is not having every answer, but trusting the goodness of God in the dark, a trust that finds its rest in Christ, who suffered, died, and rose for us.',
      },
    ],
  },
  psalms: {
    book: 'Psalms',
    subtitle: 'The prayer book of the people of God',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'The Psalms are a collection of one hundred fifty prayers and songs that give voice to the whole life of faith. Here God\'s people praise, weep, repent, give thanks, and cry out for help. The Psalms are poetry meant to be prayed and sung, and they have been the heartbeat of worship for Israel, for Jesus, and for the Church ever since.',
      },
      {
        heading: 'Historical setting',
        content:
          'The Psalms were gathered over many centuries and used in the worship of Israel, especially at the temple in Jerusalem. They come from many situations: royal celebrations, times of national distress, personal sorrow, and overflowing joy. Together they form the prayer book that shaped how God\'s people spoke to Him.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Many Psalms are linked by tradition with King David, who is remembered as a singer and worshipper, while others are connected with various authors and temple singers. The Church honors this tradition while recognizing that the Psalms grew over time. Above all, they are received as inspired Scripture, the words God gives us to pray back to Him.',
      },
      {
        heading: 'Main themes',
        content:
          'Praise: many Psalms simply glorify God for who He is. Worship: they lead the gathered people in adoring the Lord. Sorrow and repentance: the Psalms make room for grief and for turning back to God after sin. Trust: again and again they teach the heart to rely on God in every circumstance. Honesty: every human emotion finds a place here, lifted up to God.',
      },
      {
        heading: 'Important people and events',
        content:
          'The Psalms are less about events than about the soul before God, yet they carry the memory of David, the temple, and the journeys of God\'s people. Some recall great moments of rescue, others the quiet ache of waiting on God. Across them all, the voice of the believer rises in praise, lament, thanksgiving, and hope.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read the Psalms in the light of Jesus Christ, who prayed them throughout His life and even from the Cross. Many Psalms speak prophetically of the Messiah, His suffering, and His victory, and the Church sees them fulfilled in Him. Today the Psalms remain at the center of Catholic prayer, sung at every Mass and prayed each day in the Liturgy of the Hours, so that the Church prays with the very words Christ Himself prayed.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'The Psalms teach us how to pray with our whole heart, in joy and in sorrow alike. They give words to feelings we struggle to express and lift them up to God. Praying the Psalms unites us with Jesus, with Israel, and with the whole Church across the ages, and they remain a daily school of worship, trust, and love for the Lord.',
      },
    ],
  },
  proverbs: {
    book: 'Proverbs',
    subtitle: 'Practical wisdom for a life shaped by God',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Proverbs is a treasury of short, memorable sayings about how to live wisely and well. Unlike the grand stories of earlier books, it focuses on everyday life: our words, our work, our friendships, and our choices. Its goal is to form the heart, teaching us to live in harmony with God\'s good order for the world.',
      },
      {
        heading: 'Historical setting',
        content:
          'Proverbs belongs to Israel\'s wisdom tradition, the kind of teaching passed from parents to children and from elders to the young. Such sayings were gathered and treasured over generations. The book reflects a settled life in which faithful people sought to live rightly day by day under God.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Proverbs is associated by tradition with King Solomon, famous for his wisdom, though the book itself gathers sayings from more than one source. The Church receives it as inspired Scripture and does not need to settle every question about its authorship. Its purpose is clear: to help us grow wise and good in the sight of God.',
      },
      {
        heading: 'Main themes',
        content:
          'The fear of the Lord: reverence for God is the beginning of true wisdom. Practical wisdom: the book speaks to honesty, hard work, humility, and self control. Forming the heart: wisdom is not just being clever but becoming the kind of person God calls us to be. God\'s order: living wisely means living in tune with the way God made the world and the human heart.',
      },
      {
        heading: 'Important people and events',
        content:
          'Proverbs is not a story but a collection of teachings, often framed as a parent lovingly instructing a child. It personifies Wisdom as a gracious woman who calls out in the streets, inviting people to follow her path. Through its many sayings, it sketches the contrast between the wise and the foolish, and the everyday choices that shape a whole life.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Proverbs in the light of Jesus Christ. The figure of Wisdom, present with God and delighting in His works, prepares us to recognize Jesus, whom the Church calls the Wisdom of God made flesh. To follow the way of wisdom is, in the end, to follow Christ, who is Himself the way, the truth, and the life.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Proverbs offers down to earth guidance for living faithfully in ordinary life. It reminds us that holiness is built in small daily choices about how we speak, work, and treat others. By rooting all wisdom in reverence for God, it leads us toward Christ, in whom true wisdom and a well lived life are found.',
      },
    ],
  },
  ecclesiastes: {
    book: 'Ecclesiastes',
    subtitle: 'The search for meaning that only God can satisfy',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Ecclesiastes is a thoughtful, searching book that asks what life is really for. Its speaker explores pleasure, work, wealth, and wisdom, and finds that none of them, on their own, can fill the human heart. With striking honesty, the book exposes the emptiness of a life lived apart from God and quietly points us toward Him.',
      },
      {
        heading: 'Historical setting',
        content:
          'Ecclesiastes belongs to Israel\'s wisdom tradition and reflects on life in a prosperous, settled world. Its reflective, poetic style explores the limits of human achievement. Rather than telling a story, it offers the honest meditations of a seeker examining everything under the sun.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is traditionally associated with Solomon, the wise king, presenting itself as the reflection of one who had everything and still searched for meaning. The Church receives it as inspired Scripture while leaving open the questions of its exact authorship and date. Its enduring gift is its honest wisdom about the human longing for something more.',
      },
      {
        heading: 'Main themes',
        content:
          'The search for meaning: the book probes whether life has lasting purpose. The limits of worldly success: pleasure, riches, and achievements cannot finally satisfy. The emptiness of life without God: apart from Him, everything feels like chasing the wind. Reverence and trust: the book concludes that we should fear God and keep His commandments, hinting that meaning is found in Him alone.',
      },
      {
        heading: 'Important people and events',
        content:
          'Ecclesiastes is a personal meditation rather than a narrative. Its speaker recalls testing every path to happiness, from grand projects to simple pleasures, and finding them all passing. There is a famous reflection that for everything there is a season. In the end, the seeker turns from the restless search to a humble trust in God.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Ecclesiastes in the light of Jesus Christ. Its honest restlessness echoes the truth that our hearts are made for God and cannot rest until they rest in Him. The emptiness it uncovers prepares us to welcome Christ, who alone gives life its lasting meaning and fills the longing that the world can never satisfy.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Ecclesiastes speaks to anyone who has wondered whether life adds up to anything. It gently warns us not to place our deepest hopes in success, pleasure, or possessions. And by exposing the emptiness of life without God, it turns our hearts toward Christ, in whom our search for meaning finds its true and lasting answer.',
      },
    ],
  },
  'song-of-solomon': {
    book: 'Song of Songs',
    subtitle: 'A poem of love that reveals the love of God',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'The Song of Songs is a beautiful poem celebrating the love between a bride and her bridegroom. On its surface it is a tender song of human love and marriage, full of poetry and imagery. Within the Bible it shines as a sign of something even greater: the faithful, passionate love between God and His people. It is poetry to be savored, not a historical account.',
      },
      {
        heading: 'Historical setting',
        content:
          'The Song belongs to Israel\'s wisdom and poetic tradition and uses the rich imagery of gardens, vineyards, and the beauty of creation. Its language is that of love poetry, meant to stir the heart. Rather than recording events, it draws us into the wonder of love itself, seen as a gift from God.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The Song is associated by tradition with Solomon, in keeping with its place among the wisdom writings, though it reads as carefully crafted poetry. The Church receives it as inspired Scripture and does not insist on settling every question of authorship. From early times, believers have treasured it as far more than a love song.',
      },
      {
        heading: 'Main themes',
        content:
          'Love: the book honors the goodness and beauty of love between husband and wife. Marriage: it reflects the covenant union of two persons given to each other. Covenant love: in the prophets, God often describes His bond with His people as a marriage, and the Song echoes that imagery. Longing and delight: the poem captures the yearning of love that seeks and rejoices in the beloved.',
      },
      {
        heading: 'Important people and events',
        content:
          'The Song unfolds as a dialogue of love between the bride and the bridegroom, with moments of seeking, finding, and rejoicing. There is little plot in the usual sense; instead the poem moves through images of beauty, desire, and faithful devotion. Its famous line that love is strong as death sums up the depth of the love it celebrates.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read the Song of Songs in the light of Jesus Christ. The Catholic spiritual tradition has long seen in it the love of God for His people and, above all, the love of Christ the Bridegroom for the Church, His bride. Saints and mystics have also read it as a picture of God\'s intimate love for each soul. In this way a poem of human love becomes a window into the heart of God.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'The Song reminds us that human love and marriage are good and holy gifts from God. Even more, it reveals that God loves us with a love that is faithful, tender, and strong. Read in the Catholic tradition, it draws us into the love of Christ for His Church and invites each of us into a deeper, more personal love for the Lord.',
      },
    ],
  },
  wisdom: {
    book: 'Wisdom',
    subtitle: "God's wisdom, justice, and the hope of immortality",
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'The Book of Wisdom is a rich reflection on the wisdom of God and the path of the righteous. It encourages believers to seek true wisdom, to live justly, and to trust that God will reward the faithful, even beyond death. It is part of the Catholic Old Testament canon and offers some of the clearest hope for eternal life in the Old Testament.',
      },
      {
        heading: 'Historical setting',
        content:
          'Wisdom was written for Jews living in a wider Greek speaking world, where faith was tested by the surrounding culture. It seeks to strengthen believers, reminding them that God\'s wisdom is greater than any human philosophy. Its style is reflective and exhortative, encouraging fidelity to the Lord.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Wisdom is written in the spirit of Solomon, the model of the wise king, though it comes from a later time. The Catholic Church receives it as inspired Scripture, part of the Old Testament canon. The Church honors its inspired teaching without depending on identifying its human author by name.',
      },
      {
        heading: 'Main themes',
        content:
          'God\'s wisdom: a radiant gift that guides and blesses those who seek it. Righteousness: living justly matters, even when the wicked seem to prosper. Immortality: the souls of the just are in the hand of God, and their hope is full of immortality. Justice: God will set things right, and faithfulness is never in vain. Wisdom is portrayed as a beautiful reflection of God\'s own goodness.',
      },
      {
        heading: 'Important people and events',
        content:
          'Wisdom is a meditation rather than a story, yet it looks back on God\'s saving acts, especially the rescue of His people in the past, as proof of His care. It contrasts the fate of the righteous and the wicked, and it famously describes how the just one may be tested and even put to death, yet is precious in God\'s sight. Throughout, Wisdom herself is praised as a gift to be sought above all.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read the Book of Wisdom in the light of Jesus Christ. Its description of the righteous one who is rejected and condemned yet vindicated by God has long been seen as a striking foreshadowing of Christ\'s passion. Its praise of divine Wisdom prepares us to recognize Jesus as the Wisdom of God, and its hope of immortality is fulfilled in His resurrection.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Wisdom strengthens us to seek God\'s wisdom above the passing ideas of the world. It assures us that living justly is worthwhile, even when goodness seems unrewarded. And its bright hope of immortality lifts our hearts toward the eternal life Christ has won, encouraging us to trust that our souls are safe in the hand of God.',
      },
    ],
  },
  sirach: {
    book: 'Sirach',
    subtitle: 'Wisdom for daily life, family, and faithful worship',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Sirach, also called Ecclesiasticus, is a rich collection of wise teaching about how to live a good and holy life. It covers family, friendship, work, speech, humility, and the worship of God. Warm and practical, it reads like the counsel of a wise and loving teacher. It is part of the Catholic Old Testament canon and has long been treasured for forming character and faith.',
      },
      {
        heading: 'Historical setting',
        content:
          'Sirach was written by a devout teacher in Jerusalem who wished to pass on the wisdom of Israel to the next generation, at a time when Greek culture was influencing the world around them. It seeks to root the young in the faith and traditions of their ancestors. Its style is that of practical instruction drawn from a life of faith.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Unusually for a wisdom book, Sirach names its author, a teacher known as Ben Sira, and his grandson explains in a preface how he translated the work. The Catholic Church receives it as inspired Scripture, part of the Old Testament canon. The Church treasures its guidance while simply receiving the book as it presents itself.',
      },
      {
        heading: 'Main themes',
        content:
          'Practical wisdom: down to earth guidance for everyday choices. Family: honoring parents and caring for the home are shown as paths of holiness. Virtue: humility, patience, honesty, and self control are praised. Worship: reverence for God and faithful prayer stand at the center of a wise life. Tradition: the book honors the faith handed down and calls each generation to remain faithful.',
      },
      {
        heading: 'Important people and events',
        content:
          'Sirach is mostly teaching rather than narrative, but near its end it offers a beautiful praise of the faithful ancestors of Israel, recalling the great figures of salvation history with gratitude. Throughout, it personifies Wisdom as coming forth from God and making her home among His people, inviting all to seek her and live by her ways.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Sirach in the light of Jesus Christ. Its portrait of Wisdom dwelling among God\'s people prepares us for Jesus, the Wisdom of God who came to dwell with us. Its call to humility, mercy, and faithful worship reflects the very life Christ would teach and live, and its love of the tradition handed down points to the living faith carried on in the Church.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Sirach offers gentle, practical guidance for living faithfully in family life, work, and friendship. It reminds us that holiness grows through humble virtue and faithful worship. By honoring the wisdom handed down through the generations, it draws us toward Christ, the Wisdom of God, and helps us walk the everyday path of holiness.',
      },
    ],
  },
  isaiah: {
    book: 'Isaiah',
    subtitle: 'The holiness of God and the promise of a Savior',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Isaiah is the first and one of the greatest of the prophets. A prophet is not mainly a predictor of the future but a messenger who speaks God\'s word, calling His people back to faithfulness. Isaiah speaks to Judah during times of crisis, warning of judgment for unfaithfulness yet filling the people with hope. His book overflows with promises of a coming Savior, and the Church treasures it as a doorway into the mystery of Christ.',
      },
      {
        heading: 'Historical setting',
        content:
          'Isaiah prophesied in and around Jerusalem during a dangerous age, when great empires threatened the small kingdom of Judah. Kings were tempted to trust in alliances and worldly power rather than in God. Into this fearful world Isaiah proclaimed that the Lord is holy, sovereign over the nations, and faithful to His promises.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is rooted in the prophet Isaiah, and its message was treasured and developed over time within the people of God, so that it speaks to several moments in Israel\'s history. The Church receives the whole of Isaiah as inspired Scripture and does not need to settle every scholarly question about how it took shape. What matters is its powerful witness to God\'s holiness and His saving plan.',
      },
      {
        heading: 'Main themes',
        content:
          'The holiness of God: Isaiah\'s vision of the Lord, high and lifted up, fills the book with awe. Judgment and hope: God warns against sin yet always holds out the promise of mercy. The coming King: Isaiah foretells a child to be born, called Emmanuel, God with us. The suffering servant: he describes a mysterious servant who bears the sins of many. Restoration and the nations: God promises to renew His people and to draw all peoples to Himself.',
      },
      {
        heading: 'Important people and events',
        content:
          'Isaiah receives a stunning vision of God in the temple and answers God\'s call with the words, here am I, send me. He counsels kings during national crises, urging trust in God. He speaks the famous promises of Emmanuel and of a child born to us on whom the government shall rest. And he gives the haunting songs of the suffering servant, wounded for our transgressions, that the Church reads each year during Holy Week.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Isaiah in the light of Jesus Christ, and no Old Testament book is quoted more often in connection with Him. The promise of Emmanuel is fulfilled in the birth of Jesus. The suffering servant who is pierced for our offenses is fulfilled in Christ\'s passion. The hope of salvation reaching all nations is fulfilled as the Gospel goes out to the whole world. Isaiah truly prepares the way for the Savior.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Isaiah lifts our eyes to the holiness and majesty of God. It calls us, like Judah, to trust in the Lord rather than in passing powers. And it fills us with hope, for in Jesus we see the Emmanuel and the suffering servant whom Isaiah foretold. To read Isaiah is to walk closer to Christ and to the salvation He brings.',
      },
    ],
  },
  jeremiah: {
    book: 'Jeremiah',
    subtitle: 'A faithful prophet and the promise of a New Covenant',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Jeremiah prophesied in the final years before Jerusalem fell to Babylon. As God\'s messenger, he pleaded with the people to turn back to the covenant before it was too late. His words are filled with sorrow over the people\'s sin and with the pain of being rejected for telling the truth. Yet at the heart of his book shines one of the most beautiful promises in all of Scripture: a New Covenant written on the heart.',
      },
      {
        heading: 'Historical setting',
        content:
          'Jeremiah lived through Judah\'s last days, as the power of Babylon rose and Jerusalem moved toward destruction and exile. It was a time of false security, political turmoil, and spiritual decline. Jeremiah\'s task was to speak hard truths to a people who did not want to hear them.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is tied to the prophet Jeremiah and to his faithful scribe Baruch, who helped record his words, and it was treasured within the people of God. The Church receives it as inspired Scripture while leaving open questions about how the book was gathered and arranged. Its enduring message is God\'s call to return to Him and His promise of inner renewal.',
      },
      {
        heading: 'Main themes',
        content:
          'Repentance: Jeremiah urgently calls the people to turn from sin and back to God. Sorrow over sin: he grieves deeply for his people and is often called the weeping prophet. Persecution: he suffers rejection, imprisonment, and loneliness for his faithfulness. The New Covenant: God promises a day when He will write His law on human hearts and forgive their sins, a promise that reaches far beyond Jeremiah\'s own time.',
      },
      {
        heading: 'Important people and events',
        content:
          'Jeremiah is called by God while still young and sent to speak despite his fears. He performs vivid sign actions, like the marred and remade potter\'s vessel, to make God\'s word clear. He endures opposition from kings, priests, and crowds, yet keeps proclaiming the truth. And he announces the promise of the New Covenant, in which God will give His people a new heart to know and love Him.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Jeremiah in the light of Jesus Christ. The New Covenant that Jeremiah foretold is fulfilled by Jesus, who at the Last Supper speaks of the new covenant in His blood, poured out for the forgiveness of sins. Jeremiah\'s own suffering as a rejected prophet foreshadows Christ, the faithful one rejected by His people yet faithful to the end for our salvation.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Jeremiah calls us to honest repentance and to trust God even when faithfulness is costly. It reminds us that God desires not just outward observance but a heart turned fully to Him. And its promise of the New Covenant fills us with gratitude, for in Christ that promise is fulfilled, and His Spirit writes God\'s love upon our hearts.',
      },
    ],
  },
  lamentations: {
    book: 'Lamentations',
    subtitle: 'Honest grief and quiet hope in God\'s mercy',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Lamentations is a series of sorrowful poems mourning the destruction of Jerusalem and its temple. It gives voice to the grief of a people who have lost almost everything. Yet even in the depths of sorrow, it turns to God in honest prayer and finds a flicker of hope in His unfailing mercy. It teaches us that we can bring even our deepest pain to the Lord.',
      },
      {
        heading: 'Historical setting',
        content:
          'Lamentations arises from the terrible time when Babylon destroyed Jerusalem and led the people into exile. The city that had been the center of worship and national life lay in ruins. These poems capture the raw sorrow of that loss with great honesty and tenderness.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'Tradition has long associated these laments with the prophet Jeremiah, who witnessed Jerusalem\'s fall, and they were treasured within the worship and memory of God\'s people. The Church receives Lamentations as inspired Scripture without needing to settle every question about its author. Its value lies in how it teaches us to grieve and to hope before God.',
      },
      {
        heading: 'Main themes',
        content:
          'Grief: the book does not hide its sorrow but pours it out openly. Honest prayer: it shows that lament itself can be a holy way of speaking to God. Repentance: it acknowledges the people\'s sin and the justice of their suffering. Hope in mercy: at its center stands the confident cry that God\'s mercies are new every morning, and great is His faithfulness.',
      },
      {
        heading: 'Important people and events',
        content:
          'Lamentations is not a story but a heartfelt response to the fall of Jerusalem, voiced as if by the grieving city and its people. It moves through scenes of devastation, hunger, and loss, and through cries of repentance. At its very heart, almost unexpectedly, it lifts up a steadfast confidence in the Lord\'s compassion, which never comes to an end.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Lamentations in the light of Jesus Christ. The Church prays these laments especially during Holy Week, hearing in them an echo of Christ\'s own suffering and of His sorrow over Jerusalem. In Jesus, God enters fully into human grief, and His resurrection turns lament into the sure hope that no sorrow is beyond God\'s power to redeem.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Lamentations gives us permission to grieve honestly and to bring our sorrows to God rather than hiding them. It teaches that faith and lament can live together, and that repentance opens the way to mercy. Above all, it assures us that God\'s compassion is new every morning, a faithfulness made fully visible in Christ.',
      },
    ],
  },
  baruch: {
    book: 'Baruch',
    subtitle: 'Repentance, wisdom, and hope for a people in exile',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Baruch is a short book associated with Jeremiah\'s faithful scribe of the same name. It speaks to God\'s people in exile, leading them in repentance, praising the gift of God\'s wisdom, and offering comfort and hope of restoration. It is part of the Catholic Old Testament canon and gently encourages a suffering people to return to the Lord.',
      },
      {
        heading: 'Historical setting',
        content:
          'Baruch reflects the experience of the exile, when God\'s people lived far from Jerusalem and longed for home. In that setting they needed to confess their sins, hold on to their faith, and trust that God had not forgotten them. The book speaks into this longing with words of repentance and hope.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is linked with Baruch, the companion of Jeremiah, and it was treasured among God\'s people. The Catholic Church receives it as inspired Scripture, part of the Old Testament canon. The Church honors its message of repentance and hope while simply receiving the book as part of the prophetic tradition.',
      },
      {
        heading: 'Main themes',
        content:
          'Exile: the book speaks to the pain of being far from home and from the temple. Repentance: it leads the people in honestly confessing their sins. Wisdom: it praises wisdom as a gift of God, found in walking in His ways. Hope of restoration: it comforts the people with the promise that God will gather and renew them, turning their mourning into joy.',
      },
      {
        heading: 'Important people and events',
        content:
          'Baruch is more reflection and prayer than narrative. It includes a moving confession of sin on behalf of the people, a beautiful passage praising the wisdom of God, and words of consolation that picture Jerusalem looking with hope for her returning children. Through these, the exiles are encouraged to turn back to the Lord and trust His promises.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Baruch in the light of Jesus Christ. Its praise of God\'s wisdom, given to His people and walking among them, prepares us for Jesus, the Wisdom of God made flesh. Its hope that God will gather His scattered children and restore them points toward Christ, who brings us home from the deeper exile of sin into the joy of the Father\'s house.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Baruch encourages us to return to God with humble, honest repentance. It reminds us that true wisdom is found in walking faithfully in His ways. And its tender hope of restoration lifts our hearts, assuring us that God gathers His people and that, in Christ, our longing for home is answered.',
      },
    ],
  },
  ezekiel: {
    book: 'Ezekiel',
    subtitle: 'God with His people, and the promise of a new heart',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Ezekiel was a prophet among the exiles in Babylon, far from the ruined temple of Jerusalem. As God\'s messenger, he called the people to turn from sin and assured them that God had not abandoned them. His book is full of striking visions, and it carries one of the Bible\'s most hopeful promises: that God will give His people a new heart and a new spirit.',
      },
      {
        heading: 'Historical setting',
        content:
          'Ezekiel lived and prophesied during the exile, when many of God\'s people had been carried away to Babylon and Jerusalem had fallen. The people wondered whether God was still with them so far from the temple. Ezekiel\'s visions and words answered that question with a resounding yes.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book is rooted in the prophet Ezekiel, a priest among the exiles, and was treasured within the people of God. The Church receives it as inspired Scripture while leaving open the finer questions of how it was composed. Its lasting witness is that God is present with His people and longs to renew them from within.',
      },
      {
        heading: 'Main themes',
        content:
          'God\'s presence: even in exile, God\'s glory comes to His people, who are not forgotten. A new heart: God promises to remove hearts of stone and give hearts of flesh, placing His Spirit within. The Good Shepherd: God promises to shepherd His scattered flock Himself. Restoration: in the vision of dry bones brought to life, God promises to revive His people. Renewed worship: Ezekiel envisions a restored temple where God dwells with His people forever.',
      },
      {
        heading: 'Important people and events',
        content:
          'Ezekiel receives a dazzling vision of God\'s glory and is called to speak boldly to a discouraged people. He performs dramatic sign actions to make God\'s message vivid. He sees the valley of dry bones come to life as a sign of Israel\'s restoration, and he promises that God Himself will gather and shepherd His people. His closing visions describe a renewed temple and the river of life flowing from God\'s presence.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Ezekiel in the light of Jesus Christ. God\'s promise to shepherd His people Himself is fulfilled in Jesus, the Good Shepherd who lays down His life for His sheep. The promise of a new heart and a new spirit is fulfilled when Christ pours out the Holy Spirit upon the Church. The river of life flowing from the temple points to the grace that flows from Christ and His Church.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Ezekiel assures us that God is with us even in our exiles and hardships. Its promise of a new heart speaks to our own need for inner conversion, which Christ makes possible through the Holy Spirit. And its image of the Good Shepherd draws us close to Jesus, who seeks us out, heals us, and leads us home.',
      },
    ],
  },
  daniel: {
    book: 'Daniel',
    subtitle: 'Faithful courage and the kingdom that will never end',
    sections: [
      {
        heading: 'Where are we in the Bible story?',
        content:
          'Daniel tells of faithful believers living under foreign rule, who stay true to God even when it is dangerous. The first half offers stirring stories of courage, and the second half contains powerful visions of hope. Throughout, the book proclaims that God is sovereign over every earthly empire and that His kingdom will outlast them all. It is written to strengthen faith in times of trial.',
      },
      {
        heading: 'Historical setting',
        content:
          'Daniel is set during the exile in Babylon and the rule of foreign kings, and it speaks powerfully to later generations of believers facing pressure to abandon their faith. Its visions use rich, symbolic imagery, in a style meant to encourage trust in God rather than to provide a timetable of future events. We read this imagery with the mind of the Church, not as material for end-times speculation.',
      },
      {
        heading: 'Authorship and tradition',
        content:
          'The book centers on the figure of Daniel and was treasured among God\'s people as a source of hope under persecution. The Catholic version includes additional passages, received as inspired Scripture in the Catholic canon. The Church honors the whole book while leaving open the scholarly questions of its date and composition.',
      },
      {
        heading: 'Main themes',
        content:
          'Faithfulness under pressure: Daniel and his friends refuse to compromise their worship of God. Courage: they trust God even when facing death. God\'s sovereignty: earthly kingdoms rise and fall, but God\'s kingdom endures forever. Visions of hope: the book assures the faithful that God will triumph and vindicate His people. The Son of Man: a mysterious figure receives an everlasting kingdom from God, a vision rich with meaning.',
      },
      {
        heading: 'Important people and events',
        content:
          'Daniel and his companions remain faithful in a foreign court, choosing God over comfort and safety. Their friends are preserved in the fiery furnace, and Daniel is kept safe in the lions\' den, signs of God\'s protecting care. Daniel interprets dreams and receives visions of kingdoms that pass away, and of one like a Son of Man who is given dominion and a kingdom that shall not be destroyed.',
      },
      {
        heading: 'Connection to Christ',
        content:
          'Catholics read Daniel in the light of Jesus Christ. Jesus took for Himself the title Son of Man, the very figure Daniel saw receiving an everlasting kingdom, revealing that this prophecy points to Him. The deliverance of the faithful from death foreshadows the resurrection, and the kingdom that never ends is the Kingdom of God that Christ proclaims and establishes. Daniel\'s hope finds its true fulfillment in Jesus.',
      },
      {
        heading: 'Why Catholics read this book today',
        content:
          'Daniel encourages us to remain faithful to God when the world pressures us to give way. It assures us that no earthly power has the final word, for God\'s kingdom endures forever. Rather than fueling speculation about the future, its visions are meant to strengthen our hope in Christ, the Son of Man, whose Kingdom will never end and in whom our faithfulness is never in vain.',
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
