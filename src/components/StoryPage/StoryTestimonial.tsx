import { localized } from "@/sanity/lib/localize";
import type { WeddingStoryFull } from "@/sanity/queries/StoriesPage";

type Props = { story: NonNullable<WeddingStoryFull>; locale: string };

export default function StoryTestimonial({ story, locale }: Props) {
  const quote = localized(story.testimonial, locale);
  const coupleName = localized(story.coupleName, locale);

  if (!quote) return null;

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <blockquote className="relative rounded-2xl bg-[#F0F4F8] px-8 py-8">
          {/* Decorative quote mark */}
          <span
            className="absolute left-6 top-4 text-5xl leading-none text-[#5B9FD9]/20 select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="relative text-base leading-relaxed text-[#444444] md:text-lg md:leading-loose">
            {quote}
          </p>
          {coupleName && (
            <footer className="mt-4 text-sm font-medium text-[#8BA8A0]">
              — {coupleName}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}
