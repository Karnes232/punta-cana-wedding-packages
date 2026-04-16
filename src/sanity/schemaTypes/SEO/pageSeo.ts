import { defineType, defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'pageName',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home',             value: 'home' },
          { title: 'Wedding Calculator', value: 'wedding-calculator' },
          { title: 'How It Works',     value: 'how-it-works' },
          { title: 'About',            value: 'about' },
          { title: 'Contact',          value: 'contact' },
          { title: 'Blog',             value: 'blog' },
          { title: 'Stories',          value: 'stories' },
          { title: 'Privacy Policy',   value: 'privacy-policy' },
          { title: 'Terms of Service', value: 'terms-of-service' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],

  preview: {
    select: {
      pageName:    'pageName',
      titleEn:     'seo.meta.en.title',
      titleEs:     'seo.meta.es.title',
    },
    prepare({ pageName, titleEn, titleEs }) {
      return {
        title:    pageName ?? 'Unnamed Page',
        subtitle: `EN: "${titleEn ?? '—'}" | ES: "${titleEs ?? '—'}"`,
      }
    },
  },
})
