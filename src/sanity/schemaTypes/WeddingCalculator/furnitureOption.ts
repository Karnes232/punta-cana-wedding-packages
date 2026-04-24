import { defineType, defineField } from "sanity";
import { SquareIcon } from "@sanity/icons";

export const furnitureOption = defineType({
  name: "furnitureOption",
  title: "Furniture Option",
  type: "document",
  icon: SquareIcon,
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
      name: "tableType",
      title: "Table Type",
      type: "string",
      options: {
        list: [
          { title: "Standard Round", value: "standardRound" },
          { title: "Premium Round", value: "premiumRound" },
          { title: "Long Banquet", value: "banquet" },
          { title: "Cocktail High-Top", value: "cocktail" },
        ],
      },
    }),
    defineField({
      name: "chairType",
      title: "Chair Type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Cross-back", value: "crossback" },
          { title: "Chiavari", value: "chiavari" },
        ],
      },
    }),
    defineField({
      name: "seatsPerTable",
      title: "Seats Per Table",
      type: "number",
      initialValue: 10,
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "costPerTable",
      title: "Cost Per Table (USD)",
      type: "number",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Optional photo shown in the wedding calculator",
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
      cost: "costPerTable",
    },
    prepare({ nameEn, cost }) {
      return {
        title: nameEn ?? "Unnamed Furniture",
        subtitle: `$${cost}/table`,
      };
    },
  },
});
