/**
 * Seeds the data we can populate without inventing facts or fabricating assets:
 *
 * - The "Scholarship" category, so `/scholarship` has something to filter posts by once
 *   essays are migrated (see agency/open-questions.md, "Content migration").
 * - Redirects for the 5 confirmed top-level `.html` URLs from the live site (agency/audit.md,
 *   agency/ia.md "URL migration"). These are the only redirects backed by a fully confirmed
 *   source URL and destination — the 46 essay slugs and 33 blog post slugs are NOT seeded
 *   here because the full list was never captured (see agency/audit.md's note on the
 *   interrupted raw-content-dump), and seeding partial/guessed slugs would risk silently
 *   wrong redirects.
 * - The 3 confirmed press credentials (verbatim from agency/audit.md) as featured Press Quotes.
 * - Homepage hero + modules copy, grounded only in agency/brief.md / agency/audit.md facts —
 *   see the comments below for exactly which source backs each line.
 * - The hero portrait, uploaded from `assets/julia-gordon-bramer-profile.png` if present on
 *   disk (that folder isn't committed — this is a no-op on a machine without it).
 *
 * Deliberately NOT seeded: the BioSplit module (still needs a portrait sized/cropped for that
 * layout specifically — see open-questions.md "Brand"), Books/Events content (real cover
 * images and current tour dates don't exist in this repo), and Pages like /about, /tarot,
 * /press, /writing (real copy for those hasn't been drafted — `copy/` is still empty). The
 * homepage's Book Shelf and Event List modules are seeded with no selected items on purpose:
 * both already render nothing until real featured books / upcoming events exist, so they'll
 * "just work" once that content is added — no code or reseed needed.
 *
 * Idempotent: collections are checked before creating, and the Home global is only touched if
 * its hero is still at the untouched default, so this never clobbers real edits made in the
 * admin UI.
 */
import 'dotenv/config'

import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'

import config from '@payload-config'

// Dropped in at the repo root by the user — a real studio portrait, not a placeholder.
const heroPortraitPath = path.resolve(process.cwd(), 'assets/julia-gordon-bramer-profile.png')

const topLevelRedirects: Array<{ from: string; to: string }> = [
  { from: '/tarot.html', to: '/tarot' },
  { from: '/books.html', to: '/books' },
  { from: '/blog.html', to: '/blog' },
  { from: '/decoding-sylvia-plath.html', to: '/scholarship' },
]

// agency/audit.md, "Homepage (`/`)" — press credentials, quoted verbatim from the live site.
const pressQuotes: Array<{ quote: string; source: string; context?: string }> = [
  { quote: "St. Louis' Top Ten Psychics", source: 'Psychic St. Louis' },
  { quote: "St. Louis' Number One Fortune-Teller", source: 'CBS Radio' },
  { quote: "St. Louis' Best Local Poet", source: 'Riverfront Times', context: '2013' },
]

