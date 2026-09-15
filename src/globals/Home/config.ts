import type { GlobalConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { BioSplit } from '@/blocks/BioSplit/config'
import { BookShelf } from '@/blocks/BookShelf/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { EventList } from '@/blocks/EventList/config'
import { PressStrip } from '@/blocks/PressStrip/config'
import { PullQuote } from '@/blocks/PullQuote/config'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHome } from './hooks/revalidateHome'

// Composed entirely from references to other collections (books, events, press quotes) —
// swapping the homepage's featured content never means editing a block's own copy, just
// changing which documents it points at.
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroHeading',
              type: 'text',
              required: true,
              defaultValue: 'Julia Gordon-Bramer',
            },
            {
              name: 'heroSubheading',
              type: 'text',
              admin: {
                description: 'The one-line "writer, scholar, poet, tarot reader" framing.',
              },
            },
            {
              name: 'heroRichText',
              type: 'richText',
              label: 'Hero copy (optional)',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            linkGroup({
              appearances: ['default', 'outline'],
              overrides: { maxRows: 2 },
            }),
          ],
        },
        {
          label: 'Featured modules',
          fields: [
            {
              name: 'modules',
              type: 'blocks',
              label: false,
              blocks: [BioSplit, BookShelf, EventList, PressStrip, PullQuote, CallToAction],
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
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
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
    },
  },
}
