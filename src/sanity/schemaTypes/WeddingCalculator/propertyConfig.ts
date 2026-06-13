import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const propertyConfig = defineType({
  name: "propertyConfig",
  title: "Property (Stay With Us)",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Property Name",
      type: "localizedString",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "images",
      title: "Property Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "description",
      title: "Property Description (modal body)",
      type: "localizedBlock",
      description:
        "Rich-text description of the property — amenities, location, what's included. Include the room price list here (e.g. each room type with its nightly price) and the all-inclusive note (+$70/person/night).",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "stayOptionLabel",
      title: "\"Stay With Us\" Card — Title",
      type: "localizedString",
      description: 'Headline on the lodging step card (e.g. "Staying at our property").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "stayOptionSub",
      title: "\"Stay With Us\" Card — Subtitle",
      type: "localizedText",
      description: 'Short subtitle under the headline (e.g. "Curated wedding accommodation, on-site at the venue.").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "otherOptionLabel",
      title: "\"Other Hotel\" Card — Title",
      type: "localizedString",
      description: 'Headline for the alternative-hotel card (e.g. "I already have another hotel").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "otherOptionSub",
      title: "\"Other Hotel\" Card — Subtitle",
      type: "localizedText",
      description: 'Short subtitle under the alternative-hotel headline (e.g. "We\'ll arrange transportation from your hotel area.").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "startingPriceLabel",
      title: 'Card — "Starting From" Price',
      type: "localizedString",
      description:
        "Short price line shown on the lodging card, e.g. \"Starting at $124.62 / night\". The full room price list goes in the Property Description above.",
    }),
  ],
  preview: {
    select: { nameEn: "name.en", priceEn: "startingPriceLabel.en" },
    prepare: ({ nameEn, priceEn }) => ({
      title: nameEn ?? "Property Configuration",
      subtitle: priceEn ?? "",
    }),
  },
});
