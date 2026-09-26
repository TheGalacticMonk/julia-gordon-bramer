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
import { revalidateDelete, revalidateEvent } from './hooks/revalidateEvent'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Upcoming event',
    plural: 'Upcoming events',
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
    startDate: true,
    endDate: true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'startDate', 'cityOverride', '_status'],
    group: 'Add & edit',
    description:
      'Events shown in “Upcoming Events” on your homepage. To add one: click “Create New”, fill in the details, then click Publish. An event drops off the website by itself after its date passes.',
    livePreview: docPreview('events'),
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
      label: 'What kind of event is it?',
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
      name: 'cityOverride',
      type: 'text',
      label: 'Where is it?',
      admin: {
        description: 'Shown on the event card, e.g. “Left Bank Books, St. Louis, MO”.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: simpleRichText,
      label: 'Details (optional)',
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
    // ── Developer-only from here down ─────────────────────────────────────────────────────
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
      label: 'Feature on homepage',
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
    afterChange: [revalidateEvent],
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
