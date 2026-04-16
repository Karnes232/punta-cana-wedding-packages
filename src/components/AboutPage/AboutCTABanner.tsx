import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function AboutCTABanner() {
  const t = await getTranslations('about.cta');

  return (
    <section className="bg-[#F0F7FF] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t('heading')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#555555]">
          {t('sub')}
        </p>
        <Link
          href="/wedding-calculator"
          className="mt-8 inline-flex items-center rounded-xl bg-[#5B9FD9] px-10 py-4 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
        >
          {t('button')}
        </Link>
        <div className="mt-4">
          <Link
            href="/contact"
            className="text-sm text-[#5B9FD9] transition-colors duration-200 hover:text-[#4A90E2]"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
