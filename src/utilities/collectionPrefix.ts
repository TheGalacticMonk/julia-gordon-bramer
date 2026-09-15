// Single source of truth for "which collection maps to which URL prefix" — every place that
// turns a document reference into a link (CMSLink, rich text internal links, live-preview
// paths, redirect generation) should read from here instead of re-deriving the mapping.
export const collectionPrefixMap: Record<string, string> = {
  pages: '',
  posts: '/blog',
  books: '/books',
  events: '/events',
}

export const collectionUrl = (collection: string, slug: string): string => {
  const prefix = collectionPrefixMap[collection] ?? `/${collection}`
  return `${prefix}/${slug}`.replace(/\/{2,}/g, '/')
}
