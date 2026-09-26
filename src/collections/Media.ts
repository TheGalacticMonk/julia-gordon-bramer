import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { adminOnlyField, hiddenFromEditors } from '../access/editorVisibility'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media Asset',
    plural: 'Media Library',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'mimeType', 'createdAt'],
    // Hidden from Julia's menu: she never browses the library, she just uploads a cover or
    // essay picture from inside the Book/Essay form (that upload box still works).
    hidden: hiddenFromEditors,
    description:
      'Images used across books, essays, pages, and the site. Use descriptive alt text so assets are easy to identify and accessible.',
    group: 'Developer',
    pagination: {
      defaultLimit: 50,
      limits: [25, 50, 100],
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Caption',
      required: true,
      admin: {
        description:
          'Shown under the picture on the website (and read aloud for people using screen readers). For a book cover, type the book title. For an essay picture, describe it, e.g. “Emmett Till in the 1956 newspaper headlines”.',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      admin: { condition: adminOnlyField },
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
