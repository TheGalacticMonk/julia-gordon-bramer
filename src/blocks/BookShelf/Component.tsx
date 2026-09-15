import React from 'react'
import { getPayload } from 'payload'

import type { Book, BookShelfBlock as BookShelfBlockProps } from '@/payload-types'

import config from '@payload-config'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type Props = BookShelfBlockProps & {
  className?: string
}

export const BookShelfBlock: React.FC<Props> = async ({ heading, books: selectedBooks, className }) => {
  let books = (selectedBooks || []).filter((book): book is Book => typeof book === 'object')

  if (books.length === 0) {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'books',
      depth: 1,
      limit: 6,
      where: { and: [{ _status: { equals: 'published' } }, { featured: { equals: true } }] },
    })
    books = result.docs
  }

  if (books.length === 0) return null

  return (
    <div className={cn('container', className)}>
      {heading && <h2 className="mb-6 text-2xl font-semibold">{heading}</h2>}
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {books.map((book) => (
          <li key={book.id}>
            <CMSLink
              appearance="inline"
              className="group flex flex-col gap-2"
              type="reference"
              reference={{ relationTo: 'books', value: book }}
            >
              {book.coverImage && typeof book.coverImage === 'object' && (
                <Media
                  resource={book.coverImage}
                  imgClassName="w-full rounded-sm border border-border shadow-sm transition group-hover:shadow-md"
                />
              )}
              <span className="text-sm font-medium">{book.title}</span>
              {book.publisher && (
                <span className="text-xs text-muted-foreground">
                  {book.publisher}
                  {book.publishYear ? `, ${book.publishYear}` : ''}
                </span>
              )}
            </CMSLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
