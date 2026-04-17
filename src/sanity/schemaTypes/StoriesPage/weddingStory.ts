import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const weddingStory = defineType({
  name: "weddingStory",
  title: "Wedding Story",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "basic", title: "Basic Info" },
    { name: "details", title: "Details & Quote" },
    { name: "content", title: "Story & Photos" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────
    defineField({
      name: "coupleName",
      title: "Couple Name",
      type: "localizedString",
      group: "basic",
      description: 'e.g. "Sarah & Marco" / "Sarah y Marco"',
      validation: (R) => R.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      description:
        "URL-safe identifier — auto-generated from the English couple name.",
      options: { source: "coupleName.en" },
      validation: (R) => R.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "date",
      group: "basic",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "weddingDate",
      title: "Wedding date",
      type: "date",
      group: "basic",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "basic",
      description: "Featured stories sort to the top of the listing.",
      initialValue: false,
    }),

    // ── Details & Quote ───────────────────────────────────────────────────────
    defineField({
      name: "guestCount",
      title: "Guest count",
      type: "number",
      group: "details",
      validation: (R) => R.required().min(1),
    }),

    defineField({
      name: "budgetRange",
      title: "Budget range",
      type: "localizedString",
      group: "details",
      description: 'e.g. "From $12,000" / "Desde $12,000"',
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localizedText",
      group: "details",
      description: "1–2 sentence teaser shown on the index card.",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "testimonial",
      title: "Couple testimonial",
      type: "localizedText",
      group: "details",
      description:
        "A quote from the couple — shown as a blockquote on the detail page.",
    }),

    // ── Story & Photos ────────────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      validation: (R) => R.required(),
    }),

    defineField({
      name: "gallery",
      title: "Photo gallery",
      type: "array",
      group: "content",
      description:
        "Additional photos shown in the gallery section of the detail page.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        },
      ],
    }),

    defineField({
      name: "body",
      title: "Story body",
      type: "localizedBlock",
      group: "content",
      description: "Full wedding narrative in English and Spanish (rich text).",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description:
        "Overrides the couple name as the page title in search results. Max 60 characters.",
      validation: (R) => R.max(60),
    }),

    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Meta description. 120–160 characters recommended.",
    }),

    defineField({
      name: "ogImage",
      title: "Social Share Image (OG Image)",
      type: "image",
      group: "seo",
      description:
        "Image shown when the story is shared on social media. Falls back to the Hero Image if blank. Ideal: 1200 × 630 px.",
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      nameEn: "coupleName.en",
      nameEs: "coupleName.es",
      date: "weddingDate",
      media: "heroImage",
      featured: "featured",
    },
    prepare({ nameEn, nameEs, date, media, featured }) {
      const name = nameEn ?? nameEs ?? "Unnamed Couple";
      const label = featured ? "⭐ " : "";
      return {
        title: `${label}${name}`,
        subtitle: date ?? "No date set",
        media,
      };
    },
  },

  orderings: [
    {
      title: "Featured first, then newest",
      name: "featuredAndNewest",
      by: [
        { field: "featured", direction: "desc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "Wedding date (newest first)",
      name: "weddingDateDesc",
      by: [{ field: "weddingDate", direction: "desc" }],
    },
  ],
});
