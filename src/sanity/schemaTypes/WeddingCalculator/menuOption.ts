import { defineType, defineField } from "sanity";
import { DocumentIcon as RestaurantIcon } from "@sanity/icons";

export const menuOption = defineType({
  name: "menuOption",
  title: "Menu Option",
  type: "document",
  icon: RestaurantIcon,
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
      name: "costPerPerson",
      title: "Cost Per Person (USD)",
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
      cost: "costPerPerson",
    },
    prepare({ nameEn, cost }) {
      return {
        title: nameEn ?? "Unnamed Menu",
        subtitle: `$${cost}/person`,
      };
    },
  },

  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
