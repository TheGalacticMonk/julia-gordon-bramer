/**
 * Maps a Payload collection slug to its frontend URL prefix. Every place that builds a link from
 * a collection + slug must go through this map, not string-concat the collection slug directly.
 *
 * `posts` is authored as "Essays" in the CMS — the site has no blog, so every post is a Decoding
 * Sylvia Plath essay and lives under that section.
 */
const collectionPathPrefix: Record<'posts' | 'books' | 'events', string> = {
  posts: '/decoding-sylvia-plath',
  books: '/books',
  events: '/events',
}

export const getCollectionPath = (relationTo: string | undefined, slug: unknown): string => {
  const prefix =
    collectionPathPrefix[relationTo as keyof typeof collectionPathPrefix] ?? `/${relationTo}`
  return `${prefix}/${typeof slug === 'string' ? slug : ''}`
}
