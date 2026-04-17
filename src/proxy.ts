import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";
import { NextRequest, NextResponse } from "next/server";
import { routing, MAIN_LOCALES } from "./i18n/routing";

// Blog-only locales — valid in /blog routes, not anywhere else
const BLOG_ONLY_LOCALES = routing.locales.filter(
  (l) => !(MAIN_LOCALES as readonly string[]).includes(l),
) as string[];

// Full 9-locale handler used only for blog routes
const handleBlog = createMiddleware(routing);

// Main-site handler: only knows en/es — can never auto-detect a blog-only locale
const handleMainSite = createMiddleware(
  defineRouting({
    locales: MAIN_LOCALES,
    defaultLocale: "en",
    localePrefix: "as-needed",
  }),
);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const possibleLocale = segments[0];

  // Determine the path with any leading locale segment stripped
  const isKnownLocale = (routing.locales as unknown as string[]).includes(
    possibleLocale,
  );
  const pathWithoutLocale = isKnownLocale
    ? "/" + segments.slice(1).join("/")
    : pathname;

  const isBlogPath =
    pathWithoutLocale === "/blog" || pathWithoutLocale.startsWith("/blog/");

  // Blog routes: let the full 9-locale middleware handle them
  if (isBlogPath) {
    return handleBlog(request);
  }

  // Non-blog route with a blog-only locale prefix: redirect to the unprefixed path
  // (next-intl's main-site handler will then pick it up as English)
  if (BLOG_ONLY_LOCALES.includes(possibleLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = pathWithoutLocale || "/";
    return NextResponse.redirect(url, { status: 308 });
  }

  // All other routes: main-site handler (en/es only — no risk of blog-locale detection)
  return handleMainSite(request);
}

export const config = {
  matcher: [
    // Match all paths except: api routes, _next internals, _vercel, studio, and static files
    "/((?!api|_next|_vercel|studio|.*\\..*).*)",
  ],
};
