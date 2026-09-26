import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

// Saving a page's text form refreshes that page (and the cached copy of the form itself).
export const revalidatePageText =
  (slug: string, path: string): GlobalAfterChangeHook =>
  ({ doc, previousDoc, req: { context } }) => {
    // A draft save changes nothing public (unless it un-publishes), so it doesn't touch the site.
    const publicChange = doc?._status !== 'draft' || previousDoc?._status === 'published'
    if (!context.disableRevalidate && publicChange) {
      revalidateTag(`global_${slug}`, 'max')
      revalidatePath(path)
    }
    return doc
  }
