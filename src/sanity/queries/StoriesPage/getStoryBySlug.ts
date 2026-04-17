import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const getStoryBySlugQuery = defineQuery(`
  *[_type == "weddingStory" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    coupleName,
    weddingDate,
    guestCount,
    budgetRange,
    excerpt,
    testimonial,
    heroImage { asset, hotspot, crop, alt },
    gallery[] { asset, hotspot, crop, alt },
    body,
    featured,
    publishedAt
  }
`);

type StoryImage = {
  asset: { _ref: string; _type: string } | null;
  hotspot?: { x: number; y: number };
  crop?: object;
  alt: string | null;
};

export type WeddingStoryFull = {
  _id: string;
  slug: string;
  coupleName: { en: string | null; es: string | null } | null;
  weddingDate: string | null;
  guestCount: number | null;
  budgetRange: { en: string | null; es: string | null } | null;
  excerpt: { en: string | null; es: string | null } | null;
  testimonial: { en: string | null; es: string | null } | null;
  heroImage: StoryImage | null;
  gallery: StoryImage[] | null;
  body: { en: unknown[] | null; es: unknown[] | null } | null;
  featured: boolean | null;
  publishedAt: string | null;
} | null;

export async function getStoryBySlug(slug: string): Promise<WeddingStoryFull> {
  return client.fetch(getStoryBySlugQuery, { slug });
}

// Used for generateStaticParams — fetches only slugs
export async function getAllStorySlugs(): Promise<{ slug: string }[]> {
  return (
    client.fetch(`*[_type == "weddingStory"]{ "slug": slug.current }`) ?? []
  );
}
