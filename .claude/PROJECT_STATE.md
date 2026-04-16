# Project State (CORRECTED)
## Punta Cana Wedding Packages

**Last Updated:** April 11, 2026 (CORRECTED: Next.js 16 + Dual i18n Strategy)

This document captures the current tech stack, architectural decisions, and key constraints for the Punta Cana Wedding Packages platform.

---

## Technology Stack

| Technology | Version | Status | Notes |
|-----------|---------|--------|-------|
| **Node.js** | 18+ | ✅ | |
| **Next.js** | 16.x | ✅ | App Router (no Pages Router) |
| **React** | 18.x | ✅ | |
| **TypeScript** | 5.x | ✅ | Strict mode |
| **Tailwind CSS** | 4 | ✅ | No custom CSS needed |
| **Sanity CMS** | 5.x | ✅ | next-sanity 12.x |
| **next-intl** | Latest | ✅ | Main site: en, es |
| **Deployment** | Netlify | ✅ | Static + serverless functions |

---

## Core Architectural Decisions

### 1. **Netlify Deployment (No Backend)**
- **Decision:** Deploy as static site via Netlify
- **Rationale:** Simple, scalable, cost-effective; no managed backend needed
- **Trade-off:** All dynamic content from Sanity; use Netlify Functions if API calls needed
- **Impact:** Forms submit to email (via Netlify or third-party service); no payment processing on site

### 2. **Dual i18n Strategy (CRITICAL)**

#### Main Site i18n: next-intl
- **Covers:** Home, Wedding Calculator, How It Works, About, Contact, Stories, Privacy, Terms
- **Languages:** English (en) and Spanish (es)
- **Method:** Code-based (messages/en.json, messages/es.json)
- **Benefits:** Fast, type-safe, part of app structure
- **URL:** `/:locale/page` (e.g., `/en/wedding-calculator`)

#### Blog i18n: Sanity CMS
- **Covers:** Blog articles and blog index
- **Languages:** English (en), Spanish (es), French (fr), German (de), Russian (ru), + expandable
- **Method:** CMS-based (article translations stored in Sanity)
- **Benefits:** No code changes to add languages; marketing team manages in Sanity Studio
- **URL:** `/:locale/blog` (route locale determines which language loads; Sanity handles content)
- **Fallback:** If article not in selected language, show English

**Why Two Strategies?**
- Main site needs fast i18n (part of App Router)
- Blog needs scalable i18n (easy to add French, German, Russian without code changes)

See `i18n-strategy.md` for complete implementation details.

### 3. **Server-First Components**
- **Decision:** Default to Server Components, use `"use client"` sparingly
- **Rationale:** Reduces JS bundle, safer data handling, easier SEO
- **Examples:** Pages fetch Sanity data as Server Components; calculator state uses client boundary
- **Status:** ✅ Standard practice

### 4. **Predetermined Pricing (Not Dynamic)**
- **Decision:** All wedding calculator prices come from Sanity; no manual calculation
- **Rationale:** Accuracy, scalability, audit trail
- **Examples:** Menu costs per person, venue costs, photo packages, etc. all configured in Sanity
- **Impact:** Wedding builder is a configuration + calculation engine, not a pricing engine

### 5. **Fixed Venue (Cabeza de Toro)**
- **Decision:** All weddings in same venue; location not user-selectable
- **Rationale:** Simplifies logistics, reduces cost variations, controls pricing model
- **Impact:** Can use simpler pricing rules; venue cost is constant

### 6. **Page-Scoped Component Organization**
- **Decision:** Components organized by PAGE/DOMAIN, not by type
- **Rationale:** Easier to find code, reduces cross-page dependencies, scales better
- **Examples:** `src/components/HomePage/`, `src/components/WeddingCalculatorPage/`, not `src/components/buttons/`, `src/components/cards/`
- **Status:** ✅ Preferred structure (see file-structure.md)

### 7. **Sanity 5.x with next-sanity 12.x**
- **Decision:** Use latest stable Sanity with modern next-sanity package
- **Rationale:** Best compatibility with Next.js 16; latest features; good SDK
- **GROQ Queries:** Organized in `src/sanity/queries/` by page/domain (mirrors schema structure)
- **Image Handling:** Use Sanity image URL builder (`urlFor()`)
- **Blog Schema:** Supports multi-language translations (en, es, fr, de, ru, +)

