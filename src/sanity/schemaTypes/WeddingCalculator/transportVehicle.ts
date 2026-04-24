import { defineType, defineField } from "sanity";
import { ArrowRightIcon as VehicleIcon } from "@sanity/icons";

export const transportVehicle = defineType({
  name: "transportVehicle",
  title: "Transport Vehicle",
  type: "document",
  icon: VehicleIcon,
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
      name: "capacity",
      title: "Passengers Per Vehicle",
      type: "number",
      description: "e.g. 15 for a mini-van, 40 for a coach bus",
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "ratePerVehicle",
      title: "Rate Per Vehicle (USD)",
      type: "number",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Photo shown in the wedding calculator",
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
      rate: "ratePerVehicle",
      capacity: "capacity",
      media: "image",
    },
    prepare({ nameEn, rate, capacity, media }) {
      return {
        title: nameEn ?? "Unnamed Vehicle",
        subtitle: `$${rate}/vehicle · ${capacity} seats`,
        media,
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
