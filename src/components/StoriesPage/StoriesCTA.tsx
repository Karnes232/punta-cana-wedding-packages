import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export default async function StoriesCTA({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'stories.cta' })

  return (
    <section className="bg-[#F0F4F8] px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {t('heading')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#555555]">
          {t('sub')}
        </p>
        <Link
          href="/wedding-calculator"
          className="mt-8 inline-block rounded-xl bg-[#5B9FD9] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4A90E2]"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  )
}
