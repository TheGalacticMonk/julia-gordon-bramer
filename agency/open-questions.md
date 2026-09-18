# Open Questions

Facts the brief assumes or implies that aren't verifiable from the live site or a citable
search result. Don't guess at these — ask Julia (or whoever holds the answer) before publishing
anything that depends on them.

## Contact & booking
- [ ] **Real contact email.** The live site's email was redacted by our fetch tooling as PII, so
  we don't have a confirmed address. Blocks: the site global's contact email, the contact-form
  "send confirmation" copy, and the footer email link.
- [ ] **Reading rate/policy today.** Live site says "$3 USD Per Minute" via phone/video, paid
  through Zelle/Apple Pay/Venmo/Cash App/PayPal, booked manually by phone or email. Is this
  still current? Does Julia want a real scheduling tool (Calendly-style) instead of "email me
  to schedule," or is manual booking intentional?
- [ ] **Booking URL** for the site global (`site.bookingUrl` per the brief) — is there a
  dedicated booking page/tool, or does "book a reading" mean "submit the contact form"?

## Bio & credentials
- [ ] **Current professorship status.** Live site and public bios describe her as *formerly*
  adjunct at St. Louis Community College and at Lindenwood University's graduate Creative
  Writing program. Confirm both are past-tense and get accurate date ranges if she wants them
  stated (the brief's "Former professor at..." phrasing matches what we found, but exact years
  are unconfirmed).
- [ ] **Mystic Fix — current status.** A 2023 blog post announces the show launching on
  NewsTalkSTL; the live site surfaces it nowhere else. Still active? Archived? Where do new
  visitors listen?
- [ ] **CBS Radio "Number One Fortune-Teller" and Psychic St. Louis "Top Ten" — sourceable
  citations.** Both are quoted on the homepage as claims but neither links to the original
  segment/listing. Nice to have a link or date for the Press page's credibility.

## Books
- [ ] **Night Times (memoir) — anything beyond a working title?** Live site lists it as
  "seeking publication" with no description, cover, or timeline. The brief calls it
  "memoir-in-progress." Confirm whether it should appear on the public Books page at all yet
  (as a "forthcoming" placeholder) or stay unlisted until it has a publisher.
  - **Suggested default if unanswered:** keep it out of the public Books collection at launch;
    revisit once there's a description or publication date.
- [ ] **Retailer diversity per book.** Only Amazon/publisher links exist today. Does Julia want
  Bookshop.org links added (the brief's Books collection has a Bookshop.org preset ready)? Do
  any books have signed-copy or local-store options worth a custom retailer entry?
- [ ] **Press quotes tied to specific books.** None exist on the current site — all press
  credentials are homepage-level, not attached to a title. Worth asking whether any reviews
  exist for *Tarot Life Lessons* or *The Occult Sylvia Plath* that could seed the `press-quotes`
  collection with per-book attribution.

## Tour / events
- [ ] **Any events on the calendar right now (post 2026-09-15)?** Every tour date found in blog
  posts is historical (most recent: an Aug 2025 Texas swing). We have zero real upcoming events
  to seed — the Events collection will launch empty unless Julia supplies current dates.
- [ ] **UK appearances.** The brief mentions touring/teaching in the US *and* UK; nothing on the
  live site documents a UK event. Need at least one example to ground the "international" claim
  on the Events/Speaking page, or soften the copy until one exists.

## Content migration
- [ ] **The full 79-URL list (46 essay slugs + 33 blog slugs) was never captured.** The audit
  fork that would have written `raw-content-dump.md` was interrupted before finishing (see
  `agency/audit.md`'s note), so only a handful of example slugs survive. Only the 5 confirmed
  top-level `.html` redirects (`/tarot.html`, `/books.html`, `/blog.html`,
  `/decoding-sylvia-plath.html`, seeded via `pnpm seed`/`src/seed/index.ts`) are live today.
  Per-essay and per-post redirects can't be seeded accurately until either a fresh crawl of
  `/sitemap.xml` recovers the full slug list, or Julia supplies it.
- [ ] **Scope of the 46 Decoding Sylvia Plath essay migration.** These are real, substantial
  scholarly essays (one per Ariel poem) — full-text migration of all 46 wasn't feasible inside
  this build session (would require scraping/importing each essay's full body, footnotes, and
  any images individually). Decide: (a) migrate all 46 as real Posts pre-launch via a dedicated
  import pass, (b) migrate a curated subset now and backfill the rest post-launch, or (c) 301
  redirect all 46 old URLs to a new `/scholarship` index for now and import gradually. The seed
  script in this build takes approach (b) — see `agency/cms-model.md`.
- [ ] **Two test/placeholder posts** (`/decoding-sylvia-plath/another-test-post`,
  `/decoding-sylvia-plath/future-post`, `/blog/test-post`) should almost certainly 301 to their
  parent index rather than migrate — confirm nothing links to them externally first.

## Brand
- [x] **Headshot** — resolved: a real studio portrait (`julia-gordon-bramer-profile.png`) was
  supplied and is seeded as the homepage hero image.
- [ ] **Book cover files, event photography, additional headshot crops.** Still none of this
  was fetchable from the live site at usable resolution. The `assets/` folder also has 10
  more raw shoot photos (`26-299` through `26-316`) that haven't been reviewed/used yet — worth
  asking Julia which of those, if any, she wants used (e.g. for the BioSplit module, which
  needs a portrait but hasn't been given one).
- [ ] **Favicon and default social-share (OG) image.** Currently still pointing at the
  scaffold's generic placeholder (`public/website-template-OG.webp`) — needs a real 1200×630
  branded image and a real favicon before launch.
