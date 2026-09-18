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

export const getCollectionPath = (
  relationTo: string | undefined,
  slug: unknown,
): string => {
  const prefix = collectionPathPrefix[relationTo as keyof typeof collectionPathPrefix] ?? `/${relationTo}`
  return `${prefix}/${typeof slug === 'string' ? slug : ''}`
}
