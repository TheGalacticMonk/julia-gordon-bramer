import type { Metadata } from 'next'

import type { Book, Event, Media, Page, Post } from '../payload-types'

import { getCachedGlobal } from './getGlobals'
import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image: Media | number | null | undefined, fallback?: Media | number | null) => {
  const serverUrl = getServerSideURL()
  const resolved = image && typeof image === 'object' ? image : null
  const resolvedFallback = fallback && typeof fallback === 'object' ? fallback : null
  const target = resolved || resolvedFallback

  if (!target) return undefined

  const ogUrl = target.sizes?.og?.url
  return ogUrl ? serverUrl + ogUrl : serverUrl + target.url
}

export const generateMeta = async (args: {
  doc: Partial<Book> | Partial<Event> | Partial<Page> | Partial<Post> | null
  /** Full site-relative path (e.g. `/blog/my-post`). Defaults to `/${doc.slug}` for pages-style routes. */
  path?: string
}): Promise<Metadata> => {
  const { doc, path } = args
  const seoDefaults = await getCachedGlobal('seoDefaults', 1)()

  const ogImage = getImageURL(doc?.meta?.image, seoDefaults?.defaultOgImage)

  const title = doc?.meta?.title
    ? `${doc.meta.title}${seoDefaults?.titleSuffix ? ` | ${seoDefaults.titleSuffix}` : ''}`
    : seoDefaults?.titleSuffix || 'Julia Gordon-Bramer'

  const description = doc?.meta?.description || seoDefaults?.defaultDescription || undefined

  return {
    description,
    openGraph: mergeOpenGraph({
      description: description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: path ?? (doc && 'slug' in doc && typeof doc.slug === 'string' ? `/${doc.slug}` : '/'),
    }),
    title,
  }
}
