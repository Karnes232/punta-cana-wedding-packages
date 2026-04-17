# i18n Strategy

## Punta Cana Wedding Packages

Complete reference for the **dual i18n approach**: next-intl for main site (2 languages), Sanity for blog (6+ languages, expandable).

---

## Overview

This project uses **two different i18n strategies** optimized for different parts of the site:

| Part                                                                    | Strategy               | Languages                  | Why                                                         |
| ----------------------------------------------------------------------- | ---------------------- | -------------------------- | ----------------------------------------------------------- |
| **Main Site** (Home, Calculator, How It Works, About, Contact, Stories) | next-intl (code-based) | en, es                     | Fast, type-safe, part of app structure                      |
| **Blog** (Articles & Index)                                             | Sanity (CMS-based)     | en, es, fr, de, ru, + more | Scalable, no code changes needed, marketing team can manage |

---

## Part 1: Main Site i18n (next-intl)

### What It Covers

All pages except blog articles:

- Home (`/:locale/`)
- Wedding Calculator (`/:locale/wedding-calculator`)
- How It Works (`/:locale/how-it-works`)
- About (`/:locale/about`)
- Contact (`/:locale/contact`)
- Stories (`/:locale/stories`)
- Privacy Policy (`/:locale/privacy-policy`)
- Terms of Service (`/:locale/terms-of-service`)

**Languages:** English (en) and Spanish (es)

### How It Works

#### 1. **URL Structure**

All main site URLs include locale:

```
/en/                              # English home
/es/                              # Spanish home
/en/wedding-calculator            # English calculator
/es/wedding-calculator            # Spanish calculator
/en/blog                          # English blog index (Sanity handles language)
/es/blog                          # Spanish blog index (Sanity handles language)
```

#### 2. **File Structure**

```
src/i18n/
├── routing.ts                    # Define locales (en, es), default, prefix strategy
├── request.ts                    # getRequestConfig() loads messages for active locale
├── navigation.ts                 # Locale-aware Link, redirect, usePathname, etc.
└── hreflang.ts                   # SEO alternate language links

messages/
├── en.json                       # English UI strings
│   {
│     "home.hero.title": "Design Your Dream Wedding",
│     "calculator.guests": "Number of Guests",
│     "contact.email": "Your Email",
│     "home.hero.cta": "Start Designing My Wedding",
│     ...
│   }
└── es.json                       # Spanish translations
    {
      "home.hero.title": "Diseña Tu Boda de Ensueño",
      "calculator.guests": "Número de Huéspedes",
      "contact.email": "Tu Correo",
      ...
    }
```

#### 3. **Configuration (routing.ts)**

```typescript
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always", // All URLs have locale (/en/, /es/)
  pathnames: {
    // Optional: custom path names per locale
    "/wedding-calculator": {
      en: "/wedding-calculator",
      es: "/configurador-bodas",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

#### 4. **Request Config (request.ts)**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}.json`)).default,
}));
```

#### 5. **Middleware (proxy.ts)**

```typescript
// src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
```

#### 6. **Using in Components**

**Server Component:**

```typescript
// src/app/(root)/[locale]/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('home')

  return (
    <section>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('hero.cta')}</button>
    </section>
  )
}
```

**Client Component:**

```typescript
// src/components/LanguageSwitcher.tsx
'use client'

import { useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()

  return (
    <select value={locale} onChange={(e) => router.push('/', { locale: e.target.value })}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}
```

#### 7. **Key Rules for Main Site**

✅ **Do:**

- Store all UI text in `messages/en.json` and `messages/es.json`
- Use `getTranslations()` in server components
- Use `useTranslations()` in client components
- Use locale-aware routing functions from `src/i18n/navigation.ts`
- Use dot notation for keys: `home.hero.title`, `calculator.step1.label`
- Group messages by page or domain

❌ **Don't:**

- Hardcode English or Spanish text in components
- Mix i18n strategies (use next-intl consistently on main site)
- Store copy in markdown or config files
- Use different message structure for different pages

---

## Part 2: Blog i18n (Sanity Multi-Language)

### What It Covers

- Blog index (`/:locale/blog`)
- Blog articles (`/:locale/blog/[slug]`)

**Languages:** English (en), Spanish (es), French (fr), German (de), Russian (ru), + expandable to more

### Why Sanity for Blog?

✅ **Advantages:**

- Scale to 10+ languages without code changes
- Marketing team manages translations in Sanity Studio
- Different content per language (not just translations)
- Easy to add/remove languages
- SEO: Each language can have unique slug, metadata, keywords

❌ **Would be harder with next-intl:**

- Would need to commit 1000+ translated strings to git
- Adding new language requires code changes
- Translation management is developer workflow, not marketing

### How It Works

#### 1. **Sanity Schema (Multi-Language)**

**Option A: Localized Fields (Recommended)**

```typescript
// sanity/schemaTypes/BlogArticle.ts
export default {
  name: "blogArticle",
  title: "Blog Article",
  type: "document",
  fields: [
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Unique identifier for the article",
    },
    {
      name: "translations",
      title: "Article Translations",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "articleContent", // Reusable object type
        },
        {
          name: "es",
          title: "Spanish",
          type: "articleContent",
        },
        {
          name: "fr",
          title: "French",
          type: "articleContent",
        },
        {
          name: "de",
          title: "German",
          type: "articleContent",
        },
        {
          name: "ru",
          title: "Russian",
          type: "articleContent",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
  ],
};

// Reusable content object
export const articleContent = {
  name: "articleContent",
  title: "Article Content",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt (for preview)",
      type: "text",
      rows: 3,
    },
    {
      name: "body",
      title: "Content",
      type: "blockContent", // Portable Text
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaDescription", type: "string" },
        { name: "keywords", type: "string" },
      ],
    },
  ],
};
```

**Option B: Separate Documents Per Language**

Less recommended, but alternative:

```
blogArticle-en (English)
blogArticle-es (Spanish)
blogArticle-fr (French)
```

Pros: Simpler schema. Cons: Harder to keep in sync, more Studio clutter.

**Recommendation:** Use Option A (localized fields in single document).

#### 2. **GROQ Queries**

**Get article by slug:**

```typescript
// src/sanity/queries/BlogPage/getArticleBySlug.ts
import { client } from "@/sanity/lib/client";

export async function getArticleBySlug(
  slug: string,
  locale: "en" | "es" | "fr" | "de" | "ru",
) {
  const query = `
    *[_type == "blogArticle" && slug.current == $slug][0] {
      slug,
      translations {
        ${locale}
      },
      publishedAt
    }
  `;

  const article = await client.fetch(query, { slug });

  if (!article?.translations?.[locale]) {
    // Fallback to English if language not found
    return await client.fetch(
      `*[_type == "blogArticle" && slug.current == $slug][0].translations.en`,
      { slug },
    );
  }

  return article.translations[locale];
}
```

**Get all blog articles (with language fallback):**

```typescript
// src/sanity/queries/BlogPage/getAllArticles.ts
export async function getAllArticles(locale: "en" | "es" | "fr" | "de" | "ru") {
  const query = `
    *[_type == "blogArticle"] | order(publishedAt desc) {
      slug,
      translations {
        ${locale} {
          title,
          excerpt,
          featuredImage,
          seo
        }
      },
      publishedAt
    }
  `;

  const articles = await client.fetch(query);

  // Map and handle fallbacks
  return articles
    .map((article) => ({
      slug: article.slug.current,
      content: article.translations[locale] || article.translations.en,
      publishedAt: article.publishedAt,
    }))
    .filter((article) => article.content); // Only articles with content
}
```

#### 3. **Blog Routes**

**Blog Index:**

```typescript
// src/app/(root)/[locale]/blog/page.tsx
import { getAllArticles } from '@/sanity/queries/BlogPage/getAllArticles'

export default async function BlogIndex({ params }) {
  const articles = await getAllArticles(params.locale)

  return (
    <div>
      <h1>Blog</h1>
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} locale={params.locale} />
      ))}
    </div>
  )
}
```

**Blog Article:**

```typescript
// src/app/(root)/[locale]/blog/[slug]/page.tsx
import { getArticleBySlug } from '@/sanity/queries/BlogPage/getArticleBySlug'

