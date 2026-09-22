import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { BioSplitBlock } from '@/blocks/BioSplit/Component'
import { BookShelfBlock } from '@/blocks/BookShelf/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { EmbedBlock } from '@/blocks/Embed/Component'
import { EventListBlock } from '@/blocks/EventList/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { ImageBlock } from '@/blocks/ImageBlock/Component'
import { PressStripBlock } from '@/blocks/PressStrip/Component'
import { PullQuote } from '@/blocks/PullQuote/Component'
import { CurvedDivider } from '@/components/CurvedDivider'
import { cn } from '@/utilities/ui'

const blockComponents = {
  bioSplit: BioSplitBlock,
  bookShelf: BookShelfBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  embed: EmbedBlock,
  eventList: EventListBlock,
  faq: FAQBlock,
  imageBlock: ImageBlock,
  pressStrip: PressStripBlock,
  pullQuote: PullQuote,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = async (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  // Renders each block up front (rather than as JSX further down) so a block that has nothing
  // to show yet — e.g. the homepage's Book Shelf module, seeded with no featured books on
  // purpose until real ones exist — can be dropped entirely instead of leaving an empty
  // Squarespace-style band with no content in it. Alternation below is keyed off this filtered
  // list's own position, not the original array index, so a dropped block doesn't throw off
  // the raised/plain rhythm for everything after it.
  const rendered = await Promise.all(
    blocks.map(async (block) => {
      const { blockType } = block
      if (!blockType || !(blockType in blockComponents)) return null

      const Block = blockComponents[blockType]
      if (!Block) return null

      // @ts-expect-error there may be some mismatch between the expected types here
      const content = await Block({ ...block, disableInnerContainer: true })
      return content || null
    }),
  )

  const visibleBlocks = rendered.filter((content) => content !== null)

  return (
    <Fragment>
      {visibleBlocks.map((content, index) => {
        const isRaised = index % 2 === 0
        // The color of whatever sits above this band — the plain page background (--paper)
        // for every "raised" band, including the very first one (the hero sits directly on
        // that plain background, so the seam right after it needs the same curve as any other
        // band boundary, not a hard edge) — or --paper-raised for every "plain" band, which
        // always follows a raised one. CurvedDivider draws this sweeping down over this band's
        // top edge — see that component for why it's drawn this way round.
        const previousFill = isRaised ? 'fill-section-base' : 'fill-section-raised'
        const nextFill = isRaised ? 'fill-section-raised' : 'fill-section-base'

        return (
          // Squarespace-style section seams: full-bleed bands that alternate between the
          // page's own background and --paper-raised (the same "slightly warmer/darker
          // surface" tone the header, hero card, and reading-cards already use elsewhere),
          // stacked directly against each other with no gap — CurvedDivider draws the actual
          // gaia.com-style curved seam between them instead of a hard flat edge.
          <Fragment key={index}>
            <CurvedDivider
              fillClassName={previousFill}
              nextFillClassName={nextFill}
              flip={isRaised}
            />
            <div className={cn(isRaised && 'section-raised')}>
              <div className="py-16">{content}</div>
            </div>
          </Fragment>
        )
      })}
    </Fragment>
  )
}
