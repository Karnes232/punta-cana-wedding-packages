import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { MAIN_LOCALES } from '@/i18n/routing'
import { getAllStories } from '@/sanity/queries/StoriesPage'
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO'
import { StoriesHero, StoriesGrid, StoriesCTA } from '@/components/StoriesPage'

export const revalidate = 3600

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const seoDoc = await getPageSeo('stories')
  const meta = pickLocale(seoDoc?.seo?.meta, locale)
  const og   = pickLocale(seoDoc?.seo?.openGraph, locale)

  return {
    title:       meta?.title       ?? 'Real Wedding Stories | Punta Cana Wedding Packages',
    description: meta?.description ?? 'Inspiration from couples who celebrated in Punta Cana.',
    keywords:    meta?.keywords    ?? undefined,
    openGraph: {
      title:       og?.title       ?? meta?.title       ?? undefined,
      description: og?.description ?? meta?.description ?? undefined,
    },
    robots: {
      index:  !(seoDoc?.seo?.noIndex  ?? false),
      follow: !(seoDoc?.seo?.noFollow ?? false),
    },
  }
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const stories = await getAllStories()

  return (
    <>
      <StoriesHero locale={locale} />
      <StoriesGrid stories={stories} locale={locale} />
      <StoriesCTA locale={locale} />
    </>
  )
}
