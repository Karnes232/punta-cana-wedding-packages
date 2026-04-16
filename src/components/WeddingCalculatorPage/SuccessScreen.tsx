'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function SuccessScreen() {
  const t = useTranslations('weddingCalculator.success')

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 text-center">
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#5B9FD9]/10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5B9FD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">{t('heading')}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#666666]">{t('sub')}</p>

      {/* Payment terms */}
      <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#EFEFEF] bg-[#FAFAFA] p-6 text-left">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#999999]">
          {t('paymentTerms')}
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-[#555555]">
            <span className="mt-0.5 text-[#5B9FD9]">1.</span>
            {t('deposit')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[#555555]">
            <span className="mt-0.5 text-[#5B9FD9]">2.</span>
            {t('balance30')}
          </li>
          <li className="flex items-start gap-3 text-sm text-[#555555]">
            <span className="mt-0.5 text-[#5B9FD9]">3.</span>
            {t('balance15')}
          </li>
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-xl border border-[#E0E0E0] px-6 py-3 text-sm font-medium text-[#555555] transition-colors duration-200 hover:bg-[#F8F8F8]"
        >
          {t('goHome')}
        </Link>
        <Link
          href="/stories"
          className="rounded-xl bg-[#5B9FD9] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2]"
        >
          {t('viewStories')}
        </Link>
      </div>
    </div>
  )
}
