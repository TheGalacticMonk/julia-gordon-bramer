import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHome: GlobalAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  // A draft save changes nothing public (unless it un-publishes), so it doesn't touch the site.
  const publicChange = doc?._status !== 'draft' || previousDoc?._status === 'published'
  if (!context.disableRevalidate && publicChange) {
    payload.logger.info(`Revalidating homepage`)

    // revalidatePath('/') was a no-op here: draftMode() in the homepage's data fetch forces
    // that route dynamic, so there was never a route-level cache for it to invalidate. The
    // homepage's own content (queryHome in page.tsx) is now cached the same way as the site
    // global — behind the 'global_home' tag — so it needs the matching tag-based
    // invalidation instead.
    revalidateTag('global_home', 'max')
  }

  return doc
}
