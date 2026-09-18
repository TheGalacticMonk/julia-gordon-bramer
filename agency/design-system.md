# Design System — Literary Mystic

> **Superseded 2026-09-15.** The site retheme to match the homepage hero card replaced the
> cream-paper palette and Fraunces/Newsreader fonts below with a navy-canvas palette (sourced
> from Julia's own portrait) and Cormorant/Inter. The direction/motion/"what this rules out"
> sections below still hold — no doodles, no sparkle, no illustration outside the hero itself —
> only the color tokens and type section are stale. Current values live in
> `src/app/(frontend)/globals.css` (`:root` / `[data-theme='dark']`); treat that file as the
> source of truth over the specific hex values quoted here.

## Direction

Paper, ink, night, one warm metal accent. Tarot as craft and literacy — a card is a well-made
object, not a special effect. Play lives in type, rules, hover states, event cards, and pull
quotes, not in illustration or photography style. No purple nebula heroes, no comic occult
fonts, no sparkle wallpaper, no stock smoke.

Reference points: a well-typeset literary journal crossed with a small press's author page —
warm neutral paper, confident serif display type, a single considered accent used sparingly (on
links, active states, and card corners), generous whitespace, real rule lines instead of card
shadows doing all the separation work.

## Color tokens (implemented as Tailwind v4 `@theme` in `src/app/(frontend)/globals.css`)

Light is the default surface (this is a reading-heavy site — long essays need a calm light
ground, not a dark-mode-first design). Dark mode is a real second surface, not an afterthought,
since the template ships a theme switcher.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-paper` | `#F6F1E7` | `#15130F` | page background |
| `--color-paper-raised` | `#FFFFFF` | `#1D1A15` | cards, panels |
| `--color-ink` | `#1C1812` | `#EFE9DC` | primary text |
| `--color-ink-muted` | `#5B5346` | `#A69C89` | secondary text, captions |
| `--color-rule` | `#DED4BF` | `#332E25` | borders, dividers |
| `--color-metal` | `#A9762C` | `#C99A4C` | the one accent — links, active states, card edges |
| `--color-metal-ink` | `#5C3F16` | `#F1D9A5` | text on/near the metal accent |

No other hues. No ad-hoc hex in markup — every color in JSX comes from a Tailwind utility mapped
to these tokens (`bg-paper`, `text-ink-muted`, `border-rule`, etc.), enforced by review, not
tooling, since this is a small enough palette to hold by convention.

## Type

- **Display / headings — Fraunces** (variable serif with real personality via its optical-size
  and "soft" axes — this is where the "fun but not silly" character shows up, in letterforms,
  not decoration). Loaded via `next/font/google`.
- **Reading / body copy — Newsreader** (serif built for long-form reading — carries the 46-essay
  scholarship section and blog posts comfortably at length). Loaded via `next/font/google`.
- **UI / interface — Inter** (nav, buttons, form labels, metadata, card eyebrows — anywhere text
  is functional rather than being read start to finish).

Headings and lead paragraphs get `text-wrap: balance` / `text-wrap: pretty` (Tailwind utilities)
rather than left to wrap arbitrarily. Body copy sits at a deliberately generous measure
(`max-width` tuned per template, not a blanket `prose` class) since these are long essays.

## Motion

CSS-first, restrained, and always short:

- Link and card hover: a drawn underline / border-color shift, ~150ms ease-out — no scale, no
  shadow-pop
- `FAQ` disclosure: native `<details>` with a CSS-rotated `+`/`×` indicator, no JS accordion
  library
- Page-level reveal: none by default — content should be there, not animate into existence, on
  a site half its audience is reading essays on
- Every transition/animation is wrapped so `prefers-reduced-motion: reduce` collapses it to an
  instant state change — see `agency/css-strategy.md` for the mechanism

## Components that carry the brand (beyond plain Tailwind utilities)

These get custom, purpose-named CSS classes per `agency/css-strategy.md` rather than Tailwind
utility soup, because they're either genuinely distinctive or would otherwise become
unreadably class-heavy:

- `.pull-quote` — the PullQuote block: an oversized Fraunces quote with a single metal-accent
  rule, not a generic blockquote
- `.reading-card` — book/event card treatment: paper-raised surface, a metal-accent corner rule
  that draws in on hover
- `.tour-ribbon` — the EventList date badge: a small angled/ribbon-style date marker that reads
  as "ticket stub," not a plain pill
- `.ink-rule` — the horizontal rule style used between sections and in the FAQ list — a double
  hairline rather than a single flat `border-t`

## What "fun but not silly" rules out

No card flip animations, no floating tarot card illustrations, no gradient text, no emoji as
iconography, no serif-meets-gothic "mystic" display fonts, no particle/sparkle backgrounds. If a
treatment would look at home on a novelty psychic-hotline site, it doesn't belong here — the
credibility comes from Destiny Books and Riverfront Times, and the design has to read as
trustworthy to a journalist and a librarian, not just fun to a tarot client.
