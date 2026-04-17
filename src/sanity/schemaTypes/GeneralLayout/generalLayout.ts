import { defineType, defineField, defineArrayMember } from "sanity";

const SOCIAL_PLATFORMS = [
  { title: "Instagram", value: "instagram" },
  { title: "Facebook", value: "facebook" },
  { title: "TikTok", value: "tiktok" },
  { title: "YouTube", value: "youtube" },
  { title: "Pinterest", value: "pinterest" },
  { title: "X / Twitter", value: "twitter" },
];

/**
 * General Layout — singleton document.
 * Controls global site branding: logo, contact info, social links, footer copy.
 * One document per dataset; managed as a singleton in the Studio structure.
 */
export const generalLayout = defineType({
  name: "generalLayout",
  title: "General Layout",
  type: "document",
  // Singleton: managed as a single document via the Studio structure.
  // No __experimental_actions needed in Sanity 5.x — the structure builder
  // enforces singleton behaviour by always opening the same documentId.
  groups: [
    { name: "branding", title: "Branding & Logo" },
    { name: "contact", title: "Contact Info" },
    { name: "social", title: "Social Media" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ─── Branding ────────────────────────────────────────────────────────────

    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      group: "branding",
      description: "The primary brand name shown in the navbar and footer.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "logo",
      title: "Logo Image",
      type: "image",
      group: "branding",
      description:
        "Upload a logo (SVG or PNG with transparent background recommended).",
      options: { hotspot: false },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the logo for screen readers.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "branding",
      description: "Small icon shown in browser tabs (square, min 32×32px).",
    }),

    // ─── Contact ─────────────────────────────────────────────────────────────

    defineField({
      name: "phoneNumber",
      title: "Phone / WhatsApp Number",
      type: "string",
      group: "contact",
      description: "Include country code. Example: 18295551234",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
    }),

    // ─── Social Media ─────────────────────────────────────────────────────────

    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      group: "social",
      of: [
        defineArrayMember({
          name: "socialLink",
          title: "Social Link",
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: SOCIAL_PLATFORMS },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
            prepare({ title, subtitle }) {
              const label =
                SOCIAL_PLATFORMS.find((p) => p.value === title)?.title ?? title;
              return { title: label, subtitle };
            },
          },
        }),
      ],
    }),

    // ─── Footer ───────────────────────────────────────────────────────────────

    defineField({
      name: "footerDescription",
      title: "Footer Description",
      type: "localizedText",
      group: "footer",
      description:
        "Short tagline shown under the brand name in the footer (2–3 sentences max).",
    }),
  ],

  preview: {
    select: { title: "brandName" },
    prepare({ title }) {
      return {
        title: title ?? "General Layout",
        subtitle: "Global site settings",
      };
    },
  },
});
