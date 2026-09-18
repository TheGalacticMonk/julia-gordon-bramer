import React from 'react'

type Props = {
  data: Record<string, unknown>
}

// Renders a schema.org JSON-LD <script> tag. `<` is escaped so a CMS-authored title or
// description containing "</script>" can't break out of the script context.
export const JsonLd: React.FC<Props> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
  />
)
