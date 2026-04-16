import Image from 'next/image';
import { localized } from '@/sanity/lib/localize';
import { urlFor } from '@/sanity/lib/image';
import type { AboutPageQueryResult } from '@/sanity/queries/AboutPage';

type Props = {
  data: AboutPageQueryResult | null;
  locale: string;
};

export default async function AboutHero({ data, locale }: Props) {
  const title =
    localized(data?.heroTitle, locale) ?? 'The Team Behind Your Dream Wedding';
  const subtitle =
    localized(data?.heroSubtitle, locale) ??
    'We are a dedicated team of wedding specialists based in Punta Cana, passionate about creating unforgettable moments for couples from around the world.';

  const imageUrl = data?.heroImage?.asset
    ? urlFor(data.heroImage.asset)
        .width(1400)
        .height(560)
        .fit('crop')
        .auto('format')
        .url()
    : null;
  const imageAlt = data?.heroImage?.alt ?? 'Our wedding team in Punta Cana';

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Text — always centered */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#555555]">
            {subtitle}
          </p>
        </div>

        {/* Optional full-width hero image */}
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
