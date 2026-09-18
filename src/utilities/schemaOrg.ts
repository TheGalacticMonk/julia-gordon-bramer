import type { Book, Event, Media, Post } from '@/payload-types'

import { getServerSideURL } from './getURL'

const imageUrl = (image: Media | number | null | undefined): string | undefined => {
  if (!image || typeof image !== 'object') return undefined
  return image.url ? `${getServerSideURL()}${image.url}` : undefined
}

export const personSchema = (authorName: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: authorName,
  url: getServerSideURL(),
  jobTitle: ['Tarot Reader', 'Author', 'Poet'],
})

export const bookSchema = (book: Book, authorName: string) => {
  const url = `${getServerSideURL()}/books/${book.slug}`
  const cover = imageUrl(book.coverImage)

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    url,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    ...(book.publishYear ? { datePublished: String(book.publishYear) } : {}),
    ...(book.publisher ? { publisher: { '@type': 'Organization', name: book.publisher } } : {}),
    ...(cover ? { image: cover } : {}),
    ...(book.meta?.description ? { description: book.meta.description } : {}),
    author: { '@type': 'Person', name: authorName },
  }
}

export const eventSchema = (event: Event) => {
  const url = `${getServerSideURL()}/events/${event.slug}`
  const venue = event.venue && typeof event.venue === 'object' ? event.venue : null

  const location = venue
    ? {
        '@type': 'Place',
        name: venue.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: venue.city,
          ...(venue.region ? { addressRegion: venue.region } : {}),
        },
      }
    : event.cityOverride
      ? { '@type': 'Place', name: event.cityOverride }
      : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    url,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    ...(location ? { location } : {}),
    ...(event.meta?.description ? { description: event.meta.description } : {}),
    ...(event.ticketUrl ? { offers: { '@type': 'Offer', url: event.ticketUrl } } : {}),
  }
}

export const blogPostingSchema = (post: Post, authorName: string) => {
  const url = `${getServerSideURL()}/blog/${post.slug}`
  const image = imageUrl(post.heroImage) || imageUrl(post.meta?.image)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(image ? { image } : {}),
    ...(post.meta?.description ? { description: post.meta.description } : {}),
    author: { '@type': 'Person', name: authorName },
  }
}
