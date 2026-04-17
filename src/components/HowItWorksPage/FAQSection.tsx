import { getTranslations } from "next-intl/server";
import { localized } from "@/sanity/lib/localize";
import type { HowItWorksPageQueryResult } from "@/sanity/queries/HowItWorksPage";
import FAQAccordion from "./FAQAccordion";

type Props = {
  data: HowItWorksPageQueryResult | null;
  locale: string;
};

const FALLBACK_FAQS = [
  {
    question: "Is the $500 deposit refundable?",
    answer:
      "Yes — fully refundable. If you cancel more than 90 days before your wedding date, you receive a 100% refund of your deposit. No questions asked.",
  },
  {
    question: "Can I change my wedding date after booking?",
    answer:
      "Absolutely. We allow one free date change up to 6 months before your event, subject to venue availability. Your deposit automatically carries over to the new date.",
  },
  {
    question: "How long does it take to get a full wedding plan?",
    answer:
      "Using the wedding builder, you can configure your entire wedding in under 15 minutes. Once you submit, our coordinator will contact you within 24 hours to confirm details and lock in your date.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept international bank transfers, credit cards (Visa, Mastercard, Amex), and PayPal. All prices are quoted in USD.",
  },
  {
    question: "What happens if I need to cancel the wedding?",
    answer:
      "Cancellations made more than 90 days before the event receive a full deposit refund. Cancellations within 90 days are non-refundable but the deposit can be applied toward a future date.",
  },
];

export default async function FAQSection({ data, locale }: Props) {
  const t = await getTranslations("howItWorks.faq");

  const heading = localized(data?.faqTitle, locale) ?? t("heading");

  const items = data?.faqItems?.length
    ? data.faqItems.map((item, i) => ({
        key: item._key,
        question:
          localized(item.question, locale) ?? FALLBACK_FAQS[i]?.question ?? "",
        answer:
          localized(item.answer, locale) ?? FALLBACK_FAQS[i]?.answer ?? "",
      }))
    : FALLBACK_FAQS.map((item, i) => ({ key: String(i), ...item }));

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {heading}
        </h2>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}
