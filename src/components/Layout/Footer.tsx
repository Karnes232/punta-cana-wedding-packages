import type React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout";
import { localized } from "@/sanity/lib/localize";
import BuiltBy from "./BuiltBy";

const socialIcons: Record<string, React.ReactElement> = {
  instagram: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  tiktok: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  ),
  youtube: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
  pinterest: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.69 2.22-4.69 4.51 0 .89.34 1.85.77 2.37.08.1.09.19.07.29-.08.32-.25 1.04-.28 1.18-.04.19-.14.23-.33.14-1.25-.58-2.03-2.42-2.03-3.89 0-3.15 2.29-6.05 6.61-6.05 3.47 0 6.16 2.47 6.16 5.78 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  ),
  twitter: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export default async function Footer() {
  const [t, locale, layout] = await Promise.all([
    getTranslations("footer"),
    getLocale(),
    getGeneralLayout(),
  ]);

  const year = new Date().getFullYear();
  const brandName = layout?.brandName ?? "Punta Cana Wedding Packages";
  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const brandPrefix = brandWords.slice(0, -2).join(" ");
  const brandAccent = brandWords.slice(-2).join(" ");
  const phone = layout?.phoneNumber ?? null;
  const email = layout?.email ?? null;
  const tagline =
    localized(layout?.footerDescription, locale) ?? t("brand.tagline");
  const socialLinks = layout?.socialLinks ?? [];

  return (
    <footer className="border-t border-[#EFEFEF] bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {/* Brand column */}
          <div>
            <span className="text-base font-semibold text-[#1A1A1A]">
              {brandPrefix}
              {brandPrefix ? " " : ""}
              <span className="text-[#5B9FD9]">{brandAccent}</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#666666]">
              {tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex items-center gap-4">
                {socialLinks.map((link) => {
                  const icon = socialIcons[link.platform];
                  if (!icon) return null;
                  return (
                    <a
                      key={link._key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        link.platform.charAt(0).toUpperCase() +
                        link.platform.slice(1)
                      }
                      className="text-[#BBBBBB] transition-colors duration-200 hover:text-[#5B9FD9]"
                    >
                      {icon}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999999]">
              {t("connect.heading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {phone && (
                <li>
                  <a
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                  >
                    {t("connect.whatsapp")}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                  >
                    {t("connect.email")}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t("connect.blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999999]">
              {t("legal.heading")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t("legal.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t("legal.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#EFEFEF] pt-6">
          <p className="text-xs text-[#999999]">{t("copyright", { year })}</p>
        </div>
        <BuiltBy />
      </div>
    </footer>
  );
}
