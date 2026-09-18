import React from 'react'

import type { Home } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import styles from './styles.module.css'

type Props = Pick<Home, 'heroHeading' | 'heroSubheading' | 'heroRichText' | 'links' | 'heroImage'>

// Single-card hero: same doodle-card visual language as the original reference (palette,
// hand-drawn border/shadow, tape corner, doodle decorations), holding the real hero
// photo/heading/subheading/copy/CTA instead of a placeholder avatar + social row. Typography
// borrows from the uiverse.io "Cairn" design system (https://uiverse.io/design/systems/cairn-2):
// Cormorant for the display heading, Inter for everything else — same pairing, doodle card kept.
export const HeroIntroCard: React.FC<Props> = ({
  heroHeading,
  heroSubheading,
  heroRichText,
  heroImage,
  links,
}) => {
  return (
    <div className={styles.introCard}>
      <svg
        className={`${styles.doodle} ${styles.note}`}
        // note.svg's source viewBox is "0 -960 960 960" (Material Symbols' grid), but the glyph
        // itself only occupies a fraction of that box (Material icons ship with built-in
        // keyline padding) — cropped tight to the glyph's actual bounding box, plus a small
        // margin for the hand-drawn stroke below, so it doesn't look tiny inside its box.
        viewBox="221 -856 518 752"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M302.19-184.89q-41.03-41.03-41.03-98.96 0-57.92 41.03-98.96 41.04-41.03 98.96-41.03 23 0 43.08 6.84 20.08 6.85 36.92 20.54v-419.69h217.69v130.76H541.15v401.54q0 57.93-41.04 98.96-41.03 41.04-98.96 41.04-57.92 0-98.96-41.04Z"></path>
      </svg>
      <svg className={`${styles.doodle} ${styles.sparkle}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C12 6.6 17.4 12 24 12C17.4 12 12 17.4 12 24C12 17.4 6.6 12 0 12C6.6 12 12 6.6 12 0Z"></path>
      </svg>
      <svg className={`${styles.doodle} ${styles.swirl}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10C27.9 10 10 27.9 10 50C10 72.1 27.9 90 50 90C72.1 90 90 72.1 90 50C90 32.3 75.7 18 58 18C44.3 18 33 29.3 33 43C33 53.5 41.5 62 52 62C59.7 62 66 55.7 66 48"></path>
      </svg>

      {heroImage && typeof heroImage === 'object' && (
        <div className={styles.introPhotoWrap}>
          <div className={styles.introPhoto}>
            <Media resource={heroImage} fill imgClassName="h-full w-full object-cover" priority />
          </div>
        </div>
      )}

      <h1 className={styles.introTitle}>{heroHeading}</h1>

      {heroSubheading && <span className={styles.introBadge}>{heroSubheading}</span>}

      {heroRichText && (
        <div className={styles.introBody}>
          <RichText data={heroRichText} enableGutter={false} enableProse={false} />
        </div>
      )}

      {links && links.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-4 ${styles.linksRow}`}>
          {links.map(({ link }, i) => (
            <CMSLink key={i} {...link} appearance="inline" className={styles.introButton} />
          ))}
        </div>
      )}
    </div>
  )
}
