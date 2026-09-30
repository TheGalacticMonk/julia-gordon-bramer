import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Event } from '../../../payload-types'

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // Calling revalidateTag/revalidatePath unconditionally on every save (including the
    // draft autosave that fires mid-render when a new Event's "Add New" page first loads)
    // crashes that render — Next.js forbids revalidating during render. Only revalidate when
    // an Event's published state actually changed, same as the /events path calls below.
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating event at path: /events/${doc.slug}`)
      revalidatePath(`/events/${doc.slug}`)
      revalidatePath('/events')
      revalidateTag('events-sitemap', 'max')
      // The homepage's Upcoming module (EventList/Component.tsx) caches its query separately
      // from the /events path above.
      revalidateTag('homepage-events', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/events/${previousDoc.slug}`)
      revalidatePath('/events')
      revalidateTag('homepage-events', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Event> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/events/${doc?.slug}`)
    revalidatePath('/events')
    revalidateTag('homepage-events', 'max')
  }
  return doc
}
