import { setRequestLocale } from 'next-intl/server';
import { getAllArticles } from '@/sanity/queries/Blog';
import { BlogHero, ArticleGrid } from '@/components/BlogPage';

export const revalidate = 3600;

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const articles = await getAllArticles(locale);

  return (
    <>
      <BlogHero locale={locale} />
      <ArticleGrid articles={articles} locale={locale} />
    </>
  );
}
