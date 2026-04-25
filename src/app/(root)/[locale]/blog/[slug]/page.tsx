import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/sanity/queries/Blog";
import { urlFor } from "@/sanity/lib/image";
import {
  ArticleHeader,
  ArticleBody,
  ArticleTranslationsRegistrar,
  BlogCTABanner,
} from "@/components/BlogPage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { buildUrl } from "@/lib/seoUrls";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) return {};

  const title = article.seoTitle ?? article.title ?? undefined;
  const description = article.seoDescription ?? article.excerpt ?? undefined;

  // Prefer dedicated OG image; fall back to featured image
  const ogImageAsset =
    article.ogImage?.asset ?? article.featuredImage?.asset ?? null;
  const ogImageUrl = ogImageAsset
    ? urlFor(ogImageAsset)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: title ?? undefined,
      description: description ?? undefined,
      publishedTime: article.publishedAt ?? undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description: description ?? undefined,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    alternates: {
      canonical: buildUrl(locale, `/blog/${slug}`),
      languages: Object.fromEntries([
        ...(article.translations ?? []).map((t) => [
          t.language,
          buildUrl(t.language, `/blog/${t.slug}`),
        ]),
        ["x-default", buildUrl("en", `/blog/${slug}`)],
      ]),
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, locale);

  if (!article) notFound();

  return (
    <>
      {article.structuredData && <SeoJsonLd json={article.structuredData} />}
      <ArticleTranslationsRegistrar translations={article.translations ?? []} />
      <ArticleHeader article={article} locale={locale} />
      <ArticleBody body={article.body} locale={locale} />
      <BlogCTABanner />
    </>
  );
}
