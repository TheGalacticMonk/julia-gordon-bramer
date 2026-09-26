import type { Metadata } from 'next'

import type { Book, Event, Media, Post } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getMediaUrl } from './getMediaUrl'
import { siteSeo } from './siteSeo'

const getImageURL = (image: Media | number | null | undefined) => {
  if (!image || typeof image !== 'object') return undefined
  return getMediaUrl(image.url) || undefined
}

export const generateMeta = async (args: {
  doc: Partial<Book> | Partial<Event> | Partial<Post> | null
  /** Full site-relative path (e.g. `/books/my-book`). Defaults to `/${doc.slug}` for pages-style routes. */
  path?: string
}): Promise<Metadata> => {
  const { doc, path } = args
  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc.meta.title} | ${siteSeo.titleSuffix}`
    : siteSeo.titleSuffix

  const description = doc?.meta?.description || undefined

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
