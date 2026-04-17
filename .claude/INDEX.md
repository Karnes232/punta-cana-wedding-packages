# .claude/ Setup Guide

## Punta Cana Wedding Packages

Complete reference for Claude Code configuration and documentation. Start here.

---

## 📖 Quick Start

If you're new to this project, read these docs in this order:

1. **CLAUDE.md** ← Start here (overview, principles, quick facts)
2. **PROJECT_STATE.md** — Current tech stack and decisions
3. **file-structure.md** — Where every file goes
4. **website-structure.md** — What each page does (business blueprint)
5. **design-vision.md** — Visual guidelines (colors, spacing, feeling)
6. **wedding-builder-logic.md** — How the calculator works

---

## 📁 File-by-File Guide

### CLAUDE.md

**What:** Main instructions for Claude Code. The entry point.

**Read when:**

- Starting work on the project
- Unsure about architecture or conventions
- Need a quick overview

**Contains:**

- Quick facts (framework, deployment, CMS)
- Project overview (what the site does)
- Key architectural principles (server-first, Sanity, i18n, design)
- Common tasks (adding pages, forms, i18n)
- Links to other docs

**Length:** ~5 min read

---

### PROJECT_STATE.md

**What:** Current state snapshot. Tech versions, decisions, constraints.

**Read when:**

- Before making architectural decisions
- Starting a new major feature
- Wondering why something is structured this way
- Updating tech versions

**Contains:**

- Technology stack with versions
- Architectural decisions (why + rationale)
- Current routes & features
- Known constraints & limitations
- Performance targets
- Sanity schema organization
- Recent decisions with dates

**Length:** ~10 min read

---

### file-structure.md

**What:** Complete folder organization reference. Where every type of file goes.

**Read when:**

- Creating a new component
- Adding a new page
- Setting up Sanity schemas
- Wondering "does this file go here?"

**Contains:**

- Root structure
- App Router structure with examples
- Components organization (page-scoped, not by type)
- Sanity schemas + queries structure
- i18n configuration (messages, routing)
- Quick decision table ("where does this go?")
- Naming conventions
- Example: Adding a new page end-to-end

**Length:** ~15 min read

---

### website-structure.md

**What:** Business blueprint. What each page does and how they fit together.

**Read when:**

- Understanding the sales funnel
- Deciding what a page should contain
- Wondering "why does this page exist?"
- Planning content strategy

**Contains:**

- General purpose (why the site exists)
- Complete page list with routes and purposes
- Detailed breakdown of each page
- What sections should be on each page
- Navigation structure
- Sales funnel / conversion flow
- Key messaging
- Conversion goals (in priority order)

**Length:** ~20 min read

---

### design-vision.md

**What:** Visual design guidelines. Colors, buttons, spacing, typography, feeling.

**Read when:**

- Designing a component
- Choosing colors
- Deciding spacing or sizing
- Wondering about the design direction
- Building UI with Tailwind

**Contains:**

- Overall feeling/emotion (soft, calm, easy—NOT luxury/dark)
- Color palette with specific hex codes
- Lines, borders, shadows
- Button styles and states
- Spacing guidelines
- Typography (fonts, sizes, hierarchy)
- Form design
- Icons
- Images (what to use, what to avoid)
- Animations
- Tailwind CSS config suggestions
- Accessibility notes

**Length:** ~20 min read

---

### wedding-builder-logic.md

**What:** Complete technical specification for the wedding calculator. Pricing formulas, step-by-step flow, calculation logic.

**Read when:**

- Building the calculator
- Setting up Sanity pricing schemas
- Implementing calculation logic
- Understanding how pricing works
- Adding new calculator steps or features

**Contains:**

- Core concept (automatic quote engine)
- Master variable explanation (guest count)
- Step-by-step flow (13 steps from date to form)
- Each step's input, output, calculation, price impact
- Summary page design
- Form submission process
- Business constraints (fixed venue, predetermined pricing)
- Validation rules
- Technical implementation notes
- Calculation pseudocode
- Testing checklist

**Length:** ~30 min read (reference document)

---

### settings.json

**What:** Shared project configuration. Tech versions, locales, design tokens, URLs.

**Contents:**

- Project metadata
- Technology stack (versions)
- Localization config
- Design color palette
- Page list with routes
- Calculator info
- Booking terms
- Performance targets
- Team info
- Conventions (naming, structure)

**Update when:**

- Upgrading a tech version
- Adding a new page
- Changing a design color
- Adding a new locale

---

## 🎯 Common Workflows

### I need to understand the whole project

→ Read: CLAUDE.md → PROJECT_STATE.md → website-structure.md

### I'm adding a new page

→ Read: file-structure.md → website-structure.md (what should it do?)

### I'm building components and styling them

→ Read: design-vision.md → file-structure.md (where do components go?)

### I'm working on the wedding calculator

→ Read: wedding-builder-logic.md → file-structure.md (schema organization)

### I'm confused about where a file should go

