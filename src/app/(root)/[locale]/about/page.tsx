import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getAboutPage } from '@/sanity/queries/AboutPage';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import {
  AboutHero,
  OurStory,
  TheVenue,
  OurTeam,
  OurValues,
  AboutCTABanner,
} from '@/components/AboutPage';
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
  const seoDoc = await getPageSeo('about');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);
  const og = pickLocale(seoDoc?.seo?.openGraph, locale);

  return {
    title: meta?.title ?? 'About Us | Punta Cana Wedding Packages',
    description: meta?.description ?? 'Meet the team behind Punta Cana Wedding Packages.',
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getAboutPage(), getPageSeo('about')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <AboutHero data={data} locale={locale} />
      <OurStory data={data} locale={locale} />
      <TheVenue data={data} locale={locale} />
      <OurTeam data={data} locale={locale} />
      <OurValues data={data} locale={locale} />
      <AboutCTABanner />
    </>
  );
}
