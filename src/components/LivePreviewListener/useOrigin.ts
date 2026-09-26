'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// The browser's own origin, known only after mount. The admin and the site share an origin, and
// the live-preview messages are only accepted from exactly that origin, so this works on
// localhost, preview deploys and production without hard-coding a domain.
export const useOrigin = (): string | null =>
  useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    (): string | null => null,
  )
