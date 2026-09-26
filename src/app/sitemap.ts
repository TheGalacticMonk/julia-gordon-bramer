import type { MetadataRoute } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

// Built when requested (never at build time), so it always lists the essays, books and events
// that are published right now.
export const dynamic = 'force-dynamic'

const staticPaths = ['/', '/tarot', '/books', '/decoding-sylvia-plath', '/events', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerSideURL()
  const payload = await getPayload({ config: configPromise })

  const collections = [
    { collection: 'posts', prefix: '/decoding-sylvia-plath' },
    { collection: 'books', prefix: '/books' },
    { collection: 'events', prefix: '/events' },
  ] as const

  const documents = await Promise.all(
    collections.map(async ({ collection, prefix }) => {
      const { docs } = await payload.find({
        collection,
        depth: 0,
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: { slug: true, updatedAt: true },
      })
      return docs
        .filter((doc) => Boolean(doc.slug))
        .map((doc) => ({ url: `${base}${prefix}/${doc.slug}`, lastModified: doc.updatedAt }))
    }),
  )

  return [...staticPaths.map((path) => ({ url: `${base}${path}` })), ...documents.flat()]
}
