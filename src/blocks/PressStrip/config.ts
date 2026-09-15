import type { Block } from 'payload'

export const PressStrip: Block = {
  slug: 'pressStrip',
  interfaceName: 'PressStripBlock',
  labels: {
    singular: 'Press Strip',
    plural: 'Press Strips',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'In the Press',
    },
    {
      name: 'quotes',
      type: 'relationship',
      relationTo: 'press-quotes',
      hasMany: true,
      admin: {
        description:
          'Choose specific quotes, or leave empty to automatically show quotes marked "Feature on homepage / Press page".',
      },
    },
  ],
}
