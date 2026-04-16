'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

type Props = {
  phone: string | null;
  email: string | null;
  introText: string | null;
};

export default function ContactForm({ phone, email, introText }: Props) {
  const t = useTranslations('contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Object.fromEntries(new FormData(formRef.current)) as Record<string, string>,
        ).toString(),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] placeholder:text-[#AAAAAA] outline-none transition-colors duration-200 focus:border-[#5B9FD9] focus:ring-2 focus:ring-[#5B9FD9]/20';
  const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-wide text-[#666666]';

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-16">

          {/* ── Form (3/5) ─────────────────────────────────────── */}
          <div className="md:col-span-3">
            {introText && (
              <p className="mb-8 text-base leading-relaxed text-[#555555]">{introText}</p>
            )}

            {status === 'success' ? (
              <div className="rounded-2xl bg-[#EBF4FC] px-8 py-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#5B9FD9]">
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-base font-semibold text-[#1A1A1A]">{t('form.success')}</p>
              </div>
            ) : (
              <form
                ref={formRef}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Netlify hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Do not fill: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>{t('form.name')}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>{t('form.email')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClass}>{t('form.phone')}</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="guests" className={labelClass}>{t('form.guests')}</label>
                    <input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="weddingDate" className={labelClass}>{t('form.weddingDate')}</label>
                  <input
                    id="weddingDate"
                    name="weddingDate"
                    type="text"
                    placeholder={t('form.weddingDatePlaceholder')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>{t('form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder={t('form.messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600">{t('form.error')}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-xl bg-[#5B9FD9] px-8 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#4A90E2] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t('form.sending') : t('form.submit')}
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info (2/5) ─────────────────────────────── */}
          <div className="md:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h2 className="text-lg font-semibold text-[#1A1A1A]">{t('info.heading')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#666666]">{t('info.response')}</p>

              <div className="mt-8 space-y-5">
                {phone && (
                  <a
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[#E8F0F7] bg-[#F6FAFE] px-5 py-4 text-sm font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9]"
                  >
                    {/* WhatsApp icon */}
                    <svg className="h-5 w-5 shrink-0 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t('info.whatsapp')}
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 rounded-xl border border-[#E8F0F7] bg-[#F6FAFE] px-5 py-4 text-sm font-medium text-[#1A1A1A] transition-colors duration-200 hover:border-[#5B9FD9] hover:text-[#5B9FD9]"
                  >
                    {/* Email icon */}
                    <svg className="h-5 w-5 shrink-0 text-[#5B9FD9]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t('info.email')}
                  </a>
                )}

                {/* Location */}
                <div className="flex items-start gap-3 rounded-xl border border-[#E8F0F7] bg-[#F6FAFE] px-5 py-4">
                  {/* Pin icon */}
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#5B9FD9]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{t('info.location')}</p>
                    <p className="mt-0.5 text-xs text-[#666666]">{t('info.locationDetail')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
