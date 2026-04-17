"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useBlogTranslations } from "@/contexts/BlogTranslationsContext";

const MAIN_LOCALES = ["en", "es"] as const;

const BLOG_LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "it", label: "Italiano", short: "IT" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "pt", label: "Português", short: "PT" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "zh", label: "中文", short: "ZH" },
  { code: "ar", label: "العربية", short: "AR" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { translations } = useBlogTranslations();

  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  // true when we're on a specific article page (not just the blog index)
  const isArticle = /^\/blog\/.+/.test(pathname);

  function switchLocale(nextLocale: string) {
    // On an article page, navigate to the translated slug if one exists;
    // otherwise fall back to the blog index in the target locale.
    if (isArticle && translations.length > 0) {
      const match = translations.find((t) => t.language === nextLocale);
      const target = match ? `/blog/${match.slug}` : "/blog";
      startTransition(() => {
        router.push(target, { locale: nextLocale });
      });
    } else {
      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    }
    setOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Blog: dropdown with all 9 languages
  if (isBlog) {
    const current =
      BLOG_LOCALES.find((l) => l.code === locale) ?? BLOG_LOCALES[0];

    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          disabled={isPending}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1 rounded-full border border-[#E0E0E0] px-3 py-1.5 text-xs font-medium text-[#555555] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#1A1A1A]"
        >
          {current.short}
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={2.5}
          />
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="Select language"
            className="absolute right-0 top-full z-50 mt-1.5 w-36 overflow-hidden rounded-xl border border-[#EFEFEF] bg-white py-1 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          >
            {BLOG_LOCALES.map(({ code, label, short }) => (
              <button
                key={code}
                role="option"
                aria-selected={locale === code}
                onClick={() => switchLocale(code)}
                disabled={isPending}
                className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-xs transition-colors duration-150 ${
                  locale === code
                    ? "bg-[#F0F4F8] font-semibold text-[#5B9FD9]"
                    : "text-[#555555] hover:bg-[#FAFAFA] hover:text-[#1A1A1A]"
                }`}
              >
                <span className="w-5 font-medium">{short}</span>
                <span className="text-[11px] text-[#999999]">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Main site: compact EN / ES pill
  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-[#E0E0E0] px-1 py-0.5 text-xs font-medium"
      aria-label="Language switcher"
    >
      {MAIN_LOCALES.map((code) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending}
          aria-pressed={locale === code}
          className={`rounded-full px-2.5 py-1 transition-colors duration-200 ${
            locale === code
              ? "bg-[#5B9FD9] text-white"
              : "text-[#666666] hover:text-[#1A1A1A]"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
