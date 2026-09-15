import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ImageBlock: Block = {
  slug: 'imageBlock',
  interfaceName: 'ImageBlock',
  labels: {
    singular: 'Image / Image Pair',
    plural: 'Images',
  },
  fields: [
    {
      name: 'layout',
      type: 'radio',
      defaultValue: 'single',
      options: [
        { label: 'Single image', value: 'single' },
        { label: 'Image pair', value: 'pair' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'imageTwo',
      type: 'upload',
      relationTo: 'media',
      label: 'Second image',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'pair',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
}
