import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Playfair_Display, Poppins } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { BlogTranslationsProvider } from "@/contexts/BlogTranslationsContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

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

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="ZgZbk18NP1i6oyyLH2DBzA"
          async
        ></script>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <BlogTranslationsProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </BlogTranslationsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
