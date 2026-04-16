// All locales supported by the blog section.
// Each blog article is a separate Sanity document per language.
export const ALL_LOCALES = [
  'en',
  'es',
  'fr',
  'it',
  'de',
  'pt',
  'ru',
  'zh',
  'ar',
] as const;

export type BlogLocale = (typeof ALL_LOCALES)[number];
