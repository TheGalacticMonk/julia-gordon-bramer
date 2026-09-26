import type { GlobalConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { adminOnlyField } from '@/access/editorVisibility'
import { BioSplit } from '@/blocks/BioSplit/config'
import { BookShelf } from '@/blocks/BookShelf/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { EventList } from '@/blocks/EventList/config'
import { PressStrip } from '@/blocks/PressStrip/config'
import { PullQuote } from '@/blocks/PullQuote/config'
import { simpleRichText } from '@/fields/simpleRichText'
import { linkGroup } from '@/fields/linkGroup'
import { livePreviewFor } from '@/utilities/livePreview'
import { revalidateHome } from './hooks/revalidateHome'

// Composed entirely from references to other collections (books, events, press quotes) —
// swapping the homepage's featured content never means editing a block's own copy, just
// changing which documents it points at. Julia only sees the homepage's text; the photos, hero
// buttons, section layout ("modules") and SEO are developer-only so nothing she edits can change
// how the page is put together.
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Pages',
    hideAPIURL: true,
    // A page always exists on the site; "Unpublish" would blank it.
    components: { elements: { UnpublishButton: '@/admin/NoUnpublish' } },
    livePreview: livePreviewFor('/'),
    description:
      'The words at the top of your homepage and in the “About” card near the bottom. Change the text, then press “Publish changes”. (Upcoming events and quotes are managed under “Add & edit”.)',
  },
  fields: [
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Your name (big heading)',
      required: true,
      defaultValue: 'Julia Gordon-Bramer',
      admin: {
        description: 'Type first and last name. The last name automatically appears in italics.',
      },
    },
    {
      name: 'heroSubheading',
      type: 'text',
      label: 'Line under your name',
      admin: {
        description: 'One short line, e.g. “Professional tarot card reader and author”.',
      },
    },
    {
      name: 'heroRichText',
      type: 'richText',
      label: 'Short introduction',
      editor: simpleRichText,
      admin: {
        description: 'A few sentences shown beside your photo at the very top of the homepage.',
      },
    },
    {
      name: 'aboutRichText',
      label: 'About text',
      type: 'richText',
      editor: simpleRichText,
      admin: {
        description:
          'The longer “About” card just above the footer. Press Enter for a new paragraph.',
      },
    },

    // ── Developer-only from here down ─────────────────────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: { condition: adminOnlyField },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 2, admin: { condition: adminOnlyField } },
    }),
    {
      name: 'modules',
      type: 'blocks',
      label: 'Homepage sections',
      blocks: [BioSplit, BookShelf, EventList, PressStrip, PullQuote, CallToAction],
      admin: { initCollapsed: true, condition: adminOnlyField },
    },
    {
      name: 'aboutImage',
      label: 'About section avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: adminOnlyField,
        description: 'Falls back to the hero photo if left empty.',
      },
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
      admin: { condition: adminOnlyField },
      fields: [
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
        MetaTitleField({ hasGenerateFn: true }),
        MetaImageField({ relationTo: 'media' }),
        MetaDescriptionField({}),
        PreviewField({
          hasGenerateFn: true,
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
  },
}
