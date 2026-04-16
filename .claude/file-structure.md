# File Structure
## Punta Cana Wedding Packages

Complete reference for where every file should go. Based on your preferred organization (page-scoped components, Sanity structure mirrors schema).

---

## Root Level

```
punta-cana-wedding-packages/
├── messages/                    # next-intl translation files
│   ├── en.json                  # English UI strings
│   └── es.json                  # Spanish UI strings
│
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                     # Next.js App Router
│   ├── components/              # React components (page-scoped)
│   ├── i18n/                    # Internationalization config
│   ├── sanity/                  # CMS client, schemas, queries
│   └── proxy.ts                 # next-intl middleware
│
├── .env.local                   # Environment variables (gitignored)
├── next.config.ts               # Next.js configuration
├── package.json
├── sanity.cli.ts                # Sanity CLI config
├── sanity.config.ts             # Sanity Studio config
├── tailwind.config.ts           # Tailwind CSS 4 config
├── tsconfig.json                # TypeScript config
└── README.md
```

---

## Internationalization (`messages/` + `src/i18n/`)

### messages/ (Translation Catalogs)

```
messages/
├── en.json                      # English UI strings
│   {
│     "home.hero.title": "Design Your Dream Wedding",
│     "calculator.guests": "Number of Guests",
│     "contact.email": "Your Email",
│     ...
│   }
└── es.json                      # Spanish translations
```

**Guidelines:**
- Use dot notation for nested keys: `home.hero.title`, `contact.form.email`
- Group by page: `home.*`, `calculator.*`, `contact.*`, etc.
- No hardcoded text in components; everything from messages JSON

### src/i18n/ (Configuration & Helpers)

```
src/i18n/
├── routing.ts                   # defineRouting() with locales (en, es)
├── request.ts                   # getRequestConfig() to load messages
├── navigation.ts                # Locale-aware Link, redirect, usePathname
└── hreflang.ts                  # SEO alternate language helpers
```

**Key Functions:**
- `routing.ts`: Defines available locales, default, prefix strategy
- `request.ts`: Loads appropriate message file based on locale
- `navigation.ts`: Provides locale-aware routing helpers
- `hreflang.ts`: Generates SEO alternate language links

---

## App Router (`src/app/`)

```
src/app/
├── globals.css                  # Global styles (Tailwind directives)
│
├── layout.tsx                   # Root HTML shell
│   ├── <html>
│   ├── <body>
│   └── {children}
│
└── (root)/                      # Route group (shared layout shell)
    ├── layout.tsx               # Wraps all locale routes (Navbar/Footer)
    │
    └── [locale]/                # Dynamic locale segment (en, es)
        ├── layout.tsx           # Per-locale: NextIntlClientProvider
        │
        ├── page.tsx             # Home page: /:locale/
        │
        ├── wedding-calculator/
        │   └── page.tsx         # Calculator: /:locale/wedding-calculator
        │
        ├── how-it-works/
        │   └── page.tsx         # How It Works: /:locale/how-it-works
        │
        ├── about/
        │   └── page.tsx         # About Us: /:locale/about
        │
        ├── contact/
        │   └── page.tsx         # Contact: /:locale/contact
        │
        ├── blog/
        │   ├── page.tsx         # Blog index: /:locale/blog
        │   └── [slug]/
        │       └── page.tsx     # Article: /:locale/blog/[slug]
        │
        ├── stories/
        │   ├── page.tsx         # Stories index: /:locale/stories
        │   └── [slug]/
        │       └── page.tsx     # Story: /:locale/stories/[slug]
        │
        ├── privacy-policy/
        │   └── page.tsx         # Privacy: /:locale/privacy-policy
        │
        └── terms-of-service/
            └── page.tsx         # Terms: /:locale/terms-of-service
```

**Structure Explanation:**
- **`layout.tsx` (root):** HTML shell, wraps everything
- **`(root)/layout.tsx`:** Shared site shell (Navbar/Footer)
- **`[locale]/layout.tsx`:** Per-locale providers (NextIntlClientProvider)
- **Routes inside `[locale]/`:** All user-facing pages must be locale-aware

---

## Components (`src/components/`)

**Organization:** By PAGE/DOMAIN, not by type.

