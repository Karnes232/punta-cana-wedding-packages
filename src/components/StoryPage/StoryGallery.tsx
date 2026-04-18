"use client";

import {
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { WeddingStoryFull } from "@/sanity/queries/StoriesPage";

const MD_MIN_WIDTH = "(min-width: 768px)";

function getGalleryDisplayLimit() {
  return window.matchMedia(MD_MIN_WIDTH).matches ? 5 : 3;
}

function subscribeGalleryDisplayLimit(onChange: () => void) {
  const mq = window.matchMedia(MD_MIN_WIDTH);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

type StoryImage = NonNullable<NonNullable<WeddingStoryFull>["gallery"]>[number];
type Props = { story: NonNullable<WeddingStoryFull> };

function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: StoryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const total = photos.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const photo = photos[current];
  if (!photo?.asset) return null;

  const url = urlFor(photo.asset)
    .width(1600)
    .height(1200)
    .fit("max")
    .auto("format")
    .url();

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm tabular-nums select-none">
        {current + 1} / {total}
      </div>

      <button
        aria-label="Close"
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
      >
        <X size={22} />
      </button>

      {total > 1 && (
        <button
          aria-label="Previous photo"
          className="absolute left-3 md:left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      <div
        className="relative w-full h-full max-w-5xl max-h-[85dvh] mx-14 md:mx-20"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={current}
          src={url}
          alt={photo.alt ?? `Wedding photo ${current + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain"
          priority
        />
      </div>

      {total > 1 && (
        <button
          aria-label="Next photo"
          className="absolute right-3 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </div>,
    document.body,
  );
}

export default function StoryGallery({ story }: Props) {
  let photos = (story.gallery ?? []).filter((p) => p.asset);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const displayLimit = useSyncExternalStore(
    subscribeGalleryDisplayLimit,
    getGalleryDisplayLimit,
    () => 3,
  );

  if (photos.length === 0) return null;
  photos = [...photos, ...photos, ...photos, ...photos, ...photos, ...photos];
  const displayed = photos.slice(0, displayLimit);
  const remaining = photos.length - displayLimit;

  return (
    <>
      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {displayed.map((photo, i) => {
              const isOverflowSlot = i === displayLimit - 1 && remaining > 0;
              const url = urlFor(photo.asset!)
                .width(800)
                .height(600)
                .fit("crop")
                .auto("format")
                .url();

              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isOverflowSlot
                      ? `Show all ${photos.length} photos`
                      : (photo.alt ?? `Wedding photo ${i + 1}`)
                  }
                  className={`relative overflow-hidden rounded-xl bg-[#F5F1E8] cursor-pointer group ${
                    i === 0
                      ? "col-span-2 aspect-[16/9] md:col-span-2"
                      : "aspect-[4/3]"
                  }`}
                  onClick={() => setLightboxIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setLightboxIndex(i);
                  }}
                >
                  <Image
                    src={url}
                    alt={photo.alt ?? `Wedding photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 ${
                      isOverflowSlot
                        ? "scale-110 blur-sm"
                        : "group-hover:scale-105"
                    }`}
                  />
                  {isOverflowSlot ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                      <span className="text-white text-3xl font-semibold tracking-wide drop-shadow">
                        +{remaining}
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
