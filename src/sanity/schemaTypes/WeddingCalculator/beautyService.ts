import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons";

export const beautyService = defineType({
  name: "beautyService",
  title: "Hair, Makeup & Barber Service",
  type: "document",
  icon: UserIcon,
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Hair & Makeup", value: "hairMakeup" },
          { title: "Barber", value: "barber" },
        ],
        layout: "radio",
      },
      initialValue: "hairMakeup",
      validation: (R) => R.required(),
      description:
        "Groups the service under the 'Hair & Makeup' or 'Barber' subsection on the calculator step.",
    }),
    defineField({
      name: "pricePerPerson",
      title: "Price Per Person (USD)",
      type: "number",
      validation: (R) => R.required().min(0),
      description:
        "Charged per person. The guest chooses how many people on the calculator step (price × quantity).",
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
      price: "pricePerPerson",
      category: "category",
    },
    prepare({ nameEn, price, category }) {
      const cat = category === "barber" ? "Barber" : "Hair & Makeup";
      return {
        title: nameEn ?? "Unnamed Service",
        subtitle: `$${price?.toLocaleString()}/person · ${cat}`,
      };
    },
  },
});
