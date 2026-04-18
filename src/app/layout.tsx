import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout";
import { urlFor } from "@/sanity/lib/image";

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


export async function generateMetadata(): Promise<Metadata> {
  const layout = await getGeneralLayout();

  const faviconUrl = layout?.favicon?.asset
    ? urlFor(layout.favicon.asset).width(64).url()
    : null;

  return {
    title: layout?.brandName
      ? `${layout.brandName} — Destination Weddings`
      : "Punta Cana Wedding Packages",
    description: "Design your dream wedding in Punta Cana, Dominican Republic.",
    ...(faviconUrl && {
      icons: {
        icon: faviconUrl,
      },
    }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang is overridden per-locale by HtmlLang in [locale]/layout.tsx
    // suppressHydrationWarning silences the mismatch between this fallback and the real locale
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} ${playfair.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
