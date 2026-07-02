import { useEffect } from 'react';
import type { QuestionArticle } from '../data/questions';

const SITE_URL = 'https://www.catholicjourney365.com';
const SITE_NAME = 'Catholic Journey 365';
const DEFAULT_IMAGE_PATH = '/images/landing/catholic-questions-hero.webp';
const JSON_LD_ID = 'cj365-structured-data';
const DESCRIPTION_MIN_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 160;
const SHORT_DESCRIPTION_SUFFIX = ' Learn with Catholic Journey 365 today.';

type SeoMetaTag = {
  name?: string;
  property?: string;
  content: string;
};

type SeoOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  type?: 'website' | 'article';
  imagePath?: string;
  structuredData?: Record<string, unknown>;
};

function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function getOrCreateMeta(selector: string, attributeName: 'name' | 'property', attributeValue: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) return existing;

  const tag = document.createElement('meta');
  tag.setAttribute(attributeName, attributeValue);
  document.head.appendChild(tag);
  return tag;
}

function setMetaTags(tags: SeoMetaTag[]) {
  tags.forEach((tag) => {
    if (tag.name) {
      getOrCreateMeta(`meta[name="${tag.name}"]`, 'name', tag.name).setAttribute(
        'content',
        tag.content
      );
      return;
    }

    if (tag.property) {
      getOrCreateMeta(
        `meta[property="${tag.property}"]`,
        'property',
        tag.property
      ).setAttribute('content', tag.content);
    }
  });
}

function getOrCreateCanonical() {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) return existing;

  const tag = document.createElement('link');
  tag.setAttribute('rel', 'canonical');
  document.head.appendChild(tag);
  return tag;
}

function setStructuredData(data?: Record<string, unknown>) {
  const existing = document.getElementById(JSON_LD_ID);

  if (!data) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.id = JSON_LD_ID;
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(data);

  if (!existing) {
    document.head.appendChild(script);
  }
}

export function useSeo({
  title,
  description,
  canonicalPath,
  type = 'website',
  imagePath = DEFAULT_IMAGE_PATH,
  structuredData,
}: SeoOptions) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(canonicalPath);
    const imageUrl = absoluteUrl(imagePath);
    const seoDescription = normalizeSeoDescription(description);

    document.title = title;
    getOrCreateCanonical().setAttribute('href', canonicalUrl);
    setMetaTags([
      { name: 'description', content: seoDescription },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: seoDescription },
      { property: 'og:type', content: type },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: seoDescription },
      { name: 'twitter:image', content: imageUrl },
    ]);
    setStructuredData(structuredData);
  }, [canonicalPath, description, imagePath, structuredData, title, type]);
}

function buildBreadcrumbList(items: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function buildFaqSchema(article: QuestionArticle) {
  const questions = article.sections
    .filter((section) => section.heading.trim().endsWith('?'))
    .map((section) => ({
      '@type': 'Question',
      name: section.heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: section.paragraphs.join(' '),
      },
    }));

  if (questions.length < 2) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: questions,
  };
}

function normalizeSeoDescription(description: string) {
  const trimmed = description.trim();

  if (trimmed.length < DESCRIPTION_MIN_LENGTH) {
    return `${trimmed}${SHORT_DESCRIPTION_SUFFIX}`;
  }

  if (trimmed.length <= DESCRIPTION_MAX_LENGTH) {
    return trimmed;
  }

  const shortened = trimmed.slice(0, DESCRIPTION_MAX_LENGTH - 3);
  const lastSpace = shortened.lastIndexOf(' ');
  return `${shortened.slice(0, lastSpace > 110 ? lastSpace : shortened.length)}...`;
}

export function buildQuestionArticleSchema(article: QuestionArticle) {
  const canonicalPath = `/questions/${article.slug}`;
  const faqSchema = buildFaqSchema(article);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: article.title,
      description: getArticleSeoDescription(article),
      mainEntityOfPage: absoluteUrl(canonicalPath),
      image: absoluteUrl(DEFAULT_IMAGE_PATH),
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/logo512.png'),
        },
      },
      articleSection: article.category,
    },
    buildBreadcrumbList([
      { name: 'Home', path: '/' },
      { name: 'Catholic Questions', path: '/questions' },
      { name: article.title, path: canonicalPath },
    ]),
  ];

  if (faqSchema) graph.push(faqSchema);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildQuestionsLandingSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Catholic Questions',
        description:
          'A faithful Catholic formation library with clear answers for beginners, seekers, and returning Catholics.',
        url: absoluteUrl('/questions'),
        image: absoluteUrl(DEFAULT_IMAGE_PATH),
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      buildBreadcrumbList([
        { name: 'Home', path: '/' },
        { name: 'Catholic Questions', path: '/questions' },
      ]),
    ],
  };
}

export function getArticleSeoDescription(article: QuestionArticle) {
  return normalizeSeoDescription(article.metaDescription ?? article.description);
}

export function getArticleSeoTitle(article: QuestionArticle) {
  return article.metaTitle ?? `${article.title} | ${SITE_NAME}`;
}

export { SITE_URL, DEFAULT_IMAGE_PATH };
