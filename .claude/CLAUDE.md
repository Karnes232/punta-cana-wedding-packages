# Claude Code Instructions

## Punta Cana Wedding Packages

You are assisting with **Punta Cana Wedding Packages**, an elegant wedding configuration platform for destination weddings in Punta Cana, Dominican Republic.

---

## Quick Facts

- **Project:** Punta Cana Wedding Packages (Wedding Builder + Blog + Lead System)
- **Framework:** Next.js 16 with App Router
- **Deployment:** Netlify
- **CMS:** Sanity 5.x with next-sanity 12.x
- **Internationalization:**
  - **Main site (Wedding Builder):** next-intl (en, es)
  - **Blog:** Multi-language via Sanity (en, es, fr, de, ru, and expandable to more)
- **Styling:** Tailwind CSS 4
- **Package Manager:** npm
- **Hosting:** Netlify (no backend; static site + serverless functions)

---

## Before You Start

Read these docs in order:

1. **`file-structure.md`** — Exact folder organization (page-scoped components, Sanity structure)
2. **`PROJECT_STATE.md`** — Current architecture, tech stack, decisions
3. **`design-vision.md`** — Design feeling: soft, clean, romantic, easy (NOT luxury dark)
4. **`website-structure.md`** — What each page does and how they connect
5. **`wedding-builder-logic.md`** — How the wedding calculator works and what it calculates
6. **`i18n-strategy.md`** — IMPORTANT: How i18n works for main site vs blog

---

## Project Overview

### What This Website Does

Punta Cana Wedding Packages is **not a brochure website**. It is a **sales and planning system** where:

1. **Visitors discover** through the Home page or blog articles (in multiple languages)
2. **They understand** through How It Works and About Us pages (en/es)
3. **They build** using the Wedding Calculator (en/es only)
4. **They lead** by submitting the form, which goes to the planning team
5. **The team follows up** manually (no payments on the site)

The wedding calculator is the core conversion tool. Every other page exists to support visitors getting there.

### Core Pages & Languages

| Page                   | Route                         | Languages                  |
| ---------------------- | ----------------------------- | -------------------------- |
| **Home**               | `/:locale/`                   | en, es                     |
| **Wedding Calculator** | `/:locale/wedding-calculator` | en, es                     |
| **How It Works**       | `/:locale/how-it-works`       | en, es                     |
| **About Us**           | `/:locale/about`              | en, es                     |
| **Contact**            | `/:locale/contact`            | en, es                     |
| **Blog**               | `/:locale/blog`               | en, es, fr, de, ru, + more |
| **Blog Article**       | `/:locale/blog/[slug]`        | en, es, fr, de, ru, + more |
| **Stories**            | `/:locale/stories`            | en, es                     |
| **Privacy Policy**     | `/:locale/privacy-policy`     | en, es                     |
| **Terms of Service**   | `/:locale/terms-of-service`   | en, es                     |

---

## Key Architectural Principles

### 1. **Dual i18n Strategy**

**Main Site (Wedding Builder & Marketing):**

- Uses `next-intl` for routing & translations
- 2 languages: English (en) and Spanish (es)
- All pages wrapped in `/:locale/` URL structure
- UI text stored in `messages/en.json` and `messages/es.json`

**Blog:**

- Languages stored in **Sanity CMS** (not in code)
- Each blog article has translations for: en, es, fr, de, ru (and easily expandable)
- Single blog article route: `/:locale/blog/[slug]`
- URL always reflects main site locale, but article content loads language from Sanity
- If article exists in that language in Sanity, show it; otherwise, show fallback (en)

**Why two strategies?**

- Wedding builder needs fast, code-based i18n (next-intl)
- Blog needs flexible, CMS-based i18n (scalable to many languages without code changes)

### 2. **Server-First Components**

- Default to Server Components
- Use `"use client"` only for interactivity (calculator state, language switcher, forms)
- Fetch data on server, pass to client components as props

### 3. **Sanity as Source of Truth**

- All content lives in Sanity 5.x
- GROQ queries grouped by page/domain in `src/sanity/queries/`
- Blog articles stored with multi-language support
- Revalidation: On-demand via Netlify's ISR or build trigger

