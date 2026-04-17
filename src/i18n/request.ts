import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  // Only en and es have dedicated message files; all other locales (blog-only)
  // fall back to English for the main-site UI strings.
  const messageLocale = ["en", "es"].includes(locale!) ? locale : "en";

  return {
    locale,
    messages: (await import(`../../messages/${messageLocale}.json`)).default,
  };
});
