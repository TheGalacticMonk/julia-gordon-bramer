import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

// Every post is a Decoding Sylvia Plath essay. Besides the essay's own page, the section's index
// (which links each finished essay's card) has to refresh too.
const essayPath = (slug: string | null | undefined) => `/decoding-sylvia-plath/${slug}`
const INDEX_PATH = '/decoding-sylvia-plath'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = essayPath(doc.slug)

      payload.logger.info(`Revalidating essay at path: ${path}`)

      revalidatePath(path)
      revalidatePath(INDEX_PATH)
    }

    // If the essay was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = essayPath(previousDoc.slug)

      payload.logger.info(`Revalidating old essay at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath(INDEX_PATH)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(essayPath(doc?.slug))
    revalidatePath(INDEX_PATH)
  }

  return doc
}
