import type { Field, GlobalConfig } from 'payload'

import { simpleRichText } from '@/fields/simpleRichText'

import {
  booksDefaults,
  contactDefaults,
  decodingDefaults,
  eventsDefaults,
  tarotDefaults,
  type Card,
} from './defaults'
import { livePreviewFor } from '@/utilities/livePreview'
import { revalidatePageText } from './hooks'

// One simple form per public page. Every field is plain text (or a small rich-text box for the
// few paragraphs with italics/links) — the layout, colors and images are fixed in code, so
// nothing here can change how a page looks, only what it says. Empty boxes fall back to the
// built-in text (see getPageText.ts), and each form starts filled in with what's on the site.

const text = (name: string, label: string, defaultValue: string, description?: string): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  ...(description ? { admin: { description } } : {}),
})

const paragraph = (
  name: string,
  label: string,
  defaultValue: string,
  description?: string,
): Field => ({
  name,
  type: 'textarea',
  label,
  defaultValue,
  admin: { rows: 4, ...(description ? { description } : {}) },
})

const richParagraphs = (
  name: string,
  label: string,
  defaultValue: unknown,
  description?: string,
): Field => ({
  name,
  type: 'richText',
  label,
  editor: simpleRichText,
  defaultValue: defaultValue as never,
  ...(description ? { admin: { description } } : {}),
})

const card = (name: string, label: string, defaults: Card): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    text('label', 'Small label above the title', defaults.label),
    text('title', 'Title', defaults.title),
    paragraph('text', 'Text', defaults.text),
  ],
})

const cardList = (name: string, label: string, defaults: Card[], description?: string): Field => ({
  name,
  type: 'array',
  label,
  defaultValue: defaults,
  labels: { singular: 'Item', plural: 'Items' },
  ...(description ? { admin: { description } } : {}),
  fields: [
    text('label', 'Small label above the title', ''),
    text('title', 'Title', ''),
    paragraph('text', 'Text', ''),
  ],
})

const section = (label: string, fields: Field[], description?: string): Field => ({
  type: 'collapsible',
  label,
  admin: { initCollapsed: false, ...(description ? { description } : {}) },
  fields,
})

const pageText = (args: {
  slug: string
  label: string
  path: string
  description: string
  fields: Field[]
}): GlobalConfig => ({
  slug: args.slug,
  label: args.label,
  access: { read: () => true },
  admin: {
    group: 'Pages',
    hideAPIURL: true,
    description: args.description,
    livePreview: livePreviewFor(args.path),
    // A page always exists on the site; "Unpublish" would blank it. Drafts + History cover undo.
    components: { elements: { UnpublishButton: '@/admin/NoUnpublish' } },
  },
  fields: args.fields,
  hooks: { afterChange: [revalidatePageText(args.slug, args.path)] },
  // Edits are kept as an autosaved draft (so the preview beside the form updates as you type)
  // and only go live when Julia presses "Publish changes".
  versions: { drafts: { autosave: { interval: 800 } }, max: 50 },
})

export const TarotPage = pageText({
  slug: 'tarotPage',
  label: 'Tarot page',
  path: '/tarot',
  description:
    'The words on your Tarot page. Change any text, then press “Publish changes” to put it live. If you empty a box, the original text comes back.',
  fields: [
    section('Top of the page', [
      text('heroEyebrow', 'Small line above the heading', tarotDefaults.heroEyebrow),
      text('heroTitle', 'Big heading', tarotDefaults.heroTitle),
      paragraph('heroText', 'Introduction', tarotDefaults.heroText),
      text(
        'heroButton',
        'Button words',
        tarotDefaults.heroButton,
        'The button links to your Contact page.',
      ),
    ]),
    section('Three information boxes', [
      card('formatCard', 'First box', tarotDefaults.formatCard),
      card('rateCard', 'Second box', tarotDefaults.rateCard),
      card('paymentCard', 'Third box', tarotDefaults.paymentCard),
    ]),
    section('“What to bring” section', [
      text('bringLabel', 'Small line above the sentence', tarotDefaults.bringLabel),
      text('bringStatement', 'Large sentence', tarotDefaults.bringStatement),
      paragraph('bringText1', 'First paragraph', tarotDefaults.bringText1),
      paragraph('bringText2', 'Second paragraph', tarotDefaults.bringText2),
      text(
        'bringButton',
        'Button words',
        tarotDefaults.bringButton,
        'The button links to your Contact page.',
      ),
    ]),
  ],
})

