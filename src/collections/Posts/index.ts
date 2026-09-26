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
import { docPreview } from '@/utilities/livePreview'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

// The site has no blog: every "post" is a Decoding Sylvia Plath essay, so this collection is
// presented to Julia as "Essays" and everything she doesn't need (SEO, the URL) is developer-only.
export const Posts: CollectionConfig = {
  slug: 'posts',
  orderable: true,
  defaultSort: '_order',
  labels: {
    singular: 'Essay',
    plural: 'Essays',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // NOTE: the slug generic (CollectionConfig<'pages'>) is dropped to work around a TypeScript 6
  // regression where a slug-typed config's defaultPopulate is not assignable to buildConfig's
  // collections array. defaultPopulate falls back to SelectType (keys no longer field-checked);
  // restore the generic once the core types are fixed.
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'publishedAt', '_status'],
    description:
      'Your Decoding Sylvia Plath essays. To add one: click “Create New”, add the title, a picture and the text, then click Publish. Drag the ⋮⋮ handle in the list to change the order they appear in.',
    group: 'Add & edit',
    pagination: {
      defaultLimit: 50,
      limits: [25, 50, 100],
    },
    components: {
      beforeList: ['@/components/EnsureOrderableSort'],
    },
    livePreview: docPreview('posts'),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Essay title',
      required: true,
      admin: {
        description: 'The big heading at the top of the essay, e.g. “Street Song”: Double Jeopardy',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Picture',
      admin: {
        description:
          'One picture for the essay (a photo, newspaper clipping, cartoon…). It is always shown in full — nothing gets cropped. When you upload it, the “Caption” you type appears under the picture.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: simpleRichText,
      label: 'Essay text',
      required: true,
      admin: {
        description:
          'Type or paste the essay here. Press Enter for a new paragraph. Use the buttons above for bold, italic or links.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date shown on the essay',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
        description: 'Optional. Leave blank to use the day you publish.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
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
        MetaTitleField({
          hasGenerateFn: true,
        }),
        MetaImageField({
          relationTo: 'media',
        }),

        MetaDescriptionField({}),
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
        }),
      ],
    },
    ...slugField('title', { slugOverrides: { admin: { condition: adminOnlyField } } }),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800, // The live preview updates from the form itself; autosave only keeps the draft
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
