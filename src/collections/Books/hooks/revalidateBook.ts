import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Book } from '../../../payload-types'

export const revalidateBook: CollectionAfterChangeHook<Book> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating book at path: /books/${doc.slug}`)
      revalidatePath(`/books/${doc.slug}`)
      revalidatePath('/books')
      revalidateTag('books-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/books/${previousDoc.slug}`)
      revalidatePath('/books')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Book> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/books/${doc?.slug}`)
    revalidatePath('/books')
  }
  return doc
}
