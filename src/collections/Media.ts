import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image for screen readers and search. Required before upload.',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Files are stored in R2 (see r2Storage in payload.config.ts). Workers has no `sharp`,
    // so Payload can't generate resized variants, crop or set focal points; next/image
    // handles resizing at request time through the Cloudflare Images binding instead.
    crop: false,
    focalPoint: false,
    // Payload's file route defaults to no caching (Next.js route handlers are dynamic by
    // default). Every request re-runs Payload's full request pipeline plus a D1 lookup, so
    // without this every image view pays that cost again. Filenames are unique per upload
    // (Payload appends a suffix on collision), so long-lived immutable caching is safe.
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return headers
    },
  },
}
