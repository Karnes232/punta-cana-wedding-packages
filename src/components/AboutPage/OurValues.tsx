import { getTranslations } from "next-intl/server";
import { localized } from "@/sanity/lib/localize";
import type { AboutPageQueryResult } from "@/sanity/queries/AboutPage";

type Props = {
  data: AboutPageQueryResult | null;
  locale: string;
};

const FALLBACK_VALUES = [
  {
    title: "Transparency",
    description:
      "Every price is visible before you commit. No hidden fees, no surprise invoices — just honest, upfront costs.",
  },
  {
    title: "Simplicity",
    description:
      "We built our platform so that planning a wedding takes minutes, not months. Simple tools, clear process.",
  },
  {
    title: "Elegance",
    description:
      "Beautiful weddings are our craft. We obsess over every detail so your day looks and feels extraordinary.",
  },
  {
    title: "Dedication",
    description:
      "From your first inquiry to the last dance, our team is with you every step — 7 days a week.",
  },
];

export default async function OurValues({ data, locale }: Props) {
  const t = await getTranslations("about.values");

  const heading = localized(data?.valuesTitle, locale) ?? t("heading");

  const values = data?.values?.length
    ? data.values.map((v, i) => ({
        key: v._key,
        title: localized(v.title, locale) ?? FALLBACK_VALUES[i]?.title ?? "",
        description:
          localized(v.description, locale) ??
          FALLBACK_VALUES[i]?.description ??
          "",
      }))
    : FALLBACK_VALUES.map((v, i) => ({ key: String(i), ...v }));

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.key}
              className="rounded-2xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                {value.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#555555]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
