'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex flex-col items-center justify-center px-6 py-32 text-center">

      {/* Decorative wave */}
      <div className="mb-10 text-[#D0E8F5]" aria-hidden="true">
        <svg
          width="120"
          height="48"
          viewBox="0 0 120 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24 C20 8, 40 40, 60 24 C80 8, 100 40, 120 24"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M0 36 C20 20, 40 48, 60 36 C80 20, 100 48, 120 36"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 404 number */}
      <p className="text-8xl font-bold tracking-tight text-[#5B9FD9] sm:text-9xl">
        {t('code')}
      </p>

      {/* Heading */}
      <h1 className="mt-6 text-2xl font-semibold text-[#1A1A1A] sm:text-3xl">
        {t('heading')}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 max-w-sm text-base leading-relaxed text-[#666666]">
        {t('sub')}
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl border border-[#E0E0E0] bg-white px-7 py-3 text-sm font-medium text-[#444444] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9]"
        >
          {t('goHome')}
        </Link>

        <Link
          href="/wedding-calculator"
          className="rounded-xl bg-[#5B9FD9] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#4A90E2]"
        >
          {t('startPlanning')}
        </Link>
      </div>

    </section>
  );
}
