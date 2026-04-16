import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getHowItWorksPage } from '@/sanity/queries/HowItWorksPage';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import {
  HowItWorksHero,
  ProcessSteps,
  FinancialPeaceOfMind,
  WhyItWorks,
  FAQSection,
  HowItWorksCTABanner,
} from '@/components/HowItWorksPage';
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
  const seoDoc = await getPageSeo('how-it-works');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);
  const og = pickLocale(seoDoc?.seo?.openGraph, locale);

  return {
    title: meta?.title ?? 'How It Works | Punta Cana Wedding Packages',
    description: meta?.description ?? 'See how easy it is to plan your Punta Cana destination wedding.',
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

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getHowItWorksPage(), getPageSeo('how-it-works')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <HowItWorksHero data={data} locale={locale} />
      <ProcessSteps data={data} locale={locale} />
      <FinancialPeaceOfMind data={data} locale={locale} />
      <WhyItWorks data={data} locale={locale} />
      <FAQSection data={data} locale={locale} />
      <HowItWorksCTABanner />
    </>
  );
}
