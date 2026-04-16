import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function BlogCTABanner() {
  const t = await getTranslations('blog.cta');

  return (
    <>
      {/* Mobile / tablet — full-width bottom section */}
      <section className="bg-[#F0F7FF] py-16 md:py-20 xl:hidden">
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
        </div>
      </section>

      {/* Desktop — sticky card fixed to the right of the article column */}
      <div className="fixed top-1/2 z-40 hidden w-64 -translate-y-1/2 xl:block" style={{ left: 'calc(50% + 24rem + 2rem)' }}>
        <div className="rounded-2xl bg-white p-6 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          {/* Decorative accent */}
          <div className="mb-4 h-1 w-10 rounded-full bg-[#5B9FD9]" />

          <h3 className="text-base font-semibold leading-snug text-[#1A1A1A]">
            {t('heading')}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#777777]">
            {t('sub')}
          </p>
          <Link
            href="/wedding-calculator"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#5B9FD9] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
          >
            {t('button')}
          </Link>
        </div>
      </div>
    </>
  );
}
