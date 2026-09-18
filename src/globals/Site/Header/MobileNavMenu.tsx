'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Site } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import styles from './hamburger.module.css'

type NavLink = NonNullable<Site['navItems']>[number]['link']

interface MobileNavMenuProps {
  navItems: Array<{ link: NavLink }>
  resolveHref: (link: NavLink) => string | null
  isOverlay: boolean
  bookingUrl?: string | null
  className?: string
}

export const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  navItems,
  resolveHref,
  isOverlay,
  bookingUrl,
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
      className={cn(styles.main, isOverlay ? 'text-ink' : 'text-metal-ink dark:text-cream', className)}
    >
      <span className="sr-only">Menu</span>
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
        {bookingUrl && (
          // .menu-list for the staggered reveal timing; .menu-cta swaps its look for a filled
          // pill button (see hamburger.module.css) instead of gold text — the active nav link
          // above already uses gold text for "current page," so this needed its own affordance
          // rather than the same color to read as a distinct action, not a highlighted link.
          <CMSLink
            appearance="inline"
            className={cn(styles['menu-list'], styles['menu-cta'])}
            label="Book a reading"
            url={bookingUrl}
          />
        )}
      </section>
    </label>
  )
}
