import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getTermsOfService } from '@/sanity/queries/TermsOfService';
import TermsOfServiceContent from '@/components/TermsOfServicePage/TermsOfServiceContent';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getTermsOfService();

  return <TermsOfServiceContent data={data} locale={locale} />;
}
