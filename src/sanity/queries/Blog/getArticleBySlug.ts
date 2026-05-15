import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

// Match only the requested locale — never fall back across languages, so the served
// content language always equals the URL locale (keeps <html lang> and hreflang aligned).
// translations: all language versions of the same article, for the language switcher.
export const getArticleBySlugQuery = defineQuery(`
  *[_type == "blogArticle" && language == $locale && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    publishedAt,
    language,
    translationGroup,
    title,
    excerpt,
    body,
    readingTime,
    seoTitle,
    seoDescription,
    ogImage { asset, hotspot, crop, alt },
    structuredData,
    "category": category-> { title, "slug": slug.current },
    featuredImage { asset, hotspot, crop, alt },
    "translations": *[_type == "blogArticle" && translationGroup == ^.translationGroup] {
      language,
      "slug": slug.current
    }
  }
`);

export type ArticleTranslation = { language: string; slug: string };

export type BlogArticleFull = {
  _id: string;
  slug: string;
  publishedAt: string;
  language: string;
  translationGroup: string;
  title: string | null;
  excerpt: string | null;
  body: unknown[] | null;
  readingTime: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    crop?: object;
    alt: string | null;
  } | null;
  structuredData: string | null;
  category: { title: { en: string; es: string } | null; slug: string } | null;
  featuredImage: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    crop?: object;
    alt: string | null;
  } | null;
  translations: ArticleTranslation[];
} | null;

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<BlogArticleFull> {
  return client.fetch(getArticleBySlugQuery, { slug, locale });
}
