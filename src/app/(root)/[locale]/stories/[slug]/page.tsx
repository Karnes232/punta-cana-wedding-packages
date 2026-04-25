import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { MAIN_LOCALES } from "@/i18n/routing";
import { getStoryBySlug, getAllStorySlugs } from "@/sanity/queries/StoriesPage";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import { getPageAlternates } from "@/lib/seoUrls";
import {
  StoryHero,
  StoryDetails,
  StoryTestimonial,
  StoryGallery,
  StoryBody,
  StoryCTA,
} from "@/components/StoryPage";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllStorySlugs();
  return MAIN_LOCALES.flatMap((locale) =>
    slugs.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};

  const coupleName = localized(story.coupleName, locale) ?? "";
  const excerpt = localized(story.excerpt, locale);

  const formattedDate = story.weddingDate
    ? new Date(story.weddingDate).toLocaleDateString(
        locale === "es" ? "es-DO" : "en-US",
        {
          month: "long",
          year: "numeric",
        },
      )
    : null;

  const title = [coupleName, formattedDate].filter(Boolean).join(" · ");
  const metaTitle =
    story.seoTitle ?? (title || "Wedding Story | Punta Cana Wedding Packages");
  const metaDescription = story.seoDescription ?? excerpt ?? undefined;

  // Prefer dedicated OG image; fall back to hero image
  const ogImageAsset = story.ogImage?.asset ?? story.heroImage?.asset ?? null;
  const ogImageUrl = ogImageAsset
    ? urlFor(ogImageAsset)
        .width(1200)
        .height(630)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: "article",
      title: metaTitle,
      description: metaDescription,
      publishedTime: story.publishedAt ?? undefined,
      ...(ogImageUrl && {
        images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    alternates: getPageAlternates(`/stories/${slug}`, locale),
  };
}

export default async function StoryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [story, t] = await Promise.all([
    getStoryBySlug(slug),
    getTranslations({ locale, namespace: "stories.detail" }),
  ]);

  if (!story) notFound();

  return (
    <>
      <StoryHero story={story} locale={locale} />

      {/* Back link */}
      <div className="mx-auto max-w-4xl px-6 pt-6">
        <Link
          href="/stories"
          className="text-sm font-medium text-[#5B9FD9] transition-colors duration-200 hover:text-[#4A90E2]"
        >
          {t("backToStories")}
        </Link>
      </div>

      <StoryDetails story={story} locale={locale} />
      <StoryTestimonial story={story} locale={locale} />
      <StoryGallery story={story} />
      <StoryBody story={story} locale={locale} />
      <StoryCTA locale={locale} />
    </>
  );
}
