import type { CollectionConfig } from 'payload'

import { admin } from '../access/admin'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const PressQuotes: CollectionConfig = {
  slug: 'press-quotes',
  labels: {
    singular: 'Press Quote',
    plural: 'Press Quotes',
  },
  access: {
    create: authenticated,
    delete: admin,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'source',
    defaultColumns: ['source', 'quote', 'relatedBook'],
    group: 'Content',
    description: 'A quote about Julia or her books, reusable across the Press page, a book’s buy box, and the homepage.',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      admin: {
        description: 'Who said it — e.g. "Riverfront Times" or "CBS Radio"',
      },
    },
    {
      name: 'sourceUrl',
      type: 'text',
      label: 'Link to the original (optional)',
    },
    {
      name: 'context',
      type: 'text',
      label: 'Context (optional)',
      admin: {
        description: 'e.g. "on Tarot Life Lessons" — shown in small type under the source',
      },
    },
    {
      name: 'relatedBook',
      type: 'relationship',
      relationTo: 'books',
      label: 'About this book (optional)',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on homepage / Press page',
      defaultValue: false,
    },
  ],
}
