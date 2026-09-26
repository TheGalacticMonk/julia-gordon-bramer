'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import React from 'react'

import type { Event } from '@/payload-types'

import { JsonLd } from '@/components/JsonLd'
import { useOrigin } from '@/components/LivePreviewListener/useOrigin'
import RichText from '@/components/RichText'
import { formatEventDate } from '@/utilities/formatEventDate'
import { eventSchema } from '@/utilities/schemaOrg'

const eventKindLabels: Record<Event['kind'], string> = {
  reading: 'Reading',
  signing: 'Book signing',
  lecture: 'Lecture / talk',
  workshop: 'Workshop',
  fair: 'Fair / festival',
  media: 'Media appearance',
}

const eventLocation = (event: Event): string | null => {
  return event.cityOverride || null
}

export const EventContent: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <>
      <JsonLd data={eventSchema(event)} />

      <div className="container max-w-2xl">
        <p className="font-sans text-sm font-medium uppercase tracking-wide text-metal">
          {eventKindLabels[event.kind]}
        </p>
        <h1 className="mt-2 text-4xl">{event.title}</h1>

        <div className="mt-4 flex flex-col gap-1 font-sans text-ink-muted">
          <time dateTime={event.startDate}>{formatEventDate(event.startDate, event.endDate)}</time>
          {eventLocation(event) && <p>{eventLocation(event)}</p>}
        </div>

        {event.description && (
          <RichText className="mt-8 max-w-none" data={event.description} enableGutter={false} />
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-primary px-5 py-2.5 font-sans text-sm font-medium text-primary-foreground motion-safe:transition-opacity hover:opacity-90"
            >
              Tickets / registration
            </a>
          )}
          {event.ticketNote && (
            <p className="font-sans text-sm text-ink-muted">{event.ticketNote}</p>
          )}
        </div>
      </div>
    </>
  )
}

export const EventPreview: React.FC<{ initialData: Event }> = ({ initialData }) => {
  const origin = useOrigin()
  // The live-preview hook sends a one-time "ready" message on mount; before the real origin is
  // known that would target an empty string, throw, and never be retried — so wait for it.
  if (!origin) return <EventContent event={initialData} />
  return <EventSynced origin={origin} initialData={initialData} />
}

const EventSynced: React.FC<{ origin: string; initialData: Event }> = ({ origin, initialData }) => {
  const { data } = useLivePreview<Event>({ initialData, depth: 2, serverURL: origin })
  return <EventContent event={data} />
}
