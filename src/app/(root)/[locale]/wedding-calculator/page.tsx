import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { MAIN_LOCALES } from '@/i18n/routing'
import { getCalculatorData, localizePricing } from '@/sanity/queries/WeddingCalculator/getCalculatorData'
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO'
import { CalculatorHero, CalculatorContainer } from '@/components/WeddingCalculatorPage'

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
  const seoDoc = await getPageSeo('wedding-calculator')
  const meta = pickLocale(seoDoc?.seo?.meta, locale)
  const og   = pickLocale(seoDoc?.seo?.openGraph, locale)

  return {
    title:       meta?.title       ?? 'Build Your Wedding Package | Punta Cana Wedding Packages',
    description: meta?.description ?? 'Design your dream destination wedding step by step. See real prices for every choice — menu, decor, photography, and more.',
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

export default async function WeddingCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const raw  = await getCalculatorData()
  const data = localizePricing(raw, locale)

  return (
    <>
      <CalculatorHero locale={locale} />
      <CalculatorContainer data={data} locale={locale} />
    </>
  )
}
