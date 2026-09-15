import type { Block } from 'payload'

export const BookShelf: Block = {
  slug: 'bookShelf',
  interfaceName: 'BookShelfBlock',
  labels: {
    singular: 'Book Shelf',
    plural: 'Book Shelves',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Books',
    },
    {
      name: 'books',
      type: 'relationship',
      relationTo: 'books',
      hasMany: true,
      admin: {
        description:
          'Choose specific books, or leave empty to automatically show books marked "Feature on homepage book shelf".',
      },
    },
  ],
}
