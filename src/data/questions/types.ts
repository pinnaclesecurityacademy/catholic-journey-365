export type QuestionArticleQuote = {
  text: string;
  citation?: string;
};

export type QuestionArticleSection = {
  heading: string;
  paragraphs: string[];
  quotes?: QuestionArticleQuote[];
};

export type RelatedQuestion = {
  title: string;
  slug?: string;
};

export type QuestionArticle = {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  description: string;
  category: string;
  readTime: string;
  published: boolean;
  appPromotionAfterSection?: number;
  sections: QuestionArticleSection[];
  relatedQuestions: RelatedQuestion[];
};
