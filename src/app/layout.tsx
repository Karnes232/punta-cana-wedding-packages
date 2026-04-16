import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { getGeneralLayout } from '@/sanity/queries/GeneralLayout';
import { urlFor } from '@/sanity/lib/image';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const layout = await getGeneralLayout();

  const faviconUrl = layout?.favicon?.asset
    ? urlFor(layout.favicon.asset).width(64).url()
    : null;

  return {
    title: layout?.brandName
      ? `${layout.brandName} — Destination Weddings`
      : 'Punta Cana Wedding Packages',
    description: 'Design your dream wedding in Punta Cana, Dominican Republic.',
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
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
