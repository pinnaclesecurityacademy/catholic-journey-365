import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import type { QuestionArticle } from './types';

export type { QuestionArticle, QuestionArticleSection, RelatedQuestion } from './types';

export const questionArticles: QuestionArticle[] = [howDoIBecomeCatholic].filter(
  (article) => article.published
);

export function getQuestionArticle(slug: string) {
  return questionArticles.find((article) => article.slug === slug);
}
