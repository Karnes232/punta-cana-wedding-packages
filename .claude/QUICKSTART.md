# Implementation Quick Start

## Punta Cana Wedding Packages

Step-by-step guide to set up your `.claude/` directory and understand the complete project configuration.

---

## ✅ Setup Instructions

### Step 1: Copy `.claude/` to Your Project Root

Copy all 8 files to your project:

```
punta-cana-wedding-packages/
├── .claude/                          # ← Create this folder
│   ├── INDEX.md                      # Master index (START HERE)
│   ├── CLAUDE.md                     # Main instructions
│   ├── PROJECT_STATE.md              # Tech stack & decisions
│   ├── file-structure.md             # Where files go
│   ├── website-structure.md          # Business blueprint
│   ├── design-vision.md              # Visual guidelines
│   ├── wedding-builder-logic.md      # Calculator specification
│   └── settings.json                 # Configuration
│
├── src/
├── messages/
├── public/
└── ... (rest of project)
```

### Step 2: Create `.claude/settings.local.json` (Optional, Gitignored)

Create a personal config file (add to `.gitignore`):

```json
{
  "personalPreferences": {
    "editor": "VS Code",
    "theme": "dark",
    "debugMode": false
  }
}
```

### Step 3: Commit `.claude/` to Git

```bash
git add .claude/
git commit -m "Add Claude Code workspace configuration"
```

**Note:** `settings.local.json` should be in `.gitignore` (personal only).

---

## 📖 Reading Guide

### First Time? Read in This Order:

1. **INDEX.md** (5 min)
   - Overview of all docs
   - What each file contains
   - How to use them

2. **CLAUDE.md** (5 min)
   - Project quick facts
   - Architectural principles
   - Before you start checklist

3. **PROJECT_STATE.md** (10 min)
   - Tech stack (Next.js 14, Sanity 5.x, next-intl, Tailwind 4)
   - Architectural decisions and why
   - Current pages & features
   - Constraints

4. **file-structure.md** (15 min)
   - Where every file goes
   - Components organized by PAGE (not by type)
   - Sanity schema + queries structure
   - Complete example: adding a new page

5. **website-structure.md** (20 min)
   - What each page does
   - Sales funnel / conversion flow
   - Detailed page breakdowns
   - Navigation structure

6. **design-vision.md** (20 min)
   - Visual guidelines (soft, calm, easy—NOT luxury)
   - Colors, buttons, spacing, typography
   - Tailwind CSS config suggestions
   - Forms, images, animations

7. **wedding-builder-logic.md** (30 min)
   - Complete wedding calculator specification
   - Step-by-step flow (13 steps)
   - Pricing formulas and calculations
   - Form submission & team email

**Total time:** ~105 minutes
**Recommended:** Read over 1–2 days, not all at once

---

## 🎯 Key Takeaways

### What This Project Is

Punta Cana Wedding Packages is a **sales and planning system**, not a brochure website.

- **Goal:** Move qualified visitors from interest → wedding calculator → form submission
- **Core:** Wedding calculator (beautiful, guided, step-by-step, live pricing)
- **Conversion:** Form submission (captured data sent to planning team)
- **No payments:** All payment handling is offline

### Tech Stack (Confirmed with You)

- **Framework:** Next.js 14 (App Router only)
- **Deployment:** Netlify (no backend; serverless only)
- **CMS:** Sanity 5.x with next-sanity 12.x
- **i18n:** next-intl (English & Spanish)
- **Styling:** Tailwind CSS 4
- **Hosting:** Static site + optional Netlify Functions

### Design Philosophy

Website must feel:

- ✅ Soft, light, clean, romantic, professional, easy, calm
- ❌ NOT: Luxury, dark, gold, aggressive, heavy, complicated

**Metaphor:** "Soft beach breeze — everything clear, everything easy, everything calm"

### File Organization (Your Preference)

✅ **Components organized by PAGE/DOMAIN:**

```
src/components/
├── HomePage/
├── WeddingCalculatorPage/     (largest section)
├── BlogPage/
├── Layout/                    (shared)
└── ui/                        (primitives)
```

❌ **NOT by type:**

```
src/components/
├── buttons/
├── cards/
├── forms/                     (bad!)
```

### Wedding Calculator (The Core)

Step-by-step wizard where user:

1. Selects date, guests, hotel area
2. Configures menu, drinks, decor, photo, video, transport, entertainment
3. Sees estimated total update live
4. Reviews complete summary
5. Submits form → email to planning team

**Key:** All prices come from Sanity. Calculator only multiplies and adds. Guest count is master variable (affects everything).

---

## 🚀 How Claude Code Will Use These Docs

When you ask Claude Code to help:

```
You: "Add a new page for honeymoon packages"

Claude will:
1. Check CLAUDE.md for principles
2. Read file-structure.md for where to put files
3. Check website-structure.md for what the page should do
4. Reference design-vision.md for styling
5. Create components, Sanity schema, queries in right locations
6. Follow naming conventions and structure
```

The docs let Claude Code understand:

- **Why** things are organized this way
- **Where** to put new code
- **How** to structure it
- **What** it should accomplish
- **When** to ask for clarification

---

## 📋 Before Starting Development

### Pre-Development Checklist

