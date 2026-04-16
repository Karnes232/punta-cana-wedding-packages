/**
 * Pick the localized value for the current locale, falling back to English.
 * Works with any { en?: string | null; es?: string | null } object.
 */
export function localized(
  obj: { en?: string | null; es?: string | null } | null | undefined,
  locale: string,
): string | null {
  if (!obj) return null;
  return (obj as Record<string, string | null>)[locale] ?? obj.en ?? null;
}
