import type { ReactNode } from 'react'

import type { Home, Site } from '@/payload-types'

import { AboutCard } from '@/components/AboutCard/Component'
import { HeroIntroCard } from '@/components/Hero/HeroIntroCard'

export type HomeViewProps = {
  home: Home
  socials?: Site['socials']
  bookingUrl?: string | null
  /** The homepage modules, rendered on the server. */
  children: ReactNode
}

export const HomeView = ({ home, socials, bookingUrl, children }: HomeViewProps) => {
  const { heroHeading, heroSubheading, heroRichText, heroImage, links, aboutImage, aboutRichText } =
    home

  return (
    // No pb-24 when AboutCard renders (aboutRichText set): that card's own band already ends in
    // matching --paper-raised padding right before the footer, and pb-24 here — on the plain
    // page background — would reopen the mismatched-color gap this file's earlier history had
    // (see AboutCard/Component.tsx's CurvedDivider comment). Kept as a fallback for the
    // no-About-content case, where nothing else provides closing space before the footer.
    <article className={aboutRichText ? undefined : 'pb-24'}>
      <HeroIntroCard
        heroHeading={heroHeading}
        heroSubheading={heroSubheading}
        heroRichText={heroRichText}
        heroImage={heroImage}
        links={links}
        socials={socials}
      />

      {children}

      <AboutCard
        heroHeading={heroHeading}
        heroSubheading={heroSubheading}
        heroImage={heroImage}
        aboutImage={aboutImage}
        aboutRichText={aboutRichText}
        bookingUrl={bookingUrl}
      />
    </article>
  )
}
