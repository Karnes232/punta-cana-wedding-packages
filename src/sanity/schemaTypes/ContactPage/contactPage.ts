import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "form", title: "Form" },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────

    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedText",
      group: "hero",
      description: "Supporting text below the headline (1–2 sentences).",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image (optional)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // ─── Form Intro ───────────────────────────────────────────────────────────

    defineField({
      name: "introText",
      title: "Form Intro Text",
      type: "localizedText",
      group: "form",
      description: "Short sentence shown above the contact form.",
    }),
  ],

  preview: {
    prepare() {
      return { title: "Contact Page", subtitle: "Singleton" };
    },
  },
});