→ Check: file-structure.md → "Final Checklist: Is This File in the Right Place?"

### I need to know what the site's purpose is

→ Check: website-structure.md → "General Purpose" section

### I need design guidelines for colors/buttons/spacing

→ Check: design-vision.md

### I need to understand how pricing works

→ Check: wedding-builder-logic.md → "Step-by-Step Flow"

### I'm setting up Sanity schemas

→ Read: wedding-builder-logic.md (what to calculate) → file-structure.md (how to organize)

---

## 🔄 Doc Relationships

```
CLAUDE.md (entry point)
    ├─ Links to PROJECT_STATE.md (current state)
    ├─ Links to file-structure.md (organization)
    ├─ Links to website-structure.md (business purpose)
    ├─ Links to design-vision.md (visual guidelines)
    └─ Links to wedding-builder-logic.md (calculator)

file-structure.md (where files go)
    ├─ References website-structure.md (what goes on each page)
    ├─ References wedding-builder-logic.md (calculator structure)
    └─ References design-vision.md (styling conventions)

website-structure.md (business blueprint)
    ├─ References wedding-builder-logic.md (calculator is core)
    └─ References file-structure.md (technical organization)

wedding-builder-logic.md (calculator rules)
    └─ References file-structure.md (how to organize schemas/queries)

design-vision.md (visual guidelines)
    └─ Standalone (applies to all pages)

settings.json (configuration)
    └─ Subset of information from other docs
```

---

## 📋 Update This Documentation When

- **New architectural decision** → Add to PROJECT_STATE.md
- **New route added** → Add to website-structure.md page list
- **New Sanity schema structure** → Update file-structure.md
- **Design colors/rules change** → Update design-vision.md
- **Tech version upgraded** → Update PROJECT_STATE.md + settings.json
- **Calculator steps added** → Update wedding-builder-logic.md
- **Naming conventions change** → Update file-structure.md conventions
- **Build/deploy process changes** → Update PROJECT_STATE.md constraints

---

## ✅ Checklists

### Before Starting Development

- [ ] Read CLAUDE.md (project overview)
- [ ] Read PROJECT_STATE.md (tech stack, constraints)
- [ ] Read file-structure.md (where files go)
- [ ] Check design-vision.md (design directions)

### Before Implementing Wedding Calculator

- [ ] Read wedding-builder-logic.md (complete spec)
- [ ] Review file-structure.md Sanity section (schema organization)
- [ ] Check design-vision.md for form design guidelines

### Before Adding a New Page

- [ ] Check website-structure.md for page description
- [ ] Check file-structure.md for file location
- [ ] Review design-vision.md for styling consistency

### Before Deploying to Netlify

- [ ] All routes render (no 404s)
- [ ] Both locales work (en and es)
- [ ] Wedding calculator all steps functional
- [ ] Forms submit (emails received)
- [ ] Images load from Sanity
- [ ] Lighthouse score 90+ on mobile
- [ ] Core Web Vitals meet targets
- [ ] No console errors or warnings
- [ ] Check mobile responsiveness

---

## 🚀 Getting Started Right Now

1. **You are here:** Reading this INDEX.md
2. **Next:** Open CLAUDE.md (5-minute overview)
3. **Then:** Skim PROJECT_STATE.md (know the tech stack)
4. **Then:** Check file-structure.md (get familiar with organization)
5. **Finally:** When you start building, reference the specific doc you need

---

## 📞 Questions?

Each doc has guidance and examples. If you can't find something:

1. Check the "When to read" section of each file
2. Use the doc relationship map above
3. Search for keywords in the docs
4. Ask Claude Code with specific context: "What does file-structure.md say about component organization?"

---

## Document Statistics

| Document                 | Sections | Read Time | Type                 |
| ------------------------ | -------- | --------- | -------------------- |
| CLAUDE.md                | 10       | 5 min     | Overview + reference |
| PROJECT_STATE.md         | 8        | 10 min    | Reference            |
| file-structure.md        | 10       | 15 min    | Reference + examples |
| website-structure.md     | 12       | 20 min    | Blueprint + examples |
| design-vision.md         | 13       | 20 min    | Guidelines           |
| wedding-builder-logic.md | 17       | 30 min    | Specification        |
| settings.json            | —        | —         | Configuration        |
| INDEX.md                 | 11       | 5 min     | This file            |

**Total reading time for complete onboarding:** ~100 minutes (but you don't need to read everything at once; read on-demand).

---

## Next Steps

1. **Right now:** Read CLAUDE.md (entry point)
2. **Before coding:** Read file-structure.md (know where things go)
3. **As you code:** Reference specific docs for implementation details
4. **When you complete features:** Update relevant docs

---

This is a living document. As the project grows, these docs will evolve with it. Keep them updated so Claude Code and future developers stay aligned.

**Version:** 1.0
**Last Updated:** April 2026
**Status:** Ready for project start

---

Let's build something beautiful. 🌊
