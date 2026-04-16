import { getTranslations } from 'next-intl/server';

type Props = {
  locale: string;
};

export default async function BlogHero({ locale }: Props) {
  const t = await getTranslations('blog');
  const isRtl = locale === 'ar';

  return (
    <section className="bg-white py-16 md:py-20" dir={isRtl ? 'rtl' : undefined}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1A1A1A] md:text-5xl">
            {t('heading')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#555555]">{t('subtitle')}</p>
        </div>
      </div>
    </section>
  );
}
