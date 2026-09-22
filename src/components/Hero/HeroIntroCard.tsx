import React from 'react'

import type { Home, Site } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { XIcon } from '@/components/icons/XIcon'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

import styles from './styles.module.css'

type Props = Pick<Home, 'heroHeading' | 'heroSubheading' | 'heroRichText' | 'links' | 'heroImage'> & {
  socials?: Site['socials']
}

// Full-width notepad hero: same ruled-paper/hand-drawn-ink-border card language as before, but
// laid out like nothing-wrong-with-you.thegalacticmonks.workers.dev's split hero — big
// left-aligned Fraunces heading, italic accents, a measured lead paragraph, and a
// button row — with the portrait as a large static photo on the right instead of a small
// centered avatar. Dropped the scattered doodle SVGs, the spinning rainbow photo ring, and the
// wobble/wiggle hover animations from the old centered layout — restrained ink-border-and-
// offset-shadow treatment reads as more considered at this larger scale than the busier version.
export const HeroIntroCard: React.FC<Props> = ({
  heroHeading,
  heroSubheading,
  heroRichText,
  heroImage,
  links,
  socials,
}) => {
  // Split on the first space so the given name renders as the bold "focus" word (matching
  // nothing-wrong-with-you's "Nothing Wrong") and the surname renders as its italic
  // counterpart on its own line (matching that site's "With You") — same trick, same font,
  // just weight/style contrast instead of two different typefaces.
  const [firstName, ...rest] = (heroHeading ?? '').split(' ')
  const familyName = rest.join(' ')

  // Same instagram/x-only real data SocialSidebar uses (that's what's actually configured in
  // the CMS) — not the facebook/github/linkedin placeholders from the doodle-card reference
  // this button styling is borrowed from.
  const heroSocials = (socials || []).filter(
    (s): s is typeof s & { platform: 'instagram' | 'x' } =>
      s.platform === 'instagram' || s.platform === 'x',
  )

  return (
    <div className={styles.introCard}>
      <div className={styles.introContent}>
        <h1 className={styles.introTitle}>
          <span className={styles.introTitleFocus}>{firstName}</span>
          {familyName && (
            <>
              <br />
              <span className={styles.introTitleAccent}>{familyName}</span>
            </>
          )}
        </h1>

        {heroSubheading && <p className={styles.introSubheading}>{heroSubheading}</p>}

        {heroRichText && (
          <div className={styles.introBody}>
            <RichText data={heroRichText} enableGutter={false} enableProse={false} />
          </div>
        )}

        {links && links.length > 0 && (
          <div className={`flex flex-wrap gap-4 ${styles.linksRow}`}>
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...link} appearance="inline" className={styles.introButton} />
            ))}
          </div>
        )}
      </div>

      {heroImage && typeof heroImage === 'object' && (
        <div className={styles.introPhotoColumn}>
          <div className={styles.introPhotoWrap}>
            <div className={styles.introPhoto}>
              <Media
                resource={heroImage}
                fill
                imgClassName="h-full w-full object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {heroSocials.length > 0 && (
            <div className={`flex flex-wrap gap-3 ${styles.introSocials}`}>
              {heroSocials.map((social) => (
                <a
                  key={social.platform}
                  className={`${styles.introSocialsBtn} ${styles[social.platform]}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform === 'instagram' ? 'Instagram' : 'X / Twitter'}
                >
                  {social.platform === 'instagram' ? <InstagramIcon /> : <XIcon />}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
