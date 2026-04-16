import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getTermsOfService } from '@/sanity/queries/TermsOfService';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import TermsOfServiceContent from '@/components/TermsOfServicePage/TermsOfServiceContent';
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
  const seoDoc = await getPageSeo('terms-of-service');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);

  return {
    title: meta?.title ?? 'Terms of Service | Punta Cana Wedding Packages',
    description: meta?.description ?? 'Terms and conditions for our wedding planning services.',
    robots: {
      index: !(seoDoc?.seo?.noIndex ?? false),
      follow: !(seoDoc?.seo?.noFollow ?? false),
    },
  };
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getTermsOfService(), getPageSeo('terms-of-service')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <TermsOfServiceContent data={data} locale={locale} />
    </>
  );
}
