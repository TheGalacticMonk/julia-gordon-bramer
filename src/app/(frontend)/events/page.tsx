import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Event } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { CurvedDivider } from '@/components/CurvedDivider'
import { formatEventDate } from '@/utilities/formatEventDate'
import { generateMeta } from '@/utilities/generateMeta'

export const revalidate = 600

const eventLocation = (event: Event): string | null => {
  if (event.venue && typeof event.venue === 'object') {
    return [event.venue.name, event.venue.city].filter(Boolean).join(' · ')
  }
  return event.cityOverride || null
}

const eventDateParts = (startDate: string): { month: string; day: string } => {
  const start = new Date(startDate)
  return {
    month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(start),
    day: new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(start),
  }
}

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  const [{ docs: upcoming }, { docs: past }] = await Promise.all([
    payload.find({
      collection: 'events',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      sort: 'startDate',
      where: { startDate: { greater_than_equal: now } },
    }),
    payload.find({
      collection: 'events',
      depth: 1,
      limit: 24,
      overrideAccess: false,
      sort: '-startDate',
      where: { startDate: { less_than: now } },
    }),
  ])

  return (
    <div className="pb-24">
      <div className="container pt-16 pb-12 max-w-2xl">
        <h1 className="text-4xl">Events &amp; Tour</h1>
        <p className="mt-4 text-pretty text-ink-muted">
          Readings, signings, lectures, and workshops — in the US and, when the calendar allows,
          abroad.
        </p>
      </div>

      {/* Same full-bleed alternating-tone bands + curved seam as the homepage's RenderBlocks
          sections (see that file's comments) — "Upcoming" picks up straight after the intro,
          same as the homepage's first module does after the hero, so no divider above it. */}
      <div className="bg-paper-raised py-16">
        <div className="container">
          <h2 className="mb-4 text-2xl">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="text-ink-muted">No upcoming dates right now — check back soon.</p>
          ) : (
            <ol className="flex flex-col gap-4">
              {upcoming.map((event: Event) => {
                const { month, day } = eventDateParts(event.startDate)
                return (
                  <li key={event.id} className="reading-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5">
                    <div className="tour-ribbon shrink-0">
                      <span className="tour-ribbon-month">{month}</span>
                      <span className="tour-ribbon-day">{day}</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <div>
                        <CMSLink
                          appearance="inline"
                          className="font-display text-ink underline-offset-4 hover:underline"
                          type="reference"
                          reference={{ relationTo: 'events', value: event }}
                        >
                          {event.title}
                        </CMSLink>
                        {eventLocation(event) && (
                          <p className="font-sans text-sm text-ink-muted">{eventLocation(event)}</p>
                        )}
                      </div>
                      <time dateTime={event.startDate} className="font-sans text-sm text-ink-muted">
                        {formatEventDate(event.startDate, event.endDate)}
                      </time>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>

      {past.length > 0 && (
        <div id="past" className="scroll-mt-24">
          <CurvedDivider fillClassName="fill-paper-raised" />
          <div className="py-16">
            <div className="container">
              <h2 className="mb-4 text-2xl">Past</h2>
              <ol className="flex flex-col divide-y divide-rule border-y border-rule">
                {past.map((event: Event) => (
                  <li key={event.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <CMSLink
                      appearance="inline"
                      className="font-sans text-ink-muted hover:text-ink"
                      type="reference"
                      reference={{ relationTo: 'events', value: event }}
                    >
                      {event.title}
                    </CMSLink>
                    <time dateTime={event.startDate} className="font-sans text-sm text-ink-muted">
                      {formatEventDate(event.startDate, event.endDate)}
                    </time>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: {
      meta: {
        title: 'Events & Tour',
        description: 'Upcoming readings, signings, lectures, and workshops with Julia Gordon-Bramer.',
      },
    },
    path: '/events',
  })
}
