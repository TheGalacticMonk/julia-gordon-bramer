# Information Architecture

## Audiences

1. **Prospective tarot client** — wants to know: is this legit, what does a reading cost, how do
   I book. Arrives via search ("St. Louis tarot reader"), word of mouth, or a press mention.
2. **Plath scholar / student / journalist** — wants to know: what's her interpretive method,
   what has she published, can I cite her. Arrives via search ("Sylvia Plath tarot Qabalah"),
   an academic citation, or a press mention.
3. **Bookstore / festival / conference organizer** — wants to know: what does she speak about,
   has she done this before, how do I book her. Arrives via referral or her own outreach.
4. **Returning reader / fan** — wants: new blog posts, tour dates near them, her latest book.

The same person is often more than one of these at once (a scholar who also wants a reading is
not a rare visitor here) — the homepage has to hold both without either feeling like a detour.

## Sitemap

```
/                        Home
/about                   About (the unified bio — all the hats, one narrative)
/tarot                   Tarot & Bookings
/books                   Books (index, CMS-driven)
/books/[slug]             Individual book
/scholarship              Sylvia Plath scholarship (method + essay index, filtered by category)
/events                   Events / Tour (CMS-driven, upcoming + past)
/events/[slug]            Individual event
/writing                  Writing & poetry
/press                    Press (credentials + press-quotes)
/blog                     Blog index
/blog/[slug]              Blog post
/contact                  Contact (form + booking info)
```

Decision against the brief's literal proposed IA: the brief listed "Scholarship / Plath" and
"Writing and poetry" as separate top-level items alongside a generic "Blog." Given the audit
found 46 real Plath essays and a general blog with a very different register (tour announcements,
personal essays), collapsing all of it into one undifferentiated "Blog" would bury the
scholarship again — the exact problem this rebuild exists to fix. Scholarship essays stay in the
`posts` collection with a "Scholarship" category (one content type for Julia to author in — she
picks a category, not a second collection) and get their own curated landing page at
`/scholarship` that explains the method and lists posts carrying that category. Every post —
scholarship or general — lives at the single canonical `/blog/[slug]` route; `/scholarship` is a
discovery front door into the same collection, not a parallel detail template. One CMS collection,
one post template, and the scholarship still gets the dedicated front door it needs.

## Homepage structure

One story, several entry points, in this order:

1. **Hero** — name, the one-line "writer, scholar, poet, tarot reader" framing, a single primary
   CTA that adapts to intent (see below) and a secondary link to About
2. **Bio split** — short unified bio + portrait, links to About and Press
3. **Book shelf** — featured books (CMS-driven, `featured` flag)
4. **Press strip** — the three verified credentials (Top Ten Psychic, CBS Radio, Riverfront
   Times) plus any featured press quotes
5. **Event list** — next 3-4 upcoming dates, auto-populated, empty-state copy if none are on the
   calendar (see `open-questions.md` — currently the real answer is "none scheduled")
6. **Scholarship teaser** — one pull quote from the methodology + link to `/scholarship`
7. **CTA band** — book a reading / invite Julia to speak — the two primary conversions

Primary CTAs, in priority order: **Book a reading** (tarot client), **Invite Julia** (organizer),
**Get the books** (everyone else). All three stay visible in the header/footer, not just the
hero, since which one a given visitor wants varies by who they are.

## Conversion paths

- **Book a reading:** homepage/hero → `/tarot` → contact form (reason: "Book a reading") →
  `form-submissions`, Julia notified by email, she follows up manually (per
  `open-questions.md`, there's no scheduling tool today — the form routes the request, it
  doesn't auto-book)
- **Invite to speak/teach:** `/press` or `/about` → `/contact` (reason: "Invite Julia") →
  same inbox, flagged by reason so it doesn't get lost among reading requests
- **Buy a book:** `/books` or homepage book shelf → `/books/[slug]` → outbound retailer link
  (no on-site checkout — matches how the books actually sell today)
- **Press inquiry:** `/press` → `/contact` (reason: "Press / media")

## URL migration

All 79 current URLs (see `agency/audit.md`) get a redirect entry. Mapping:

- `/tarot.html` → `/tarot`
- `/books.html` → `/books`
- `/blog.html` → `/blog`
- `/decoding-sylvia-plath.html` → `/scholarship`
- `/decoding-sylvia-plath/<slug>` → `/blog/<slug>` for migrated essays, or `/scholarship` for
  the two test posts and any not yet migrated (see `agency/open-questions.md` on migration
  scope)
- `/blog/<slug>` → `/blog/<slug>` for migrated posts, or `/blog` for the one test post
