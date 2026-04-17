import type { MetadataRoute } from "next";
import { buildUrl } from "@/lib/seoUrls";
import { getAllArticleSlugsForSitemap } from "@/sanity/queries/Blog/getAllArticles";
import { getAllStorySlugsForSitemap } from "@/sanity/queries/StoriesPage/getAllStories";

// Main-site locales that appear in sitemaps (en + es)
const SITE_LOCALES = ["en", "es"] as const;

// Static routes shared across both main-site locales
const STATIC_PATHS = [
  "/",
  "/wedding-calculator",
  "/how-it-works",
  "/about",
  "/contact",
  "/stories",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, stories] = await Promise.all([
    getAllArticleSlugsForSitemap(),
    getAllStorySlugsForSitemap(),
  ]);

  // ── Static pages × 2 locales ────────────────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    SITE_LOCALES.map((locale) => ({
      url: buildUrl(locale, path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1.0 : 0.8,
    })),
  );

  // ── Blog articles (all locales present in Sanity) ──────────────────────────
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: buildUrl(a.language, `/blog/${a.slug}`),
    lastModified: a._updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // ── Wedding stories × 2 locales ────────────────────────────────────────────
  const storyEntries: MetadataRoute.Sitemap = stories.flatMap((s) =>
    SITE_LOCALES.map((locale) => ({
      url: buildUrl(locale, `/stories/${s.slug}`),
      lastModified: s._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...articleEntries, ...storyEntries];
}