export default async function BlogArticle({ params }) {
  const article = await getArticleBySlug(params.slug, params.locale)

  if (!article) {
    notFound()
  }

  return (
    <article>
      <h1>{article.title}</h1>
      <img src={urlFor(article.featuredImage).url()} alt="..." />
      <PortableText value={article.body} />
    </article>
  )
}
```

#### 4. **Key Rules for Blog**

✅ **Do:**

- Store article content in Sanity with language variants
- Use fallback logic (if language not found, show English)
- Query by locale and handle missing translations gracefully
- Let marketing team manage blog translations in Sanity Studio
- Add new languages by updating schema (no code deploy)

❌ **Don't:**

- Store blog articles in code
- Use next-intl messages for blog content
- Create separate blog routes for different languages
- Hardcode articles

---

## Language Expansion

### Adding a New Blog Language

**Step 1:** Update Sanity schema (add language field)

```typescript
// In articleContent object, add:
{
  name: 'ja', // Japanese
  title: 'Japanese',
  type: 'articleContent'
}
```

**Step 2:** Update GROQ queries (add locale option)

```typescript
// In getArticleBySlug:
locale: "en" | "es" | "fr" | "de" | "ru" | "ja";
```

**Step 3:** Update blog routes (TypeScript types)

```typescript
type SupportedLocale = "en" | "es" | "fr" | "de" | "ru" | "ja";
```

**That's it.** No frontend code changes needed (routes are dynamic). Marketing team adds translations in Sanity and they appear automatically.

### Adding Main Site Language

More involved (would need to add code):

**Step 1:** Add locale to `src/i18n/routing.ts`

```typescript
locales: ["en", "es", "fr"]; // Add 'fr' for French
```

**Step 2:** Create `messages/fr.json` with French UI text

**Step 3:** Deploy code

**For blog:** Articles automatically appear in French if translations exist in Sanity.

**Note:** Main site currently supports only 2 languages (en, es). Blog supports 6+ (en, es, fr, de, ru, and easily expandable).

---

## SEO Considerations

### Main Site

Use `hreflang` links to indicate language versions:

```typescript
// src/i18n/hreflang.ts
export function generateHrefLang(currentLocale: string, slug: string) {
  const basePath = `/wedding-calculator`; // Example
  return [
    { lang: "en", href: `https://example.com/en${basePath}` },
    { lang: "es", href: `https://example.com/es${basePath}` },
    { lang: "x-default", href: `https://example.com/en${basePath}` },
  ];
}
```

Add to `<head>`:

```typescript
{hrefLangs.map(link => (
  <link
    key={link.lang}
    rel="alternate"
    hrefLang={link.lang}
    href={link.href}
  />
))}
```

### Blog

Each article URL includes locale:

- `/en/blog/wedding-costs`
- `/es/blog/costos-boda`
- `/fr/blog/couts-mariage`

Search engines automatically understand these are different languages of the same content.

---

## Fallback Strategy

**Main Site:**

- If user visits `/fr/`, redirect to `/en/` (only 2 locales supported)
- Falls back to English for any unsupported locale

**Blog:**

- If article doesn't exist in selected language, show English version
- Graceful degradation (user gets content in English rather than 404)

**Example:**

```typescript
// Article exists in en, es, fr but not de
User visits: /de/blog/wedding-costs
→ Article loads in English (fallback)
→ Consider showing notification: "This article is available in English"
```

---

## Messages Structure (Main Site)

Organize messages by page:

```json
{
  "home": {
    "hero": {
      "title": "...",
      "subtitle": "...",
      "cta": "..."
    },
    "features": {
      "title": "..."
    }
  },
  "calculator": {
    "title": "...",
    "steps": {
      "date": "...",
      "guests": "..."
    }
  },
  "contact": {
    "email": "...",
    "phone": "..."
  }
}
```

This keeps messages organized and easy to find.

---

## Summary: When to Use What

| Scenario                                         | Use                                                    |
| ------------------------------------------------ | ------------------------------------------------------ |
| UI text on main site (buttons, labels, headings) | `messages/` + next-intl                                |
| Blog article content                             | Sanity multi-language                                  |
| Form labels in calculator                        | `messages/` + next-intl                                |
| Blog article title, description                  | Sanity                                                 |
| Page descriptions (SEO)                          | next-intl (main site) or Sanity (blog)                 |
| Adding new language to blog                      | Update Sanity schema only (no code deploy)             |
| Adding new language to main site                 | Add to `routing.ts` + create `messages/` file + deploy |

---

This approach gives you the best of both worlds: fast, type-safe i18n for the core app, and flexible, scalable i18n for the blog.
