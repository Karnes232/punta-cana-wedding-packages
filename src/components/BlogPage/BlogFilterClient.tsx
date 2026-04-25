"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/lib/image";
import type { BlogArticlePreview } from "@/sanity/queries/Blog";

type Props = {
  articles: BlogArticlePreview[];
  locale: string;
  allLabel: string;
  readMoreLabel: string;
  noArticlesLabel: string;
};

export default function BlogFilterClient({
  articles,
  locale,
  allLabel,
  readMoreLabel,
  noArticlesLabel,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  // Derive unique categories from the articles already in memory
  const categories = useMemo(() => {
    const map = new Map<string, NonNullable<BlogArticlePreview["category"]>>();
    for (const article of articles) {
      if (article.category && !map.has(article.category.slug)) {
        map.set(article.category.slug, article.category);
      }
    }
    return Array.from(map.values());
  }, [articles]);

  const filtered = selected
    ? articles.filter((a) => a.category?.slug === selected)
    : articles;

  return (
    <>
      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="mb-10 -mx-6 px-6 py-2 flex gap-2 overflow-x-auto scrollbar-none sm:mx-0 sm:px-0 sm:flex-wrap">
          <button
            onClick={() => setSelected(null)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
              selected === null
                ? "bg-[#5B9FD9] text-white"
                : "bg-white text-[#555555] ring-1 ring-[#E5E5E5] hover:text-[#5B9FD9] hover:ring-[#5B9FD9]"
            }`}
          >
            {allLabel}
          </button>

          {categories.map((cat) => {
            const label =
              cat.title?.[locale as keyof typeof cat.title] ??
              cat.title?.en ??
              cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelected(cat.slug)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                  selected === cat.slug
                    ? "bg-[#5B9FD9] text-white"
                    : "bg-white text-[#555555] ring-1 ring-[#E5E5E5] hover:text-[#5B9FD9] hover:ring-[#5B9FD9]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Article grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-[#999999]">{noArticlesLabel}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => {
            const imageUrl = article.featuredImage?.asset
              ? urlFor(article.featuredImage.asset)
                  .width(720)
                  .height(405)
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

            const catLabel =
              article.category?.title?.[
                locale as keyof typeof article.category.title
              ] ?? article.category?.title?.en;

            return (
              <article
                key={article._id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F0F4F8]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={article.featuredImage?.alt ?? article.title ?? ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-xs text-[#AAAAAA]">No image</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  {catLabel && (
                    <span className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#5B9FD9]">
                      {catLabel}
                    </span>
                  )}

                  <h2 className="text-base font-semibold leading-snug text-[#1A1A1A] md:text-lg">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="transition-colors duration-200 hover:text-[#5B9FD9]"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  {article.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#666666]">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-4">
                    {formattedDate && (
                      <span className="text-xs text-[#AAAAAA]">
                        {formattedDate}
                      </span>
                    )}
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-xs font-semibold text-[#5B9FD9] transition-colors duration-200 hover:text-[#4A90E2]"
                    >
                      {readMoreLabel} →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