const lexicalParagraph = (text: string) => ({
  type: 'paragraph',
  children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const lexicalHeading = (tag: 'h2' | 'h3', text: string) => ({
  type: 'heading',
  tag,
  children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const lexicalState = (children: Array<Record<string, unknown>>) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function seed() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding "Scholarship" category…')
  const existingCategory = await payload.find({
    collection: 'categories',
    limit: 1,
    where: { slug: { equals: 'scholarship' } },
  })

  if (existingCategory.docs.length === 0) {
    await payload.create({
      collection: 'categories',
      data: { title: 'Scholarship', slug: 'scholarship' },
    })
    payload.logger.info('Created "Scholarship" category.')
  } else {
    payload.logger.info('"Scholarship" category already exists, skipping.')
  }

  payload.logger.info('Seeding top-level redirects…')
  for (const redirect of topLevelRedirects) {
    const existing = await payload.find({
      collection: 'redirects',
      limit: 1,
      where: { from: { equals: redirect.from } },
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Redirect ${redirect.from} already exists, skipping.`)
      continue
    }

    await payload.create({
      collection: 'redirects',
      context: { disableRevalidate: true },
      data: {
        from: redirect.from,
        to: { type: 'custom', url: redirect.to },
      },
    })
    payload.logger.info(`Created redirect ${redirect.from} -> ${redirect.to}`)
  }

  payload.logger.info('Seeding press quotes…')
  for (const pq of pressQuotes) {
    const existing = await payload.find({
      collection: 'press-quotes',
      limit: 1,
      where: { and: [{ quote: { equals: pq.quote } }, { source: { equals: pq.source } }] },
    })

    if (existing.docs.length > 0) {
      payload.logger.info(`Press quote "${pq.quote}" already exists, skipping.`)
      continue
    }

    await payload.create({
      collection: 'press-quotes',
      data: {
        quote: pq.quote,
        source: pq.source,
        context: pq.context,
        featured: true,
      },
    })
    payload.logger.info(`Created press quote "${pq.quote}" — ${pq.source}`)
  }

  payload.logger.info('Seeding homepage content…')
  const home = await payload.findGlobal({ slug: 'home' })

  if (home.heroSubheading) {
    payload.logger.info('Home global already has a hero subheading — leaving it as-is.')
  } else {
    await payload.updateGlobal({
      slug: 'home',
      context: { disableRevalidate: true },
      data: {
        heroSubheading: 'Professional tarot card reader and author',
        // agency/brief.md: 45+ years of tarot practice (per her own book description),
        // the 2013 Riverfront Times "Best Local Poet" award, and the tarot-and-Qabalah
        // reading of Plath's Ariel cross-referenced against Plath's own calendars,
        // letters, and journals. No claim here that isn't in the brief.
        heroRichText: lexicalState([
          lexicalParagraph(
            "A tarot reader for over 45 years, an award-winning poet, and the scholar behind a tarot-and-Qabalah reading of Sylvia Plath's Ariel — cross-referenced against Plath's own calendars, letters, and journals.",
          ),
        ]),
        links: [
          {
            link: { type: 'custom', url: '/contact', label: 'Book a Reading', appearance: 'default' },
          },
        ],
        modules: [
          {
            blockType: 'bookShelf',
            heading: 'Featured Books',
          },
          {
            blockType: 'pressStrip',
            heading: 'In the Press',
          },
          {
            blockType: 'eventList',
            heading: 'Upcoming Events',
            mode: 'upcoming',
            limit: 4,
          },
          {
            blockType: 'pullQuote',
            // agency/audit.md: quoted verbatim from the live Decoding Sylvia Plath page.
            quote: 'A belief in the occult is not necessary to understand these interpretations.',
            attribution: 'Julia Gordon-Bramer, on her interpretive method',
          },
          {
            blockType: 'cta',
            richText: lexicalState([lexicalHeading('h3', 'Read the Sylvia Plath scholarship')]),
            links: [
              {
                link: {
                  type: 'custom',
                  url: '/scholarship',
                  label: 'Explore Decoding Sylvia Plath',
                  appearance: 'default',
                },
              },
            ],
          },
          {
            blockType: 'cta',
            richText: lexicalState([
              lexicalHeading('h3', 'Book a reading, or invite Julia to speak'),
            ]),
            links: [
              {
                link: { type: 'custom', url: '/contact', label: 'Book a Reading', appearance: 'default' },
              },
              {
                link: {
                  type: 'custom',
                  url: '/contact',
                  label: 'Invite Julia to Speak',
                  appearance: 'outline',
                },
              },
            ],
          },
        ],
      },
    })
    payload.logger.info('Updated homepage hero and modules.')
  }

  payload.logger.info('Seeding hero portrait…')
  const homeForImage = await payload.findGlobal({ slug: 'home' })

  if (homeForImage.heroImage) {
    payload.logger.info('Home global already has a hero image — leaving it as-is.')
  } else if (!fs.existsSync(heroPortraitPath)) {
    payload.logger.info(`No file at ${heroPortraitPath} — skipping hero portrait seed.`)
  } else {
    const fileBuffer = fs.readFileSync(heroPortraitPath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: 'Portrait of Julia Gordon-Bramer' },
      file: {
        data: fileBuffer,
        mimetype: 'image/png',
        name: 'julia-gordon-bramer-profile.png',
        size: fileBuffer.length,
      },
    })

    await payload.updateGlobal({
      slug: 'home',
      context: { disableRevalidate: true },
      data: { heroImage: media.id },
    })
    payload.logger.info('Uploaded hero portrait and set it on the homepage.')
  }

  payload.logger.info('Seeding site nav…')
  const site = await payload.findGlobal({ slug: 'site' })

  if (site.navItems && site.navItems.length > 0) {
    payload.logger.info('Site global already has nav items — leaving it as-is.')
  } else {
    // Only routes that actually render real content today — /about, /tarot, /press, /writing
    // aren't in this list because those pages don't exist yet (see the file-level comment).
    await payload.updateGlobal({
      slug: 'site',
      context: { disableRevalidate: true },
      data: {
        navItems: [
          { link: { type: 'custom', url: '/', label: 'Home' } },
          { link: { type: 'custom', url: '/books', label: 'Books' } },
          { link: { type: 'custom', url: '/scholarship', label: 'Scholarship' } },
          { link: { type: 'custom', url: '/events', label: 'Events' } },
          { link: { type: 'custom', url: '/blog', label: 'Blog' } },
          { link: { type: 'custom', url: '/contact', label: 'Contact' } },
        ],
        bookingUrl: site.bookingUrl || '/contact',
      },
    })
    payload.logger.info('Seeded main nav.')
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
