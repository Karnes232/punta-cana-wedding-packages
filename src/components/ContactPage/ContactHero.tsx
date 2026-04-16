import Image from 'next/image';
import { localized } from '@/sanity/lib/localize';
import { urlFor } from '@/sanity/lib/image';
import type { ContactPageQueryResult } from '@/sanity/queries/ContactPage';

type Props = {
  data: ContactPageQueryResult;
  locale: string;
};

export default function ContactHero({ data, locale }: Props) {
  const title =
    localized(data?.heroTitle, locale) ?? "Let's Plan Your Dream Wedding";
  const subtitle =
    localized(data?.heroSubtitle, locale) ??
    'We are here to help you every step of the way. Reach out and we will get back to you within 24 hours.';

  const imageUrl = data?.heroImage?.asset
    ? urlFor(data.heroImage.asset).width(1400).height(560).fit('crop').auto('format').url()
    : null;
  const imageAlt = data?.heroImage?.alt ?? 'Contact Punta Cana Wedding Packages';

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#555555]">{subtitle}</p>
        </div>

        {imageUrl && (
          <div className="relative mt-12 aspect-[16/6] w-full overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
