import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { generateMeta } from '@/utilities/generateMeta'
import styles from './tarot.module.css'

export default function TarotPage() {
  return (
    <article className="pb-24">
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Tarot with Julia</p>
            <h1 className={styles.title}>
              A reading is a conversation with the life you&rsquo;re already living.
            </h1>
            <p className={styles.lede}>
              Get a phone or video reading from anywhere in the world. Julia brings more than 45
              years of tarot practice to readings that are direct, thoughtful, and personal.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85"
            >
              Book a Reading
            </Link>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageFrame}>
              <Image
                src="/assets/julia-tarot-card.webp"
                alt="Julia Gordon-Bramer holding the High Priestess tarot card"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 36vw"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section-raised">
        <div className="container grid gap-8 py-16 md:grid-cols-3 md:py-24">
          <div className="reading-card p-6">
            <p className="font-sans text-sm uppercase tracking-wider text-metal">Format</p>
            <h2 className="mt-3 text-2xl">Phone or video</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              Readings are available from anywhere in the world. Fill out the contact form, email,
              or call ahead to schedule.
            </p>
          </div>
          <div className="reading-card p-6">
            <p className="font-sans text-sm uppercase tracking-wider text-metal">Rate</p>
            <h2 className="mt-3 text-2xl">$3 per minute</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              The length of a reading can meet the question. Julia will help you find the right
              shape for the conversation.
            </p>
          </div>
          <div className="reading-card p-6">
            <p className="font-sans text-sm uppercase tracking-wider text-metal">Payment</p>
            <h2 className="mt-3 text-2xl">Simple and flexible</h2>
            <p className="mt-3 leading-7 text-ink-muted">
              Payment options include Zelle, Apple Pay, Venmo, Cash App, and PayPal.
            </p>
          </div>
        </div>
      </section>
      <section className="section-base">
        <div className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
              What to bring
            </p>
            <p className="mt-5 font-display text-3xl italic leading-tight">
              A question, a crossroads, or simply some room to think.
            </p>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-ink-muted">
            <p>
              Julia&rsquo;s approach is informed by tarot as a language of images and relationships.
              The cards can help you notice patterns, name what you already know, and find a next
              step that feels like your own.
            </p>
            <p>
              Regular weekday and weeknight appointments are available, along with custom gift
              certificates and readings for gatherings or holiday parties.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85"
            >
              Schedule a reading
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: {
      meta: {
        title: 'Tarot Readings',
        description:
          'Phone and video tarot readings with Julia Gordon-Bramer, available worldwide.',
      },
      slug: 'tarot',
    },
  })
}
