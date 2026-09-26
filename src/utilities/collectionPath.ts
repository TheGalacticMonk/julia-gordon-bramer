/**
 * Maps a Payload collection slug to its frontend URL prefix. The `posts` collection is
 * authored as "Posts" in the CMS but serves at `/blog` per agency/ia.md — every place that
 * builds a link from a collection + slug must go through this map, not string-concat the
 * collection slug directly, or it'll point at the old `/posts/...` path.
 */
export const collectionPathPrefix: Record<'pages' | 'posts' | 'books' | 'events', string> = {
  pages: '',
  posts: '/blog',
  books: '/books',
  events: '/events',
}

// Scholarship essays are Posts too (one content type for Julia to author in), but they live
// under /decoding-sylvia-plath/<slug> instead of the generic /blog/<slug> — every place that
// builds a link to a post must check the category, not just assume the posts prefix.
const SCHOLARSHIP_CATEGORY_SLUG = 'scholarship'

const isScholarshipPost = (doc: unknown): boolean => {
  if (!doc || typeof doc !== 'object') return false
  const categories = (doc as { categories?: unknown }).categories
  if (!Array.isArray(categories)) return false
  return categories.some(
    (category) =>
      typeof category === 'object' &&
      category !== null &&
      (category as { slug?: string }).slug === SCHOLARSHIP_CATEGORY_SLUG,
  )
}

export const getCollectionPath = (
  relationTo: string | undefined,
  slug: unknown,
  doc?: unknown,
): string => {
  if (relationTo === 'posts' && isScholarshipPost(doc)) {
    return `/decoding-sylvia-plath/${typeof slug === 'string' ? slug : ''}`
  }
  const prefix =
    collectionPathPrefix[relationTo as keyof typeof collectionPathPrefix] ?? `/${relationTo}`
  return `${prefix}/${typeof slug === 'string' ? slug : ''}`
}