### 4. **Page-Scoped Component Organization**

- Components organized by PAGE, not by type
- Example: `src/components/HomePage/`, `src/components/WeddingCalculatorPage/`
- Shared/reusable: `src/components/Layout/`, `src/components/ui/`, `src/components/BlockContent/`
- See `file-structure.md` for complete hierarchy

### 5. **Wedding Calculator = Guided State Machine**

- Step-by-step flow (date → guests → hotel → menu → decor → etc.)
- Each selection updates estimated total live
- Built with predetermined pricing logic (not manual quotes)
- At end: form submission → email to planning team
- See `wedding-builder-logic.md` for full calculation rules

### 6. **Design: Soft, Clean, Romantic, Professional**

- **NOT luxury/dark/gold**
- ~75% white, 15% light neutrals, 10% accent color
- Soft shadows, rounded corners, light gray lines
- Feeling: "Soft beach breeze" — calm, clear, easy
- See `design-vision.md` for complete guidelines

---

## File Organization

See **`file-structure.md`** for complete details. Quick reference:

```
src/
├── app/
│   ├── layout.tsx                     # Root HTML shell
│   └── (root)/
│       └── [locale]/                  # All routes wrapped in locale
│           ├── page.tsx               # Home
│           ├── wedding-calculator/
│           │   └── page.tsx           # Wedding builder (main feature!)
│           ├── how-it-works/page.tsx
│           ├── about/page.tsx
│           ├── contact/page.tsx
│           ├── blog/
│           │   ├── page.tsx           # Blog index
│           │   └── [slug]/page.tsx    # Blog article (multi-language from Sanity)
│           ├── stories/page.tsx
│           └── [slug]/page.tsx
├── components/
│   ├── HomePage/                      # Page-scoped
│   ├── WeddingCalculatorPage/         # Page-scoped (biggest!)
│   ├── BlogPage/
│   ├── StoriesPage/
│   ├── Layout/                        # Shared (Navbar, Footer)
│   ├── BlockContent/                  # Portable Text
│   └── ui/                            # Primitives
├── i18n/
│   ├── routing.ts                     # next-intl config (en, es)
│   ├── request.ts
│   ├── navigation.ts
│   └── hreflang.ts
├── sanity/
│   ├── client.ts
│   ├── env.ts
│   ├── schemaTypes/                   # Organized by page/domain
│   └── queries/                       # GROQ queries, grouped same way
└── proxy.ts                           # next-intl middleware

messages/
├── en.json                            # English (main site UI strings)
└── es.json                            # Spanish (main site UI strings)
```

**Blog articles are in Sanity**, not in code. Each article has language variants:

```sanity
Article: "How Much Does a Wedding Cost?"
├── en (English)
├── es (Spanish)
├── fr (French)
├── de (German)
├── ru (Russian)
└── [any future language]
```

---

## Wedding Calculator Deep Dive

The calculator is the most complex part of the project. Understand these layers:

### User Experience

- **Not a spreadsheet.** Feels elegant, guided, romantic.
- **Step-by-step wizard.** Each step focuses on one thing.
- **Live pricing.** Every choice updates estimated total immediately.
- **Final summary.** Show everything before submission.
- **Form submission.** Email goes to planning team with full wedding config.

### Business Logic (What to Calculate)

- **Guest count** (master variable; affects food, drinks, tables, transportation, etc.)
- **Venue & coordination** (fixed; always included)
- **Menu** (cost per person × guest count)
- **Drinks & open bar** (type + duration + guest count)
- **Furniture** (chairs, tables, linens; style affects price)
- **Decoration & flowers** (package selection + add-ons)
- **Photography & videography** (package + optional upgrades)
- **Transportation** (hotel zone + vehicle type + guest count)
- **Entertainment** (DJ, live music, etc.; fixed price or hourly)
- **Extras** (Saona trips, welcome dinner, etc.; optional add-ons)

### Developer Mindset

- **Predetermined pricing.** All prices come from Sanity; not made up during form fill.
- **Automatic calculation.** Guest count changes → all costs recalculate.
- **Clear transparency.** User always understands why price changed.
- **Email submission.** Form data → email to team (no payment processing).

