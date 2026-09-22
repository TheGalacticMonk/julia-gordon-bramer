'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Site } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { socialIcons, socialLabels } from '@/utilities/socialMeta'
import { cn } from '@/utilities/ui'
import styles from './hamburger.module.css'

type NavLink = NonNullable<Site['navItems']>[number]['link']
type Social = { platform: 'instagram' | 'x'; url: string }

interface MobileNavMenuProps {
  navItems: Array<{ link: NavLink }>
  resolveHref: (link: NavLink) => string | null
  isOverlay: boolean
  socials?: Social[]
  className?: string
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  navItems,
  resolveHref,
  isOverlay,
  socials = [],
  className,
}) => {
  // Reference markup starts `checked` (closed); tracked as `open` here (inverted) so it can be
  // force-closed on navigation below — the reference's plain uncontrolled checkbox has no way
  // to do that, but without it, clicking a link would leave the dropdown visibly open on the
  // page it just navigated to (Next's client-side routing keeps this component mounted).
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <label
      aria-label="Menu"
      // text-ink, not text-metal-ink: metal-ink is themed for contrast ON a --metal fill
      // (opposite of what plain chrome text sitting on the page background wants) — see
      // Header/Component.client.tsx's wordmark Link className comment for the full reasoning.
      className={cn(styles.main, isOverlay ? 'text-ink' : 'text-ink dark:text-cream', className)}
    >
      {/* Visible label text — hidden below `sm` where the header row is tightest (wordmark +
          theme toggle + this control, on the narrowest phones) so the hamburger stays icon-only
          there. `aria-label` on the <label> above already gives the control an accessible name
          in both states, so this is purely visual and doesn't need its own sr-only fallback.
          text-xl (not the nav's usual text-sm) is a deliberate size bump: canvas-measured glyph
          height for "Menu" set Inter/500 at 14px is ~10px tall, dwarfed by the hamburger's 15px
          of actual bar ink (3 bars + 2 gaps at 3px each, inside the icon's 20px box). 20px is
          the smallest standard step where the word's measured glyph height (~14.8px) closes
          that gap and reads as the same visual weight as the icon next to it. */}
      <span className="hidden font-sans text-xl font-medium tracking-wide sm:inline">Menu</span>
      <input
        checked={!open}
        className={styles.inp}
        onChange={() => setOpen((prev) => !prev)}
        type="checkbox"
      />
      <div className={styles.bar}>
        <span className={cn(styles.top, styles['bar-list'])} />
        <span className={cn(styles.middle, styles['bar-list'])} />
        <span className={cn(styles.bottom, styles['bar-list'])} />
      </div>
      <section className={styles['menu-container']}>
        {navItems.map(({ link }, i) => {
          const href = resolveHref(link)
          const isActive = href ? (href === '/' ? pathname === '/' : pathname.startsWith(href)) : false

          return (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className={cn(styles['menu-list'], isActive && 'text-metal font-semibold')}
            />
          )
        })}
        {socials.length > 0 && (
          // Also .menu-list (for the same reveal timing), composed with .menu-social so its
          // padding/layout can differ (icon row, not a full-width text line).
          <div className={cn(styles['menu-list'], styles['menu-social'])}>
            {socials.map((social) => {
              const Icon = socialIcons[social.platform]
              const label = socialLabels[social.platform] || social.platform

              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {Icon && <Icon className="size-5" aria-hidden="true" />}
                </a>
              )
            })}
          </div>
        )}
      </section>
    </label>
  )
}
