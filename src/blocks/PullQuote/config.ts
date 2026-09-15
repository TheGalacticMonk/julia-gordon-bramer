import type { Block } from 'payload'

export const PullQuote: Block = {
  slug: 'pullQuote',
  interfaceName: 'PullQuoteBlock',
  labels: {
    singular: 'Pull Quote',
    plural: 'Pull Quotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'attribution',
      type: 'text',
      label: 'Attribution (optional)',
      admin: {
        description: 'e.g. "Riverfront Times" or "Julia Gordon-Bramer"',
      },
    },
  ],
}
