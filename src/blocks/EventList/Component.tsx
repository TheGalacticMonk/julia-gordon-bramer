import React from 'react'
import { getPayload } from 'payload'

import type { Event, EventListBlock as EventListBlockProps } from '@/payload-types'

import config from '@payload-config'
import { CMSLink } from '@/components/Link'
import { formatEventDate } from '@/utilities/formatEventDate'
import { cn } from '@/utilities/ui'

type Props = EventListBlockProps & {
  className?: string
}

const eventLocation = (event: Event): string | null => {
  if (event.venue && typeof event.venue === 'object') {
    return [event.venue.name, event.venue.city].filter(Boolean).join(' · ')
  }
  return event.cityOverride || null
}

export const EventListBlock: React.FC<Props> = async ({
  heading,
  mode = 'upcoming',
  limit = 6,
  events: selectedEvents,
  className,
}) => {
  let events: Event[] = []

  if (mode === 'selected') {
    events = (selectedEvents || []).filter(
      (event): event is Event => typeof event === 'object',
    )
  } else {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'events',
      depth: 1,
      limit: limit || 6,
      sort: 'startDate',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { startDate: { greater_than_equal: new Date().toISOString() } },
        ],
      },
    })
    events = result.docs
  }

  return (
    <div className={cn('container', className)}>
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      {events.length === 0 ? (
        <p className="text-muted-foreground">No upcoming dates right now — check back soon.</p>
      ) : (
        <ol className="flex flex-col divide-y divide-border border-y border-border">
          {events.map((event) => (
            <li key={event.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <div>
                <p className="font-medium">{event.title}</p>
                {eventLocation(event) && (
                  <p className="text-sm text-muted-foreground">{eventLocation(event)}</p>
                )}
                {event.ticketNote && (
                  <p className="text-sm text-muted-foreground">{event.ticketNote}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <time dateTime={event.startDate} className="text-sm">
                  {formatEventDate(event.startDate, event.endDate)}
                </time>
                {event.ticketUrl && (
                  <CMSLink appearance="outline" size="sm" url={event.ticketUrl} newTab label="Tickets" />
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
