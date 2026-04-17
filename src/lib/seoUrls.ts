const BASE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://puntacanaweddingpackages.com";

/**
 * Build an absolute URL for a given locale and path.
 * English (default locale) gets no prefix; all others are prefixed.
 * e.g. buildUrl('es', '/about') → 'https://domain.com/es/about'
 *      buildUrl('en', '/about') → 'https://domain.com/about'
 */
export function buildUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${BASE}${prefix}${path}`;
}

/**
 * Returns `alternates` for Next.js generateMetadata for a static
 * bilingual page (en + es only).
 */
export function getPageAlternates(path: string, locale: string) {
  const enUrl = buildUrl("en", path);
  const esUrl = buildUrl("es", path);
  return {
    canonical: locale === "es" ? esUrl : enUrl,
    languages: {
      en: enUrl,
      es: esUrl,
      "x-default": enUrl,
    },
  };
}
