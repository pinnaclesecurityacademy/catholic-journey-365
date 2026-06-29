export type QuestionArticleSection = {
  heading: string;
  paragraphs: string[];
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
