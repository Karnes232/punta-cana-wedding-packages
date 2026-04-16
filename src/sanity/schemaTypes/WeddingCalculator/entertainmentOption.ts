import { defineType, defineField } from 'sanity'
import { StarIcon as MusicNoteIcon } from '@sanity/icons'

export const entertainmentOption = defineType({
  name: 'entertainmentOption',
  title: 'Entertainment Option',
  type: 'document',
  icon: MusicNoteIcon,
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
      name: 'cost',
      title: 'Cost (USD)',
      type: 'number',
      validation: (R) => R.required().min(0),
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
    },
    prepare({ nameEn, cost }) {
      return {
        title:    nameEn ?? 'Unnamed Entertainment',
        subtitle: `$${cost?.toLocaleString()}`,
      }
    },
  },
})
