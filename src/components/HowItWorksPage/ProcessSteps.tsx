import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { HowItWorksPageQueryResult } from "@/sanity/queries/HowItWorksPage";

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

const FALLBACK_STEPS = [
  {
    title: "Design Your Wedding",
    description:
      "Open the wedding builder and walk through each element — guests, menu, drinks, decor, photography, and more.",
  },
  {
    title: "Get Your Estimate",
    description:
      "Every choice updates your total in real time. See a full price breakdown before committing to anything.",
  },
  {
    title: "Submit Your Request",
    description:
      "When you're happy with your configuration, submit it. Your full wedding plan lands directly in our team's inbox.",
  },
  {
    title: "We Plan Together",
    description:
      "A dedicated coordinator contacts you within 24 hours to confirm details, answer questions, and lock in your date.",
  },
];

export default async function ProcessSteps({ data, locale }: Props) {
  const t = await getTranslations("howItWorks.process");
  const heading = localized(data?.processTitle, locale) ?? t("heading");

  const steps = data?.processSteps?.length
    ? data.processSteps.map((s, i) => ({
        key: s._key,
        number: i + 1,
        title:
          localized(s.title, locale) ??
          FALLBACK_STEPS[i]?.title ??
          `Step ${i + 1}`,
        description:
          localized(s.description, locale) ??
          FALLBACK_STEPS[i]?.description ??
          "",
        imageUrl: s.image?.asset
          ? urlFor(s.image.asset)
              .width(720)
              .height(405)
              .fit("crop")
              .auto("format")
              .url()
          : null,
        imageAlt: s.image?.alt ?? "",
      }))
    : FALLBACK_STEPS.map((s, i) => ({
        key: String(i),
        number: i + 1,
        imageUrl: null,
        imageAlt: "",
        ...s,
      }));

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.key}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              {/* Optional illustration */}
              {step.imageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={step.imageUrl}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-col p-6">
                {/* Number badge */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF4FC] text-sm font-bold text-[#5B9FD9]">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
