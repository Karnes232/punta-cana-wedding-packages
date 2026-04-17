import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { localized } from "@/sanity/lib/localize";
import { urlFor } from "@/sanity/lib/image";
import type { HomePageQueryResult } from "@/sanity/queries/HomePage";

type Props = {
  data: HomePageQueryResult | null;
  locale: string;
};

export default async function Hero({ data, locale }: Props) {
  const t = await getTranslations("home.hero");

  const title =
    localized(data?.heroTitle, locale) ??
    "Design Your Dream Wedding in Punta Cana";
  const subtitle =
    localized(data?.heroSubtitle, locale) ??
    "Create your perfect destination wedding in minutes. Transparent pricing, real choices, zero stress.";

  const imageUrl = data?.heroImage?.asset
    ? urlFor(data.heroImage.asset)
        .width(900)
        .height(675)
        .fit("crop")
        .auto("format")
        .url()
    : null;
  const imageAlt =
    localized(data?.heroImage?.alt ?? null, locale) ??
    "Wedding ceremony on the beach in Punta Cana";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Text */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-5xl lg:text-[52px]">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#555555] md:text-xl">
              {subtitle}
            </p>
            <Link
              href="/wedding-calculator"
              className="mt-8 inline-flex items-center rounded-xl bg-[#5B9FD9] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
            >
              {t("cta")}
            </Link>
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
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F0F7FF]">
                <span className="text-sm text-[#999999]">Hero image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