```
src/components/
│
├── HomePage/                    # Home page components
│   ├── Hero.tsx
│   ├── BrandStatement.tsx
│   ├── HowItWorks.tsx           # Quick how-it-works section
│   ├── PackageCategories.tsx
│   ├── FeaturedStory.tsx
│   ├── CTABanner.tsx
│   ├── TrustIndicators.tsx
│   └── index.ts                 # Export all
│
├── WeddingCalculatorPage/       # Wedding builder (largest section)
│   ├── Calculator.tsx           # Main wrapper (client component with state)
│   ├── CalculatorStep.tsx       # Single step container
│   ├── steps/
│   │   ├── DateStep.tsx         # Choose wedding date
│   │   ├── GuestsStep.tsx       # Choose guest count
│   │   ├── HotelStep.tsx        # Choose hotel/area
│   │   ├── VenueStep.tsx        # Venue details
│   │   ├── MenuStep.tsx         # Menu selection
│   │   ├── DrinksStep.tsx       # Drinks & open bar
│   │   ├── FurnitureStep.tsx    # Chairs, tables, linens
│   │   ├── DecorStep.tsx        # Decoration & flowers
│   │   ├── PhotoStep.tsx        # Photography
│   │   ├── VideoStep.tsx        # Videography
│   │   ├── TransportStep.tsx    # Transportation
│   │   ├── EntertainmentStep.tsx # DJ, live music, etc.
│   │   ├── ExtrasStep.tsx       # Add-ons
│   │   ├── SummaryStep.tsx      # Review before submit
│   │   └── FormStep.tsx         # Final contact form
│   ├── PriceDisplay.tsx         # Running total/estimated price
│   ├── PricingSummary.tsx       # Breakdown by category
│   └── index.ts
│
├── HowItWorksPage/              # How It Works page components
│   ├── Hero.tsx
│   ├── ProcessSteps.tsx
│   ├── CalculationExplained.tsx
│   ├── BookingProcess.tsx       # Deposit, payment schedule, terms
│   └── index.ts
│
├── AboutPage/                   # About Us page components
│   ├── Hero.tsx
│   ├── CompanyStory.tsx
│   ├── Team.tsx
│   ├── Values.tsx
│   └── index.ts
│
├── ContactPage/                 # Contact page components
│   ├── ContactForm.tsx
│   ├── ContactInfo.tsx          # Email, WhatsApp, location
│   └── index.ts
│
├── BlogPage/                    # Blog section
│   ├── BlogIndex.tsx            # Blog list
│   ├── ArticleCard.tsx          # Single article card
│   ├── ArticleDetail.tsx        # Full article view
│   ├── ArticleNav.tsx           # Related articles
│   └── index.ts
│
├── StoriesPage/                 # Wedding stories/testimonials
│   ├── StoriesIndex.tsx         # List of stories
│   ├── StoryCard.tsx            # Single story preview
│   ├── StoryDetail.tsx          # Full story view
│   └── index.ts
│
├── Layout/                      # Shared layout components
│   ├── Navbar.tsx               # Site header with menu
│   ├── Footer.tsx               # Site footer
│   ├── LanguageSwitcher.tsx     # EN/ES toggle
│   └── index.ts
│
├── BlockContent/                # Portable Text rendering
│   ├── PortableText.tsx         # Sanity rich text renderer
│   └── index.ts
│
├── ui/                          # Reusable primitives
│   ├── Button.tsx               # CTA buttons
│   ├── Card.tsx                 # Card wrapper
│   ├── Modal.tsx                # Modal dialog
│   ├── Form.tsx                 # Form wrapper
│   ├── Input.tsx                # Input field
│   ├── Textarea.tsx             # Textarea field
│   ├── Select.tsx               # Select dropdown
│   ├── Spinner.tsx              # Loading spinner
│   ├── RevealOnScroll.tsx       # Scroll animation
│   └── index.ts
│
└── Providers/                   # Context providers
    ├── IntlProvider.tsx         # next-intl client provider
    └── index.ts
```

**Key Rules:**
- ❌ Don't: Organize by type (`buttons/`, `cards/`, `forms/`)
- ✅ Do: Organize by PAGE (`HomePage/`, `BlogPage/`)
- ✅ Exception: `Layout/`, `BlockContent/`, `ui/` for truly shared pieces
- Each page folder has `index.ts` that exports components
- `WeddingCalculatorPage/` is the largest section (many steps)

