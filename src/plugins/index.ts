import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Book, Event, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

type SeoDoc = Book | Event | Post

// The " | Julia Gordon-Bramer" suffix is added once, at render time, by generateMeta.ts —
// not here, to avoid double-suffixing a title an editor
// already generated.
const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  return doc?.title || 'Julia Gordon-Bramer'
}

const collectionPathMap: Record<string, string> = {
  books: '/books',
  events: '/events',
  posts: '/decoding-sylvia-plath',
}

const generateURL: GenerateURL<SeoDoc> = ({ collectionSlug, doc }) => {
  const url = getServerSideURL()
  const prefix = collectionSlug ? collectionPathMap[collectionSlug] : undefined

  return doc?.slug && prefix !== undefined ? `${url}${prefix}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
