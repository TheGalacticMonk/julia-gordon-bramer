import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from 'payload'

import { revalidateTag } from 'next/cache'

import { adminOnlyField } from '../access/editorVisibility'
import { livePreviewFor } from '../utilities/livePreview'
import { anyone } from '../access/anyone'
import { admin } from '../access/admin'
import { authenticated } from '../access/authenticated'

// The homepage's "In the Press" module (PressStrip/Component.tsx) caches its featured-quotes
// query — this is the only thing that invalidates it, no other page depends on this collection.
const revalidatePressQuotes: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('press-quotes', 'max')
  }
  return doc
}

const revalidatePressQuotesDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('press-quotes', 'max')
  }
  return doc
}

export const PressQuotes: CollectionConfig = {
  slug: 'press-quotes',
  labels: {
    singular: 'Press quote',
    plural: 'In the Press',
  },
  access: {
    // Julia edits the quotes that are there; adding or removing one is a developer job.
    create: admin,
    delete: admin,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidatePressQuotes],
    afterDelete: [revalidatePressQuotesDelete],
  },
  admin: {
    useAsTitle: 'source',
    defaultColumns: ['source', 'quote', 'context'],
    group: 'Add & edit',
    livePreview: livePreviewFor('/?preview=quotes#press'),
    description:
      'The quotes shown in “In the Press” on your homepage. Open a quote to change its wording or who said it, then click Save — the preview beside it shows the homepage.',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Just the words, without quotation marks — the website adds them.',
      },
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
      admin: { condition: adminOnlyField },
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
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on homepage / Press page',
      // Julia's quotes all belong in the homepage strip, so new ones start featured and the
      // checkbox itself is developer-only.
      defaultValue: true,
      admin: { condition: adminOnlyField },
    },
  ],
}
