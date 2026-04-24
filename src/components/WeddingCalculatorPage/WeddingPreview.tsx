"use client";

import Image from "next/image";
import type { DecorPackage } from "@/sanity/queries/WeddingCalculator/getCalculatorData";

type Props = {
  decor: DecorPackage | null;
  variant: "mobile" | "desktop";
};

function EmptyState({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EEE8] to-[#EAF0F7] ${compact ? "py-4" : "py-10"}`}
    >
      <svg
        className={`mb-2 text-[#C0B4A8] ${compact ? "h-7 w-7" : "h-10 w-10"}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
        <path d="M8.5 8.5c1-1.5 3-2.5 3.5-2.5s2.5 1 3.5 2.5" />
      </svg>
      {!compact && (
        <p className="max-w-[180px] text-center text-xs text-[#999]">
          Your style preview will appear once you choose a decor package (step 8)
        </p>
      )}
    </div>
  );
}

export default function WeddingPreview({ decor, variant }: Props) {
  const imageUrl = decor?.previewImageUrl ?? decor?.imageUrl;

  if (variant === "mobile") {
    return (
      <div className="mb-6 overflow-hidden rounded-2xl border border-[#E0E0E0]">
        {imageUrl ? (
          <div className="relative aspect-[16/9]">
            <Image
              src={imageUrl}
              alt={decor?.name ?? "Wedding style preview"}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">
              {decor?.name}
            </span>
          </div>
        ) : (
          <EmptyState compact />
        )}
      </div>
    );
  }

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-[#E0E0E0] bg-white">
      {imageUrl ? (
        <>
          <div className="relative aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={decor?.name ?? "Wedding style preview"}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="256px"
              priority={false}
            />
          </div>
          <div className="px-3 py-2">
            <p className="text-[10px] uppercase tracking-widest text-[#999]">
              Your Wedding Style
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#1A1A1A]">
              {decor?.name}
            </p>
          </div>
        </>
      ) : (
        <>
          <EmptyState />
          <div className="px-3 pb-3 text-center">
            <p className="text-[10px] uppercase tracking-widest text-[#999]">
              Your Wedding Style
            </p>
          </div>
        </>
      )}
    </div>
  );
}
