"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

type Props = {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  onSkip?: () => void;
  continueDisabled?: boolean;
  hideContinue?: boolean;
};

export default function StepWrapper({
  stepNumber,
  title,
  children,
  onBack,
  onContinue,
  onSkip,
  continueDisabled = false,
  hideContinue = false,
}: Props) {
  const t = useTranslations("weddingCalculator.nav");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const y = wrapperRef.current.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }, []);

  return (
    <div ref={wrapperRef} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Step header */}
      <div className="mb-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#5B9FD9]">
          Step {stepNumber}
        </p>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="mb-8">{children}</div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-xl border border-[#E0E0E0] px-6 py-3 text-sm font-medium text-[#555555] transition-colors duration-200 hover:border-[#CCCCCC] hover:bg-[#F8F8F8]"
          >
            {t("back")}
          </button>
        )}

        {!hideContinue && onContinue && (
          <button
            onClick={onContinue}
            disabled={continueDisabled}
            className="rounded-xl bg-[#5B9FD9] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("continue")}
          </button>
        )}

        {onSkip && (
          <button
            onClick={onSkip}
            className="text-sm text-[#AAAAAA] transition-colors duration-200 hover:text-[#888888]"
          >
            {t("skip")}
          </button>
        )}
      </div>
    </div>
  );
}
