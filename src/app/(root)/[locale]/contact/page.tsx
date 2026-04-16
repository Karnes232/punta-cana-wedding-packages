import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getContactPage } from '@/sanity/queries/ContactPage';
import { ContactHero, ContactSection } from '@/components/ContactPage';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getContactPage();

  return (
    <>
      <ContactHero data={data} locale={locale} />
      <ContactSection data={data} locale={locale} />
    </>
  );
}
