import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { MAIN_LOCALES } from '@/i18n/routing';
import { getContactPage } from '@/sanity/queries/ContactPage';
import { getPageSeo, pickLocale } from '@/sanity/queries/SEO';
import { ContactHero, ContactSection } from '@/components/ContactPage';
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
  const seoDoc = await getPageSeo('contact');
  const meta = pickLocale(seoDoc?.seo?.meta, locale);
  const og = pickLocale(seoDoc?.seo?.openGraph, locale);

  return {
    title: meta?.title ?? 'Contact | Punta Cana Wedding Packages',
    description: meta?.description ?? "Get in touch with our wedding planning team.",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([getContactPage(), getPageSeo('contact')]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <ContactHero data={data} locale={locale} />
      <ContactSection data={data} locale={locale} />
    </>
  );
}
