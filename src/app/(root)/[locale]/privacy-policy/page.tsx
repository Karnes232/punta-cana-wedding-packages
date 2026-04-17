import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MAIN_LOCALES } from "@/i18n/routing";
import { getPrivacyPolicy } from "@/sanity/queries/PrivacyPolicy";
import { getPageSeo, pickLocale } from "@/sanity/queries/SEO";
import PrivacyPolicyContent from "@/components/PrivacyPolicyPage/PrivacyPolicyContent";
import SeoJsonLd from "@/components/SeoJsonLd";
import { urlFor } from "@/sanity/lib/image";

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoDoc = await getPageSeo("privacy-policy");
  const meta = pickLocale(seoDoc?.seo?.meta, locale);
  const og = pickLocale(seoDoc?.seo?.openGraph, locale);

  const ogImageAsset = seoDoc?.seo?.openGraph?.image?.asset ?? null;
  const ogImageUrl = ogImageAsset
    ? urlFor(ogImageAsset)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title: meta?.title ?? undefined,
    description: meta?.description ?? undefined,
    keywords: meta?.keywords ?? undefined,
    robots: {
      index: !(seoDoc?.seo?.noIndex ?? false),
      follow: !(seoDoc?.seo?.noFollow ?? false),
    },
    openGraph: {
      type: "website",
      title: og?.title ?? meta?.title ?? undefined,
      description: og?.description ?? meta?.description ?? undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: og?.title ?? meta?.title ?? undefined,
      description: og?.description ?? meta?.description ?? undefined,
      ...(ogImageUrl && { images: [ogImageUrl] }),
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

  const [data, seoDoc] = await Promise.all([
    getPrivacyPolicy(),
    getPageSeo("privacy-policy"),
  ]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <PrivacyPolicyContent data={data} locale={locale} />
    </>
  );
}
