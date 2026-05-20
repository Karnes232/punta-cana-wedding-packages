import { defineType, defineField } from "sanity";
import { ControlsIcon } from "@sanity/icons";

export const calculatorConfig = defineType({
  name: "calculatorConfig",
  title: "Calculator Configuration",
  type: "document",
  icon: ControlsIcon,
  fields: [
    defineField({
      name: "venueCost",
      title: "Venue Cost (USD)",
      type: "number",
      description: "Fixed cost for venue rental — always included in total.",
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "coordinationCost",
      title: "Coordination Cost (USD)",
      type: "number",
      description:
        "Fixed cost for wedding coordination — 0 if included in venue.",
      initialValue: 0,
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: "defaultSeatsPerTable",
      title: "Default Seats Per Table",
      type: "number",
      description:
        "Used to calculate number of tables needed from guest count.",
      initialValue: 10,
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "minimumAdvanceMonths",
      title: "Minimum Advance Booking (months)",
      type: "number",
      description: "How many months in advance the wedding date must be.",
      initialValue: 6,
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "venueName",
      title: "Venue Name",
      type: "localizedString",
      description: 'Display name for the venue (e.g. "Cabeza de Toro").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "venueStepTitle",
      title: "Venue Step Title",
      type: "localizedString",
      description:
        'Heading shown on the venue step (e.g. "Venue & Coordination").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "venueIncludedLabel",
      title: 'Venue "Included" Label',
      type: "localizedString",
      description:
        'Small uppercase label above the venue name (e.g. "Always Included").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "venueLocation",
      title: "Venue Location",
      type: "localizedString",
      description:
        'Sub-text shown under the venue name (e.g. "Cabeza de Toro Beach, Punta Cana").',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "venueDescription",
      title: "Venue Description",
      type: "localizedText",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "venueFeatures",
      title: "Venue Features",
      description:
        "Bullet list shown on the venue card. Provide matching entries per language.",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "string" }],
          validation: (R) => R.min(1),
        }),
        defineField({
          name: "es",
          title: "Español",
          type: "array",
          of: [{ type: "string" }],
          validation: (R) => R.min(1),
        }),
      ],
    }),
    defineField({
      name: "venueConfirmLabel",
      title: "Venue Confirmation Checkbox Label",
      type: "localizedString",
      description:
        'Text next to the confirmation checkbox (e.g. "I\'m excited to get married here!").',
      validation: (R) => R.required(),
    }),
  ],

  preview: {
    select: {
      venue: "venueCost",
      coord: "coordinationCost",
    },
    prepare({ venue, coord }) {
      return {
        title: "Calculator Configuration",
        subtitle: `Venue: $${venue} · Coordination: $${coord}`,
      };
    },
  },
});