---

## Sanity (`src/sanity/` + root config)

### Root Config Files

```
sanity.cli.ts                   # Sanity CLI (project ID, dataset name)
sanity.config.ts                # Sanity Studio config (schema, plugins, etc.)
```

### src/sanity/

```
src/sanity/
│
├── env.ts                      # Environment variables
│   export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
│   export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
│   export const apiVersion = '2024-01-01'
│
├── lib/
│   ├── client.ts               # Sanity client instance
│   │   import { createClient } from '@sanity/client'
│   │   export const client = createClient({...})
│   ├── image.ts                # Image URL builder
│   │   import { urlFor } from '@sanity/image-url'
│   │   export const urlFor = (source) => ...
│   └── live.ts                 # Live preview (optional)
│
├── structure.ts                # Sanity Studio desk structure
│   // Organizes how content appears in Studio sidebar
│
├── schemaTypes/                # Document & object schemas
│   ├── index.ts                # Exports all types
│   │
│   ├── HomePage/               # Homepage schema
│   │   ├── index.ts            # Main document type
│   │   ├── sections/
│   │   │   ├── hero.ts
│   │   │   ├── howItWorks.ts
│   │   │   ├── packageCategories.ts
│   │   │   ├── featuredStory.ts
│   │   │   ├── ctaBanner.ts
│   │   │   └── trustIndicators.ts
│   │   └── schema.ts           # Combined HomePage type
│   │
│   ├── WeddingCalculator/      # Calculator pricing schema
│   │   ├── index.ts
│   │   ├── menuOptions.ts      # Menu items + pricing
│   │   ├── barpckages.ts       # Drink packages
│   │   ├── furnitureOptions.ts # Chairs, tables, linens + pricing
│   │   ├── decorPackages.ts    # Decor options + pricing
│   │   ├── photoPackages.ts    # Photo packages
│   │   ├── videoPackages.ts    # Video packages
│   │   ├── transportRates.ts   # Transport pricing by zone
│   │   ├── entertainmentOptions.ts # DJ, music, etc.
│   │   ├── extras.ts           # Optional add-ons
│   │   └── schema.ts           # Combined type
│   │
│   ├── HowItWorksPage/
│   │   ├── index.ts
│   │   ├── sections/
│   │   │   ├── hero.ts
│   │   │   ├── processSteps.ts
│   │   │   ├── calculationLogic.ts
│   │   │   ├── bookingProcess.ts
│   │   │   └── faq.ts
│   │   └── schema.ts
│   │
│   ├── AboutPage/
│   │   ├── index.ts
│   │   ├── companyInfo.ts
│   │   ├── teamMembers.ts
│   │   └── schema.ts
│   │
│   ├── ContactPage/
│   │   ├── index.ts
│   │   └── schema.ts
│   │
│   ├── BlogPage/
│   │   ├── BlogArticle.ts      # Document type for articles
│   │   ├── BlogCategory.ts     # Categories for organization
│   │   └── schema.ts
│   │
│   ├── StoriesPage/
│   │   ├── WeddingStory.ts     # Document for individual story
│   │   ├── ProposalType.ts     # (Classic, Modern, Dining)
│   │   └── schema.ts
│   │
│   ├── GeneralLayout/          # Shared, site-wide content
│   │   ├── navbar.ts           # Navigation, menu items
│   │   ├── footer.ts           # Footer content, links
│   │   └── schema.ts
│   │
│   ├── LegalDocuments/         # Privacy Policy, Terms
│   │   ├── privacyPolicy.ts
│   │   ├── termsOfService.ts
│   │   └── schema.ts
│   │
│   ├── SEO/                    # Page-level SEO types
│   │   ├── seoFields.ts        # Reusable SEO object
│   │   ├── ogImage.ts          # Open Graph image
│   │   └── schema.ts
│   │
│   └── Localized/              # Reusable localization pattern
│       ├── localized.ts        # Object for {en: '...', es: '...'}
│       └── schema.ts
│
└── queries/                    # GROQ queries
    ├── index.ts                # Export all queries
    │
    ├── HomePage/
    │   ├── getHomePage.ts      # Main query
    │   ├── fragments.ts        # Reusable GROQ fragments
    │   └── groq.ts             # GROQ strings
    │
    ├── WeddingCalculator/
    │   ├── getAllPricing.ts    # Fetch all pricing data
    │   ├── getMenuOptions.ts
    │   ├── getBarPackages.ts
    │   ├── getFurnitureOptions.ts
    │   ├── getDecorPackages.ts
    │   ├── getPhotoPackages.ts
    │   ├── getVideoPackages.ts
    │   ├── getTransportRates.ts
    │   ├── getEntertainmentOptions.ts
    │   ├── getExtras.ts
    │   └── groq.ts
    │
    ├── HowItWorksPage/
    │   ├── getHowItWorks.ts
    │   └── groq.ts
    │
    ├── AboutPage/
    │   ├── getAboutPage.ts
    │   └── groq.ts
    │
    ├── ContactPage/
    │   ├── getContactPage.ts
    │   └── groq.ts
    │
    ├── BlogPage/
    │   ├── getAllArticles.ts    # List of all articles
    │   ├── getArticle.ts        # Single article by slug
    │   ├── getArticlesByCategory.ts
    │   └── groq.ts
    │
    ├── StoriesPage/
    │   ├── getAllStories.ts
    │   ├── getStory.ts          # Single story by slug
    │   ├── getStoriesByType.ts  # Filter by proposal type
    │   └── groq.ts
    │
    ├── GeneralLayout/
    │   ├── getNavigation.ts
    │   ├── getFooter.ts
    │   └── groq.ts
    │
    └── LegalDocuments/
        ├── getPrivacyPolicy.ts
        ├── getTermsOfService.ts
        └── groq.ts
```

