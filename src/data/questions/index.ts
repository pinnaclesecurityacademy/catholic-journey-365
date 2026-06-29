import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import { whyBecomeCatholic } from './whyBecomeCatholic';
import type { QuestionArticle } from './types';

export type { QuestionArticle, QuestionArticleSection, RelatedQuestion } from './types';

export const questionArticles: QuestionArticle[] = [
  whyBecomeCatholic,
  howDoIBecomeCatholic,
].filter((article) => article.published);

export function getQuestionArticle(slug: string) {
  return questionArticles.find((article) => article.slug === slug);
}
