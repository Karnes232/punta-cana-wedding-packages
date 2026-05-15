import type { Metadata } from "next";
import "./globals.css";
import { getGeneralLayout } from "@/sanity/queries/GeneralLayout";
import { urlFor } from "@/sanity/lib/image";

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
  // <html> and <body> are rendered in src/app/(root)/[locale]/layout.tsx
  // so that the lang attribute matches the served locale.
  return children;
}
