import { PortableText } from "@portabletext/react";
import { localized } from "@/sanity/lib/localize";
import type { PrivacyPolicyQueryResult } from "@/sanity/queries/PrivacyPolicy";

type Props = {
  data: PrivacyPolicyQueryResult;
  locale: string;
};

export default function PrivacyPolicyContent({ data, locale }: Props) {
  const title = localized(data?.title, locale) ?? "Privacy Policy";

  const rawContent = data?.content;
  const content = rawContent
    ? ((rawContent as Record<string, unknown>)[locale] ??
      (rawContent as Record<string, unknown>)["en"] ??
      null)
    : null;

  const hasContent = content && Array.isArray(content) && content.length > 0;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
          {title}
        </h1>
        <div className="prose prose-base mt-8 max-w-none text-[#444444] [&_a]:text-[#5B9FD9] [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#1A1A1A] [&_h3]:mt-8 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1A1A1A] [&_li]:leading-relaxed [&_p]:leading-relaxed [&_p]:text-[#444444] [&_strong]:text-[#1A1A1A]">
          {hasContent ? (
            <PortableText
              value={content as Parameters<typeof PortableText>[0]["value"]}
            />
          ) : (
            <>
              <p>
                This Privacy Policy describes how Punta Cana Wedding Packages
                collects, uses, and protects your personal information when you
                use our website and services.
              </p>
              <h2>Information We Collect</h2>
              <p>
                We collect information you provide directly to us when you use
                our wedding builder, submit a planning request, or contact us.
                This may include your name, email address, phone number, and
                wedding preferences.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and
                improve our services, communicate with you about your wedding
                planning, and respond to your inquiries.
              </p>
              <h2>Cookies</h2>
              <p>
                We use cookies to improve your experience on our website. You
                can instruct your browser to refuse all cookies or to indicate
                when a cookie is being sent.
              </p>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at hello@puntacanaweddings.com.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
