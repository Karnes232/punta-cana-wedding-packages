import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Check } from "lucide-react";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { AboutPageQueryResult } from "@/sanity/queries/AboutPage";

type Props = {
  data: AboutPageQueryResult | null;
  locale: string;
};

const FALLBACK_HIGHLIGHTS = [
  "Beachfront ceremony location with breathtaking ocean views",
  "Capacity for intimate gatherings to grand celebrations of 200+ guests",
  "Fully equipped with professional sound, lighting, and staging",
  "Exclusive vendor access for catering, florals, and entertainment",
  "On-site coordination team available throughout your event",
];

export default async function TheVenue({ data, locale }: Props) {
  const t = await getTranslations("about.venue");

  const heading = localized(data?.venueTitle, locale) ?? t("heading");
  const description =
    localized(data?.venueDescription, locale) ??
    "Cabeza de Toro is one of Punta Cana's most spectacular beachfront locations. Nestled between swaying palms and the turquoise Caribbean Sea, it provides the perfect backdrop for the wedding of your dreams. Whether you envision an intimate ceremony for 20 guests or a grand celebration for 200, this venue adapts beautifully to every vision.";

  const highlights = data?.venueHighlights?.length
    ? data.venueHighlights.map(
        (h) => localized(h, locale) ?? localized(h, "en") ?? "",
      )
    : FALLBACK_HIGHLIGHTS;

  const imageUrl = data?.venueImage?.asset
    ? urlFor(data.venueImage.asset)
        .width(800)
        .height(960)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const imageAlt = data?.venueImage?.alt ?? "Cabeza de Toro beachfront venue";

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#EBF4FC]">
                <span className="text-sm text-[#999999]">Venue image</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
              {heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#555555]">
              {description}
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.filter(Boolean).map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF4FC]">
                    <Check
                      className="h-3 w-3 text-[#5B9FD9]"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span className="text-base leading-relaxed text-[#444444]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
