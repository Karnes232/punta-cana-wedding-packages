import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const photoPackage = defineType({
  name: 'photoPackage',
  title: 'Photography Package',
  type: 'document',
  icon: ImageIcon,
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
      name: 'hours',
      title: 'Coverage Hours',
      type: 'number',
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'cost',
      title: 'Package Cost (USD)',
      type: 'number',
      validation: (R) => R.required().min(0),
    }),
    defineField({
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'localizedString' }),
            defineField({ name: 'cost', title: 'Cost (USD)', type: 'number' }),
          ],
          preview: {
            select: { nameEn: 'name.en', cost: 'cost' },
            prepare({ nameEn, cost }) {
              return { title: nameEn ?? 'Add-on', subtitle: `+$${cost}` }
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
      cost:   'cost',
      hours:  'hours',
    },
    prepare({ nameEn, cost, hours }) {
      return {
        title:    nameEn ?? 'Unnamed Photo Package',
        subtitle: `$${cost?.toLocaleString()} · ${hours}h`,
      }
    },
  },
})
