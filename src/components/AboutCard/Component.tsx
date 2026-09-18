import React from 'react'

import type { Home } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { CurvedDivider } from '@/components/CurvedDivider'
import { Media } from '@/components/Media'
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
// paper/ink/metal tokens instead of that site's navy/gold. Reuses the Hero tab's heading/
// subheading for the header text instead of duplicating them as new fields; the avatar has its
// own dedicated aboutImage field (falls back to the hero photo if unset).
export const AboutCard: React.FC<Props> = async ({
  heroHeading,
  heroSubheading,
  heroImage,
  aboutImage,
  aboutRichText,
}) => {
  if (!aboutRichText) return null

  const siteData = await getCachedGlobal('site', 1)()
  const avatarImage = aboutImage || heroImage

  return (
    <section className={styles.section}>
      {/* Same seam RenderBlocks draws between its own alternating bands (see that file) — this
          card isn't one of those bands (it's hardcoded in page.tsx, not a modules entry), but it
          sits right where the next one would fall, continuing the same raised/plain rhythm:
          PressStrip (the homepage's last actual module) ends "plain" (--paper), so this
          continues as "raised" (--paper-raised), and the curve sweeps down in --paper to match
          what's above it. */}
      <CurvedDivider fillClassName="fill-paper" flip />
      <div className={`container ${styles.cardWrap}`}>
        <div className={styles.card}>
          <div className={styles.header}>
            {avatarImage && typeof avatarImage === 'object' && (
              <div className={styles.avatar}>
                <Media resource={avatarImage} fill imgClassName="h-full w-full object-cover" />
              </div>
            )}
            <div className={styles.headerText}>
              <div className={styles.eyebrowRow}>
                <PencilIcon className={styles.eyebrowIcon} aria-hidden="true" />
                <span className={styles.eyebrow}>About</span>
                <span className={styles.eyebrowRule} />
              </div>
              {heroHeading && <h2 className={styles.title}>{heroHeading}</h2>}
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
  )
}
