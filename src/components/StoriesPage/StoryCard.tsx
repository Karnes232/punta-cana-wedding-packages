import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { WeddingStoryPreview } from "@/sanity/queries/StoriesPage";

type Props = {
  story: WeddingStoryPreview;
  locale: string;
  readStoryLabel: string;
};

export default function StoryCard({ story, locale, readStoryLabel }: Props) {
  const coupleName = localized(story.coupleName, locale) ?? "Unknown Couple";
  const excerpt = localized(story.excerpt, locale);

  const imageUrl = story.heroImage?.asset
    ? urlFor(story.heroImage.asset)
        .width(800)
        .height(560)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const formattedDate = story.weddingDate
    ? new Date(story.weddingDate).toLocaleDateString(
        locale === "es" ? "es-DO" : "en-US",
        {
          month: "long",
          year: "numeric",
        },
      )
    : null;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1E8]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={story.heroImage?.alt ?? coupleName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#C8C8C8]">
            <svg
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">{coupleName}</h2>
          {formattedDate && (
            <span className="shrink-0 text-xs text-[#999999]">
              {formattedDate}
            </span>
          )}
        </div>

        {excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#666666]">
            {excerpt}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#5B9FD9] transition-colors duration-200 group-hover:text-[#4A90E2]">
          {readStoryLabel}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
