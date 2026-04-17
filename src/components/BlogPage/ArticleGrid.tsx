import { getTranslations } from "next-intl/server";
import type { BlogArticlePreview } from "@/sanity/queries/Blog";
import ArticleCard from "./ArticleCard";

type Props = {
  articles: BlogArticlePreview[];
  locale: string;
};

export default async function ArticleGrid({ articles, locale }: Props) {
  const t = await getTranslations("blog");

  if (articles.length === 0) {
    return (
      <section className="bg-[#FAFAFA] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-[#999999]">
            {t("noArticles")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
