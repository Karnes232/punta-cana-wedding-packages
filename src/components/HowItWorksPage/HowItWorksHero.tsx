import Image from "next/image";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { HowItWorksPageQueryResult } from "@/sanity/queries/HowItWorksPage";

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

export default async function HowItWorksHero({ data, locale }: Props) {
  const title =
    localized(data?.heroTitle, locale) ?? "The Path to Your Perfect Wedding";
  const subtitle =
    localized(data?.heroSubtitle, locale) ??
    "Our simple, guided process takes you from first idea to final plan in minutes. No back-and-forth, no waiting for quotes — just clarity from the start.";

  const imageUrl = data?.heroImage?.asset
    ? urlFor(data.heroImage.asset)
        .width(1400)
        .height(560)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const imageAlt = data?.heroImage?.alt ?? "Wedding planning process";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#555555]">
            {subtitle}
          </p>
        </div>

        {imageUrl && (
          <div className="relative mt-12 aspect-[16/6] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
