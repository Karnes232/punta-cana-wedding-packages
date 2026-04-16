import { defineField, defineType } from 'sanity'
import { ComposeIcon } from '@sanity/icons'
import { ALL_LOCALES } from '../../../i18n/blogLocales'

const languageOptions = ALL_LOCALES.map((code) => ({
  title: code.toUpperCase(),
  value: code,
}))

export const blogArticle = defineType({
  name: 'blogArticle',
  title: 'Blog Article',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    { name: 'basic', title: 'Basic' },
    { name: 'content', title: 'Content' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ─── Identity ────────────────────────────────────────────────────────────

    defineField({
      name: 'language',
      title: 'Article language',
      description:
        'This document is one language version. Create another blog article per translation and use the same Translation group ID.',
      type: 'string',
      group: 'basic',
      options: {
        list: languageOptions,
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'translationGroup',
      title: 'Translation group ID',
      description:
        'Same ID across all language versions of this article (e.g. wedding-tips-2025). Used to link translations together.',
      type: 'string',
      group: 'basic',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      description: 'URL-safe identifier, auto-generated from the title.',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: '1–2 sentence teaser shown on the blog index card.',
      type: 'text',
      rows: 3,
      group: 'basic',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'date',
      group: 'basic',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      group: 'basic',
      validation: (R) => R.required().min(1).max(60),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'blogCategory' }],
      group: 'basic',
      options: { disableNew: true },
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      validation: (R) => R.required(),
    }),

    // ─── Content ─────────────────────────────────────────────────────────────

    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
      validation: (R) => R.required(),
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Overrides the article title in <title> tags. Leave blank to use title.',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Meta description for search engines (150–160 chars recommended).',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language',
      media: 'featuredImage',
      group: 'translationGroup',
    },
    prepare({ title, language, media, group }) {
      return {
        title: title ?? 'Untitled Article',
        subtitle: `${(language ?? '').toUpperCase()} · group: ${group ?? '—'}`,
        media,
      }
    },
  },

  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
