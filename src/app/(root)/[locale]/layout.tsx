import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { BlogTranslationsProvider } from '@/contexts/BlogTranslationsContext';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Required for static rendering — enables next-intl APIs in Server Components
  setRequestLocale(locale);

  // Pass locale explicitly to guarantee correct messages in static generation
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <BlogTranslationsProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </BlogTranslationsProvider>
    </NextIntlClientProvider>
  );
}
