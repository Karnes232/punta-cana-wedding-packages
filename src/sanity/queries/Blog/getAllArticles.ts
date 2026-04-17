import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const getAllArticlesQuery = defineQuery(`
  *[_type == "blogArticle" && language == $locale] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    publishedAt,
    language,
    translationGroup,
    author,
    title,
    excerpt,
    readingTime,
    "category": category-> { title, "slug": slug.current },
    featuredImage { asset, hotspot, crop, alt }
  }
`);

export type BlogArticlePreview = {
  _id: string;
  slug: string;
  publishedAt: string;
  language: string;
  translationGroup: string;
  author: string | null;
  title: string | null;
  excerpt: string | null;
  readingTime: number | null;
  category: { title: { en: string; es: string } | null; slug: string } | null;
  featuredImage: {
    asset: { _ref: string; _type: string };
    hotspot?: { x: number; y: number };
    crop?: object;
    alt: string | null;
  } | null;
};

export async function getAllArticles(
  locale: string,
): Promise<BlogArticlePreview[]> {
  return client.fetch(getAllArticlesQuery, { locale }) ?? [];
}
