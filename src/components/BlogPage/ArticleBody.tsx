import { PortableText } from '@portabletext/react';

type Props = {
  body: unknown[] | null;
  locale: string;
};

export default function ArticleBody({ body, locale }: Props) {
  const isRtl = locale === 'ar';

  if (!body || body.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div
        className="mx-auto max-w-3xl px-6"
        dir={isRtl ? 'rtl' : undefined}
      >
        <div className="prose prose-base max-w-none text-[#444444] [&_a]:text-[#5B9FD9] [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#1A1A1A] [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1A1A1A] [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p]:text-[#444444] [&_strong]:text-[#1A1A1A]">
          <PortableText value={body as Parameters<typeof PortableText>[0]['value']} />
        </div>
      </div>
    </section>
  );
}
