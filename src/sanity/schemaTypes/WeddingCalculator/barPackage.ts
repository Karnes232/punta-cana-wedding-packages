import { defineType, defineField } from 'sanity'
import { ComposeSparklesIcon as CupIcon } from '@sanity/icons'

export const barPackage = defineType({
  name: 'barPackage',
  title: 'Bar Package',
  type: 'document',
  icon: CupIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Basic',     value: 'basic' },
          { title: 'Premium',   value: 'premium' },
          { title: 'Top Shelf', value: 'topShelf' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'costPerPersonPerHour',
      title: 'Cost Per Person Per Hour (USD)',
      type: 'number',
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: 'availableHours',
      title: 'Available Hour Options',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'e.g. [3, 5, 8] — hours the client can choose from',
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name',        title: 'Name',               type: 'localizedString' }),
            defineField({ name: 'cost',        title: 'Cost (USD)',          type: 'number' }),
            defineField({ name: 'isPerPerson', title: 'Charged Per Person?', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { nameEn: 'name.en', cost: 'cost', pp: 'isPerPerson' },
            prepare({ nameEn, cost, pp }) {
              return { title: nameEn ?? 'Add-on', subtitle: `$${cost}${pp ? '/person' : ' flat'}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      nameEn: 'name.en',
      cost:   'costPerPersonPerHour',
      tier:   'tier',
    },
    prepare({ nameEn, cost, tier }) {
      return {
        title:    nameEn ?? 'Unnamed Bar Package',
        subtitle: `$${cost}/person/hour · ${tier ?? ''}`,
      }
    },
  },
})
