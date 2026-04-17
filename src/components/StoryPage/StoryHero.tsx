import Image from "next/image";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { WeddingStoryFull } from "@/sanity/queries/StoriesPage";

type Props = { story: NonNullable<WeddingStoryFull>; locale: string };

export default function StoryHero({ story, locale }: Props) {
  const coupleName = localized(story.coupleName, locale) ?? "";

  const imageUrl = story.heroImage?.asset
    ? urlFor(story.heroImage.asset)
        .width(1600)
        .height(800)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  const formattedDate = story.weddingDate
    ? new Date(story.weddingDate).toLocaleDateString(
        locale === "es" ? "es-DO" : "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        },
      )
    : null;

  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-[#F5F1E8]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={story.heroImage?.alt ?? coupleName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold drop-shadow-sm md:text-5xl">
            {coupleName}
          </h1>
          {formattedDate && (
            <p className="mt-2 text-sm font-medium text-white/80 md:text-base">
              {formattedDate}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
