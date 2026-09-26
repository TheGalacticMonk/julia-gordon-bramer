import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

// Builds the tiny rich-text documents used as page-text defaults. A paragraph is a list of
// "runs": plain strings, { italic }, or { link, href }. Julia's editor produces the same node
// shapes, so what she saves and what's here render through the same component.
export type Run = string | { italic: string } | { link: string; href: string }

const text = (value: string, italic = false) => ({
  type: 'text' as const,
  text: value,
  format: italic ? 2 : 0,
  detail: 0,
  mode: 'normal' as const,
  style: '',
  version: 1,
})

const runToNode = (run: Run) => {
  if (typeof run === 'string') return text(run)
  if ('italic' in run) return text(run.italic, true)
  return {
    type: 'link' as const,
    children: [text(run.link)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 3,
    fields: { linkType: 'custom' as const, url: run.href, newTab: false },
  }
}

export const richText = (...paragraphs: Run[][]): DefaultTypedEditorState =>
  ({
    root: {
      type: 'root',
      children: paragraphs.map((runs) => ({
        type: 'paragraph',
        children: runs.map(runToNode),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        textFormat: 0,
        textStyle: '',
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as unknown as DefaultTypedEditorState
