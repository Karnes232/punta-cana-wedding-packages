import { defineType, defineField, defineArrayMember } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "howItWorks", title: "How It Works" },
    { name: "customize", title: "What You Can Customize" },
    { name: "pricing", title: "Transparent Pricing" },
    { name: "whyUs", title: "Why Choose Us" },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────

    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "localizedString",
      group: "hero",
      description: "Main headline shown in the hero section.",
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
      title: "Hero Image",
      type: "image",
      group: "hero",
      description:
        "Beach wedding photo shown beside the headline. Landscape orientation recommended.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "localizedString",
          description: "Describe the image for screen readers.",
        }),
      ],
    }),

    // ─── How It Works ─────────────────────────────────────────────────────────

    defineField({
      name: "howItWorksSteps",
      title: "How It Works Steps",
      type: "array",
      group: "howItWorks",
      description: "Ordered list of steps (4 recommended).",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "title",
              title: "Step Title",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "localizedText",
            }),
          ],
          preview: {
            select: { title: "title.en" },
            prepare({ title }) {
              return { title: title ?? "Step" };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ─── Customize Gallery ────────────────────────────────────────────────────

    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "customize",
      description:
        "Photo mosaic showing customizable elements (5 images recommended).",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ─── Transparent Pricing ─────────────────────────────────────────────────

    defineField({
      name: "pricingStartingFrom",
      title: "Starting Price (USD)",
      type: "number",
      group: "pricing",
      description:
        "The lowest package starting price shown on the home page. Example: 4100",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "pricingDescription",
      title: "Pricing Description",
      type: "localizedText",
      group: "pricing",
      description:
        "Short paragraph below the starting price explaining the pricing approach.",
    }),

    // ─── Why Choose Us ────────────────────────────────────────────────────────

    defineField({
      name: "whyTitle",
      title: "Why Choose Us — Headline",
      type: "localizedString",
      group: "whyUs",
    }),

    defineField({
      name: "whyTeamPhoto",
      title: "Team / Venue Photo",
      type: "image",
      group: "whyUs",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "whyPoints",
      title: "Why Choose Us — Bullet Points",
      type: "array",
      group: "whyUs",
      description: "Each entry is one localized bullet point.",
      of: [
        defineArrayMember({
          type: "localizedString",
          name: "point",
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
  ],

  preview: {
    prepare() {
      return { title: "Home Page", subtitle: "Singleton" };
    },
  },
});
