# Punta Cana Wedding Packages

A destination wedding planning platform for Cabeza de Toro, Punta Cana. Couples build a fully-itemized wedding package in a guided step-by-step calculator, see live pricing, and submit a lead to the planning team — all without a backend or payment processing.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity 5.x + next-sanity 12.x |
| Styling | Tailwind CSS 4 |
| i18n (main site) | next-intl (en, es) |
| i18n (blog) | Sanity-stored translations (en, es, fr, de, ru) |
| Deployment | Netlify |
| Forms | Netlify Forms |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token
```

Get these from [sanity.io/manage](https://sanity.io/manage).

### 3. Run the dev server

```bash
npm run dev
```

The site runs at `http://localhost:3000`. Sanity Studio is at `http://localhost:3000/studio`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                        # Root HTML shell
│   ├── (root)/[locale]/                  # All main site routes (en, es)
│   │   ├── page.tsx                      # Home
│   │   ├── wedding-calculator/page.tsx   # Wedding builder — core feature
│   │   ├── how-it-works/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/[slug]/page.tsx          # Multi-language blog articles
│   │   └── stories/page.tsx
│   └── studio/[[...tool]]/page.tsx       # Sanity Studio
├── components/
│   ├── WeddingCalculatorPage/            # Calculator wizard + all 13 steps
│   ├── HomePage/
│   ├── BlogPage/
│   ├── StoriesPage/
│   ├── Layout/                           # Navbar, Footer
│   └── ui/                              # Primitives
├── sanity/
│   ├── schemaTypes/WeddingCalculator/    # Pricing schema (one file per category)
│   └── queries/WeddingCalculator/        # GROQ queries + TypeScript types
├── i18n/
│   └── routing.ts                        # next-intl config
└── proxy.ts                              # next-intl middleware

messages/
├── en.json                               # English UI strings
└── es.json                               # Spanish UI strings

scripts/
├── seed-sanity.ts                        # Seeds all calculator pricing data
└── seed-transport-vehicles.ts            # Seeds transport vehicle options
```

## Wedding Calculator

The calculator is the core of the product. It walks couples through 13 steps, updating an estimated total after every selection:

| Step | Category |
|---|---|
| 1 | Wedding date |
| 2 | Guest count |
| 3 | Hotel / area (for transport routing) |
| 4 | Venue & coordination (always included) |
| 5 | Menu selection |
| 6 | Bar package + hours |
| 7 | Furniture & linens |
| 8 | Decor & flowers |
| 9 | Photography |
| 10 | Videography |
| 11 | Transport vehicles |
| 12 | Entertainment |
| 13 | Extra experiences |

All pricing lives in Sanity. The calculator only multiplies (never invents numbers). After step 13, the couple reviews a summary and submits a lead form — no payment is collected on the site.

## Sanity Studio

Manage all content at `/studio`. Content is organized into:

- **Site Settings** — Layout, Home, About, How It Works, Contact, Privacy, Terms
- **Wedding Stories** — Real couple stories with photos
- **Page SEO** — Per-page meta titles, descriptions, OG images
- **Wedding Calculator** — All pricing categories below

### Calculator pricing categories

Managed under `Wedding Calculator` in the Studio sidebar:

- Configuration (venue cost, coordination, default seats/table, minimum advance months)
- Menu Options
- Bar Packages
- Furniture Options
- Decor Packages (two images per package: card thumbnail + full wedding preview)
- Photography Packages
- Videography Packages
- Transportation Zones
- Transport Vehicles
- Entertainment Options
- Extra Experiences

## i18n

**Main site (next-intl):** All UI strings live in `messages/en.json` and `messages/es.json`. Add a key to both files, then use `useTranslations()` (client) or `getTranslations()` (server).

**Blog (Sanity):** Article translations are stored directly in Sanity documents. Adding a new language requires no code changes — create the translated fields in the CMS and the route handles it automatically.

## Seed Scripts

Populate a fresh Sanity dataset with starter pricing data:

```bash
# All calculator categories (menus, bar, furniture, decor, photo, video, entertainment, extras)
npm run seed

# Transport vehicles specifically
npx tsx scripts/seed-transport-vehicles.ts
```

Both scripts use `createIfNotExists` — safe to run multiple times without overwriting existing data.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
npm run format     # Prettier (all ts/tsx/json/css/md)
npm run seed       # Seed Sanity with calculator data
```

## Deployment

Deployed on Netlify. Set the following in the Netlify dashboard under **Site settings → Environment variables**:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_WRITE_TOKEN
```

Build command: `npm run build` — Publish directory: `.next`

Lead forms are handled by Netlify Forms (`data-netlify="true"`). No backend or payment processing is involved.
