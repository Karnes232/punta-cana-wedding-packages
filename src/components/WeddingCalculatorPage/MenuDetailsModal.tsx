"use client";

import { useEffect } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  value: unknown[];
};

const menuPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="mt-6 mb-3 text-2xl font-semibold text-[#1A1A1A] first:mt-0">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold text-[#1A1A1A] first:mt-0">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-5 mb-2 text-base font-semibold text-[#1A1A1A] first:mt-0">
        {children}
      </h4>
    ),
    h4: ({ children }) => (
      <h5 className="mt-4 mb-2 text-sm font-semibold text-[#1A1A1A] first:mt-0">
        {children}
      </h5>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-[#5B9FD9] bg-[#F0F7FF]/60 px-4 py-2 italic text-[#555555]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-3 text-sm leading-relaxed text-[#444444]">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-3 list-disc space-y-1.5 pl-6 text-sm leading-relaxed text-[#444444] marker:text-[#5B9FD9]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 list-decimal space-y-1.5 pl-6 text-sm leading-relaxed text-[#444444] marker:text-[#5B9FD9]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5B9FD9] underline underline-offset-2 hover:text-[#4A8FC9]"
      >
        {children}
      </a>
    ),
  },
};

export default function MenuDetailsModal({
  open,
  onClose,
  title,
  closeLabel,
  value,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-[#EEEEEE] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-[#666666] hover:bg-[#F5F5F5]"
            aria-label={closeLabel}
          >
            ✕
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <PortableText
            value={value as Parameters<typeof PortableText>[0]["value"]}
            components={menuPortableTextComponents}
          />
        </div>
        <div className="border-t border-[#EEEEEE] px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#5B9FD9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A8FC9]"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
