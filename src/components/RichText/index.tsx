import { ImageBlock } from '@/blocks/ImageBlock/Component'
import {
  SerializedBlockNode,
  SerializedLinkNode,
  WithDefaultNodes,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type {
  CallToActionBlock as CTABlockProps,
  ImageBlock as ImageBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { PullQuote } from '@/blocks/PullQuote/Component'
import type { PullQuoteBlock as PullQuoteBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

type NodeTypes = WithDefaultNodes<
  | SerializedBlockNode<CTABlockProps>
  | SerializedBlockNode<ImageBlockProps>
  | SerializedBlockNode<PullQuoteBlockProps>
>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'pages' ? `/${slug}` : `/${relationTo}/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    imageBlock: ({ node }) => (
      <ImageBlock className="col-start-1 col-span-3" {...node.fields} enableGutter={false} />
    ),
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    pullQuote: ({ node }) => <PullQuote className="col-start-2" {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
