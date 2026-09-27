import type { CollectionSlug, LivePreviewConfig } from 'payload'

import { getServerSideURL } from './getURL'

type PreviewCollection = Extract<CollectionSlug, 'posts' | 'books' | 'events'>

// Where each collection's items live on the public site.
const collectionPrefix: Record<PreviewCollection, string> = {
  posts: '/decoding-sylvia-plath',
  books: '/books',
  events: '/events',
}

const breakpoints: NonNullable<LivePreviewConfig['breakpoints']> = [
  { label: 'Phone', name: 'phone', width: 390, height: 844 },
  { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
  { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
]

// `req.origin` can report http on Cloudflare even when the admin is on https, and a browser
// refuses to load an http iframe inside an https page (the preview then hangs silently).
// `req.host` is reliable, so the scheme is derived: https everywhere except localhost.
const correctedOrigin = (req: { host?: string | null }): string => {
  if (!req.host) return getServerSideURL()
  const isLocalDev = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(req.host)
  return `${isLocalDev ? 'http' : 'https'}://${req.host}`
}

// The preview always goes through /next/preview, which checks the editor is signed in and turns
// on draft mode before opening the page.
const previewURL = (path: string, origin: string) =>
  `${origin}/next/preview?path=${encodeURIComponent(path)}`

/** Live preview of a fixed public page (page text, press quotes). */
export const livePreviewFor = (path: string): LivePreviewConfig => ({
  // The preview sits beside the editor from the moment a page opens, like a split view.
  openByDefault: true,
  breakpoints,
  url: ({ req }) => previewURL(path, correctedOrigin(req)),
})

/** Live preview of one collection item, on its own public page. */
export const docPreview = (collection: PreviewCollection): LivePreviewConfig => ({
  openByDefault: true,
  breakpoints,
  url: async ({ data, req }) => {
    // Payload re-runs this after every autosave; if it ever returned nothing the panel would
    // close. Hidden fields (like the slug) can be missing from that data, so look it up by id.
    let slug = typeof data?.slug === 'string' ? data.slug : undefined
    if (!slug && data?.id) {
      const doc = await req.payload
        .findByID({
          collection,
          id: data.id as number,
          depth: 0,
          draft: true,
          overrideAccess: true,
          select: { slug: true },
        })
        .catch(() => null)
      slug = (doc as { slug?: string } | null)?.slug
    }
    return previewURL(
      `${collectionPrefix[collection]}/${encodeURIComponent(slug ?? '')}`,
      correctedOrigin(req),
    )
  },
})
