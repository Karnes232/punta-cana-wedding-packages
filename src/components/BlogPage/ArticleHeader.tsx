import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { BlogArticleFull } from "@/sanity/queries/Blog";

type Props = {
  article: NonNullable<BlogArticleFull>;
  locale: string;
};

export default async function ArticleHeader({ article, locale }: Props) {
  const t = await getTranslations("blog");
  const isRtl = locale === "ar";

  const imageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage.asset)
        .width(1400)
        .height(560)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <header id="article-hero" className="bg-white py-16 md:py-20" dir={isRtl ? "rtl" : undefined}>
      <div className="mx-auto max-w-3xl px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-[#5B9FD9] transition-colors duration-200 hover:text-[#4A90E2]"
        >
          {isRtl ? "→" : "←"} {t("backToBlog")}
        </Link>

        {/* Category */}
        {article.category?.title && (
          <span className="mb-4 block text-[10px] font-semibold uppercase tracking-widest text-[#5B9FD9]">
            {article.category.title[locale as keyof typeof article.category.title] as string ?? article.category.title.en}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-4xl">
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#888888]">
          {formattedDate && (
            <span>
              {t("publishedOn")} {formattedDate}
            </span>
          )}
    
        </div>
      </div>

      {/* Featured image */}
      {imageUrl && (
        <div className="mx-auto mt-10 max-w-7xl px-6">
          <div className="relative aspect-[16/6] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alt ?? article.title ?? ""}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}
    </header>
  );
}
