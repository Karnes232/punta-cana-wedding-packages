import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getArticleBySlug } from '@/sanity/queries/Blog';
import { ArticleHeader, ArticleBody, ArticleTranslationsRegistrar, BlogCTABanner } from '@/components/BlogPage';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) return {};

  return {
    title: article.seoTitle ?? article.title ?? undefined,
    description: article.seoDescription ?? article.excerpt ?? undefined,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, locale);

  if (!article) notFound();

  return (
    <>
      <ArticleTranslationsRegistrar translations={article.translations ?? []} />
      <ArticleHeader article={article} locale={locale} />
      <ArticleBody body={article.body} locale={locale} />
      <BlogCTABanner />
    </>
  );
}
