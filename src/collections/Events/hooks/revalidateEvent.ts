import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Event } from '../../../payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating event at path: /events/${doc.slug}`)
      revalidatePath(`/events/${doc.slug}`)
      revalidatePath('/events')
      revalidateTag('events-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/events/${previousDoc.slug}`)
      revalidatePath('/events')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Event> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/events/${doc?.slug}`)
    revalidatePath('/events')
  }
  return doc
}
