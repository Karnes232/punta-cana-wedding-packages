import { defineType, defineField, defineArrayMember } from "sanity";

export const howItWorksPage = defineType({
  name: "howItWorksPage",
  title: "How It Works Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "process", title: "Process Steps" },
    { name: "payment", title: "Financial Peace of Mind" },
    { name: "whyItWorks", title: "Why It Works" },
    { name: "faq", title: "FAQ" },
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
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image (optional)",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
    }),

    // ─── Process Steps ────────────────────────────────────────────────────────

    defineField({
      name: "processTitle",
      title: "Process Section Heading",
      type: "localizedString",
      group: "process",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      validation: (Rule) => Rule.required(),
      description:
        "4 steps recommended. Each can optionally include an illustration.",
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
            defineField({
              name: "image",
              title: "Step Illustration (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
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
  
    }),

    // ─── Payment / Financial Peace of Mind ───────────────────────────────────

    defineField({
      name: "paymentTitle",
      title: "Payment Section Heading",
      type: "localizedString",
      group: "payment",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "depositAmount",
      title: "Deposit Amount (USD)",
      type: "number",
      group: "payment",
      description: "Required deposit to secure the date. Example: 500",
      initialValue: 500,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "paymentStats",
      title: "Payment Stat Cards",
      type: "array",
      group: "payment",
      description:
        "Three cards shown under the heading (e.g. Deposit / 30-Day Balance / Final Payment). Each card has a label, a value (like \"$500\" or \"50%\"), and a short description.",
      validation: (Rule) => Rule.min(1).max(4),
      of: [
        defineArrayMember({
          type: "object",
          name: "paymentStat",
          fields: [
            defineField({
              name: "label",
              title: "Label (top line)",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value (large number)",
              type: "localizedString",
              description:
                'The big number/amount displayed, e.g. "$500" or "50%".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description (sub-line)",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: "label.en", value: "value.en" },
            prepare({ label, value }) {
              return {
                title: label ?? "Payment Stat",
                subtitle: value ?? "",
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "depositScheduleTitle",
      title: "Deposit & Payment Schedule — Heading",
      type: "localizedString",
      group: "payment",
      description:
        'Heading shown above the deposit and payment-schedule paragraphs (e.g. "Deposit & Payment Schedule").',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "depositDescription",
      title: "Deposit Description",
      type: "localizedText",
      group: "payment",
      description:
        "Explain that the deposit is refundable/deductible from the total cost.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "paymentScheduleNote",
      title: "Payment Schedule Note",
      type: "localizedText",
      group: "payment",
      description: "Explain the 30-day / 15-day payment schedule.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "flexibilityTitle",
      title: "Flexibility & Advance Booking — Heading",
      type: "localizedString",
      group: "payment",
      description:
        'Heading shown above the flexibility and advance-booking paragraphs (e.g. "Flexibility & Advance Booking").',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "flexibilityNote",
      title: "Flexibility Note",
      type: "localizedText",
      group: "payment",
      description: "Explain that dates can be changed without extra fees.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "advanceBookingNote",
      title: "Advance Booking Note",
      type: "localizedText",
      group: "payment",
      description: "Explain that couples can secure a date years in advance.",
      validation: (Rule) => Rule.required(),
    }),

    // ─── Why It Works ─────────────────────────────────────────────────────────

    defineField({
      name: "whyTitle",
      title: "Why It Works — Heading",
      type: "localizedString",
      group: "whyItWorks",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whyBody",
      title: "Why It Works — Body",
      type: "localizedText",
      group: "whyItWorks",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whyImage",
      title: "Why It Works — Image",
      type: "image",
      group: "whyItWorks",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt Text", type: "string" })],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "whyPoints",
      title: "Why It Works — Bullet Points",
      type: "array",
      group: "whyItWorks",
      of: [
        defineArrayMember({
          type: "localizedString",
          name: "point",
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),

    // ─── FAQ ──────────────────────────────────────────────────────────────────

    defineField({
      name: "faqTitle",
      title: "FAQ Section Heading",
      type: "localizedString",
      group: "faq",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "faq",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "localizedText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question.en" },
            prepare({ title }) {
              return { title: title ?? "FAQ Item" };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.max(20),
    }),
  ],

  preview: {
    prepare() {
      return { title: "How It Works Page", subtitle: "Singleton" };
    },
  },
});
