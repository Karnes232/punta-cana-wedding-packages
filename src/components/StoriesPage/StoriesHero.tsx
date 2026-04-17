import { getTranslations } from "next-intl/server";

export default async function StoriesHero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "stories.hero" });

  return (
    <section className="bg-white px-6 pb-12 pt-16 text-center md:pb-16 md:pt-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-[#8BA8A0]">
          Punta Cana Weddings
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#666666]">
          {t("sub")}
        </p>
      </div>
    </section>
  );
}
