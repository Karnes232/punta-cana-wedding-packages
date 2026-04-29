import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const weddingType = defineType({
  name: "weddingType",
  title: "Wedding Type",
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
      name: "fee",
      title: "Extra Fee (USD)",
      type: "number",
      initialValue: 0,
      validation: (R) => R.required().min(0),
      description: "Additional fee for this wedding type. Use 0 for no extra charge.",
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
      fee: "fee",
    },
    prepare({ nameEn, fee }) {
      return {
        title: nameEn ?? "Unnamed Wedding Type",
        subtitle: fee > 0 ? `+$${fee?.toLocaleString()}` : "Included",
      };
    },
  },
});
