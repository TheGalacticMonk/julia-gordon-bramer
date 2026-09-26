import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import type { Payload } from 'payload'

import type { Post } from '../../../payload-types'

// Scholarship essays are Posts too, but live at /decoding-sylvia-plath/<slug> instead of the
// generic /blog/<slug> (see src/utilities/collectionPath.ts) — categories arrive here as raw
// IDs, not the populated objects that let the frontend check the slug directly, so look it up.
async function postPath(payload: Payload, doc: Post): Promise<string> {
  const categoryIds = (doc.categories || []).map((c) => (typeof c === 'object' ? c.id : c))
  if (categoryIds.length > 0) {
    const scholarship = await payload.find({
      collection: 'categories',
      limit: 1,
      where: { and: [{ id: { in: categoryIds } }, { slug: { equals: 'scholarship' } }] },
    })
    if (scholarship.docs.length > 0) return `/decoding-sylvia-plath/${doc.slug}`
  }
  return `/blog/${doc.slug}`
}

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = await postPath(payload, doc)

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = await postPath(payload, previousDoc)

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = await postPath(payload, doc)

    revalidatePath(path)
    revalidateTag('posts-sitemap', 'max')
  }

  return doc
}