export const DecodingPage = pageText({
  slug: 'decodingPage',
  label: 'Decoding Sylvia Plath page',
  path: '/decoding-sylvia-plath',
  description:
    'The words on the main Decoding Sylvia Plath page. (The essays themselves are under “Essays”.) Change any text, then press “Publish changes” to put it live. If you empty a box, the original text comes back.',
  fields: [
    section('Top of the page', [
      text('heroEyebrow', 'Small line above the heading', decodingDefaults.heroEyebrow),
      text('heroTitle', 'Big heading', decodingDefaults.heroTitle),
      richParagraphs(
        'heroIntro',
        'Introduction',
        decodingDefaults.heroIntro,
        'Press Enter for a new paragraph. Select words and use the buttons above for italic, bold or a link.',
      ),
      text(
        'quote',
        'Featured quote',
        decodingDefaults.quote,
        'Type just the words — the quotation marks are added for you.',
      ),
      text('quoteSource', 'Who said it', decodingDefaults.quoteSource),
      text('photoCaption', 'Caption under your photo', decodingDefaults.photoCaption),
    ]),
    section('Method section', [
      text('methodLabel', 'Small line above the sentence', decodingDefaults.methodLabel),
      text('methodStatement', 'Large sentence', decodingDefaults.methodStatement),
      richParagraphs('methodText', 'Text', decodingDefaults.methodText),
    ]),
    section('Academic credentials', [
      text('credentialsLabel', 'Section heading', decodingDefaults.credentialsLabel),
      cardList(
        'credentials',
        'Credentials',
        decodingDefaults.credentials,
        'Add, remove, or reorder as many as you like.',
      ),
    ]),
    section('Essay list', [
      text('essaysLabel', 'Small line above the sentence', decodingDefaults.essaysLabel),
      text(
        'essaysHeading',
        'Words after the number of essays',
        decodingDefaults.essaysHeading,
        'The number of essays is added automatically in front of this, e.g. “40 essays so far, one per 1956 poem.”',
      ),
      text('essaysNote', 'Short note beside the list', decodingDefaults.essaysNote),
    ]),
  ],
})

export const BooksPage = pageText({
  slug: 'booksPage',
  label: 'Books page',
  path: '/books',
  description:
    'The heading and introduction at the top of your Books page. (The books themselves are under “Books”.) Press “Publish changes” and it goes live.',
  fields: [
    text('heading', 'Heading', booksDefaults.heading),
    paragraph(
      'intro',
      'Introduction',
      booksDefaults.intro,
      'Tip: if you add or remove a book, check this sentence still matches.',
    ),
  ],
})

export const EventsPage = pageText({
  slug: 'eventsPage',
  label: 'Events page',
  path: '/events',
  description:
    'The heading and introduction at the top of your Events page. (Individual events are under “Upcoming events”.) Press “Publish changes” and it goes live.',
  fields: [
    text('heading', 'Heading', eventsDefaults.heading),
    paragraph('intro', 'Introduction', eventsDefaults.intro),
  ],
})

export const ContactPage = pageText({
  slug: 'contactPage',
  label: 'Contact page',
  path: '/contact',
  description: 'The words on your Contact page. Press “Publish changes” and it goes live.',
  fields: [
    text('eyebrow', 'Small line above the heading', contactDefaults.eyebrow),
    text('heading', 'Heading', contactDefaults.heading),
    paragraph('intro', 'Introduction', contactDefaults.intro),
    paragraph(
      'successMessage',
      'Thank-you message',
      contactDefaults.successMessage,
      'Shown to a visitor right after they send you a message.',
    ),
  ],
})
