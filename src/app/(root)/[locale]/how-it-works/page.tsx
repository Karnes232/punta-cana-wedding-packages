import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getHowItWorksPage } from '@/sanity/queries/HowItWorksPage';
import {
  HowItWorksHero,
  ProcessSteps,
  FinancialPeaceOfMind,
  WhyItWorks,
  FAQSection,
  HowItWorksCTABanner,
} from '@/components/HowItWorksPage';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getHowItWorksPage();

  return (
    <>
      <HowItWorksHero data={data} locale={locale} />
      <ProcessSteps data={data} locale={locale} />
      <FinancialPeaceOfMind data={data} locale={locale} />
      <WhyItWorks data={data} locale={locale} />
      <FAQSection data={data} locale={locale} />
      <HowItWorksCTABanner />
    </>
  );
}
