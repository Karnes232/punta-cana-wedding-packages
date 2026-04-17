import { getTranslations } from 'next-intl/server'
import type { BlogArticlePreview } from '@/sanity/queries/Blog'
import BlogFilterClient from './BlogFilterClient'

type Props = {
  articles: BlogArticlePreview[]
  locale: string
}

export default async function ArticleGrid({ articles, locale }: Props) {
  const t = await getTranslations('blog')

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <BlogFilterClient
          articles={articles}
          locale={locale}
          allLabel={t('filterAll')}
          readMoreLabel={t('readMore')}
          noArticlesLabel={t('noArticles')}
        />
      </div>
    </section>
  )
}