### 8. **next-intl for Main Site Internationalization**
- **Decision:** Use next-intl for main site routes (not blog)
- **Locales:** English (en) and Spanish (es)
- **Route Structure:** All routes wrapped in `/:locale/` (e.g., `/en/`, `/es/`)
- **Messages:** All UI text in `messages/en.json` and `messages/es.json`
- **Constraint:** Zero hardcoded English/Spanish in components
- **Blog Handling:** Blog routes use dynamic locale, but article content comes from Sanity (multi-language)
- **Status:** ✅ Implemented in project structure

### 9. **Sanity for Blog Multi-Language**
- **Decision:** Blog articles stored in Sanity with language variants (not in code)
- **Languages:** en, es, fr, de, ru, + easily expandable (no code changes needed to add languages)
- **How It Works:** Each article document in Sanity has `translations.en`, `translations.es`, `translations.fr`, etc.
- **Route:** Single blog route `/:locale/blog/[slug]` fetches right language from Sanity
- **Fallback:** If language not found, show English version
- **Status:** ✅ Scalable approach

### 10. **No Payment Processing on Site**
- **Decision:** Wedding builder submits form to planning team; payments handled offline
- **Rationale:** Simplifies compliance; business wants direct customer relationship
- **What Site Captures:** Wedding configuration, estimated total, couple's contact info
- **What Happens Next:** Planning team follows up via email/WhatsApp; negotiates deposit and payment
- **Constraint:** Form submission must be reliable and include full wedding config

---

## Project Pages & Routes

| Route | Purpose | Languages | Status |
|-------|---------|-----------|--------|
| `/:locale/` | Home page | en, es | ✅ Scope |
| `/:locale/wedding-calculator` | Wedding builder (core feature) | en, es | ✅ Scope |
| `/:locale/how-it-works` | Process explanation | en, es | ✅ Scope |
| `/:locale/about` | Company/team trust-building | en, es | ✅ Scope |
| `/:locale/contact` | Contact form + info | en, es | ✅ Scope |
| `/:locale/blog` | Blog index + articles | en, es, fr, de, ru, +more | ✅ Scope |
| `/:locale/blog/[slug]` | Individual article | dynamic (Sanity) | ✅ Scope |
| `/:locale/stories` | Wedding stories/testimonials | en, es | ✅ Scope |
| `/:locale/privacy-policy` | Legal | en, es | ✅ Scope |
| `/:locale/terms-of-service` | Legal | en, es | ✅ Scope |

---

## Design Principles

### Feeling
**Not:** Luxury, dark, gold, aggressive, complicated
**Yes:** Soft, light, clean, romantic, professional, easy, calm

### Color Palette
- **White:** ~75% (main background)
- **Light neutrals:** ~15% (light gray, sand, sky blue, soft green)
- **Accent:** ~10% (soft blue or sage green for CTAs/buttons)

### Visual Style
- Soft shadows, rounded corners
- Thin, light gray lines
- Generous white space
- Clean, modern typography (Montserrat, Open Sans, Poppins)
- Real wedding photos (natural light, bright environments)
- Smooth, subtle animations

**Metaphor:** "Soft beach breeze — everything clear, everything easy, everything calm"

See `design-vision.md` for complete guidelines.

---

## Wedding Calculator Specification

### Core Function
Transform a manual, slow sales process into a fast, visual, transparent wedding configuration experience.

### Master Variable
**Guest Count:** Affects food, drinks, transportation, furniture, staffing. Established early; recalculates all dependent costs when changed.

### Categories to Calculate
1. Venue & coordination (fixed)
2. Menu (per person × guests)
3. Drinks & open bar (type, duration, guests)
4. Furniture (chairs, tables, linens; style matters)
5. Decoration & flowers (package + upgrades)
6. Photography & videography (package + duration)
7. Transportation (zone + vehicle + guests)
8. Entertainment (fixed or hourly)
9. Extras (welcome dinner, Saona trips, etc.)

### User Experience
- **Step-by-step wizard:** Not a spreadsheet
- **Live pricing:** Every choice updates estimated total
- **Visual & aspirational:** Feels beautiful, not technical
- **Transparent:** Always clear why price changed
- **Final summary:** Show complete wedding config before form submission

### Form Submission
- Captures couple's info (name, email, WhatsApp, wedding date)
- Includes full wedding configuration + estimated total
- Sends via email to planning team
- Planning team follows up manually

See `wedding-builder-logic.md` for detailed calculation rules.

---

