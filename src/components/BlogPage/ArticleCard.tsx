import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { urlFor } from '@/sanity/lib/image';
import type { BlogArticlePreview } from '@/sanity/queries/Blog';

type Props = {
  article: BlogArticlePreview;
  locale: string;
};

export default async function ArticleCard({ article, locale }: Props) {
  const t = await getTranslations('blog');
  const isRtl = locale === 'ar';

  const imageUrl = article.featuredImage?.asset
    ? urlFor(article.featuredImage.asset).width(720).height(405).fit('crop').auto('format').url()
    : null;

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      dir={isRtl ? 'rtl' : undefined}
    >
      {/* Featured image */}
      <Link href={`/blog/${article.slug}`} tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F0F4F8]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.featuredImage?.alt ?? article.title ?? ''}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs text-[#AAAAAA]">No image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        {article.category?.title && (
          <span className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#5B9FD9]">
            {article.category.title}
          </span>
        )}

        {/* Title */}
        <h2 className="text-base font-semibold leading-snug text-[#1A1A1A] md:text-lg">
          <Link
            href={`/blog/${article.slug}`}
            className="transition-colors duration-200 hover:text-[#5B9FD9]"
          >
            {article.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#666666]">
            {article.excerpt}
          </p>
        )}

        {/* Footer: date + read more */}
        <div className="mt-auto flex items-center justify-between pt-4">
          {formattedDate && (
            <span className="text-xs text-[#AAAAAA]">{formattedDate}</span>
          )}
          <Link
            href={`/blog/${article.slug}`}
            className="text-xs font-semibold text-[#5B9FD9] transition-colors duration-200 hover:text-[#4A90E2]"
          >
            {t('readMore')} →
          </Link>
        </div>
      </div>
    </article>
  );
}
