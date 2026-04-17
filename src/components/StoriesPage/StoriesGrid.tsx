import { getTranslations } from "next-intl/server";
import StoryCard from "./StoryCard";
import type { WeddingStoryPreview } from "@/sanity/queries/StoriesPage";

type Props = {
  stories: WeddingStoryPreview[];
  locale: string;
};

export default async function StoriesGrid({ stories, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "stories.card" });

  if (stories.length === 0) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="text-sm text-[#999999]">
          No stories yet — check back soon.
        </p>
      </section>
    );
  }

  return (
    <section className="px-6 pb-20 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              locale={locale}
              readStoryLabel={t("readStory")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
