import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { HomePageQueryResult } from "@/sanity/queries/HomePage";

type Props = {
  data: HomePageQueryResult | null;
};

export default async function CustomizeSection({ data }: Props) {
  const t = await getTranslations("home.customize");

  const images = data?.galleryImages ?? [];

  // Mosaic layout: first image is large (spans 2 rows), rest fill right column
  const [first, ...rest] = images;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t("heading")}
        </h2>

        {images.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {/* Large feature image */}
            {first && (
              <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl md:col-span-1 md:row-span-2 aspect-[3/4]">
                <Image
                  src={urlFor(first.asset)
                    .width(600)
                    .height(800)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={first.alt ?? "Wedding detail"}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            {/* Remaining images */}
            {rest.slice(0, 4).map((img) => (
              <div
                key={img._key}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={urlFor(img.asset)
                    .width(400)
                    .height(400)
                    .fit("crop")
                    .auto("format")
                    .url()}
                  alt={img.alt ?? "Wedding detail"}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder grid when no images are uploaded yet */
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl bg-[#F5F5F5] ${
                  i === 0 ? "aspect-[3/4] row-span-2" : "aspect-square"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
