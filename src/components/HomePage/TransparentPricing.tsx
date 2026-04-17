import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localized } from "@/sanity/lib/localize";
import type { HomePageQueryResult } from "@/sanity/queries/HomePage";

type Props = {
  data: HomePageQueryResult | null;
  locale: string;
};

export default async function TransparentPricing({ data, locale }: Props) {
  const t = await getTranslations("home.pricing");

  const startingFrom = data?.pricingStartingFrom ?? 4100;
  const description =
    localized(data?.pricingDescription, locale) ??
    "Every element — menu, decor, photography, entertainment — is priced upfront. Build your wedding and see exactly what it costs before you commit to anything.";

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(startingFrom);

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t("heading")}
        </h2>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-[0.1em] text-[#999999]">
            {t("startingFrom")}
          </p>
          <p className="mt-1 text-6xl font-bold tracking-tight text-[#5B9FD9] md:text-7xl">
            {formatted}
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#555555]">
          {description}
        </p>

        <Link
          href="/wedding-calculator"
          className="mt-8 inline-flex items-center rounded-xl bg-[#5B9FD9] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
