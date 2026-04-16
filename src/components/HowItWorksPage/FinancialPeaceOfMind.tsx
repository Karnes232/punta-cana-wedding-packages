import { getTranslations } from 'next-intl/server';
import { localized } from '@/sanity/lib/localize';
import type { HowItWorksPageQueryResult } from '@/sanity/queries/HowItWorksPage';

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

export default async function FinancialPeaceOfMind({ data, locale }: Props) {
  const t = await getTranslations('howItWorks.payment');

  const heading = localized(data?.paymentTitle, locale) ?? t('heading');
  const depositAmount = data?.depositAmount ?? 500;

  const depositDescription =
    localized(data?.depositDescription, locale) ??
    'Your $500 deposit is fully deductible from your total wedding cost. If your plans change, we offer a full refund up to 90 days before your event.';

  const paymentScheduleNote =
    localized(data?.paymentScheduleNote, locale) ??
    '50% of your remaining balance is due 30 days before the wedding. The final 50% is due 15 days before. No lump-sum surprises — just two predictable installments.';

  const flexibilityNote =
    localized(data?.flexibilityNote, locale) ??
    'Need to shift your date? We allow one free date change up to 6 months in advance, subject to venue availability. Your deposit carries over automatically.';

  const advanceBookingNote =
    localized(data?.advanceBookingNote, locale) ??
    'Securing your date early costs you nothing extra. Book now for 2026 or 2027 — your deposit holds your slot while you continue planning at your own pace.';

  const stats = [
    {
      key: 'deposit',
      label: t('deposit'),
      value: `$${depositAmount.toLocaleString()}`,
      description: 'Fully refundable',
    },
    {
      key: 'balance30',
      label: t('balance30'),
      value: '50%',
      description: 'Of remaining balance',
    },
    {
      key: 'remaining',
      label: t('remaining'),
      value: '50%',
      description: 'Due 15 days before',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>

        {/* Stat strip */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="flex flex-col items-center rounded-2xl border border-[#E8F0F7] bg-[#F6FAFE] px-6 py-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.04)]"
            >
              <span className="text-3xl font-bold text-[#5B9FD9] md:text-4xl">{stat.value}</span>
              <span className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#1A1A1A]">
                {stat.label}
              </span>
              <span className="mt-1 text-xs text-[#888888]">{stat.description}</span>
            </div>
          ))}
        </div>

        {/* Detail blocks */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-[#FAFAFA] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-semibold text-[#1A1A1A]">Deposit &amp; Payment Schedule</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555555]">{depositDescription}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#555555]">{paymentScheduleNote}</p>
          </div>

          <div className="rounded-2xl bg-[#FAFAFA] p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <h3 className="text-base font-semibold text-[#1A1A1A]">Flexibility &amp; Advance Booking</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#555555]">{flexibilityNote}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#555555]">{advanceBookingNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