See `wedding-builder-logic.md` for full calculation logic and formulas.

---

## i18n Strategy (Critical!)

### Main Site (next-intl)

All pages except blog use `next-intl` for routing and translations.

**How it works:**

1. URL structure: `/:locale/...` (e.g., `/en/`, `/es/`)
2. UI text stored in `messages/en.json` and `messages/es.json`
3. Configured in `src/i18n/routing.ts`
4. Middleware in `src/proxy.ts` handles routing
5. Components use `getTranslations()` (server) or `useTranslations()` (client)

**Example:**

```typescript
// Server component
const t = await getTranslations('home');
<h1>{t('hero.title')}</h1>

// Client component
const t = useTranslations('home');
<h1>{t('hero.title')}</h1>
```

### Blog (Sanity + Dynamic Language)

Blog articles are stored in Sanity with multi-language support.

**How it works:**

1. Blog article document in Sanity has `title_en`, `title_es`, `title_fr`, `title_de`, `title_ru`, etc.
2. Or use Sanity's localization object: `{ en: "...", es: "...", fr: "..." }`
3. When user visits `/en/blog/[slug]`, the route locale is `en`
4. Query fetches article and returns content in that language
5. If article doesn't exist in that language, show fallback (e.g., English)

**Benefits:**

- Easy to add new languages (just add fields in Sanity, no code change)
- Each language version can have different title, description, content
- Blog can grow to 10+ languages without touching code
- Marketing team manages translations in Sanity Studio

**Schema Example (Sanity):**

```typescript
{
  name: 'blogArticle',
  title: 'Blog Article',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'slug',
    },
    {
      name: 'translations',
      type: 'object',
      fields: [
        { name: 'en', type: 'blogContent' }, // Reusable object with title, body, excerpt
        { name: 'es', type: 'blogContent' },
        { name: 'fr', type: 'blogContent' },
        { name: 'de', type: 'blogContent' },
        { name: 'ru', type: 'blogContent' },
      ]
    }
  ]
}
```

See `i18n-strategy.md` for complete implementation details.

---

## Design & UX Principles

### Feeling

✅ Soft, light, clean, romantic, professional, easy, calm, trustworthy
❌ Luxury, dark, aggressive, heavy, complicated, cold

### Colors

- **White** ~75% (background, breathing room)
- **Light neutrals** ~15% (light gray, sand, sky blue, soft green)
- **Accent** ~10% (soft blue or sage green for buttons/CTAs)

### Components

- **Buttons:** Rounded, soft colors, smooth hover, friendly text
- **Lines/borders:** Thin, very light gray, rounded corners
- **Spacing:** Generous white space (users should feel calm)
- **Typography:** Clean, modern (Montserrat, Open Sans, Poppins); strong hierarchy
- **Images:** Natural light, real weddings, bright environments (NOT dark/night photos)
- **Animations:** Soft, smooth, subtle (NOT bouncy or fast)

See `design-vision.md` for complete visual guidelines.

---

## Common Tasks

### Adding i18n Text to Main Site

1. Add key to `messages/en.json` and `messages/es.json`
   ```json
   { "home.hero.title": "Design Your Dream Wedding" }
   ```
2. Use in component:

   ```typescript
   // Server component
   const t = await getTranslations('home');
   <h1>{t('hero.title')}</h1>

   // Client component
   const t = useTranslations('home');
   <h1>{t('hero.title')}</h1>
   ```

### Adding a Blog Article (Multi-Language)

1. Create document in Sanity
2. Add translations for each language: en, es, fr, de, ru (expandable)
3. Each translation has: title, excerpt, body (Portable Text), featured image, author
4. Blog route `/:locale/blog/[slug]` automatically fetches the right language
5. Fallback to English if language doesn't exist

### Adding a New Wedding Calculator Feature

1. Define pricing in Sanity schema
2. Create GROQ query to fetch pricing data
3. Add state step in calculator component
4. Calculate cost: `selectedOption.price × (quantity or guests)`
5. Update running total
6. Show in summary before form submission

