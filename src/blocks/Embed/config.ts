import type { Block } from 'payload'

import { embedProviderOptions } from './providers'

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  labels: {
    singular: 'Embed',
    plural: 'Embeds',
  },
  fields: [
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: [...embedProviderOptions],
      admin: {
        description: 'Only these providers are allowed to embed on the site.',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Video / episode URL',
      admin: {
        description: 'Paste the normal share link from the provider you selected above.',
      },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
