# Live Site Audit — juliagordonbramer.com

Conducted 2026-09-15 by fetching the live site directly. This is the evidence base for the IA,
copy, and content-migration decisions that follow. Anything not verifiable here is logged in
`open-questions.md` instead of guessed.

## Platform & current sitemap

The site mixes two URL conventions, which suggests a platform migration at some point:

- Top-level pages as static `.html`: `/`, `/tarot.html`, `/books.html`, `/blog.html`,
  `/decoding-sylvia-plath.html`
- Two blog-style collections with clean slugs: `/blog/<slug>` (general blog, ~33 posts) and
  `/decoding-sylvia-plath/<slug>` (poem-by-poem scholarly essays, ~46 posts)

Full URL list pulled from `/sitemap.xml` — 79 URLs total. See `raw-content-dump.md`... actually
recorded inline below since the fork that was going to write that file was interrupted:

**Top-level pages (5):** `/`, `/tarot.html`, `/books.html`, `/blog.html`,
`/decoding-sylvia-plath.html`

**Decoding Sylvia Plath essays (46):** one per Ariel poem, e.g.
`/decoding-sylvia-plath/black-rook-in-rainy-weather-crowing-over-hubris`,
`/decoding-sylvia-plath/the-shrike-relentless-ambition`,
`/decoding-sylvia-plath/two-sisters-of-persephone-poetry-goddesses`, etc. Two are visibly
test/placeholder content (`another-test-post`, `future-post`) and should not migrate.

**General blog posts (33):** e.g. `/blog/its-been-awhile`, `/blog/is-it-really-2025`,
`/blog/end-of-summer-reflections`, `/blog/thoughts-on-sylvia-plaths-tarot-cards`,
`/blog/on-love-infidelity-and-polyamorous-relationships`. One is a placeholder
(`/blog/test-post`).

No dedicated About, Events, Press, or Contact page exists today — that content is folded into
the homepage, the tarot page, and blog posts. This is the single biggest gap the rebuild fixes.

I could not confirm the underlying CMS/platform with certainty from fetched markup alone (no
direct HTML/meta inspection tool was used, only content extraction). The `.html` pages plus
clean-slugged blog collections is consistent with an older static export migrated into a
Squarespace-hosted blog, but flag this as an inference, not a verified fact.

## Content inventory by section

### Homepage (`/`)
- Headline: "Julia Gordon-Bramer: Writer, Scholar, Poet, Tarot Card Reader"
- Bio copy (paraphrase-of-source, treat as source-adjacent not verbatim — see
  `raw-content-dump.md` note below): positions her as author, poet, scholar, and professional
  tarot reader; "personality, clarity, and wit"; 15+ years interpreting Plath through mysticism,
  drawing on "Buddhism, Qabalah, A Course in Miracles, the Tao, the Bible, and more."
- Press credentials, verbatim as quoted by the source page:
  - "St. Louis' Top Ten Psychics" — Psychic St. Louis
  - "St. Louis' Number One Fortune-Teller" — CBS Radio
  - "St. Louis' Best Local Poet" (2013) — Riverfront Times
- Book callouts: *Tarot Life Lessons* (2023), *The Occult Sylvia Plath* (2024), and *Night
  Times* (memoir, listed on-site as "seeking publication" — i.e. the live site already publicly
  describes the memoir as in-progress/unpublished, consistent with the brief)
- Contact form: Name, Email, Comment, Submit — no reason/routing field, no confirmation that it
  emails anywhere reliable
- Footer: copyright 2024, social links (Instagram, X/Twitter, email)

### Tarot / bookings (`/tarot.html`)
- Service: phone or video readings, "$3 USD Per Minute"
- Booking flow is manual: "Fill out the form below, call or email ahead of time to schedule" —
  no calendar/scheduling tool, no service tiers, no package pricing
- Payment methods listed as accepted: Zelle, Apple Pay, Venmo, Cash App, PayPal
- Phone number listed: (314) 517-0158. Email address was redacted by the fetch tooling as PII —
  see `open-questions.md`, need this confirmed before publishing a real "email Julia" CTA
- Same generic Name/Email/Comment form as the homepage

### Books (`/books.html`)
Five books listed with real bibliographic detail — full list carried into `ia.md` /
`cms-model.md` seed plan:
1. **Tarot Life Lessons: Living Wisdom from the Major Arcana** — Destiny Books/Inner Traditions,
   2023, ISBN 978-1-64411-817-7. Print, ebook, audiobook. Buy link:
   innertraditions.com/author/julia-gordon-bramer
