const isRichText = (value: unknown): boolean =>
  Boolean(value) && typeof value === 'object' && 'root' in (value as object)

/**
 * Overlays what Julia saved in the CMS onto the built-in defaults, field by field. A text box she
 * has emptied (or never touched) falls back to the default, so a page can't end up with a blank
 * heading or paragraph.
 */
export function mergeText<T>(defaults: T, saved: unknown): T {
  if (typeof defaults === 'string') {
    return (typeof saved === 'string' && saved.trim() ? saved : defaults) as T
  }
  if (isRichText(defaults)) {
    return (isRichText(saved) ? saved : defaults) as T
  }
  // A repeatable list (e.g. Academic credentials): Julia's saved rows replace the built-in
  // ones wholesale — items aren't merged field-by-field, since the list's length is hers to
  // control (add/remove a row). Falls back to the defaults only until she's saved anything.
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) && saved.length > 0 ? saved : defaults) as T
  }
  if (defaults && typeof defaults === 'object') {
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(defaults)) {
      out[key] = mergeText(
        (defaults as Record<string, unknown>)[key],
        (saved as Record<string, unknown> | null | undefined)?.[key],
      )
    }
    return out as T
  }
  return defaults
}
