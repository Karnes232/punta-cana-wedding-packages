import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MAIN_LOCALES } from "@/i18n/routing";
import { getAboutPage } from "@/sanity/queries/AboutPage";
import { getPageSeo, pickLocale } from "@/sanity/queries/SEO";
import {
  AboutHero,
  OurStory,
  TheVenue,
  OurTeam,
  OurValues,
  AboutCTABanner,
} from "@/components/AboutPage";
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
  const seoDoc = await getPageSeo("about");
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [data, seoDoc] = await Promise.all([
    getAboutPage(),
    getPageSeo("about"),
  ]);
  const jsonLd = pickLocale(seoDoc?.seo?.structuredData, locale);

  return (
    <>
      <SeoJsonLd json={jsonLd} />
      <AboutHero data={data} locale={locale} />
      <OurStory data={data} locale={locale} />
      <TheVenue data={data} locale={locale} />
      <OurTeam data={data} locale={locale} />
      <OurValues data={data} locale={locale} />
      <AboutCTABanner />
    </>
  );
}
