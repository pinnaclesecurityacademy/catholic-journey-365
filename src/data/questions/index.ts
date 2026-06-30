import { howDoIBecomeCatholic } from './howDoIBecomeCatholic';
import { doCatholicsWorshipMary } from './doCatholicsWorshipMary';
import { howDoIFallInLoveWithJesus } from './howDoIFallInLoveWithJesus';
import { howDoIGrowCloserToGod } from './howDoIGrowCloserToGod';
import { howDoIHearGod } from './howDoIHearGod';
import { howDoIHaveARelationshipWithGod } from './howDoIHaveARelationshipWithGod';
import { howDoIKnowGodsWill } from './howDoIKnowGodsWill';
import { howDoCatholicsReadTheBible } from './howDoCatholicsReadTheBible';
import { howOldIsTheCatholicChurch } from './howOldIsTheCatholicChurch';
import { howDoIPray } from './howDoIPray';
import { howDoIPutGodFirst } from './howDoIPutGodFirst';
import { howDoITrustGod } from './howDoITrustGod';
import { whatIsApostolicSuccession } from './whatIsApostolicSuccession';
import { whatAreTheSevenSacraments } from './whatAreTheSevenSacraments';
import { whatHappensAtMass } from './whatHappensAtMass';
import { whatDoCatholicsBelieve } from './whatDoCatholicsBelieve';
import { whatIsBaptism } from './whatIsBaptism';
import { whatIsConfirmation } from './whatIsConfirmation';
import { whatIsTheEucharist } from './whatIsTheEucharist';
import { whatIsHolyCommunion } from './whatIsHolyCommunion';
import { whatIsLectioDivina } from './whatIsLectioDivina';
import { whatIsTheMass } from './whatIsTheMass';
import { whatIsTheTrinity } from './whatIsTheTrinity';
import { whatIsTheChurch } from './whatIsTheChurch';
import { whoAreTheSaints } from './whoAreTheSaints';
import { whoIsGod } from './whoIsGod';
import { whoIsJesusChrist } from './whoIsJesusChrist';
import { whoIsTheHolySpirit } from './whoIsTheHolySpirit';
import { whoWasMary } from './whoWasMary';
import { whoWasStPeter } from './whoWasStPeter';
import { whoWereTheEarlyChurchFathers } from './whoWereTheEarlyChurchFathers';
import { whereShouldIStartReadingTheBible } from './whereShouldIStartReadingTheBible';
import { whyBecomeCatholic } from './whyBecomeCatholic';
import { whyDoesntGodAnswerMyPrayers } from './whyDoesntGodAnswerMyPrayers';
import { whyDoCatholicsBelieveInTheRealPresence } from './whyDoCatholicsBelieveInTheRealPresence';
import { whyDoCatholicsBaptizeBabies } from './whyDoCatholicsBaptizeBabies';
import { whyDoCatholicsGoToMass } from './whyDoCatholicsGoToMass';
import { whyDoCatholicsPrayToMary } from './whyDoCatholicsPrayToMary';
import { whyDoCatholicsPrayToTheSaints } from './whyDoCatholicsPrayToTheSaints';
import { whyDoesTheCatholicChurchHaveAPope } from './whyDoesTheCatholicChurchHaveAPope';
import { whyIsTheCatholicBibleDifferent } from './whyIsTheCatholicBibleDifferent';
import { whichBibleDoCatholicsUse } from './whichBibleDoCatholicsUse';
import type { QuestionArticle } from './types';

export type {
  QuestionArticle,
  QuestionArticleQuote,
  QuestionArticleSection,
  RelatedQuestion,
} from './types';

export const questionArticles: QuestionArticle[] = [
  howOldIsTheCatholicChurch,
  whoWereTheEarlyChurchFathers,
  whatIsApostolicSuccession,
  whyDoesTheCatholicChurchHaveAPope,
  whoWasStPeter,
  whatIsLectioDivina,
  whereShouldIStartReadingTheBible,
  howDoCatholicsReadTheBible,
  whyIsTheCatholicBibleDifferent,
  whichBibleDoCatholicsUse,
  whoAreTheSaints,
  whyDoCatholicsPrayToTheSaints,
  whoWasMary,
  doCatholicsWorshipMary,
  whyDoCatholicsPrayToMary,
  whatIsHolyCommunion,
  whatIsConfirmation,
  whyDoCatholicsBaptizeBabies,
  whatIsBaptism,
  whatAreTheSevenSacraments,
  whatHappensAtMass,
  whyDoCatholicsBelieveInTheRealPresence,
  whatIsTheEucharist,
  whyDoCatholicsGoToMass,
  whatIsTheMass,
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
