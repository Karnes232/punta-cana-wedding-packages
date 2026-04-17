import { defineType, defineField } from "sanity";

/** Localized string — en/es for main site pages */
export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "es", title: "Español", type: "string" }),
  ],
});

/** Localized text — en/es for main site pages */
export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "es", title: "Español", type: "text" }),
  ],
});

/** Localized rich text — en/es for main site pages */
export const localizedBlock = defineType({
  name: "localizedBlock",
  title: "Localized Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "es",
      title: "Español",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

/** Blog localized string — 9 locales for blog articles */
export const blogLocalizedString = defineType({
  name: "blogLocalizedString",
  title: "Localized String (Blog)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "es", title: "Español", type: "string" }),
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "de", title: "Deutsch", type: "string" }),
    defineField({ name: "it", title: "Italiano", type: "string" }),
    defineField({ name: "pt", title: "Português", type: "string" }),
    defineField({ name: "zh", title: "中文", type: "string" }),
    defineField({ name: "ru", title: "Русский", type: "string" }),
    defineField({ name: "ar", title: "العربية", type: "string" }),
  ],
});

/** Blog localized text — 9 locales for blog articles */
export const blogLocalizedText = defineType({
  name: "blogLocalizedText",
  title: "Localized Text (Blog)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "es", title: "Español", type: "text" }),
    defineField({ name: "fr", title: "Français", type: "text" }),
    defineField({ name: "de", title: "Deutsch", type: "text" }),
    defineField({ name: "it", title: "Italiano", type: "text" }),
    defineField({ name: "pt", title: "Português", type: "text" }),
    defineField({ name: "zh", title: "中文", type: "text" }),
    defineField({ name: "ru", title: "Русский", type: "text" }),
    defineField({ name: "ar", title: "العربية", type: "text" }),
  ],
});

/** Blog localized rich text — 9 locales for blog articles */
export const blogLocalizedBlock = defineType({
  name: "blogLocalizedBlock",
  title: "Localized Rich Text (Blog)",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "es",
      title: "Español",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "fr",
      title: "Français",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "de",
      title: "Deutsch",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "it",
      title: "Italiano",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "pt",
      title: "Português",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "zh",
      title: "中文",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ru",
      title: "Русский",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ar",
      title: "العربية",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
