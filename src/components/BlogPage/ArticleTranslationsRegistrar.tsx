"use client";

import { useEffect } from "react";
import { useBlogTranslations } from "@/contexts/BlogTranslationsContext";
import type { ArticleTranslation } from "@/sanity/queries/Blog/getArticleBySlug";

export default function ArticleTranslationsRegistrar({
  translations,
}: {
  translations: ArticleTranslation[];
}) {
  const { setTranslations } = useBlogTranslations();

  useEffect(() => {
    setTranslations(translations);
    return () => setTranslations([]);
  }, [translations, setTranslations]);

  return null;
}
