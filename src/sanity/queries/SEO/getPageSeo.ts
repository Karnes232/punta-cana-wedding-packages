import { defineQuery } from "groq";
import { client } from "@/sanity/lib/client";

export const getPageSeoQuery = defineQuery(`
  *[_type == "pageSeo" && pageName == $pageName][0] {
    pageName,
    seo {
      meta,
      openGraph {
        en,
        es,
        image {
          crop,
          hotspot,
          asset->{
            _id,
            url,
            metadata {
              dimensions { width, height }
            }
          }
        }
      },
      structuredData,
      noIndex,
      noFollow
    }
  }
`);

// ── TypeScript types ───────────────────────────────────────────────────────

type SeoLocalizedMeta = {
  title: string | null;
  description: string | null;
  keywords: string[] | null;
} | null;

type SeoLocalizedOg = {
  title: string | null;
  description: string | null;
} | null;

type SeoOgImage = {
  asset: {
    _id: string;
    url: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  hotspot?: { x: number; y: number };
  crop?: object;
  alt: string | null;
} | null;

export type PageSeoResult = {
  pageName: string;
  seo: {
    meta: { en: SeoLocalizedMeta; es: SeoLocalizedMeta } | null;
    openGraph: {
      en: SeoLocalizedOg;
      es: SeoLocalizedOg;
      image: SeoOgImage;
    } | null;
    structuredData: { en: string | null; es: string | null } | null;
    noIndex: boolean | null;
    noFollow: boolean | null;
  } | null;
} | null;

// ── Helper to resolve locale with en fallback ──────────────────────────────

export function pickLocale<T>(
  obj: { en?: T | null; es?: T | null } | null | undefined,
  locale: string,
): T | null {
  if (!obj) return null;
  return (obj as Record<string, T | null>)[locale] ?? obj.en ?? null;
}

// ── Fetch function ─────────────────────────────────────────────────────────

export async function getPageSeo(pageName: string): Promise<PageSeoResult> {
  return client.fetch(getPageSeoQuery, { pageName });
}
