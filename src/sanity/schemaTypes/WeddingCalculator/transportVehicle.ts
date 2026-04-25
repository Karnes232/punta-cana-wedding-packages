import { defineType, defineField } from "sanity";
import type { PreviewValue } from "sanity";
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
      name: "zonePricing",
      title: "Zone Pricing",
      type: "array",
      description: "Set a price per vehicle for each transportation zone",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "zone",
              title: "Transportation Zone",
              type: "reference",
              to: [{ type: "transportationZone" }],
              options: {
                disableNew: true,
              },
              validation: (R) => R.required(),
            }),
            defineField({
              name: "ratePerVehicle",
              title: "Rate Per Vehicle (USD)",
              type: "number",
              validation: (R) => R.required().min(0),
            }),
          ],
          preview: {
            select: {
              zoneName: "zone.name.en",
              rate: "ratePerVehicle",
            },
            prepare({ zoneName, rate }: { zoneName?: string; rate?: number }) {
              return {
                title: zoneName ?? "Unknown Zone",
                subtitle: rate != null ? `$${rate}/vehicle` : "No rate",
              };
            },
          },
        },
      ],
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
      capacity: "capacity",
      media: "image",
    },
    prepare({
      nameEn,
      capacity,
      media,
    }: {
      nameEn?: string;
      capacity?: number;
      media?: unknown;
    }): PreviewValue {
      return {
        title: nameEn ?? "Unnamed Vehicle",
        subtitle: capacity != null ? `${capacity} seats` : undefined,
        // `select.media: "image"` provides the image field value, but `PreviewValue.media`
        // is typed as a ReactNode-like value. Casting keeps schema typing compatible.
        media: media as PreviewValue["media"],
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
