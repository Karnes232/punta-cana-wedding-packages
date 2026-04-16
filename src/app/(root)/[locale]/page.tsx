import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getHomePage } from '@/sanity/queries/HomePage';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import {
  Hero,
  HowItWorks,
  CustomizeSection,
  TransparentPricing,
  WhyChooseUs,
  CTABanner,
} from '@/components/HomePage';
import SeoJsonLd from '@/components/SeoJsonLd';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoDoc = await getPageSeo('home');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);
  const og = pickLocale(seoDoc?.seo?.openGraph, locale);

  return {
    title: meta?.title ?? 'Punta Cana Wedding Packages',
    description: meta?.description ?? 'Design your dream destination wedding in Punta Cana, Dominican Republic.',
    keywords: meta?.keywords ?? undefined,
    openGraph: {
      title: og?.title ?? meta?.title ?? undefined,
      description: og?.description ?? meta?.description ?? undefined,
    },
    robots: {
      index: !(seoDoc?.seo?.noIndex ?? false),
      follow: !(seoDoc?.seo?.noFollow ?? false),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getHomePage(), getPageSeo('home')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <Hero data={data} locale={locale} />
      <HowItWorks data={data} locale={locale} />
      <CustomizeSection data={data} />
      <TransparentPricing data={data} locale={locale} />
      <WhyChooseUs data={data} locale={locale} />
      <CTABanner />
    </>
  );
}
