import type { CollectionConfig } from 'payload'

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

import { admin } from '../../access/admin'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '../../fields/slug'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { retailerPresets } from './retailerPresets'
import { revalidateBook, revalidateDelete } from './hooks/revalidateBook'

export const Books: CollectionConfig = {
  slug: 'books',
  labels: {
    singular: 'Book',
    plural: 'Books',
  },
  access: {
    create: authenticated,
    delete: admin,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    coverImage: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publisher', 'publishYear', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'books', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'books', req }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Book details',
          fields: [
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Cover image',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'publisher',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'publishYear',
                  type: 'number',
                  label: 'Publication year',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'isbn',
              type: 'text',
              label: 'ISBN (optional)',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
          ],
        },
        {
          label: 'Buy links',
          fields: [
            {
              name: 'retailers',
              type: 'array',
              label: 'Retailer links',
              labels: { singular: 'Retailer link', plural: 'Retailer links' },
              admin: {
                initCollapsed: true,
                description: 'Add where readers can buy this book. Pick a preset store or choose "Other" to label it yourself.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'retailer',
                      type: 'select',
                      required: true,
                      defaultValue: 'bookshop',
                      options: [...retailerPresets],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Custom label',
                      admin: {
                        width: '50%',
                        condition: (_, siblingData) => siblingData?.retailer === 'other',
                      },
                    },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'Buy link URL',
                },
              ],
            },
          ],
        },
        {
          label: 'Press',
          fields: [
            {
              name: 'pressQuotes',
              type: 'relationship',
              relationTo: 'press-quotes',
              hasMany: true,
              label: 'Press quotes about this book',
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
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on homepage book shelf',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateBook],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
