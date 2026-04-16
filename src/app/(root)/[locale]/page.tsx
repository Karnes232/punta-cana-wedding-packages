import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getHomePage } from '@/sanity/queries/HomePage';
import {
  Hero,
  HowItWorks,
  CustomizeSection,
  TransparentPricing,
  WhyChooseUs,
  CTABanner,
} from '@/components/HomePage';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getHomePage();

  return (
    <>
      <Hero data={data} locale={locale} />
      <HowItWorks data={data} locale={locale} />
      <CustomizeSection data={data} />
      <TransparentPricing data={data} locale={locale} />
      <WhyChooseUs data={data} locale={locale} />
      <CTABanner />
    </>
  );
}
