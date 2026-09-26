'use client'

import type { ReactNode } from 'react'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { useOrigin } from '@/components/LivePreviewListener/useOrigin'

import { mergeText } from './mergeText'

type Props<T> = {
  initial: unknown
  defaults: T
  children: (text: T) => ReactNode
}

/**
 * Renders a page's copy and keeps it in step with the editor while the CMS preview is open: every
 * keystroke in the form arrives here instantly (no save or reload) and is laid over the built-in
 * defaults. Only rendered in draft mode, so regular visitors never load it.
 */
export function LivePageText<T>({ initial, defaults, children }: Props<T>) {
  const origin = useOrigin()
  // The live-preview hook sends a one-time "ready" message on mount. Before the real origin is
  // known that would target an empty string, throw, and never be retried — so wait for it.
  if (!origin) return <>{children(mergeText(defaults, initial))}</>
  return (
    <Synced origin={origin} initial={initial} defaults={defaults}>
      {children}
    </Synced>
  )
}

function Synced<T>({ origin, initial, defaults, children }: Props<T> & { origin: string }) {
  const { data } = useLivePreview<Record<string, unknown>>({
    initialData: (initial ?? {}) as Record<string, unknown>,
    serverURL: origin,
    depth: 0,
  })
  return <>{children(mergeText(defaults, data))}</>
}
