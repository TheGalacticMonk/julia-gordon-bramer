import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const BioSplit: Block = {
  slug: 'bioSplit',
  interfaceName: 'BioSplitBlock',
  labels: {
    singular: 'Bio Split',
    plural: 'Bio Splits',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Image on the left', value: 'left' },
        { label: 'Image on the right', value: 'right' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: { maxRows: 1 },
    }),
  ],
}
