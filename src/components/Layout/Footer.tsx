import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getGeneralLayout } from '@/sanity/queries/GeneralLayout';
import { localized } from '@/sanity/lib/localize';

export default async function Footer() {
  const [t, locale, layout] = await Promise.all([
    getTranslations('footer'),
    getLocale(),
    getGeneralLayout(),
  ]);

  const year = new Date().getFullYear();
  const brandName = layout?.brandName ?? 'Punta Cana Wedding Packages';
  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const brandPrefix = brandWords.slice(0, -2).join(' ');
  const brandAccent = brandWords.slice(-2).join(' ');
  const phone = layout?.phoneNumber ?? null;
  const email = layout?.email ?? null;
  const tagline = localized(layout?.footerDescription, locale) ?? t('brand.tagline');

  return (
    <footer className="border-t border-[#EFEFEF] bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">

          {/* Brand column */}
          <div>
            <span className="text-base font-semibold text-[#1A1A1A]">
              {brandPrefix}
              {brandPrefix ? ' ' : ''}
              <span className="text-[#5B9FD9]">{brandAccent}</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#666666]">
              {tagline}
            </p>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999999]">
              {t('connect.heading')}
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
                    {t('connect.whatsapp')}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                  >
                    {t('connect.email')}
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t('connect.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#999999]">
              {t('legal.heading')}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-[#555555] transition-colors duration-200 hover:text-[#5B9FD9]"
                >
                  {t('legal.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#EFEFEF] pt-6">
          <p className="text-xs text-[#999999]">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
