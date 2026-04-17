import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { WeddingStoryFull } from "@/sanity/queries/StoriesPage";

type Props = { story: NonNullable<WeddingStoryFull> };

export default function StoryGallery({ story }: Props) {
  const photos = story.gallery ?? [];
  if (photos.length === 0) return null;

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map((photo, i) => {
            if (!photo.asset) return null;
            const url = urlFor(photo.asset)
              .width(800)
              .height(600)
              .fit("crop")
              .auto("format")
              .url();
            return (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl bg-[#F5F1E8] ${
                  i === 0
                    ? "col-span-2 aspect-[16/9] md:col-span-2"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={url}
                  alt={photo.alt ?? `Wedding photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
