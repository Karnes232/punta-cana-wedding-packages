"use client";

import { createContext, useContext, useState } from "react";
import type { ArticleTranslation } from "@/sanity/queries/Blog/getArticleBySlug";

type BlogTranslationsContextValue = {
  translations: ArticleTranslation[];
  setTranslations: (t: ArticleTranslation[]) => void;
};

const BlogTranslationsContext = createContext<BlogTranslationsContextValue>({
  translations: [],
  setTranslations: () => {},
});

export function BlogTranslationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [translations, setTranslations] = useState<ArticleTranslation[]>([]);

  return (
    <BlogTranslationsContext.Provider value={{ translations, setTranslations }}>
      {children}
    </BlogTranslationsContext.Provider>
  );
}

export function useBlogTranslations() {
  return useContext(BlogTranslationsContext);
}
