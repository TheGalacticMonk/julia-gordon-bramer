import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Tarot reader, poet, and Sylvia Plath scholar. Books, tour dates, and writing from Julia Gordon-Bramer.',
  images: [
    {
      // TODO: replace with a real branded share image — see agency/open-questions.md
      url: `${getServerSideURL()}/website-template-OG.webp`,
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
