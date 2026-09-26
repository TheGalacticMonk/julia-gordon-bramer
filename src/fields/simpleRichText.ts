import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

// The one text editor Julia sees everywhere: the site's minimal root editor (paragraphs, bold,
// italic, underline, links — see defaultLexical.ts) plus an always-visible toolbar, so
// formatting is a button she can see rather than a keyboard shortcut. No headings, colors,
// sizes, images or layout blocks: nothing in it can change how the page is designed.
export const simpleRichText = lexicalEditor({
  features: ({ rootFeatures }) => [...rootFeatures, FixedToolbarFeature()],
})
