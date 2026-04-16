import { defineQuery } from 'groq'
import { client } from '@/sanity/lib/client'

export const getAllStoriesQuery = defineQuery(`
  *[_type == "weddingStory"] | order(featured desc, publishedAt desc) {
    _id,
    "slug": slug.current,
    coupleName,
    weddingDate,
    guestCount,
    budgetRange,
    excerpt,
    testimonial,
    heroImage { asset, hotspot, crop, alt },
    featured
  }
`)

export type WeddingStoryPreview = {
  _id: string
  slug: string
  coupleName: { en: string | null; es: string | null } | null
  weddingDate: string | null
  guestCount: number | null
  budgetRange: { en: string | null; es: string | null } | null
  excerpt: { en: string | null; es: string | null } | null
  testimonial: { en: string | null; es: string | null } | null
  heroImage: {
    asset: { _ref: string; _type: string } | null
    hotspot?: { x: number; y: number }
    crop?: object
    alt: string | null
  } | null
  featured: boolean | null
}

export async function getAllStories(): Promise<WeddingStoryPreview[]> {
  return client.fetch(getAllStoriesQuery) ?? []
}
