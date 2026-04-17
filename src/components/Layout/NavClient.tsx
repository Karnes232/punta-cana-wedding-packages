"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { key: "howItWorks", href: "/how-it-works" },
  { key: "calculator", href: "/wedding-calculator" },
  { key: "about", href: "/about" },
  { key: "stories", href: "/stories" },
  { key: "contact", href: "/contact" },
] as const;

export default function NavClient({
  brandName,
  logoUrl,
  logoAlt,
}: {
  brandName: string;
  logoUrl: string | null;
  logoAlt: string;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const brandPrefix = brandWords.slice(0, -2).join(" ");
  const brandAccent = brandWords.slice(-2).join(" ");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-sand-light transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
          : "border-b border-[#EFEFEF]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={100}
                height={100}
                style={{ height: "100px", width: "100px" }}
                className="object-contain"
                priority
              />
            ) : (
              <span className="text-lg font-semibold tracking-tight text-[#1A1A1A] group-hover:text-[#5B9FD9] transition-colors duration-200">
                {brandPrefix}
                {brandPrefix ? " " : ""}
                <span className="text-[#5B9FD9]">{brandAccent}</span>
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {navLinks.map(({ key, href }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              const isCalculator = key === "calculator";
              return (
                <Link
                  key={key}
                  href={href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isCalculator
                      ? "text-[#5B9FD9] hover:text-[#4A90E2]"
                      : isActive
                        ? "text-[#1A1A1A]"
                        : "text-[#555555] hover:text-[#1A1A1A]"
                  } ${isActive ? "underline underline-offset-4 decoration-[#5B9FD9] decoration-2" : ""}`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* CTA button — desktop */}
            <Link
              href="/wedding-calculator"
              className="hidden md:inline-flex items-center rounded-lg bg-[#5B9FD9] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.98]"
            >
              {t("cta")}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#444444] hover:bg-[#F5F5F5] transition-colors duration-200"
            >
              {menuOpen ? (
                <X className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="border-t border-[#EFEFEF] bg-white px-6 py-6 flex flex-col gap-1">
          {navLinks.map(({ key, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={key}
                href={href}
                className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#F0F4F8] text-[#5B9FD9]"
                    : "text-[#444444] hover:bg-[#F9F9F9] hover:text-[#1A1A1A]"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}

          <div className="mt-4 flex items-center justify-between border-t border-[#EFEFEF] pt-4">
            <LanguageSwitcher />
            <Link
              href="/wedding-calculator"
              className="inline-flex items-center rounded-lg bg-[#5B9FD9] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#4A90E2]"
            >
              {t("cta")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
