# Brief — juliagordonbramer.com Rebuild

## The roster

- **Creative Director** — brand voice, tone, "fun but not silly" calibration, motion restraint
- **Strategist / IA** — audiences, sitemap, conversion paths (`agency/ia.md`)
- **Brand + Visual Designer** — tokens, distinctive treatments (`agency/design-system.md`)
- **Copywriter** — unifies the hats in her actual voice (`copy/`)
- **Frontend Engineer** — Next.js App Router, TypeScript, Tailwind + custom CSS
  (`agency/css-strategy.md`)
- **CMS Engineer** — Payload 3 admin Julia can run solo (`agency/cms-model.md`,
  `agency/cms-ux.md`)
- **Platform Engineer** — data, forms, SEO, env, deploy path
- **Producer** — this file, plus sequencing and definition of done

In practice this build runs as one engineer executing all seven disciplines directly against
shared files, rather than as isolated handoffs — see the note at the bottom on how that changed
mid-build.

## Who she is (confirmed from `agency/audit.md` and public sources — nothing here is invented)

Julia Gordon-Bramer is a working tarot reader (45+ years of practice per her own book
description), an award-winning poet (Riverfront Times "Best Local Poet," 2013), and a Sylvia
Plath scholar whose interpretive method reads Plath's *Ariel* poems through tarot and Qabalah
against Plath's own calendars, letters, and journals. She's published five books spanning three
publishers — a trade-press tarot guide and Plath biography from Destiny Books/Inner Traditions
(2023, 2024), two chapbook-scale Plath essay collections from her own Magi Press (2017), and the
foundational academic-press *Fixed Stars Govern a Life* (SFASU Press, 2014). She's taught
graduate creative writing at Lindenwood University and previously at St. Louis Community
College. A memoir, *Night Times*, about running a 1990s St. Louis alt-rock zine, is in progress
and not yet under contract.

## The problem with the current site

Five nav items (`Home`, `Tarot`, `Books`, `Blog`, `Decoding Sylvia Plath`), no About, no Press,
no Events, no structured way to book a reading beyond "call or email ahead of time." The
scholarship — 46 real essays covering most of *Ariel* — is the single most differentiated,
press-worthy thing on the site and it's the hardest thing to find. See `agency/audit.md` for
the full inventory.

## Tone target

Literary-mystic, not carnival-mystic. Paper, ink, night, one warm metal accent. Tarot treated as
craft and literacy, not spectacle. Personality shows up in typography, hover states, rule lines,
and the way an event card or a pull quote is drawn — not in exclamation points or stock smoke
photography. A scholar and a tarot client should both feel oriented within five seconds of
landing on the homepage, and neither should feel like they wandered into the wrong site.

## Definition of done

See the task brief's own list — restated here as the actual acceptance bar for this build:

1. `pnpm dev`, `pnpm build`, and Payload login as Julia all work
2. Real content seeded from the current site (see `agency/cms-model.md` for what's seeded vs.
   flagged as a follow-up import), no lorem ipsum anywhere
3. Home, About, Books, Events, Blog index/post, Contact all work end-to-end from the CMS
4. The ten CMS jobs-to-be-done in `agency/cms-ux.md` pass
5. `agency/css-strategy.md` accounts for every custom CSS class
6. README covers local setup, env vars, and the "add a post / event / book" workflows
7. Open questions are listed in `agency/open-questions.md`, not guessed into the copy

## Note on process

The original plan was eight coordinated workstream agents. In execution, a forked research
agent (assigned only to the live-site audit) scope-crept into unrequested implementation work
concurrently with the lead engineer's own edits, which corrupted `package.json` and several
source files before being caught and stopped. The lead engineer absorbed and finished that work
directly, then continued the build single-threaded rather than re-introducing concurrent agents
editing the same files. The roster above still describes the disciplines the work passes
through — it just runs through one accountable thread instead of eight parallel ones.
