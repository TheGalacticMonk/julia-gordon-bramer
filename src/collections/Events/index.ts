import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
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
import { revalidateDelete, revalidateEvent } from './hooks/revalidateEvent'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Tour date',
    plural: 'Tour dates',
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
    startDate: true,
    endDate: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'startDate', 'venue', '_status'],
    group: 'Tour',
    description: 'Readings, signings, lectures, workshops, and fairs — anything on the calendar.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'events', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'events', req }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. "Tarot Life Lessons — St. Louis Book Signing"',
      },
    },
    {
      name: 'kind',
      type: 'select',
      label: 'Event kind',
      required: true,
      defaultValue: 'reading',
      options: [
        { label: 'Reading', value: 'reading' },
        { label: 'Book signing', value: 'signing' },
        { label: 'Lecture / talk', value: 'lecture' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Fair / festival', value: 'fair' },
        { label: 'Media appearance', value: 'media' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          label: 'Start date',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayAndTime' },
          },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End date (optional)',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayAndTime' },
            description: 'Set this for multi-day events like a weekend fair.',
          },
        },
      ],
    },
    {
      name: 'venue',
      type: 'relationship',
      relationTo: 'venues',
      admin: {
        description: 'Pick an existing venue, or leave blank and fill in the city below.',
      },
    },
    {
      name: 'cityOverride',
      type: 'text',
      label: 'City (if no venue selected)',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'ticketNote',
          type: 'text',
          label: 'Ticket note',
          admin: {
            width: '50%',
            description: 'e.g. "Free, first come first served" or "$15 at the door"',
          },
        },
        {
          name: 'ticketUrl',
          type: 'text',
          label: 'Ticket / registration link',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
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
      label: 'Feature on homepage',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    ...slugField('title'),
  ],
  hooks: {
    afterChange: [revalidateEvent],
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
