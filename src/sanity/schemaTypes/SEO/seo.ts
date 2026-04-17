import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  groups: [
    { name: "basic", title: "Basic SEO" },
    { name: "social", title: "Social Media" },
    { name: "structured", title: "Structured Data" },
  ],
  fields: [
    // ── Meta ──────────────────────────────────────────────────────────────────
    defineField({
      name: "meta",
      title: "Meta Information",
      type: "object",
      group: "basic",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Meta Title",
              type: "string",
              initialValue: "Punta Cana Wedding Packages",
              description:
                "Browser tab + search results (50–60 chars recommended)",
              validation: (Rule) =>
                Rule.max(60).warning(
                  "Titles over 60 characters may be truncated in search results",
                ),
            }),
            defineField({
              name: "description",
              title: "Meta Description",
              type: "text",
              rows: 3,
              initialValue:
                "Design your dream destination wedding in Punta Cana, Dominican Republic. Transparent pricing, real choices, zero stress.",
              description: "Search result snippet (150–160 chars recommended)",
              validation: (Rule) =>
                Rule.max(160).warning(
                  "Descriptions over 160 characters may be truncated in search results",
                ),
            }),
            defineField({
              name: "keywords",
              title: "Keywords",
              type: "array",
              of: [{ type: "string" }],
              initialValue: [
                "Punta Cana",
                "wedding packages",
                "destination wedding",
                "Dominican Republic",
                "beach wedding",
                "all-inclusive wedding",
                "Cabeza de Toro",
                "wedding planner",
                "Caribbean wedding",
              ],
              description: "Relevant keywords for this page",
            }),
          ],
        }),

        defineField({
          name: "es",
          title: "Spanish",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Meta Title",
              type: "string",
              initialValue: "Paquetes de Bodas en Punta Cana",
              description:
                "Pestaña del navegador + resultados de búsqueda (50–60 caracteres recomendados)",
              validation: (Rule) =>
                Rule.max(60).warning(
                  "Los títulos de más de 60 caracteres pueden aparecer truncados",
                ),
            }),
            defineField({
              name: "description",
              title: "Meta Description",
              type: "text",
              rows: 3,
              initialValue:
                "Diseña la boda de tus sueños en Punta Cana, República Dominicana. Precios transparentes, opciones reales, sin estrés.",
              description:
                "Fragmento en resultados de búsqueda (150–160 caracteres recomendados)",
              validation: (Rule) =>
                Rule.max(160).warning(
                  "Las descripciones de más de 160 caracteres pueden aparecer truncadas",
                ),
            }),
            defineField({
              name: "keywords",
              title: "Keywords",
              type: "array",
              of: [{ type: "string" }],
              initialValue: [
                "Punta Cana",
                "paquetes de boda",
                "boda de destino",
                "República Dominicana",
                "boda en la playa",
                "boda todo incluido",
                "Cabeza de Toro",
                "organizador de bodas",
                "boda en el Caribe",
              ],
              description: "Palabras clave relevantes para esta página",
            }),
          ],
        }),
      ],
    }),

    // ── Open Graph ────────────────────────────────────────────────────────────
    defineField({
      name: "openGraph",
      title: "Open Graph",
      type: "object",
      group: "social",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "OG Title",
              type: "string",
              initialValue: "Punta Cana Wedding Packages",
              description:
                "Title shown when shared on social media (falls back to Meta Title if blank)",
            }),
            defineField({
              name: "description",
              title: "OG Description",
              type: "text",
              rows: 3,
              initialValue:
                "Design your dream destination wedding in Punta Cana, Dominican Republic. Transparent pricing, real choices, zero stress.",
              description:
                "Description shown when shared on social media (falls back to Meta Description if blank)",
            }),
          ],
        }),

        defineField({
          name: "es",
          title: "Spanish",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "OG Title",
              type: "string",
              initialValue: "Paquetes de Bodas en Punta Cana",
              description:
                "Título al compartir en redes sociales (usa el Meta Title si está en blanco)",
            }),
            defineField({
              name: "description",
              title: "OG Description",
              type: "text",
              rows: 3,
              initialValue:
                "Diseña la boda de tus sueños en Punta Cana, República Dominicana. Precios transparentes, opciones reales, sin estrés.",
              description:
                "Descripción al compartir en redes sociales (usa la Meta Description si está en blanco)",
            }),
          ],
        }),

        defineField({
          name: "image",
          title: "OG Image",
          type: "image",
          description: "Social share image (recommended: 1200 × 630 px)",
          options: { hotspot: true },
        }),
      ],
    }),

    // ── Structured Data (JSON-LD) ─────────────────────────────────────────────
    defineField({
      name: "structuredData",
      title: "Structured Data",
      type: "object",
      group: "structured",
      description: "schema.org JSON-LD for enhanced search results",
      fields: [
        defineField({
          name: "en",
          title: "English Schema",
          type: "text",
          description: "Paste your schema.org JSON-LD for the English version",
          validation: (Rule) =>
            Rule.custom((text) => {
              if (!text) return true;
              try {
                JSON.parse(text);
                return true;
              } catch {
                return "Must be valid JSON";
              }
            }),
          initialValue: `{
  "@context": "https://schema.org",
  "@type": "WeddingVenue",
  "name": "Punta Cana Wedding Packages",
  "description": "Design your dream destination wedding in Punta Cana, Dominican Republic.",
  "url": "https://puntacanaweddingpackages.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cabeza de Toro",
    "addressRegion": "La Altagracia",
    "addressCountry": "DO"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service",
    "availableLanguage": ["en", "es"]
  },
  "sameAs": []
}`,
        }),

        defineField({
          name: "es",
          title: "Spanish Schema",
          type: "text",
          description: "Paste your schema.org JSON-LD for the Spanish version",
          validation: (Rule) =>
            Rule.custom((text) => {
              if (!text) return true;
              try {
                JSON.parse(text);
                return true;
              } catch {
                return "Must be valid JSON";
              }
            }),
          initialValue: `{
  "@context": "https://schema.org",
  "@type": "WeddingVenue",
  "name": "Paquetes de Bodas en Punta Cana",
  "description": "Diseña la boda de tus sueños en Punta Cana, República Dominicana.",
  "url": "https://puntacanaweddingpackages.com/es",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cabeza de Toro",
    "addressRegion": "La Altagracia",
    "addressCountry": "DO"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "",
    "contactType": "customer service",
    "availableLanguage": ["en", "es"]
  },
  "sameAs": []
}`,
        }),
      ],
    }),

    // ── Robots ────────────────────────────────────────────────────────────────
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      group: "basic",
      description: "Hide this page from search engines",
      initialValue: false,
    }),

    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      group: "basic",
      description: "Tell search engines not to follow links on this page",
      initialValue: false,
    }),
  ],
});
