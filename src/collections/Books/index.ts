import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { adminOnlyField } from '../../access/editorVisibility'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { simpleRichText } from '../../fields/simpleRichText'
import { slugField } from '../../fields/slug'
import { docPreview } from '@/utilities/livePreview'
import { retailerPresets } from './retailerPresets'
import { revalidateBook, revalidateDelete } from './hooks/revalidateBook'

export const Books: CollectionConfig = {
  slug: 'books',
  orderable: true,
  defaultSort: '_order',
  labels: {
    singular: 'Book',
    plural: 'Books',
  },
  access: {
    create: authenticated,
    delete: authenticated,
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
    description:
      'The books shown on your Books page. To add one: click “Create New”, fill in the details, then click Publish. Drag the ⋮⋮ handle in the list to change the order they appear in.',
    group: 'Add & edit',
    pagination: {
      defaultLimit: 50,
      limits: [25, 50, 100],
    },
    components: {
      beforeList: ['@/components/EnsureOrderableSort'],
    },
    livePreview: docPreview('books'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Book title',
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: { description: 'Optional — the line under the title, if the book has one.' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover image',
      admin: {
        description:
          'The front cover only (not the back or spine). When you upload it, type the book title in “Caption”.',
      },
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
      editor: simpleRichText,
      label: 'About this book',
      admin: {
        description: 'A short description. Press Enter for a new paragraph.',
      },
    },
    {
      name: 'retailers',
      type: 'array',
      label: 'Where to buy',
      labels: { singular: 'Store', plural: 'Stores' },
      admin: {
        initCollapsed: true,
        description:
          'Each store becomes a “Buy from…” button on the book’s page. Click “Add Store”, pick the store, and paste the link to the book there.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'retailer',
              type: 'select',
              label: 'Store',
              required: true,
              defaultValue: 'bookshop',
              options: [...retailerPresets],
              admin: { width: '50%' },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Store name',
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
          label: 'Link to the book',
        },
      ],
    },

    // ── Developer-only from here down ─────────────────────────────────────────────────────
    {
      name: 'pressQuotes',
      type: 'relationship',
      relationTo: 'press-quotes',
      hasMany: true,
      label: 'Press quotes about this book',
      admin: { condition: adminOnlyField },
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
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Feature on homepage book shelf',
      defaultValue: false,
      admin: { position: 'sidebar', condition: adminOnlyField },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', condition: adminOnlyField },
    },
    ...slugField('title', { slugOverrides: { admin: { condition: adminOnlyField } } }),
  ],
  hooks: {
    afterChange: [revalidateBook],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
}
