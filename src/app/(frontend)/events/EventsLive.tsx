'use client'

import type { ReactNode } from 'react'

import { eventsDefaults } from '@/globals/PageText/defaults'
import { LivePageText } from '@/globals/PageText/LivePageText'

import { EventsView } from './EventsView'

export const EventsLive = ({ initial, children }: { initial: unknown; children: ReactNode }) => (
  <LivePageText initial={initial} defaults={eventsDefaults}>
    {(t) => <EventsView t={t}>{children}</EventsView>}
  </LivePageText>
)
