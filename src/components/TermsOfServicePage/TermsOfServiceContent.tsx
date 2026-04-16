import { PortableText } from '@portabletext/react';
import { localized } from '@/sanity/lib/localize';
import type { TermsOfServiceQueryResult } from '@/sanity/queries/TermsOfService';

type Props = {
  data: TermsOfServiceQueryResult;
  locale: string;
};

export default function TermsOfServiceContent({ data, locale }: Props) {
  const title = localized(data?.title, locale) ?? 'Terms of Service';

  const rawContent = data?.content;
  const content = rawContent
    ? ((rawContent as Record<string, unknown>)[locale] ??
      (rawContent as Record<string, unknown>)['en'] ??
      null)
    : null;

  const hasContent = content && Array.isArray(content) && content.length > 0;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-semibold text-[#1A1A1A] md:text-4xl">{title}</h1>
        <div className="prose prose-base mt-8 max-w-none text-[#444444] [&_a]:text-[#5B9FD9] [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#1A1A1A] [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1A1A1A] [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p]:text-[#444444] [&_strong]:text-[#1A1A1A]">
          {hasContent ? (
            <PortableText value={content as Parameters<typeof PortableText>[0]['value']} />
          ) : (
            <>
              <p>
                By using the Punta Cana Wedding Packages website and services, you agree to the
                following terms and conditions.
              </p>
              <h2>Use of Service</h2>
              <p>
                Our wedding builder and planning tools are provided for the purpose of configuring
                and submitting wedding planning requests. You agree to use our services only for
                lawful purposes.
              </p>
              <h2>Payments &amp; Deposit</h2>
              <p>
                A refundable deposit of $500 USD is required to secure your wedding date. The
                remaining balance is due in two installments: 50% at 30 days before the event and
                50% at 15 days before. All prices are quoted in USD.
              </p>
              <h2>Cancellation Policy</h2>
              <p>
                Cancellations made more than 90 days before the event are eligible for a full
                deposit refund. Cancellations within 90 days of the event are non-refundable, but
                the deposit may be applied to a future booking.
              </p>
              <h2>Limitation of Liability</h2>
              <p>
                Punta Cana Wedding Packages shall not be liable for any indirect, incidental, or
                consequential damages arising from the use of our services.
              </p>
              <h2>Contact</h2>
              <p>
                For questions about these terms, please contact us at
                hello@puntacanaweddings.com.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
