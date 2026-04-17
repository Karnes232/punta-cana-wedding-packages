import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { HowItWorksPageQueryResult } from "@/sanity/queries/HowItWorksPage";

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

const FALLBACK_POINTS = [
  "No brokers, no middlemen — you speak directly with your coordinator",
  "Pricing is fixed and visible before you commit to anything",
  "Build your full wedding configuration in under 15 minutes",
  "Our team is reachable 7 days a week via WhatsApp, email, or video call",
];

export default async function WhyItWorks({ data, locale }: Props) {
  const t = await getTranslations("howItWorks.why");

  const heading = localized(data?.whyTitle, locale) ?? t("heading");
  const body =
    localized(data?.whyBody, locale) ??
    "Modern couples are busy. They want clarity, not confusion — and they want to feel in control without being overwhelmed. Our process was built from scratch to respect your time, your budget, and your vision. Every tool, every step, every interaction is designed to feel simple and reassuring.";

  const points = data?.whyPoints?.length
    ? data.whyPoints.map((p, i) => ({
        key: p._key,
        text:
          (locale !== "en" ? p[locale as "es"] : null) ??
          p.en ??
          FALLBACK_POINTS[i] ??
          "",
      }))
    : FALLBACK_POINTS.map((text, i) => ({ key: String(i), text }));

  const imageUrl = data?.whyImage?.asset
    ? urlFor(data.whyImage.asset)
        .width(800)
        .height(600)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const imageAlt = data?.whyImage?.alt ?? "Happy couple planning their wedding";

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Text side */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#555555]">
              {body}
            </p>

            <ul className="mt-8 space-y-4">
              {points.map((point) => (
                <li key={point.key} className="flex items-start gap-3">
                  {/* Check icon */}
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF4FC]">
                    <svg
                      className="h-3 w-3 text-[#5B9FD9]"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-[#444444]">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image side */}
          {imageUrl ? (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : (
            /* Placeholder block when no image uploaded yet */
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-[#EBF4FC]">
              <span className="text-sm text-[#5B9FD9]">
                Upload image via Sanity Studio
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
