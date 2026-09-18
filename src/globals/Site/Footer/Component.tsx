import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

const socialLabels: Record<string, string> = {
  instagram: 'Instagram',
  x: 'X / Twitter',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

export async function Footer() {
  const siteData = await getCachedGlobal('site', 1)()

  const navItems = siteData?.footerNavItems || []
  const socials = siteData?.socials || []

  return (
    <footer className="mt-auto border-t border-rule bg-paper-raised text-ink">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo className="text-ink" />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => (
              <CMSLink className="text-ink" key={i} {...link} />
            ))}
          </nav>
          {socials.length > 0 && (
            <nav className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  className="text-ink"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialLabels[social.platform] || social.platform}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
      {siteData?.contactEmail && (
        <div className="container pb-8 text-sm text-ink-muted">
          <a href={`mailto:${siteData.contactEmail}`} className="text-ink">
            {siteData.contactEmail}
          </a>
        </div>
      )}
    </footer>
  )
}
