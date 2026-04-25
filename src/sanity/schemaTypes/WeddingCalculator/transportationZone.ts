import { defineType, defineField } from "sanity";
import { ArrowRightIcon as VehicleIcon } from "@sanity/icons";

export const transportationZone = defineType({
  name: "transportationZone",
  title: "Transportation Zone",
  type: "document",
  icon: VehicleIcon,
  fields: [
    defineField({
      name: "name",
      title: "Zone Name",
      type: "localizedString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
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
    },
    prepare({ nameEn }) {
      return {
        title: nameEn ?? "Unnamed Zone",
      };
    },
  },
});