**Key Principles:**
- **Schemas mirror Components:** Same folder structure for organization
- **Queries mirror Schemas:** Organized same way for easy discovery
- **GROQ stored separately:** `groq.ts` files contain GROQ strings; query functions use them
- **Types exported from index.ts:** Single import point per domain

---

## Example: Adding a New Page

If you're adding a new feature (e.g., "Honeymoon Packages"), here's where files go:

```
1. Route
   src/app/(root)/[locale]/honeymoon/page.tsx

2. Sanity Schema
   src/sanity/schemaTypes/HoneymoonPage/
   ├── index.ts
   ├── sections/
   │   ├── hero.ts
   │   ├── packages.ts
   │   └── faq.ts
   └── schema.ts

3. Sanity Queries
   src/sanity/queries/HoneymoonPage/
   ├── getHoneymoonPage.ts
   └── groq.ts

4. Components
   src/components/HoneymoonPage/
   ├── Hero.tsx
   ├── PackageCard.tsx
   ├── PackageGrid.tsx
   ├── FAQ.tsx
   └── index.ts

5. i18n Text
   messages/en.json → honeymoon.*
   messages/es.json → honeymoon.*
```

---

## Guidelines

### Naming Conventions
- **Components:** PascalCase (`Hero.tsx`, `PackageCard.tsx`)
- **Functions/utilities:** camelCase (`getHomePage.ts`, `calculateTotal.ts`)
- **Hooks:** camelCase with `use` prefix (`useCalculator.ts`)
- **Files:** PascalCase for components, camelCase for utilities

### Imports
Use `@` alias in `tsconfig.json`:
```typescript
import { HomePage } from '@/components/HomePage'
import { client } from '@/sanity/lib/client'
import { getHomePage } from '@/sanity/queries/HomePage'
```

### Folder Structure Rules
- ✅ Group by feature/page, not by type
- ✅ Co-locate related code
- ✅ Use `index.ts` to export from folders
- ❌ Don't create `types/buttons/`, `components/cards/` folders

---

## Final Checklist: Is This File in the Right Place?

| File | Goes In |
|------|----------|
| React component for specific page | `src/components/[PageName]/` |
| Reusable UI primitive | `src/components/ui/` |
| Shared layout (Navbar, Footer) | `src/components/Layout/` |
| Sanity document schema | `src/sanity/schemaTypes/[DomainName]/` |
| GROQ query function | `src/sanity/queries/[DomainName]/` |
| i18n text | `messages/en.json` or `messages/es.json` |
| Page route | `src/app/(root)/[locale]/[page]/page.tsx` |
| Environment config | `.env.local` |
| Sanity client setup | `src/sanity/lib/client.ts` |

---

This structure scales well and keeps code organized as the project grows. Update this doc when you add new sections or change organization patterns.