"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

type PropertyImage = { url: string; alt: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  images: PropertyImage[];
  description: unknown[];
  acceptLabel: string;
  closeLabel: string;
};

const propertyPortableTextComponents: PortableTextComponents = {
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

// ── Carousel ────────────────────────────────────────────────────────────────

function Carousel({
  images,
  title,
  onImageClick,
}: {
  images: PropertyImage[];
  title: string;
  onImageClick: (idx: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = images.length;

  const scrollTo = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  const prev = () => {
    const next = (index - 1 + total) % total;
    scrollTo(next);
  };
  const next = () => {
    const i = (index + 1) % total;
    scrollTo(i);
  };

  if (total === 0) return null;

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative flex aspect-[4/3] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-xl bg-[#F0EDE8] [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, idx) => (
          <button
            key={img.url}
            type="button"
            onClick={() => onImageClick(idx)}
            className="relative h-full w-full shrink-0 snap-center cursor-zoom-in"
            aria-label={`View image ${idx + 1} of ${total}`}
          >
            <Image
              src={img.url}
              alt={img.alt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={idx === 0}
            />
          </button>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute top-1/2 left-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-[#1A1A1A] shadow-md transition hover:bg-white lg:flex"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute top-1/2 right-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-[#1A1A1A] shadow-md transition hover:bg-white lg:flex"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-0.5 text-xs font-medium text-white">
            {index + 1} / {total}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.url}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === index ? "w-6 bg-[#5B9FD9]" : "w-1.5 bg-[#D0D0D0]"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: PropertyImage[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);
  const total = images.length;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Jump (no smooth) to the starting image on mount
    el.scrollLeft = startIndex * el.clientWidth;
  }, [startIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo((index - 1 + total) % total);
      if (e.key === "ArrowRight") goTo((index + 1) % total);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image ${index + 1} of ${total}`}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm font-medium">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-3 py-1 text-sm transition hover:bg-white/10"
          aria-label="Close"
        >
          ✕ Close
        </button>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="relative flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {images.map((img, i) => (
          <div
            key={img.url}
            className="relative flex h-full w-full shrink-0 snap-center items-center justify-center p-4"
          >
            <Image
              src={img.url}
              alt={img.alt || title}
              fill
              sizes="100vw"
              className="object-contain p-4"
              priority={i === startIndex}
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo((index - 1 + total) % total)}
            className="absolute top-1/2 left-4 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25 lg:flex"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo((index + 1) % total)}
            className="absolute top-1/2 right-4 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-white/25 lg:flex"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}

// ── Modal ───────────────────────────────────────────────────────────────────

export default function PropertyDetailsModal({
  open,
  onClose,
  onAccept,
  title,
  images,
  description,
  acceptLabel,
  closeLabel,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Escape only closes the modal if the lightbox is NOT open
      if (e.key === "Escape" && lightboxIndex === null) onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, lightboxIndex]);

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
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl">
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

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {images.length > 0 && (
            <div className="mb-5">
              <Carousel
                images={images}
                title={title}
                onImageClick={(idx) => setLightboxIndex(idx)}
              />
            </div>
          )}

          <PortableText
            value={description as Parameters<typeof PortableText>[0]["value"]}
            components={propertyPortableTextComponents}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#EEEEEE] px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#E0E0E0] bg-white px-4 py-2 text-sm font-medium text-[#555555] hover:bg-[#F8F8F8]"
          >
            {closeLabel}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="rounded-lg bg-[#5B9FD9] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4A8FC9]"
          >
            {acceptLabel}
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
