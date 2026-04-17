import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MAIN_LOCALES } from "@/i18n/routing";
import {
  getCalculatorData,
  localizePricing,
} from "@/sanity/queries/WeddingCalculator/getCalculatorData";
import { getPageSeo, pickLocale } from "@/sanity/queries/SEO";
import { getPageAlternates } from "@/lib/seoUrls";
import { urlFor } from "@/sanity/lib/image";
import {
  CalculatorHero,
  CalculatorContainer,
} from "@/components/WeddingCalculatorPage";

export const revalidate = 3600;

export function generateStaticParams() {
  return MAIN_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seoDoc = await getPageSeo("wedding-calculator");
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
    alternates: getPageAlternates("/wedding-calculator", locale),
  };
}

export default async function WeddingCalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [raw, seoDoc] = await Promise.all([
    getCalculatorData(),
    getPageSeo("wedding-calculator"),
  ]);
  const data = localizePricing(raw, locale);
  const structuredData = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <CalculatorHero locale={locale} />
      <CalculatorContainer data={data} locale={locale} />
    </>
  );
}
