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
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
