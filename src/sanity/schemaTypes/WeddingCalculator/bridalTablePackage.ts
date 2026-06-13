import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const bridalTablePackage = defineType({
  name: "bridalTablePackage",
  title: "Bridal Table Package",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "details",
      title: "Full Bridal Table Details (shown in 'See Details' modal)",
      type: "localizedBlock",
      validation: (R) => R.required(),
      description:
        "Rich-text details (what's included, florals, linens, style notes) shown when a guest clicks 'See Details' on this card.",
    }),
    defineField({
      name: "baseCost",
      title: "Base Cost (USD)",
      type: "number",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "addOns",
      title: "Add-ons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "localizedString",
            }),
            defineField({ name: "cost", title: "Cost (USD)", type: "number" }),
            defineField({
              name: "isPerTable",
              title: "Charged Per Table?",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { nameEn: "name.en", cost: "cost", pt: "isPerTable" },
            prepare({ nameEn, cost, pt }) {
              return {
                title: nameEn ?? "Add-on",
                subtitle: `$${cost}${pt ? "/table" : " flat"}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Card Thumbnail",
      type: "image",
      options: { hotspot: true },
      description: "Small photo shown on the selection card",
    }),
    defineField({
      name: "previewImage",
      title: "Wedding Preview Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Full scene shown in the live preview panel — use a wide, cinematic shot of a complete bridal/head table",
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      nameEn: "name.en",
      cost: "baseCost",
    },
    prepare({ nameEn, cost }) {
      return {
        title: nameEn ?? "Unnamed Bridal Table Package",
        subtitle: `Base: $${cost?.toLocaleString()}`,
      };
    },
  },
});
