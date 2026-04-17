import { getTranslations } from "next-intl/server";

type Props = { locale: string };

export default async function CalculatorHero({ locale }: Props) {
  const t = await getTranslations({
    locale,
    namespace: "weddingCalculator.hero",
  });

  return (
    <section className="border-b border-[#EFEFEF] bg-[#FAFAFA] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[#666666]">
          {t("sub")}
        </p>
      </div>
    </section>
  );
}
