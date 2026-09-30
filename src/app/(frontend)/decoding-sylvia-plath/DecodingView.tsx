import type { ReactNode } from 'react'

import Image from 'next/image'

import RichText from '@/components/RichText'
import type { decodingDefaults } from '@/globals/PageText/defaults'

import styles from './decoding.module.css'

export const DecodingView = ({
  t,
  count,
  children,
}: {
  t: typeof decodingDefaults
  count: number
  children: ReactNode
}) => {
  return (
    <>
      <section className={styles.hero}>
        <div className="container py-16 lg:py-24">
          <div className="grid gap-y-12 gap-x-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className={`max-w-2xl ${styles.heroCopy}`}>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
                {t.heroEyebrow}
              </p>
              <h1 className="mt-2 text-5xl leading-[0.95] sm:text-6xl">{t.heroTitle}</h1>
              <RichText
                data={t.heroIntro}
                enableGutter={false}
                enableProse={false}
                className={`mt-4 space-y-4 text-pretty text-ink-muted ${styles.richCopy}`}
              />

              <figure className="pull-quote mt-10">
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>{t.quoteSource}</figcaption>
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
              <p className={styles.heroPhotoCaption}>{t.photoCaption}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-raised">
        <div className="container grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
              {t.methodLabel}
            </p>
            <p className="mt-5 font-display text-3xl italic leading-tight">{t.methodStatement}</p>
          </div>
          <RichText
            data={t.methodText}
            enableGutter={false}
            enableProse={false}
            className={`max-w-2xl space-y-6 text-lg leading-8 text-ink-muted ${styles.richCopy}`}
          />
        </div>
      </section>

      <section className="section-base">
        <div className="container py-16 md:py-24">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
            {t.credentialsLabel}
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {t.credentials.map((credential, index) => (
              <li key={index} className="reading-card p-6">
                <p className="font-sans text-sm uppercase tracking-wider text-metal">
                  {credential.label}
                </p>
                <h2 className="mt-3 text-2xl">{credential.title}</h2>
                <p className="mt-3 leading-7 text-ink-muted">{credential.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-raised">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
                {t.essaysLabel}
              </p>
              <p className="mt-2 font-display text-3xl italic leading-tight">
                {count} {t.essaysHeading}
              </p>
            </div>
            <p className="max-w-sm text-sm text-ink-muted">{t.essaysNote}</p>
          </div>

          {children}
        </div>
      </section>

      <section className="section-raised">
        <div className="container py-16 md:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
                {t.essaysLabel}
              </p>
              <p className="mt-2 font-display text-3xl italic leading-tight">
                {count} {t.essaysHeading}
              </p>
            </div>
            <p className="max-w-sm text-sm text-ink-muted">{t.essaysNote}</p>
          </div>

          {children}
        </div>
      </section>
    </>
  )
}
