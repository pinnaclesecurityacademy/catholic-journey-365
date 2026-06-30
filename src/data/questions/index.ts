import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import { howDoIFallInLoveWithJesus } from './howDoIFallInLoveWithJesus';
import { howDoIGrowCloserToGod } from './howDoIGrowCloserToGod';
import { howDoIHearGod } from './howDoIHearGod';
import { howDoIHaveARelationshipWithGod } from './howDoIHaveARelationshipWithGod';
import { howDoIKnowGodsWill } from './howDoIKnowGodsWill';
import { howDoIPray } from './howDoIPray';
import { howDoIPutGodFirst } from './howDoIPutGodFirst';
import { howDoITrustGod } from './howDoITrustGod';
import { whatDoCatholicsBelieve } from './whatDoCatholicsBelieve';
import { whatIsTheTrinity } from './whatIsTheTrinity';
import { whatIsTheChurch } from './whatIsTheChurch';
import { whoIsGod } from './whoIsGod';
import { whoIsJesusChrist } from './whoIsJesusChrist';
import { whoIsTheHolySpirit } from './whoIsTheHolySpirit';
import { whyBecomeCatholic } from './whyBecomeCatholic';
import { whyDoesntGodAnswerMyPrayers } from './whyDoesntGodAnswerMyPrayers';
import type { QuestionArticle } from './types';

export type {
  QuestionArticle,
  QuestionArticleQuote,
  QuestionArticleSection,
  RelatedQuestion,
} from './types';

export const questionArticles: QuestionArticle[] = [
  howDoIGrowCloserToGod,
  howDoIFallInLoveWithJesus,
  howDoITrustGod,
  whyDoesntGodAnswerMyPrayers,
  howDoIKnowGodsWill,
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
