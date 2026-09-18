# CSS Strategy

Two layers, per the brief. This file is the audit trail: every custom class that exists outside
Tailwind utilities, and why it earned that exception. Kept current as implementation proceeds —
if a class is in the codebase and not listed here, that's a bug in this file, fix it.

## Layer 1 — Tailwind (the default)

Tailwind v4, CSS-first `@theme` tokens (see `agency/design-system.md` for the token values,
defined in `src/app/(frontend)/globals.css`). Used for: layout, spacing, responsive behavior,
typography scale, grids/flexbox, basic interactive states, sizing. No ad-hoc hex anywhere in
markup — every color comes from a token-backed utility class.

Conventions in force:
- `text-wrap: balance` / `text-wrap: pretty` on headings and lead paragraphs (Tailwind's
  `text-balance` / `text-pretty` utilities)
- Container queries (`@container` + `@sm:`/`@md:` variants) where a component's layout should
  respond to its own box, not the viewport — the reading-card grid and the BioSplit block are
  the two places this applies
- Logical properties where Tailwind exposes them (`ps-`/`pe-`, `ms-`/`me-`, `text-start`/
  `text-end`) instead of physical `left`/`right` utilities

## Layer 2 — custom CSS (the exception)

Colocated with the component it belongs to where the component owns the whole treatment (e.g. a
block's `Component.tsx` imports a small `.module.css` or the class lives in
`src/app/(frontend)/globals.css` under a clearly commented section when it's a cross-cutting
primitive). Every class is named for what it *is*, not what it looks like.

| Class | Why it's not Tailwind | Where |
|---|---|---|
| `.pull-quote` | Oversized display-serif quote with a single hand-tuned rule/indent treatment that would take 10+ chained utilities to express and still not be reusable by name | `PullQuote` block |
| `.reading-card` | Shared card treatment (book cover, event card) with a corner rule that animates in on hover via a pseudo-element — the pseudo-element and its transition aren't expressible as utilities | `BookShelf`, `EventList` blocks |
| `.tour-ribbon` | Angled ticket-stub-style date badge (clip-path + rotated pseudo-element) — genuinely bespoke geometry | `EventList` block |
| `.ink-rule` | Double-hairline section divider (two offset border lines via `box-shadow`) reused across page templates — reusable enough to deserve a semantic name instead of repeating the box-shadow utility everywhere | global primitive, `globals.css` |
| `.payload-richtext` | Pre-existing template primitive scoping typographic defaults for CMS-authored rich text (headings, lists, links) inside the `prose` container — kept from the base template since rich text output needs a stable target class for editor-authored HTML that Tailwind's `prose` plugin alone doesn't fully cover | `RichText` component |
| `.nav-link-glow` | Pulsing `currentColor` text-shadow on hover (with a `@keyframes` loop), replacing the shadcn `link` button variant's `hover:underline` — a looping animation and multi-layer text-shadow aren't expressible as Tailwind utilities | header `nav`, `Header/Component.client.tsx` |

## Motion

All custom motion (the `.reading-card` hover rule, `.tour-ribbon` draw-in, `FAQ` disclosure
rotation) is written with CSS transitions/`@starting-style` where applicable, and every rule is
wrapped:

```css
@media (prefers-reduced-motion: no-preference) {
  /* transition/animation rules live here */
}
```

so `prefers-reduced-motion: reduce` users get the resting state with no animated transition, not
a broken one. This is mandatory per the brief, not optional polish.

A global backstop in `globals.css` also collapses every `animation-duration`/`transition-duration`
to `0.01ms` under `prefers-reduced-motion: reduce`, covering Tailwind utility transitions on the
shadcn `ui/*` primitives (button/input/select hover and focus states) that aren't part of the
bespoke component list above and so aren't hand-wrapped per rule.

## JavaScript motion

None planned. Every effect above is achievable in CSS (transitions, `:hover`, `:focus-visible`,
native `<details>`, `clip-path`). If a future requirement needs genuine JS-driven motion (e.g. a
scroll-linked reveal), it gets added here with a justification before it ships — the default is
no.
