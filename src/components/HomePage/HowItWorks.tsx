import { getTranslations } from "next-intl/server";
import { localized } from "@/sanity/lib/localize";
import type { HomePageQueryResult } from "@/sanity/queries/HomePage";

type Props = {
  data: HomePageQueryResult | null;
  locale: string;
};

const FALLBACK_STEPS = [
  {
    title: "Choose Your Style",
    description:
      "Pick your date, guest count, and venue preference in seconds.",
  },
  {
    title: "Customize Everything",
    description:
      "Select your menu, decor, photography, entertainment, and more.",
  },
  {
    title: "See Your Price",
    description:
      "Every choice updates your estimated total in real time — no surprises.",
  },
  {
    title: "Submit & We Plan",
    description: "Send us your configuration and our team takes it from there.",
  },
];

export default async function HowItWorks({ data, locale }: Props) {
  const t = await getTranslations("home.howItWorks");

  const steps = data?.howItWorksSteps?.length
    ? data.howItWorksSteps.map((s, i) => ({
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
      }))
    : FALLBACK_STEPS.map((s, i) => ({ key: String(i), number: i + 1, ...s }));

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t("heading")}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.key}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              {/* Number badge */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF4FC] text-sm font-bold text-[#5B9FD9]">
                {step.number}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#1A1A1A]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
