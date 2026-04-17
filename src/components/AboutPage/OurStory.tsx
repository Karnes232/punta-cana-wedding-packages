import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { AboutPageQueryResult } from "@/sanity/queries/AboutPage";

type Props = {
  data: AboutPageQueryResult | null;
  locale: string;
};

export default async function OurStory({ data, locale }: Props) {
  const t = await getTranslations("about.story");

  const heading = localized(data?.storyTitle, locale) ?? t("heading");

  // storyContent is { en: block[], es: block[] } — pick the right locale
  const rawContent = data?.storyContent;
  const content = rawContent
    ? ((rawContent as Record<string, unknown>)[locale] ??
      (rawContent as Record<string, unknown>)["en"] ??
      null)
    : null;

  const imageUrl = data?.storyImage?.asset
    ? urlFor(data.storyImage.asset)
        .width(800)
        .height(600)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const imageAlt = data?.storyImage?.alt ?? "Our story";

  const hasContent = content && Array.isArray(content) && content.length > 0;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
              {heading}
            </h2>
            <div className="prose prose-base mt-6 max-w-none text-[#444444] [&_p]:leading-relaxed [&_p]:text-[#444444] [&_strong]:text-[#1A1A1A]">
              {hasContent ? (
                <PortableText
                  value={content as Parameters<typeof PortableText>[0]["value"]}
                />
              ) : (
                <>
                  <p>
                    We started Punta Cana Wedding Packages with a simple belief:
                    planning a destination wedding should feel exciting — not
                    overwhelming. Too many couples spent months chasing quotes,
                    coordinating vendors, and managing uncertainty. We built a
                    better way.
                  </p>
                  <p>
                    Based at the stunning Cabeza de Toro beach, our team brings
                    years of experience in destination weddings together with a
                    transparent, technology-driven planning process. Every
                    couple deserves to see exactly what their wedding costs
                    before they commit to anything.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F0F7FF]">
                <span className="text-sm text-[#999999]">Story image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
