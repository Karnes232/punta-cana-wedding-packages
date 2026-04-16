import { defineType, defineField } from 'sanity'
import { ControlsIcon } from '@sanity/icons'

export const calculatorConfig = defineType({
  name: 'calculatorConfig',
  title: 'Calculator Configuration',
  type: 'document',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'venueCost',
      title: 'Venue Cost (USD)',
      type: 'number',
      description: 'Fixed cost for venue rental — always included in total.',
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: 'coordinationCost',
      title: 'Coordination Cost (USD)',
      type: 'number',
      description: 'Fixed cost for wedding coordination — 0 if included in venue.',
      initialValue: 0,
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: 'defaultSeatsPerTable',
      title: 'Default Seats Per Table',
      type: 'number',
      description: 'Used to calculate number of tables needed from guest count.',
      initialValue: 10,
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'minimumAdvanceMonths',
      title: 'Minimum Advance Booking (months)',
      type: 'number',
      description: 'How many months in advance the wedding date must be.',
      initialValue: 6,
      validation: (R) => R.required().min(1),
    }),
  ],

  preview: {
    select: {
      venue: 'venueCost',
      coord: 'coordinationCost',
    },
    prepare({ venue, coord }) {
      return {
        title:    'Calculator Configuration',
        subtitle: `Venue: $${venue} · Coordination: $${coord}`,
      }
    },
  },
})
