import { defineRouting } from "next-intl/routing";

// Locales supported by the main site (wedding builder, marketing pages)
export const MAIN_LOCALES = ["en", "es"] as const;

export const routing = defineRouting({
  locales: ["en", "es", "fr", "it", "de", "pt", "ru", "zh", "ar"],
  defaultLocale: "en",
  localePrefix: "as-needed", // English: localhost:3000/  Spanish: localhost:3000/es/
});
