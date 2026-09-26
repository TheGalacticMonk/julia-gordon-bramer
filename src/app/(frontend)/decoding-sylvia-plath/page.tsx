import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { scholarshipEssays } from './essays'
import styles from './scholarship.module.css'

export const revalidate = 600

export default async function ScholarshipPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 1,
    overrideAccess: false,
    where: { slug: { equals: 'scholarship' } },
  })

  const scholarshipCategory = categories[0]

  const { docs: migratedEssays } = scholarshipCategory
    ? await payload.find({
        collection: 'posts',
        depth: 0,
        limit: 100,
        overrideAccess: false,
        select: { slug: true },
        where: { categories: { in: [scholarshipCategory.id] } },
      })
    : { docs: [] }

  // Cards for essays that already have a real post get linked to it; the rest stay inert until
  // migrated (see src/seed/index.ts's `essays` array — that's where the next one gets added).
  const migratedSlugs = new Set(migratedEssays.map((post) => post.slug))

  return (
    <>
      <section className={styles.hero}>
        <div className="container py-16 lg:py-24">
          <div className="grid gap-y-12 gap-x-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className={`max-w-2xl ${styles.heroCopy}`}>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
                An ongoing project
              </p>
              <h1 className="mt-2 text-5xl leading-[0.95] sm:text-6xl">Decoding Sylvia Plath</h1>
              {/* Verbatim (lightly trimmed of Weebly whitespace artifacts) from the welcome post
                at the top of juliagordonbramer.com/decoding-sylvia-plath — her own words, not a
                paraphrase. */}
              <p className="mt-4 text-pretty text-ink-muted">
                Welcome to Julia Gordon-Bramer&rsquo;s page on Sylvia Plath&rsquo;s early poems. She
                has done a lot of work over the past decade and a half on Plath&rsquo;s poetry.
                Plath&rsquo;s early poems are often ignored as her training ground in finding her
                voice — here, she shows how that early work has great value, and mystery. In her
                first book,{' '}
                <Link
                  href="/books/fixed-stars-govern-a-life"
                  className="underline underline-offset-2"
                >
                  Fixed Stars Govern a Life
                </Link>{' '}
                (2014), and subsequently{' '}
                <Link
                  href="/books/decoding-sylvia-plaths-lady-lazarus"
                  className="underline underline-offset-2"
                >
                  &ldquo;Lady Lazarus&rdquo;
                </Link>{' '}
                and{' '}
                <Link
                  href="/books/decoding-sylvia-plaths-daddy"
                  className="underline underline-offset-2"
                >
                  &ldquo;Daddy&rdquo;
                </Link>{' '}
                (both 2017), she reveals new interpretations and multi-layered dimensions of
                Plath&rsquo;s poetry through the use of the tarot and Qabalah. It was only natural
                to go back and see whether Plath had done the same in her early work, especially the
                poems written before her mystical masterpiece, <em>Ariel</em>. Below: how Sylvia
                Plath incorporated news stories, celebrity gossip, and art into her early works —
                and, maybe most exciting, how many of these poems are documents of her prescience.
              </p>

              <figure className="pull-quote mt-10">
                <blockquote>
                  &ldquo;I want to write at least ten good news poems&hellip;.&rdquo;
                </blockquote>
                <figcaption>
                  Sylvia Plath, in a letter to her mother, Monday, 25 April 1955
                </figcaption>
              </figure>
            </div>

            <div className={styles.heroPhotoWrap}>
              <div className={styles.heroPhotoHalo} aria-hidden="true" />
              <div className={styles.heroPhotoFrame}>
                <Image
                  src="/assets/julia-stems.webp"
                  alt="Julia Gordon-Bramer"
                  fill
                  priority
                  sizes="(max-width: 768px) 70vw, 26rem"
                  className="object-cover"
                />
              </div>
              <p className={styles.heroPhotoCaption}>
                Working from Plath&rsquo;s own calendars, letters, and journals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-raised">
        <div className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
              Method
            </p>
            <p className="mt-5 font-display text-3xl italic leading-tight">
              Cast the poem against the news of the day.
            </p>
          </div>
          {/* Drawn from her essay "History and a Case for Prescience," the series' own
              introduction (verbatim quotes, her words) — this is where the "ongoing project,
              uploaded year by year" shape of the site actually comes from. */}
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-ink-muted">
            <p>
              &ldquo;A belief in the occult is not necessary to understand these interpretations of
              Plath&rsquo;s early work,&rdquo; she writes. &ldquo;A simple guideline is to cast the
              time of the poem&rsquo;s writing against personal, academic, and news events of
              Plath&rsquo;s day, often recorded in her calendar, letters, and journals.&rdquo; Those
              calendars and journals are held in the Sylvia Plath archives at the Lilly Library,
              Indiana University&ndash;Bloomington.
            </p>
            <p>
              The essays currently cover Plath&rsquo;s poems from 1956 — the year she and Ted Hughes
              met, married, and honeymooned in Benidorm, Spain — with 1957 planned next. &ldquo;I
              will be working on this site for a while,&rdquo; she writes, &ldquo;uploading each
              year of my Early Poems work as I get to it.&rdquo; Because of copyright restrictions
              she can&rsquo;t reprint the poems themselves, so each essay is written to be read
              alongside your own copy of <em>The Collected Poems of Sylvia Plath</em>.
            </p>
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container py-16 md:py-24">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
            Academic credentials
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <li className="reading-card p-6">
              <p className="font-sans text-sm uppercase tracking-wider text-metal">Teaching</p>
              <h2 className="mt-3 text-2xl">Lindenwood University</h2>
              <p className="mt-3 leading-7 text-ink-muted">
                Graduate-level creative writing, St. Louis, Missouri.
              </p>
            </li>
            <li className="reading-card p-6">
              <p className="font-sans text-sm uppercase tracking-wider text-metal">Journal</p>
              <h2 className="mt-3 text-2xl">Plath Profiles</h2>
              <p className="mt-3 leading-7 text-ink-muted">
                Contributor, volumes 2, 3, 4, 5, and 7.
              </p>
            </li>
            <li className="reading-card p-6">
              <p className="font-sans text-sm uppercase tracking-wider text-metal">Conference</p>
              <h2 className="mt-3 text-2xl">UW&ndash;Milwaukee</h2>
              <p className="mt-3 leading-7 text-ink-muted">
                Presenter, Racial Formation/Racial Awareness Graduate Conference, 2014.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section-raised">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
                The essays
              </p>
              <p className="mt-2 font-display text-3xl italic leading-tight">
                {scholarshipEssays.length} essays so far, one per 1956 poem.
              </p>
            </div>
            <p className="max-w-sm text-sm text-ink-muted">
              Titles, excerpts, and images pulled from the live essay archive. Full essay text (with
              footnotes) is being migrated one poem at a time — check back as more come online.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scholarshipEssays.map((essay) => {
              const isMigrated =
                essay.migrated || Boolean(essay.paragraphs) || migratedSlugs.has(essay.slug)
              const card = (
                <>
                  <div className="relative aspect-square w-full overflow-hidden bg-paper-raised">
                    <Image
                      src={essay.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-base leading-snug text-ink">{essay.title}</p>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">{essay.excerpt}</p>
                    {isMigrated && (
                      <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-wider text-metal">
                        Read the essay →
                      </p>
                    )}
                  </div>
                </>
              )

              return (
                <li key={essay.slug} className="reading-card flex h-full flex-col gap-3 p-4">
                  {isMigrated ? (
                    <Link
                      href={`/decoding-sylvia-plath/${essay.slug}`}
                      className="flex h-full flex-col gap-3"
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export async function generateMetadata() {
  return generateMeta({
    doc: {
      meta: {
        title: 'Decoding Sylvia Plath',
        description:
          "Julia Gordon-Bramer's ongoing essay series decoding Sylvia Plath's early poems, one poem at a time, cross-referenced against the news and events of the day each was written.",
      },
    },
    path: '/decoding-sylvia-plath',
  })
}