- [ ] Read CLAUDE.md + PROJECT_STATE.md (understand project)
- [ ] Read file-structure.md (know folder organization)
- [ ] Understand design feeling (soft, not luxury)
- [ ] Review wedding-builder-logic.md (core feature spec)
- [ ] Set up Sanity 5.x project (get project ID, dataset)
- [ ] Initialize Next.js 14 with App Router
- [ ] Configure next-intl (routing, messages structure)
- [ ] Set up Tailwind CSS 4

### Initial Development Priorities

1. **Root layouts** (app/layout.tsx, [locale]/layout.tsx)
2. **Navigation** (Navbar, Footer, LanguageSwitcher)
3. **i18n setup** (messages/en.json, es.json; routing)
4. **Home page** (hero, sections, CTA buttons)
5. **Wedding calculator** (biggest task; see wedding-builder-logic.md)
6. **Sanity schemas** (HomePage, Calculator pricing, others)
7. **Supporting pages** (How It Works, About, Contact, etc.)
8. **Blog structure** (articles, categories)
9. **Design refinement** (colors, spacing, animations per design-vision.md)
10. **Deployment** (Netlify config, environment variables)

---

## 🔧 Tech Stack Setup

### Environment Variables (.env.local)

You'll need:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Package Dependencies (Core)

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "sanity": "5.x",
  "next-sanity": "12.x",
  "next-intl": "latest",
  "tailwindcss": "4.x"
}
```

### Project Structure

Follow your preferred FILE_STRUCTURE.md exactly:

- `messages/` for i18n
- `src/app/` for routes
- `src/components/` for page-scoped components
- `src/sanity/` for CMS setup
- `src/i18n/` for routing config

---

## 🎨 Design Constants (Tailwind)

Use these throughout for consistency:

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'primary-blue': '#5B9FD9',
      'primary-green': '#8BA8A0',
      'sand-light': '#F5F1E8',
    },
  }
}
```

See design-vision.md for complete color palette and spacing scale.

---

## 📊 Project Stats

| Aspect                  | Details                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| **Pages**               | 9 (Home, Calculator, How It Works, About, Contact, Blog, Stories, Privacy, Terms)              |
| **Main Components**     | 7 (HomePage, WeddingCalculator, BlogPage, StoriesPage, HowItWorksPage, AboutPage, ContactPage) |
| **Sanity Schemas**      | 9 document types + many objects                                                                |
| **Locales**             | 2 (en, es)                                                                                     |
| **Calculator Steps**    | 13 (date → form submission)                                                                    |
| **Expected Complexity** | High (wedding builder, pricing logic, i18n, design system)                                     |

---

## 🆘 Troubleshooting / FAQ

**Q: Where should I put a new component?**
A: Check file-structure.md → "Components" section. If it's for a specific page, put it in `src/components/PageName/`. If it's shared, use `src/components/Layout/` or `src/components/ui/`.

**Q: How do I add a new language?**
A: Add locale to `routing.ts`, create `messages/[locale].json`, add to next-intl config.

**Q: Where do I define calculator pricing?**
A: In Sanity schemas under `src/sanity/schemaTypes/WeddingCalculator/`. See wedding-builder-logic.md for what to calculate.

**Q: How should forms look visually?**
A: Check design-vision.md → "Forms" section. Soft input fields, clear labels, helpful placeholders.

**Q: What's the color for buttons?**
A: Soft blue `#5B9FD9` or soft green `#8BA8A0`. See design-vision.md color palette.

**Q: Can I use dark colors?**
A: No. Site must feel soft, light, calm. See design-vision.md for approved colors.

---

## 🚢 Deployment

### Netlify Setup

1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next` (if static export) or configure for Next.js
4. Add environment variables in Netlify dashboard:
   - NEXT_PUBLIC_SANITY_PROJECT_ID
   - NEXT_PUBLIC_SANITY_DATASET
   - etc.

### Before Going Live

- [ ] All routes render (no 404s)
- [ ] Both locales work (en, es)
- [ ] Calculator submits form successfully
- [ ] Lighthouse score ≥ 90
- [ ] Core Web Vitals < targets (LCP < 2.5s, etc.)
- [ ] Mobile responsive
- [ ] No console errors

See PROJECT_STATE.md → "Performance Targets" for detailed metrics.

---

## 📝 Maintenance

### Update Docs When

- **New architectural decision** → PROJECT_STATE.md
- **New route added** → website-structure.md
- **Tech version upgraded** → PROJECT_STATE.md + settings.json
- **New component pattern** → file-structure.md
- **Design rule changes** → design-vision.md
- **Calculator updated** → wedding-builder-logic.md

### Keeping Code Aligned

Regular checks:

- Do components follow file-structure.md organization?
- Do Sanity schemas match file-structure.md locations?
- Is every UI element styled per design-vision.md?
- Are calculator calculations per wedding-builder-logic.md?

---

## ✨ Next Steps

1. **Today:** Copy `.claude/` to your project, read INDEX.md + CLAUDE.md
2. **Tomorrow:** Read PROJECT_STATE.md + file-structure.md + website-structure.md
3. **Then:** Set up Sanity, initialize Next.js, start building (reference docs as you go)
4. **As you code:** Ask Claude Code for help; it will understand the project context

---

## 📞 Questions?

Each doc is self-contained with examples and guidance. If stuck:

1. Check INDEX.md for which doc covers your topic
2. Search that doc for your question
3. Look for examples or checklists
4. Ask Claude Code with full context

---

**You're ready to build.** Start with CLAUDE.md, then explore the other docs on-demand as you implement features.

The comprehensive documentation will keep you (and Claude Code) aligned throughout development. 🌊
