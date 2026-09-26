'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import type { Home } from '@/payload-types'

import { useOrigin } from '@/components/LivePreviewListener/useOrigin'

import { HomeView, type HomeViewProps } from './HomeView'

type Props = Omit<HomeViewProps, 'home'> & { initialHome: Home }

// Re-renders the home page as the editor types, straight from the form (no save or reload).
// Rendered only in draft mode, so this never reaches a regular visitor.
export const HomeLive = ({ initialHome, ...rest }: Props) => {
  const origin = useOrigin()
  // The live-preview hook sends a one-time "ready" message on mount; before the real origin is
  // known that would target an empty string, throw, and never be retried — so wait for it.
  if (!origin) return <HomeView home={initialHome} {...rest} />
  return <HomeSynced origin={origin} initialHome={initialHome} {...rest} />
}

const HomeSynced = ({ origin, initialHome, ...rest }: Props & { origin: string }) => {
  const { data } = useLivePreview<Home>({
    initialData: initialHome,
    serverURL: origin,
    depth: 1,
  })
  return <HomeView home={data} {...rest} />
}
