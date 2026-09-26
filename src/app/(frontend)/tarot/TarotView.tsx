import Image from 'next/image'
import Link from 'next/link'

import type { tarotDefaults } from '@/globals/PageText/defaults'

import styles from './tarot.module.css'

export const TarotView = ({ t }: { t: typeof tarotDefaults }) => {
  return (
    <article className="pb-24">
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{t.heroEyebrow}</p>
            <h1 className={styles.title}>{t.heroTitle}</h1>
            <p className={styles.lede}>{t.heroText}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85"
            >
              {t.heroButton}
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
            <p className="font-sans text-sm uppercase tracking-wider text-metal">
              {t.formatCard.label}
            </p>
            <h2 className="mt-3 text-2xl">{t.formatCard.title}</h2>
            <p className="mt-3 leading-7 text-ink-muted">{t.formatCard.text}</p>
          </div>
          <div className="reading-card p-6">
            <p className="font-sans text-sm uppercase tracking-wider text-metal">
              {t.rateCard.label}
            </p>
            <h2 className="mt-3 text-2xl">{t.rateCard.title}</h2>
            <p className="mt-3 leading-7 text-ink-muted">{t.rateCard.text}</p>
          </div>
          <div className="reading-card p-6">
            <p className="font-sans text-sm uppercase tracking-wider text-metal">
              {t.paymentCard.label}
            </p>
            <h2 className="mt-3 text-2xl">{t.paymentCard.title}</h2>
            <p className="mt-3 leading-7 text-ink-muted">{t.paymentCard.text}</p>
          </div>
        </div>
      </section>
      <section className="section-base">
        <div className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
              {t.bringLabel}
            </p>
            <p className="mt-5 font-display text-3xl italic leading-tight">{t.bringStatement}</p>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-ink-muted">
            <p>{t.bringText1}</p>
            <p>{t.bringText2}</p>
            <Link
              href="/contact"
              className="inline-block border border-metal bg-metal px-6 py-3 font-sans font-semibold uppercase tracking-wider text-metal-ink transition-opacity hover:opacity-85"
            >
              {t.bringButton}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
