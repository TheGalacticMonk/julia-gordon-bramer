# Julia Gordon-Bramer

juliagordonbramer.com: Next.js (App Router) with a Payload CMS admin at `/admin`, running on
Cloudflare Workers (D1 database, R2 media) through OpenNext. Deployment: see
[DEPLOYMENT.md](./DEPLOYMENT.md). How Julia edits the site: [docs/CLIENT-GUIDE.md](./docs/CLIENT-GUIDE.md).

## Local development

```bash
pnpm install
cp .env.example .env    # then set PAYLOAD_SECRET (openssl rand -hex 32)
pnpm dev                # http://localhost:3000, admin at /admin
```

Dev uses a local D1 database and R2 bucket under `.wrangler/state`; no external services needed.
`pnpm dev` runs Next with webpack (Turbopack dev drops Payload's admin server action, which closes
the live preview).

## How the CMS is organised

- **Pages** (Home, Tarot, Decoding Sylvia Plath, Books page, Events page, Contact): each page is a
  Payload global holding only its copy. Edits autosave as a draft, the live preview beside the form
  updates as you type, and "Publish changes" puts them live. Built-in defaults live in
  `src/globals/PageText/defaults.ts`; layout and styling are code, never editable.
- **Add to the site:** essays (`posts`), books, upcoming events. Press quotes are edit-only.
- **Contact messages** are stored (and emailed via Resend) but not shown in the CMS.
- Two roles: `editor` (Julia, sees only the above) and `admin` (developer, sees everything).

## Everyday commands

```bash
pnpm payload migrate:create   # after changing collections/globals; commit the file in src/migrations
pnpm generate:types           # Cloudflare env types + Payload types
pnpm generate:importmap       # after adding admin components
pnpm lint
pnpm seed                     # optional: seed books/essays/press quotes into the local database
```