---

## Key Decisions & Constraints

| Decision                    | Rationale                                     | Impact                                                |
| --------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| **Next.js 16**              | Latest stable with App Router                 | Modern framework, better performance                  |
| **Netlify deployment**      | Simple, scalable, cost-effective              | No managed backend; serverless functions only         |
| **Sanity 5.x**              | Latest with best next-sanity support          | Future-proof CMS choice                               |
| **Dual i18n strategy**      | Main site fast (code), blog flexible (Sanity) | Scalability for blog expansion                        |
| **Fixed venue**             | Cabeza de Toro simplifies logistics           | Coordinate pricing is controlled                      |
| **Predetermined pricing**   | Accuracy, auditability, scalability           | All prices in Sanity; calculator only adds/multiplies |
| **Page-scoped components**  | Maintainability, clarity                      | Find code easily; reduce dependencies                 |
| **next-intl for main site** | Industry standard, App Router native          | Only 2 languages needed in code                       |
| **Sanity for blog i18n**    | Expandable, no code changes needed            | Easy to add French, German, Russian, more             |

---

## Deployment & Performance

### Netlify Specifics

- **Build:** Next.js 16 with App Router
- **ISR:** Use Netlify's on-demand revalidation
- **Edge functions:** Available for redirects, API calls
- **Environment variables:** Set in Netlify dashboard or `.env.local`

### Performance Goals

- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse:** Aim for 90+ on mobile
- **Image optimization:** Use `next/image` with Sanity image URLs
- **Bundle size:** Keep JS minimal; Tailwind purges unused CSS

---

## Sanity 5.x + next-sanity 12.x

### Key Patterns

- **Client setup:** `src/sanity/lib/client.ts` uses `@sanity/client`
- **Fetch in Server Components:** No need for suspense; use `async/await`
- **GROQ queries:** Write in `src/sanity/queries/` folders
- **Live preview:** Optional; configure in `src/sanity/lib/live.ts` if needed
- **Desk structure:** `src/sanity/structure.ts` organizes Studio
- **Multi-language:** Blog articles stored with language variants in Sanity

### Image URLs

```typescript
// Use Sanity image URL builder
import { urlFor } from '@/sanity/lib/image'

<img src={urlFor(imageAsset).url()} alt="..." />
```

---

## Testing & Quality

### Before Deploying

- [ ] All routes render (no 404s) for both locales (en, es)
- [ ] Blog articles render in multiple languages
- [ ] Wedding calculator: All steps work, total updates correctly
- [ ] Forms: Submit successfully (check email)
- [ ] Images: All load from Sanity without errors
- [ ] Lighthouse: 90+ score on mobile
- [ ] Core Web Vitals: Meet targets
- [ ] No console errors or warnings
- [ ] Language switcher works correctly

---

## When to Ask Claude Code

✅ **Do ask:**

- "Add a new page for [feature]"
- "Create a form component for [thing]"
- "Update the wedding calculator to include [pricing logic]"
- "Add a blog article with [language] translation"
- "Fix the i18n translation for [page]"
- "Create Sanity schema for [content type]"

❌ **Don't ask without context:**

- "Optimize the site" (which page/metric?)
- "Add authentication" (not in scope for this project)
- "Handle payments" (business does this offline)

---

## Documentation Links

- **`file-structure.md`** — Complete folder organization
- **`PROJECT_STATE.md`** — Tech versions, decisions, constraints
- **`i18n-strategy.md`** — CRITICAL: i18n strategy (main site vs blog)
- **`design-vision.md`** — Visual guidelines (colors, buttons, spacing, etc.)
- **`website-structure.md`** — What each page does and sales funnel
- **`wedding-builder-logic.md`** — Calculation rules and pricing formulas
- **`settings.json`** — Shared config (versions, conventions)

---

## Questions or Clarifications?

Each doc has a summary section. If something is unclear:

1. Check the relevant doc
2. Look for a real example
3. Ask Claude Code with specific context

This is a brand new project, so your guidance and context will shape how it grows. Keep these docs updated as you make decisions.

---

**Let's build something beautiful.** 🌊
