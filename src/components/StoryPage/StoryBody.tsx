import { PortableText } from '@portabletext/react'
import type { WeddingStoryFull } from '@/sanity/queries/StoriesPage'
import type { PortableTextBlock } from '@portabletext/types'

type Props = { story: NonNullable<WeddingStoryFull>; locale: string }

export default function StoryBody({ story, locale }: Props) {
  const rawBody = story.body
  if (!rawBody) return null

  const content =
    (rawBody as Record<string, unknown>)[locale] ??
    rawBody.en ??
    null

  if (!content || !Array.isArray(content) || content.length === 0) return null

  return (
    <section className="px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="prose prose-base prose-neutral max-w-none [&_p]:leading-relaxed [&_p]:text-[#444444] [&_h2]:text-[#1A1A1A] [&_h3]:text-[#1A1A1A]">
          <PortableText value={content as PortableTextBlock[]} />
        </div>
      </div>
    </section>
  )
}
