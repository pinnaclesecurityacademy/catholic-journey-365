import type { QuestionArticle } from './types';

export type FormationPillarId =
  | 'bible'
  | 'beliefs'
  | 'church'
  | 'living';

export type FormationPillarIcon = 'book' | 'cross' | 'church' | 'heart';

export type FormationPillar = {
  id: FormationPillarId;
  title: string;
  description: string;
  icon: FormationPillarIcon;
  articleCategories: string[];
  articleSlugs?: string[];
};

export const formationPillars: FormationPillar[] = [
  {
    id: 'bible',
    title: 'The Bible',
    description:
      'Understand Scripture, discover how the Old and New Testaments connect, and learn to read the Bible with the Catholic Church.',
    icon: 'book',
    articleCategories: ['Scripture'],
  },
  {
    id: 'beliefs',
    title: 'Jesus & Catholic Beliefs',
    description:
      'Learn about Jesus Christ, the Trinity, the Eucharist, Mary, the saints, salvation, and the core beliefs of the Catholic faith.',
    icon: 'cross',
    articleCategories: [
      'God',
      'God and the Trinity',
      'Jesus Christ',
      'Mary & Saints',
      'Church Teaching',
    ],
  },
  {
    id: 'church',
    title: 'The Church',
    description:
      'Learn about the Mass, the sacraments, the liturgical year, Church history, and Catholic traditions.',
    icon: 'church',
    articleCategories: [
      'Becoming Catholic',
      'Catholic Practices',
      'Church History',
      'Returning Catholics',
      'Sacraments',
      'The Mass',
    ],
    articleSlugs: ['what-is-the-church'],
  },
  {
    id: 'living',
    title: 'Christian Living',
    description:
      'Discover how to live the Catholic faith in everyday life through prayer, family life, virtue, morality, discipleship, and practical formation.',
    icon: 'heart',
    articleCategories: [
      'Christian Living',
      'Life & Faith',
      'Prayer',
      'Sin & Mercy',
    ],
  },
];

const pillarByCategory = new Map<string, FormationPillar>(
  formationPillars.flatMap((pillar) =>
    pillar.articleCategories.map((category) => [category, pillar] as const)
  )
);

const pillarBySlug = new Map<string, FormationPillar>(
  formationPillars.flatMap((pillar) =>
    (pillar.articleSlugs ?? []).map((slug) => [slug, pillar] as const)
  )
);

export function getQuestionPillar(article: QuestionArticle) {
  return (
    pillarBySlug.get(article.slug) ??
    pillarByCategory.get(article.category) ??
    formationPillars[1]
  );
}

export function getFormationPillar(id: FormationPillarId) {
  return formationPillars.find((pillar) => pillar.id === id);
}
