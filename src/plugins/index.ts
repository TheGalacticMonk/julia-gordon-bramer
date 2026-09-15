import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { Book, Event, Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

type SeoDoc = Book | Event | Page | Post

// The " | Julia Gordon-Bramer" suffix is added once, at render time, by generateMeta.ts
// (from the seoDefaults global) — not here, to avoid double-suffixing a title an editor
// already generated.
const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  return doc?.title || 'Julia Gordon-Bramer'
}

const collectionPathMap: Record<string, string> = {
  books: '/books',
  events: '/events',
  pages: '',
  posts: '/posts',
}

const generateURL: GenerateURL<SeoDoc> = ({ collectionSlug, doc }) => {
  const url = getServerSideURL()
  const prefix = collectionSlug ? collectionPathMap[collectionSlug] : undefined

  return doc?.slug && prefix !== undefined ? `${url}${prefix}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts', 'books', 'events'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
