import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import { howDoIHearGod } from './howDoIHearGod';
import { howDoIHaveARelationshipWithGod } from './howDoIHaveARelationshipWithGod';
import { howDoIPray } from './howDoIPray';
import { howDoIPutGodFirst } from './howDoIPutGodFirst';
import { whatDoCatholicsBelieve } from './whatDoCatholicsBelieve';
import { whatIsTheTrinity } from './whatIsTheTrinity';
import { whatIsTheChurch } from './whatIsTheChurch';
import { whoIsGod } from './whoIsGod';
import { whoIsJesusChrist } from './whoIsJesusChrist';
import { whoIsTheHolySpirit } from './whoIsTheHolySpirit';
import { whyBecomeCatholic } from './whyBecomeCatholic';
import type { QuestionArticle } from './types';

export type {
  QuestionArticle,
  QuestionArticleQuote,
  QuestionArticleSection,
  RelatedQuestion,
} from './types';

export const questionArticles: QuestionArticle[] = [
  howDoIPutGodFirst,
  howDoIHaveARelationshipWithGod,
  howDoIHearGod,
  howDoIPray,
  whatDoCatholicsBelieve,
  whoIsGod,
  whoIsJesusChrist,
  whoIsTheHolySpirit,
  whatIsTheTrinity,
  whyBecomeCatholic,
  whatIsTheChurch,
  howDoIBecomeCatholic,
].filter((article) => article.published);

export function getQuestionArticle(slug: string) {
  return questionArticles.find((article) => article.slug === slug);
}
