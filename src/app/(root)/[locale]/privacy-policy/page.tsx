import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getPrivacyPolicy } from '@/sanity/queries/PrivacyPolicy';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import PrivacyPolicyContent from '@/components/PrivacyPolicyPage/PrivacyPolicyContent';
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
  const seoDoc = await getPageSeo('privacy-policy');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);

  return {
    title: meta?.title ?? 'Privacy Policy | Punta Cana Wedding Packages',
    description: meta?.description ?? 'How we handle your personal data.',
    robots: {
      index: !(seoDoc?.seo?.noIndex ?? false),
      follow: !(seoDoc?.seo?.noFollow ?? false),
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getPrivacyPolicy(), getPageSeo('privacy-policy')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <PrivacyPolicyContent data={data} locale={locale} />
    </>
  );
}
