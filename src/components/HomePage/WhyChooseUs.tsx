import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { localized } from '@/sanity/lib/localize';
import { urlFor } from '@/sanity/lib/image';
import type { HomePageQueryResult } from '@/sanity/queries/HomePage';

type Props = {
  data: HomePageQueryResult | null;
  locale: string;
};

const FALLBACK_POINTS = [
  'Fixed venue at Cabeza de Toro — a stunning beachfront location',
  'Predetermined pricing — no hidden fees or last-minute surprises',
  'Dedicated wedding coordinator from first inquiry to the big day',
  'Available 7 days a week via WhatsApp, email, and video call',
  'Full legal paperwork handled for you in the Dominican Republic',
];

export default async function WhyChooseUs({ data, locale }: Props) {
  const t = await getTranslations('home.whyUs');

  const title =
    localized(data?.whyTitle, locale) ?? t('heading');

  const points =
    data?.whyPoints?.length
      ? data.whyPoints.map((p) => localized(p, locale) ?? localized(p, 'en') ?? '')
      : FALLBACK_POINTS;

  const photoUrl = data?.whyTeamPhoto?.asset
    ? urlFor(data.whyTeamPhoto.asset)
        .width(700)
        .height(840)
        .fit('crop')
        .auto('format')
        .url()
    : null;
  const photoAlt = data?.whyTeamPhoto?.alt ?? 'Our wedding coordination team';

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Photo */}
          <div className="relative aspect-[5/6] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#F0F7FF]">
                <span className="text-sm text-[#999999]">Team photo</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
              {title}
            </h2>
            <ul className="mt-8 space-y-4">
              {points.filter(Boolean).map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EBF4FC]">
                    <Check className="h-3 w-3 text-[#5B9FD9]" strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-relaxed text-[#444444]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
