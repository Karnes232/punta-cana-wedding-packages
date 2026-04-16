import { getTranslations } from 'next-intl/server'
import { localized } from '@/sanity/lib/localize'
import type { WeddingStoryFull } from '@/sanity/queries/StoriesPage'

type Props = { story: NonNullable<WeddingStoryFull>; locale: string }

export default async function StoryDetails({ story, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'stories.detail' })
  const budgetRange = localized(story.budgetRange, locale)

  if (!story.guestCount && !budgetRange) return null

  return (
    <div className="mx-auto max-w-4xl px-6 pt-8">
      <div className="flex flex-wrap gap-3">
        {story.guestCount && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium text-[#444444]">
            <svg className="h-4 w-4 text-[#8BA8A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('guestCount', { count: story.guestCount })}
          </span>
        )}
        {budgetRange && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium text-[#444444]">
            <svg className="h-4 w-4 text-[#8BA8A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {budgetRange}
          </span>
        )}
      </div>
    </div>
  )
}
