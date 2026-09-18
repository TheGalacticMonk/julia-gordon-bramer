import React from 'react'

import { InstagramIcon } from '@/components/icons/InstagramIcon'
import { XIcon } from '@/components/icons/XIcon'
import { getCachedGlobal } from '@/utilities/getGlobals'

import styles from './styles.module.css'

// Sticky social rail, pinned to the left edge on every page (not just the footer). Client
// supplied the exact HTML/CSS for this (colored tiles, hover-grow, per-icon corner radius) —
// kept as close to that as possible rather than restyled to the rest of the site's flat-icon
// look; see styles.module.css. Only instagram/x are wired up (that's what was supplied);
// facebook/youtube/tiktok stay in the footer's plain row.
export async function SocialSidebar() {
  const siteData = await getCachedGlobal('site', 1)()
  const socials = (siteData?.socials || []).filter(
    (s): s is typeof s & { platform: 'instagram' | 'x' } =>
      s.platform === 'instagram' || s.platform === 'x',
  )

  if (socials.length === 0) return null

  return (
    <div className={styles.redes}>
      {socials.map((social) =>
        social.platform === 'instagram' ? (
          <a
            key={social.platform}
            className={styles.instagram}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
        ) : (
          <a
            key={social.platform}
            className={styles.twitter}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
          >
            <XIcon />
          </a>
        ),
      )}
    </div>
  )
}
