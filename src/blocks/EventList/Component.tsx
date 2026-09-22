import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'

import type { Event, EventListBlock as EventListBlockProps } from '@/payload-types'

import config from '@payload-config'
import { CMSLink } from '@/components/Link'
import { PencilIcon } from '@/components/icons/PencilIcon'
import { SectionHeading } from '@/components/SectionHeading'
import { formatEventDate } from '@/utilities/formatEventDate'
import { cn } from '@/utilities/ui'

import styles from './eventCard.module.css'

type Props = EventListBlockProps & {
  className?: string
}

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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {heading && <SectionHeading className="mb-0">{heading}</SectionHeading>}
        {/* Links to the events archive's "Past" section (src/app/(frontend)/events/page.tsx) —
            this block only ever queries upcoming events, so "history" lives on that page, not
            here. Originally a generic dark "glow card" (neon blurred blobs, rounded-lg, fixed
            h-16 w-64) — a different design language from the compact event cards and bulky
            sitting next to a text heading. Reuses .ticketButton (the small orchid CTA already
            established inside these same event cards) instead of
            inventing a third button style, so "See more" matches the site's actual geometry —
            hand-drawn blob border-radius, ink border, hard offset shadow — rather than its own
            one-off shape and shadow language. */}
        <Link href="/events#past" className={styles.ticketButton}>
          See more
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="text-ink-muted">No upcoming dates right now — check back soon.</p>
      ) : (
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const { month, day } = eventDateParts(event.startDate)
            return (
              <li key={event.id} className={styles.card}>
                <div className={cn('tour-ribbon', styles.ribbon)}>
                  <span className="tour-ribbon-month">{month}</span>
                  <span className="tour-ribbon-day">{day}</span>
                </div>
                <p className={styles.title}>
                  <PencilIcon className={cn('size-4 text-metal', styles.titleIcon)} aria-hidden="true" />
                  {event.title}
                </p>
                {eventLocation(event) && <p className={styles.meta}>{eventLocation(event)}</p>}
                <time dateTime={event.startDate} className={styles.meta}>
                  {formatEventDate(event.startDate, event.endDate)}
                </time>
                {event.ticketNote && <p className={styles.meta}>{event.ticketNote}</p>}
                <div className={styles.footer}>
                  <Link href={`/events/${event.slug}`} className={styles.exploreButton}>
                    <div className={styles.exploreButtonFace}>
                      <span className={styles.exploreButtonLabel}>Explore</span>
                    </div>
                  </Link>
                  {event.ticketUrl && (
                    <CMSLink
                      appearance="inline"
                      className={styles.ticketButton}
                      url={event.ticketUrl}
                      newTab
                      label="Tickets"
                    />
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
