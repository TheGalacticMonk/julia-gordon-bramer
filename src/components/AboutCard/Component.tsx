import React from 'react'
import Image from 'next/image'

import type { Home } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { CurvedDivider } from '@/components/CurvedDivider'
import RichText from '@/components/RichText'
import { LocationPinIcon } from '@/components/icons/LocationPinIcon'
import { PencilIcon } from '@/components/icons/PencilIcon'
import { getCachedGlobal } from '@/utilities/getGlobals'

import styles from './styles.module.css'

type Props = Pick<
  Home,
  'heroHeading' | 'heroSubheading' | 'heroImage' | 'aboutImage' | 'aboutRichText'
>

// Magazine-card About section, modeled on https://galacticmonk.com/about/'s layout (eyebrow +
// avatar + display-serif name header, small-caps role/location meta row, drop-cap opening
// paragraph, closing eyebrow + pill CTA) — same structural beats, recolored to this site's own
// shared paper/ink/orchid tokens. Reuses the Hero tab's heading/
// subheading for the header text instead of duplicating them as new fields; the avatar has its
// own dedicated portrait asset from the site's public assets.
export const AboutCard: React.FC<Props> = async ({
  heroHeading,
  heroSubheading,
  aboutRichText,
}) => {
  if (!aboutRichText) return null

  const [firstName, ...rest] = (heroHeading ?? '').split(' ')
  const familyName = rest.join(' ')
  const siteData = await getCachedGlobal('site', 1)()
  return (
    <>
      {/* Same seam RenderBlocks draws between its own alternating bands (see that file) — this
          card isn't one of those bands (it's hardcoded in page.tsx, not a modules entry), but it
          sits right where the next one would fall, continuing the same raised/plain rhythm:
          PressStrip (the homepage's last actual module) ends "plain" (--paper), so this
          continues as "raised" (--paper-raised), and the curve sweeps down in --paper to match
          what's above it. */}
      <CurvedDivider
        fillClassName="fill-section-base"
        nextFillClassName="fill-section-raised"
        flip
      />
      <section className={styles.section}>
        <div className={`container ${styles.cardWrap}`}>
          <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <Image
                src="/assets/julia-about.jpg"
                alt="Julia Gordon-Bramer"
                fill
                sizes="8rem"
                className="h-full w-full object-cover"
              />
            </div>
            <div className={styles.headerText}>
              <div className={styles.eyebrowRow}>
                <PencilIcon className={styles.eyebrowIcon} aria-hidden="true" />
                <span className={styles.eyebrow}>About</span>
                <span className={styles.eyebrowRule} />
              </div>
              {heroHeading && (
                <h2 className={styles.title}>
                  <span className={styles.titleFocus}>{firstName}</span>
                  {familyName && (
                    <>
                      {' '}
                      <span className={styles.titleAccent}>{familyName}</span>
                    </>
                  )}
                </h2>
              )}
            </div>
          </div>

          {heroSubheading && (
            <div className={styles.metaRow}>
              <span>{heroSubheading}</span>
              <span className={styles.metaDivider} aria-hidden="true">
                |
              </span>
              <span className={styles.metaLocation}>
                {/* Copied from galacticmonk.com/about's location indicator: a small pulsing
                    ring (Tailwind's animate-ping — scales up and fades, looping) centered
                    behind the pin, reading as a "live location" marker. The site-wide reduced-
                    motion backstop in globals.css already collapses this for
                    prefers-reduced-motion, so no extra guard is needed here. */}
                <span className={styles.pinWrap}>
                  <span className={`${styles.pinPulse} animate-ping`} aria-hidden="true" />
                  <LocationPinIcon className={styles.pinIcon} aria-hidden="true" />
                </span>
                St. Louis, MO
              </span>
            </div>
          )}

          <div className={`${styles.body} payload-richtext`}>
            <RichText data={aboutRichText} enableGutter={false} enableProse={false} />
          </div>

          {siteData?.bookingUrl && (
            <div className={styles.cta}>
              <span className={styles.ctaEyebrow}>Let&rsquo;s Connect</span>
              <CMSLink
                appearance="inline"
                className={styles.ctaButton}
                url={siteData.bookingUrl}
                label="Book a reading"
              />
            </div>
          )}
          </div>
        </div>
      </section>
    </>
  )
}
