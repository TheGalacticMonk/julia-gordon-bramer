import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Tarot reader, poet, and Sylvia Plath scholar. Books, tour dates, and writing from Julia Gordon-Bramer.',
  images: [
    {
      // 1200x630 crop of the hero portrait (assets/julia-gordon-bramer-profile.png). Used when a
      // page has no image of its own and SEO Defaults → "Default social share image" is empty.
      url: `${getServerSideURL()}/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: 'Julia Gordon-Bramer',
    },
  ],
  siteName: 'Julia Gordon-Bramer',
  title: 'Julia Gordon-Bramer',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
