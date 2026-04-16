/**
 * Renders a <script type="application/ld+json"> tag for structured data.
 * Pass the raw JSON string from Sanity's structuredData field.
 * Returns null if the string is empty or invalid JSON.
 */
export default function SeoJsonLd({ json }: { json: string | null | undefined }) {
  if (!json) return null

  // Validate before rendering to avoid broken JSON in the page
  try {
    JSON.parse(json)
  } catch {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
