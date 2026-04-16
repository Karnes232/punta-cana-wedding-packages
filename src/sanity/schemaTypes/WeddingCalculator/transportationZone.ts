import { defineType, defineField } from 'sanity'
import { ArrowRightIcon as VehicleIcon } from '@sanity/icons'

export const transportationZone = defineType({
  name: 'transportationZone',
  title: 'Transportation Zone',
  type: 'document',
  icon: VehicleIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Zone Name',
      type: 'localizedString',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
    defineField({
      name: 'vehicleCapacity',
      title: 'Passengers Per Vehicle',
      type: 'number',
      description: 'e.g. 15 for a passenger van',
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'ratePerVehicle',
      title: 'Rate Per Vehicle (USD)',
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
      nameEn:   'name.en',
      rate:     'ratePerVehicle',
      capacity: 'vehicleCapacity',
    },
    prepare({ nameEn, rate, capacity }) {
      return {
        title:    nameEn ?? 'Unnamed Zone',
        subtitle: `$${rate}/vehicle · ${capacity} seats`,
      }
    },
  },
})
