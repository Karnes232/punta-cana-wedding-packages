import { localized } from "@/sanity/lib/localize";
import type { HowItWorksPageQueryResult } from "@/sanity/queries/HowItWorksPage";

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

export default async function FinancialPeaceOfMind({ data, locale }: Props) {
  const heading = localized(data?.paymentTitle, locale);

  const depositScheduleTitle = localized(data?.depositScheduleTitle, locale);
  const depositDescription = localized(data?.depositDescription, locale);
  const paymentScheduleNote = localized(data?.paymentScheduleNote, locale);
  const flexibilityTitle = localized(data?.flexibilityTitle, locale);
  const flexibilityNote = localized(data?.flexibilityNote, locale);
  const advanceBookingNote = localized(data?.advanceBookingNote, locale);

  const stats = (data?.paymentStats ?? []).map((stat) => ({
    key: stat._key,
    label: localized(stat.label, locale) ?? "",
    value: localized(stat.value, locale) ?? "",
    description: localized(stat.description, locale) ?? "",
  }));

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>

        {/* Stat strip */}
        {stats.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="flex flex-col items-center rounded-2xl border border-[#E8F0F7] bg-[#F6FAFE] px-6 py-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
              >
                <span className="text-3xl font-bold text-[#5B9FD9] md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs text-[#888888]">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Detail blocks */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-[#FAFAFA] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-semibold text-[#1A1A1A]">
              {depositScheduleTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555555]">
              {depositDescription}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#555555]">
              {paymentScheduleNote}
            </p>
          </div>

          <div className="rounded-2xl bg-[#FAFAFA] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-semibold text-[#1A1A1A]">
              {flexibilityTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555555]">
              {flexibilityNote}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#555555]">
              {advanceBookingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
