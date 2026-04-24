import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const decorPackage = defineType({
  name: "decorPackage",
  title: "Decor Package",
  type: "document",
  icon: StarIcon,
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
      description: "Small photo shown on the selection card in Step 8",
    }),
    defineField({
      name: "previewImage",
      title: "Wedding Preview Image",
      type: "image",
      options: { hotspot: true },
      description: "Full wedding scene shown in the live preview panel — use a wide, cinematic shot of a complete table setup or ceremony",
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
        title: nameEn ?? "Unnamed Decor Package",
        subtitle: `Base: $${cost?.toLocaleString()}`,
      };
    },
  },
});
