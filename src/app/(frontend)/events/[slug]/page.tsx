import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Event } from '@/payload-types'

import { JsonLd } from '@/components/JsonLd'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { formatEventDate } from '@/utilities/formatEventDate'
import { generateMeta } from '@/utilities/generateMeta'
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
  if (event.venue && typeof event.venue === 'object') {
    return [event.venue.name, event.venue.city, event.venue.region].filter(Boolean).join(', ')
  }
  return event.cityOverride || null
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs: events } = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return events.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/events/' + decodedSlug
  const event = await queryEventBySlug({ slug: decodedSlug })

  if (!event) return <PayloadRedirects url={url} />

  const venue = event.venue && typeof event.venue === 'object' ? event.venue : null

  return (
    <article className="pt-16 pb-24">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <JsonLd data={eventSchema(event)} />

      <div className="container max-w-2xl">
        <p className="font-sans text-sm font-medium uppercase tracking-wide text-metal">
          {eventKindLabels[event.kind]}
        </p>
        <h1 className="mt-2 text-4xl">{event.title}</h1>

        <div className="mt-4 flex flex-col gap-1 font-sans text-ink-muted">
          <time dateTime={event.startDate}>{formatEventDate(event.startDate, event.endDate)}</time>
          {eventLocation(event) && <p>{eventLocation(event)}</p>}
          {venue?.address && <p>{venue.address}</p>}
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
          {event.ticketNote && <p className="font-sans text-sm text-ink-muted">{event.ticketNote}</p>}
        </div>

        {venue?.website && (
          <p className="mt-6 font-sans text-sm text-ink-muted">
            Venue:{' '}
            <a className="text-metal underline" href={venue.website} target="_blank" rel="noopener noreferrer">
              {venue.name}
            </a>
          </p>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const event = await queryEventBySlug({ slug: decodedSlug })

  return generateMeta({ doc: event, path: `/events/${decodedSlug}` })
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs?.[0] || null
})
