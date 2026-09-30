import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { richText } from './lexical'

// The site's page text as it stands today. Each page reads its copy from a CMS form (see
// configs.ts) and falls back to these values for anything left empty, so a page can never end up
// blank. The same objects are the forms' starting values, so Julia opens a form and sees exactly
// what's on the site. Edit here to change the fallback, not what's already been saved in the CMS.

export type Card = { label: string; title: string; text: string }

export const tarotDefaults = {
  heroEyebrow: 'Tarot with Julia',
  heroTitle: 'A reading is a conversation with the life you’re already living.',
  heroText:
    'Get a phone or video reading from anywhere in the world. Julia brings more than 45 years of tarot practice to readings that are direct, thoughtful, and personal.',
  heroButton: 'Book a Reading',
  formatCard: {
    label: 'Format',
    title: 'Phone or video',
    text: 'Readings are available from anywhere in the world. Fill out the contact form, email, or call ahead to schedule.',
  } as Card,
  rateCard: {
    label: 'Rate',
    title: '$3 per minute',
    text: 'The length of a reading can meet the question. Julia will help you find the right shape for the conversation.',
  } as Card,
  paymentCard: {
    label: 'Payment',
    title: 'Simple and flexible',
    text: 'Payment options include Zelle, Apple Pay, Venmo, Cash App, and PayPal.',
  } as Card,
  bringLabel: 'What to bring',
  bringStatement: 'A question, a crossroads, or simply some room to think.',
  bringText1:
    'Julia’s approach is informed by tarot as a language of images and relationships. The cards can help you notice patterns, name what you already know, and find a next step that feels like your own.',
  bringText2:
    'Regular weekday and weeknight appointments are available, along with custom gift certificates and readings for gatherings or holiday parties.',
  bringButton: 'Schedule a reading',
}

export const decodingDefaults = {
  heroEyebrow: 'An ongoing project',
  heroTitle: 'Decoding Sylvia Plath',
  heroIntro: richText([
    'Welcome to Julia Gordon-Bramer’s page on Sylvia Plath’s early poems. She has done a lot of work over the past decade and a half on Plath’s poetry. Plath’s early poems are often ignored as her training ground in finding her voice — here, she shows how that early work has great value, and mystery. In her first book, ',
    { link: 'Fixed Stars Govern a Life', href: '/books/fixed-stars-govern-a-life' },
    ' (2014), and subsequently ',
    { link: '“Lady Lazarus”', href: '/books/decoding-sylvia-plaths-lady-lazarus' },
    ' and ',
    { link: '“Daddy”', href: '/books/decoding-sylvia-plaths-daddy' },
    ' (both 2017), she reveals new interpretations and multi-layered dimensions of Plath’s poetry through the use of the tarot and Qabalah. It was only natural to go back and see whether Plath had done the same in her early work, especially the poems written before her mystical masterpiece, ',
    { italic: 'Ariel' },
    '. Below: how Sylvia Plath incorporated news stories, celebrity gossip, and art into her early works — and, maybe most exciting, how many of these poems are documents of her prescience.',
  ]) as DefaultTypedEditorState,
  quote: 'I want to write at least ten good news poems….',
  quoteSource: 'Sylvia Plath, in a letter to her mother, Monday, 25 April 1955',
  photoCaption: 'Working from Plath’s own calendars, letters, and journals.',
  methodLabel: 'Method',
  methodStatement: 'Cast the poem against the news of the day.',
  methodText: richText(
    [
      '“A belief in the occult is not necessary to understand these interpretations of Plath’s early work,” she writes. “A simple guideline is to cast the time of the poem’s writing against personal, academic, and news events of Plath’s day, often recorded in her calendar, letters, and journals.” Those calendars and journals are held in the Sylvia Plath archives at the Lilly Library, Indiana University–Bloomington.',
    ],
    [
      'The essays currently cover Plath’s poems from 1956 — the year she and Ted Hughes met, married, and honeymooned in Benidorm, Spain — with 1957 planned next. “I will be working on this site for a while,” she writes, “uploading each year of my Early Poems work as I get to it.” Because of copyright restrictions she can’t reprint the poems themselves, so each essay is written to be read alongside your own copy of ',
      { italic: 'The Collected Poems of Sylvia Plath' },
      '.',
    ],
  ) as DefaultTypedEditorState,
  credentialsLabel: 'Academic credentials',
  credentials: [
    {
      label: 'Teaching',
      title: 'Lindenwood University',
      text: 'Graduate-level creative writing, St. Louis, Missouri.',
    },
    {
      label: 'Journal',
      title: 'Plath Profiles',
      text: 'Contributor, volumes 2, 3, 4, 5, and 7.',
    },
    {
      label: 'Conference',
      title: 'UW–Milwaukee',
      text: 'Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.',
    },
  ] as Card[],
  essaysLabel: 'The essays',
  essaysHeading: 'essays so far, one per 1956 poem.',
  essaysNote: 'Select any essay to read it in full.',
}

export const booksDefaults = {
  heading: 'Books',
  intro:
    'Five books across three publishers — a trade-press tarot guide and Plath biography, two chapbook-scale Plath essay collections, and the foundational academic study that started it all.',
}

export const eventsDefaults = {
  heading: 'Events & Tour',
  intro:
    'Readings, signings, lectures, and workshops — in the US and, when the calendar allows, abroad.',
}

export const contactDefaults = {
  eyebrow: 'Get in touch',
  heading: 'Contact',
  intro:
    'Booking a reading, inviting Julia to speak, or writing as press — tell her which, and she’ll get back to you directly.',
  successMessage:
    'Thank you — your message is on its way. Julia replies personally, so it may take a few days.',
}
