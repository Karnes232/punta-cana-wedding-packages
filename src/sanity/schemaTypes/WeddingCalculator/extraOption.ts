import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const extraOption = defineType({
  name: 'extraOption',
  title: 'Extra Experience',
  type: 'document',
  icon: SparklesIcon,
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
      name: 'isPerPerson',
      title: 'Charged Per Person?',
      type: 'boolean',
      description: 'If true: cost × guest count. If false: flat fee.',
      initialValue: true,
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
      pp:     'isPerPerson',
    },
    prepare({ nameEn, cost, pp }) {
      return {
        title:    nameEn ?? 'Unnamed Extra',
        subtitle: `$${cost}${pp ? '/person' : ' flat'}`,
      }
    },
  },
})
