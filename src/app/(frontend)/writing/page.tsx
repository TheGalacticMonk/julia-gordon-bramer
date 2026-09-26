import type { Metadata } from 'next'
import Link from 'next/link'

import { generateMeta } from '@/utilities/generateMeta'

export default function WritingPage() {
  return <article className="pb-24">
    <section className="section-base"><div className="container max-w-4xl py-16 md:py-24"><p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">Writing &amp; poetry</p><h1 className="mt-4 text-5xl leading-[0.95] sm:text-7xl">Making meaning from the strange, beautiful parts.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-ink-muted">Julia writes across poetry, memoir, literary criticism, and the everyday stories that make a life.</p></div></section>
    <section className="section-raised"><div className="container grid gap-8 py-16 md:grid-cols-3 md:py-24">
      <div className="reading-card p-6"><p className="font-sans text-sm uppercase tracking-wider text-metal">Poetry</p><h2 className="mt-3 text-2xl">Original poems</h2><p className="mt-3 leading-7 text-ink-muted">A creative practice alongside the scholarship: intimate, alert, and open to the uncanny.</p></div>
      <div className="reading-card p-6"><p className="font-sans text-sm uppercase tracking-wider text-metal">Memoir</p><h2 className="mt-3 text-2xl">Night Times</h2><p className="mt-3 leading-7 text-ink-muted">A memoir of running a music magazine in St. Louis&rsquo; 1990s alternative-rock scene as a single mother.</p></div>
      <div className="reading-card p-6"><p className="font-sans text-sm uppercase tracking-wider text-metal">On the blog</p><h2 className="mt-3 text-2xl">Notes in motion</h2><p className="mt-3 leading-7 text-ink-muted">New thoughts on tarot, Plath, books, travel, and the work of paying attention.</p><Link href="/blog" className="mt-6 inline-block font-sans font-semibold uppercase tracking-wider text-metal hover:underline">Read the blog →</Link></div>
    </div></section>
    <section className="section-base"><div className="container max-w-3xl py-16 md:py-24"><figure className="pull-quote"><blockquote>There is always more than one way to read a life.</blockquote><figcaption>Julia Gordon-Bramer</figcaption></figure><div className="mt-12 flex flex-wrap gap-4"><Link href="/books" className="border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85">Explore the books</Link><Link href="/decoding-sylvia-plath" className="border border-rule px-6 py-3 font-sans font-semibold uppercase tracking-wider text-ink hover:border-metal">Read the Plath scholarship</Link></div></div></section>
  </article>
}

export async function generateMetadata(): Promise<Metadata> { return generateMeta({ doc: { meta: { title: 'Writing & Poetry', description: 'Poetry, memoir, literary criticism, and essays by Julia Gordon-Bramer.' }, slug: 'writing' } }) }
