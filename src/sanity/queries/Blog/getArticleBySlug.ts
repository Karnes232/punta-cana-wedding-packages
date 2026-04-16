import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

// Tries the requested locale first; falls back to English if no match for that slug.
// select() converts the locale match to 0 (match) or 1 (fallback), sorted asc so the
// locale match lands at [0].
// translations: all language versions of the same article, for the language switcher.
export const getArticleBySlugQuery = defineQuery(`
  *[_type == "blogArticle" && language in [$locale, "en"] && slug.current == $slug]
    | order(select(language == $locale => 0, 1) asc)[0] {
    _id,
    "slug": slug.current,
    publishedAt,
    language,
    translationGroup,
    author,
    title,
    excerpt,
    body,
    readingTime,
    seoTitle,
    seoDescription,
    "category": category-> { title, "slug": slug.current },
    featuredImage { asset, hotspot, crop, alt },
    "translations": *[_type == "blogArticle" && translationGroup == ^.translationGroup] {
      language,
      "slug": slug.current
    }
  }
`)

export type ArticleTranslation = { language: string; slug: string }

export type BlogArticleFull = {
  _id: string
  slug: string
  publishedAt: string
  language: string
  translationGroup: string
  author: string | null
  title: string | null
  excerpt: string | null
  body: unknown[] | null
  readingTime: number | null
  seoTitle: string | null
  seoDescription: string | null
  category: { title: string | null; slug: string } | null
  featuredImage: {
    asset: { _ref: string; _type: string }
    hotspot?: { x: number; y: number }
    crop?: object
    alt: string | null
  } | null
  translations: ArticleTranslation[]
} | null

export async function getArticleBySlug(
  slug: string,
  locale: string,
): Promise<BlogArticleFull> {
  return client.fetch(getArticleBySlugQuery, { slug, locale })
}
