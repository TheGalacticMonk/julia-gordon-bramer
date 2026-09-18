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
      <svg
        className={`${styles.doodle} ${styles.lotus}`}
        // From assets/lotus.svg (Material Symbols "spa"). Same keyline-padding issue as
        // note.svg/flower.svg above (real bbox ~745x734 inside the 960x960 native grid) —
        // cropped the same way, tight bbox plus a ~40-unit margin per side. Wider crop than
        // note/flower (825 vs ~520-575 units) since this glyph spreads its petals out more.
        //
        // Two overlapping copies of the same path, not one fill+stroke path like .note above:
        // .note's glyph is a single unbroken contour, so stroking it only ever draws its outer
        // edge. This glyph is three separate petal subpaths — stroking-while-filling the same
        // path the way .note does also draws a border down every internal seam where petals
        // meet, which reads as broken interior lines, not a clean outline. Layering a filled+
        // stroked "silhouette" copy behind a plain-fill copy of the same shape hides every
        // interior seam under the front copy's fill, leaving only the true outer edge showing
        // past it — a border "only on the outside," same as the single-contour doodles.
        viewBox="68 -875 825 814"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={styles.lotusOutline}
          d="M486.92-100.77q-67.69-8.21-134.46-36.03-66.77-27.82-120-80.39-53.23-52.58-87.27-133.04-34.03-80.46-36.73-193.61l-.77-36.16 35.39.77q46.38 1.15 102.11 17.04 55.73 15.88 99.27 43.42 8.54-80.61 45.85-167.46 37.31-86.84 89.69-148.38 52.38 61.54 89.69 148.77Q607-598.61 615.54-518q42.38-26.38 97.34-43.23 54.96-16.85 103.27-18l36.16-.77-.77 36.92Q850-440.69 821.15-364.27q-28.84 76.42-77.84 129.77-49 53.34-114.54 85.96-65.54 32.61-141.85 47.77ZM485.69-162q-11-166-98.5-251t-217.5-105q11 171 101.5 255t214.5 101ZM480-389.84q14.23-23.54 35.54-48.97Q536.85-464.23 558-482q-1.23-59.31-21.73-123.81T480-730.46q-35.77 60.15-56.27 124.65T402-482q21.15 17.77 42.58 43.19Q466-413.38 480-389.84Zm65.69 212.15q42-13.93 83.54-38.46 41.54-24.54 75.85-64.62 34.3-40.08 57.46-98.31 23.15-58.23 27.77-138.92-95.54 14-168.85 65.38-73.31 51.39-109 128.31 12 32 20.12 67.31 8.11 35.31 13.11 79.31ZM480-389.84Zm65.69 212.15Zm-60 15.69Zm26.77-162.31Zm-25.54 223.54Z"
        ></path>
        <path
          className={styles.lotusFill}
          d="M486.92-100.77q-67.69-8.21-134.46-36.03-66.77-27.82-120-80.39-53.23-52.58-87.27-133.04-34.03-80.46-36.73-193.61l-.77-36.16 35.39.77q46.38 1.15 102.11 17.04 55.73 15.88 99.27 43.42 8.54-80.61 45.85-167.46 37.31-86.84 89.69-148.38 52.38 61.54 89.69 148.77Q607-598.61 615.54-518q42.38-26.38 97.34-43.23 54.96-16.85 103.27-18l36.16-.77-.77 36.92Q850-440.69 821.15-364.27q-28.84 76.42-77.84 129.77-49 53.34-114.54 85.96-65.54 32.61-141.85 47.77ZM485.69-162q-11-166-98.5-251t-217.5-105q11 171 101.5 255t214.5 101ZM480-389.84q14.23-23.54 35.54-48.97Q536.85-464.23 558-482q-1.23-59.31-21.73-123.81T480-730.46q-35.77 60.15-56.27 124.65T402-482q21.15 17.77 42.58 43.19Q466-413.38 480-389.84Zm65.69 212.15q42-13.93 83.54-38.46 41.54-24.54 75.85-64.62 34.3-40.08 57.46-98.31 23.15-58.23 27.77-138.92-95.54 14-168.85 65.38-73.31 51.39-109 128.31 12 32 20.12 67.31 8.11 35.31 13.11 79.31ZM480-389.84Zm65.69 212.15Zm-60 15.69Zm26.77-162.31Zm-25.54 223.54Z"
        ></path>
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
