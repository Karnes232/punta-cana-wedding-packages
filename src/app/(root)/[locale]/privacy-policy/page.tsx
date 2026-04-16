import { setRequestLocale } from 'next-intl/server';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getPrivacyPolicy } from '@/sanity/queries/PrivacyPolicy';
import PrivacyPolicyContent from '@/components/PrivacyPolicyPage/PrivacyPolicyContent';

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const data = await getPrivacyPolicy();

  return <PrivacyPolicyContent data={data} locale={locale} />;
}
