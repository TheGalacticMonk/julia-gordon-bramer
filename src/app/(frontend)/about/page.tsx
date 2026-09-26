import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { generateMeta } from '@/utilities/generateMeta'

export default function AboutPage() {
  return (
    <article className="pb-24">
      <section className="section-base">
        <div className="container grid gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24">
          <div className="max-w-2xl">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">About Julia</p>
            <h1 className="mt-4 text-5xl leading-[0.95] sm:text-7xl">A life in words, symbols, and stories.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink-muted">
              Julia Gordon-Bramer is a writer, scholar, poet, and professional tarot reader whose work brings literary attention and lived experience into the same room.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-sm border border-metal/60 bg-paper-raised">
            <Image src="/assets/julia-about.jpg" alt="Julia Gordon-Bramer" fill priority sizes="(max-width: 768px) 90vw, 38vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-raised">
        <div className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">The short version</p>
            <p className="mt-5 font-display text-3xl italic leading-tight">Curiosity is a practice.</p>
          </div>
          <div className="payload-richtext max-w-2xl space-y-6 text-lg leading-8 text-ink-muted">
            <p>Julia has spent more than fifteen years interpreting Sylvia Plath&rsquo;s poetry through mysticism, tarot, and the Qabalah. Her scholarship looks for the structures, symbols, and historical resonances that a strictly biographical reading can leave out.</p>
            <p>Her tarot readings are similarly expansive: grounded, conversational, and shaped by studies of Buddhism, Qabalah, A Course in Miracles, the Tao, the Bible, and other traditions. She regularly travels throughout the United States and the United Kingdom to talk about tarot, Plath, writing, and the places where they meet.</p>
            <p>She has taught creative writing at St. Louis Community College and in Lindenwood University&rsquo;s graduate Creative Writing Program. She lives and works in St. Louis, Missouri.</p>
          </div>
        </div>
      </section>

      <section className="section-base">
        <div className="container flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="text-3xl">Want to work together?</h2><p className="mt-2 text-ink-muted">Book a reading, invite Julia to speak, or ask about her writing.</p></div>
          <Link href="/contact" className="w-fit border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85">Get in touch</Link>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({ doc: { meta: { title: 'About Julia Gordon-Bramer', description: 'Writer, scholar, poet, and professional tarot reader Julia Gordon-Bramer.' }, slug: 'about' } })
}
