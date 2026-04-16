// Shared route group layout — Navbar/Footer live inside [locale]/layout.tsx
// because they need the NextIntlClientProvider context for translations.
export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
