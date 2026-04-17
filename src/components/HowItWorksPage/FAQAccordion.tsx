"use client";

import { useState } from "react";

type FAQItem = {
  key: string;
  question: string;
  answer: string;
};

type Props = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-10 divide-y divide-[#EBEBEB] rounded-2xl border border-[#EBEBEB] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.key}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-150 hover:bg-[#FAFAFA]"
            >
              <span className="pr-4 text-sm font-semibold text-[#1A1A1A] md:text-base">
                {item.question}
              </span>
              {/* Chevron */}
              <span
                className="shrink-0 transition-transform duration-200"
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                <svg
                  className="h-5 w-5 text-[#5B9FD9]"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 7.5l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? "400px" : "0px" }}
            >
              <p className="px-6 pb-5 text-sm leading-relaxed text-[#555555]">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
