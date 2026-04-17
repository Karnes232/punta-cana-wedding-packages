import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "story", title: "Our Story" },
    { name: "venue", title: "The Venue" },
    { name: "team", title: "The Team" },
    { name: "values", title: "Our Values" },
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
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // ─── Our Story ────────────────────────────────────────────────────────────

    defineField({
      name: "storyTitle",
      title: "Story Section Heading",
      type: "localizedString",
      group: "story",
    }),

    defineField({
      name: "storyContent",
      title: "Story Content",
      type: "localizedBlock",
      group: "story",
      description:
        "Rich text body of the company story (supports bold, paragraphs, lists).",
    }),

    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      group: "story",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // ─── The Venue ────────────────────────────────────────────────────────────

    defineField({
      name: "venueTitle",
      title: "Venue Section Heading",
      type: "localizedString",
      group: "venue",
    }),

    defineField({
      name: "venueDescription",
      title: "Venue Description",
      type: "localizedText",
      group: "venue",
    }),

    defineField({
      name: "venueImage",
      title: "Venue Image",
      type: "image",
      group: "venue",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    defineField({
      name: "venueHighlights",
      title: "Venue Highlights",
      type: "array",
      group: "venue",
      description: "Bullet points about the venue (4–6 recommended).",
      of: [
        defineArrayMember({
          type: "localizedString",
          name: "highlight",
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),

    // ─── Team ─────────────────────────────────────────────────────────────────

    defineField({
      name: "teamTitle",
      title: "Team Section Heading",
      type: "localizedString",
      group: "team",
    }),

    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "object",
          name: "member",
          fields: [
            defineField({
              name: "name",
              title: "Full Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role / Title",
              type: "localizedString",
            }),
            defineField({
              name: "bio",
              title: "Short Bio",
              type: "localizedText",
              description: "2–3 sentences.",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role.en" },
            prepare({ title, subtitle }) {
              return { title: title ?? "Team Member", subtitle };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),

    // ─── Values ───────────────────────────────────────────────────────────────

    defineField({
      name: "valuesTitle",
      title: "Values Section Heading",
      type: "localizedString",
      group: "values",
    }),

    defineField({
      name: "values",
      title: "Values",
      type: "array",
      group: "values",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({
              name: "title",
              title: "Value Title",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Value Description",
              type: "localizedText",
            }),
          ],
          preview: {
            select: { title: "title.en" },
            prepare({ title }) {
              return { title: title ?? "Value" };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
  ],

  preview: {
    prepare() {
      return { title: "About Us Page", subtitle: "Singleton" };
    },
  },
});
