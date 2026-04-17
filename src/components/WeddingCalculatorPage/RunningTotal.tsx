"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  total: number;
};

function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function RunningTotal({ total }: Props) {
  const t = useTranslations("weddingCalculator.total");
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop sidebar card */}
      <div className="hidden rounded-2xl border border-[#EFEFEF] bg-white p-6 mt-5 shadow-sm lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999999]">
          {t("label")}
        </p>
        <p className="mt-2 text-3xl font-semibold text-[#1A1A1A] tabular-nums">
          {formatUSD(total)}
        </p>
        <p className="mt-2 text-xs text-[#AAAAAA]">{t("included")}</p>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EFEFEF] bg-white lg:hidden">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between px-6 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#999999]">
              {t("label")}
            </span>
            <span className="text-lg font-semibold text-[#1A1A1A] tabular-nums">
              {formatUSD(total)}
            </span>
          </div>
          <span className="text-xs text-[#5B9FD9]">
            {expanded ? t("collapse") : t("expand")}
          </span>
        </button>
        {expanded && (
          <div className="border-t border-[#F5F5F5] px-6 py-3">
            <p className="text-xs text-[#AAAAAA]">{t("included")}</p>
          </div>
        )}
      </div>
    </>
  );
}
