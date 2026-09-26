import type { FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string' && value) {
      return formatSlug(value)
    }

    // The slug is the page's URL: once a document has one, never regenerate it just because the
    // form didn't send it back (e.g. the field is hidden from editors) — that would silently
    // change the URL every time the title is edited.
    if (originalDoc?.slug && typeof originalDoc.slug === 'string') {
      return originalDoc.slug
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return formatSlug(fallbackData)
      }
    }

    return value
  }
