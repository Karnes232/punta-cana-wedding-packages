import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getAboutPage } from '@/sanity/queries/AboutPage';
import {
  AboutHero,
  OurStory,
  TheVenue,
  OurTeam,
  OurValues,
  AboutCTABanner,
} from '@/components/AboutPage';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getAboutPage();

  return (
    <>
      <AboutHero data={data} locale={locale} />
      <OurStory data={data} locale={locale} />
      <TheVenue data={data} locale={locale} />
      <OurTeam data={data} locale={locale} />
      <OurValues data={data} locale={locale} />
      <AboutCTABanner />
    </>
  );
}
