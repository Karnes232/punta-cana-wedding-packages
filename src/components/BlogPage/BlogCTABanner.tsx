import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import BlogCTASidebarClient from './BlogCTASidebarClient'

export default async function BlogCTABanner() {
  const t = await getTranslations('blog.cta')

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

      {/* Desktop — fixed card, fades in after the hero image scrolls past */}
      <BlogCTASidebarClient
        heading={t('heading')}
        sub={t('sub')}
        button={t('button')}
      />
    </>
  )
}
