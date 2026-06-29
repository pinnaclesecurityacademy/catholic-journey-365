import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import { whatIsTheChurch } from './whatIsTheChurch';
import { whoIsGod } from './whoIsGod';
import { whoIsJesusChrist } from './whoIsJesusChrist';
import { whyBecomeCatholic } from './whyBecomeCatholic';
import type { QuestionArticle } from './types';

export type {
  QuestionArticle,
  QuestionArticleQuote,
  QuestionArticleSection,
  RelatedQuestion,
} from './types';

export const questionArticles: QuestionArticle[] = [
  whoIsGod,
  whoIsJesusChrist,
  whyBecomeCatholic,
  whatIsTheChurch,
  howDoIBecomeCatholic,
].filter((article) => article.published);

export function getQuestionArticle(slug: string) {
  return questionArticles.find((article) => article.slug === slug);
}