2. **The Occult Sylvia Plath: The Hidden Spiritual Life of the Visionary Poet** — Destiny
   Books/Inner Traditions, 2024, ISBN 978-1-64411-862-7. Print, ebook, audiobook. Same buy link.
3. **Decoding Sylvia Plath's "Lady Lazarus": Freedom's Feminine Fire** — Magi Press, 2017, ISBN
   978-0-9991860-0-8. Amazon buy link on file.
4. **Decoding Sylvia Plath's "Daddy": Discover the Layers of Meaning Beyond the Brute** — Magi
   Press, 2017, ISBN 9780999186008. Amazon buy link on file.
5. **Fixed Stars Govern a Life: Decoding Sylvia Plath** — Stephen F. Austin State University
   Press, 2014, ISBN 978-1-62288-064-5. Amazon buy link on file.

No press-quote blurbs are attached to individual books on this page — press mentions live only
on the homepage, untied to a specific title.

### Blog (`/blog.html` + 33 posts)
Real posting history from 2021-09 through 2025-08. Recent posts are mostly tour-announcement /
life-update in nature (e.g. "It's Been Awhile!", "Is it Really 2025?!", "End of Summer
reflections") rather than essay-style content. Older posts range wider: personal essays,
spirituality reflections, a few tarot-craft posts. Tour dates named in these posts (Shreveport,
Houston, Conroe TX, and a 2025 multi-state tour) are all in the past relative to today
(2026-09-15) and should **not** be seeded as upcoming events — they're historical/migrated blog
content only.

### Decoding Sylvia Plath (`/decoding-sylvia-plath.html` + 46 essays)
This is the deepest, most distinctive content on the site and the strongest evidence for the
"scholar" side of the brand. Framing, quoted from the source page:
> "reveal[s] new interpretations and multi-layered dimensions of Plath's poetry through the use
> of the tarot and Qabalah"

> "a belief in the occult is not necessary to understand these interpretations"

Methodology: cross-references each Ariel poem against Plath's pocket calendars, letters, and
journals held at Indiana University's Lilly Library, and against the news/personal events of the
day the poem was written. Sample essay (`black-rook-in-rainy-weather-crowing-over-hubris`,
dated 2022-01-19) opens by grounding the 1956 Suez Crisis and works outward into the poem —
scholarly, footnoted, but written for a general educated reader, not a jargon-heavy academic
register. This is the essay set covering all/most of *Ariel* — a real, substantial body of
literary criticism, not blog filler.

Academic credentials confirmed on this page: taught graduate-level creative writing at
Lindenwood University, St. Louis; contributed to *Plath Profiles* journal; presented at the
University of Wisconsin-Milwaukee's Racial Formation/Racial Awareness Graduate Conference
(2014).

### Press / media
No dedicated press page. Every press credential found lives on the homepage only (Psychic St.
Louis, CBS Radio, Riverfront Times). Mystic Fix (her radio show) is described in a 2023 blog
post ("Announcing… Mystic Fix!") but not surfaced anywhere else on the site.

## What's broken, thin, or dated

- No real information architecture: five nav items total, no About/Press/Events pages, so the
  "many hats" have no home except a single homepage paragraph and scattered blog posts
- Booking is entirely manual (phone/email + informal payment apps) with no structured
  request-a-reading flow and a redacted/uncertain email address
- Books have no on-site retailer diversity (all Amazon or a single publisher link; no
  Bookshop.org), no press quotes attached, no way to feature specific titles
- No events/tour system at all — tour dates are buried inside blog post prose and go stale
  immediately after the trip
- The Sylvia Plath scholarship — arguably the most differentiated, press-worthy material on the
  whole site — has no discoverable entry point beyond one static page and a flat post list; nothing
  signals "this is 46 essays covering most of Ariel" to a new visitor
- Contact form has no routing/reason field, so a journalist, a bookstore, and someone wanting a
  reading all hit the same undifferentiated inbox (if it's even wired to deliver anywhere
  reliably — unverifiable from outside)
- Copyright footer says 2024; site has had no visible structural update since

## Source material for the Copywriter

The verbatim/near-verbatim quotes above (press credentials, methodology quotes, book
descriptions) are real source text pulled directly from the live site and should be the
Copywriter's starting point rather than inventing new framing from scratch. Treat anything
marked "paraphrase" above as needing a fresh pass against the live page before quoting it
directly, since it came through a summarizing fetch rather than raw HTML.