## Known Constraints

1. **Locale wrapping required:** All main site routes inside `/:locale/` (en or es)
2. **Blog language via Sanity:** Blog uses CMS for multi-language, not code
3. **Sanity is source of truth:** All dynamic content from CMS
4. **No backend:** Netlify only; use Functions for external API calls if needed
5. **Static deployment:** Build-time; use ISR if dynamic content needed
6. **No payments on site:** Forms only; offline payment handling
7. **Fixed venue:** Prices controlled by venue limitation
8. **i18n required:** No hardcoded text in English or Spanish (use next-intl or Sanity)
9. **Main site languages fixed:** Adding new main site language requires code + messages file
10. **Blog languages flexible:** Adding blog language requires Sanity schema update only

---

## Performance Targets

| Metric | Target |
|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s |
| **FID** (First Input Delay) | < 100ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 |
| **Lighthouse Score (Mobile)** | 90+ |

---

## Sanity Schema Organization

**Mirrors component structure for clarity:**

| Sanity Schema | Components | Pages | i18n Method |
|---------------|-----------|-------|------------|
| `HomePage` | `src/components/HomePage/` | `/:locale/` | next-intl |
| `WeddingCalculator` | `src/components/WeddingCalculatorPage/` | `/:locale/wedding-calculator` | next-intl |
| `HowItWorksPage` | `src/components/HowItWorksPage/` | `/:locale/how-it-works` | next-intl |
| `AboutPage` | `src/components/AboutPage/` | `/:locale/about` | next-intl |
| `ContactPage` | `src/components/ContactPage/` | `/:locale/contact` | next-intl |
| `BlogArticle` | `src/components/BlogPage/` | `/:locale/blog/[slug]` | **Sanity** |
| `StoriesPage` | `src/components/StoriesPage/` | `/:locale/stories` | next-intl |
| `GeneralLayout` | `src/components/Layout/` | Navbar/Footer | next-intl |
| `LegalDocuments` | — | Privacy/Terms | next-intl |

**Queries** stored in `src/sanity/queries/` using same folder structure.

---

## Recent Decisions & Timeline

| Date | Decision | Rationale |
|------|----------|-----------|
| Apr 11, 2026 | **CORRECTION: Next.js 16** | You specified Next.js 16, not 14 |
| Apr 11, 2026 | **CORRECTION: Dual i18n strategy** | Main site next-intl (en, es); blog Sanity (en, es, fr, de, ru, +) |
| Apr 11, 2026 | **New project initiated** | Client brief received (3 PDFs) |
| Apr 2026 | **Netlify over Vercel** | Client preference; simpler DevOps |
| Apr 2026 | **Sanity 5.x** | Latest stable; next-sanity 12.x compat |
| Apr 2026 | **Page-scoped components** | Client's FILE_STRUCTURE.md preference |
| Apr 2026 | **No backend** | Client wants simplicity; email forms only |

---

## Next Steps (Not Yet Started)

- [ ] Initialize Next.js 16 project with App Router
- [ ] Set up Sanity 5.x (create project, dataset)
- [ ] Configure next-intl (routing, middleware, messages structure)
- [ ] Configure blog i18n (Sanity schema with language variants)
- [ ] Create root layouts and page scaffolding
- [ ] Build wedding calculator logic (most complex)
- [ ] Design Sanity schemas (HomePage, Calculator, BlogArticle, etc.)
- [ ] Create reusable components (Navbar, Footer, Forms)
- [ ] Implement i18n messages (en.json, es.json for next-intl)
- [ ] Create blog article translations in Sanity (en, es, fr, de, ru)
- [ ] Design & implement visual style (Tailwind 4)
- [ ] Set up Netlify deployment
- [ ] Test all routes, i18n (main site + blog), calculator

---

## Key Differences from v1 Setup

✅ **Next.js 16** (was: 14)
✅ **Dual i18n strategy:** next-intl for main site, Sanity for blog (was: all next-intl)
✅ **Blog multi-language:** en, es, fr, de, ru, + expandable (was: only en, es)
✅ **Scalable blog translations:** No code changes to add languages (was: would require messages file)

---

## Questions or Updates?

As the project progresses, update this document:
- New tech decision → Add to "Architectural Decisions"
- New route → Add to "Pages & Routes"
- New constraint discovered → Add to "Known Constraints"
- Completed milestone → Add to "Timeline"

This doc is the source of truth for why things are structured the way they are.