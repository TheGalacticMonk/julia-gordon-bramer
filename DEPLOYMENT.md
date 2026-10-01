# Deploying to Cloudflare Workers (Git-connected)

The site runs as a single Cloudflare Worker: Next.js via [OpenNext](https://opennext.js.org/cloudflare),
Payload CMS inside it. Config lives in `wrangler.jsonc` and `open-next.config.ts`.

| Concern           | Service                                                         |
| ----------------- | --------------------------------------------------------------- |
| Payload database  | D1 (`D1` binding, SQLite) — schema applied by `src/migrations/` |
| Media uploads     | R2 bucket `julia-gordon-bramer-media` (`R2` binding)            |
| Next.js caches    | R2 bucket `julia-gordon-bramer-cache` + D1 `julia-gordon-bramer-next-tag-cache` |
| `next/image`      | Cloudflare Images binding (`IMAGES`)                            |
| Contact-form mail | [Resend](https://resend.com) HTTP API (`RESEND_API_KEY`)        |

> **Requires Workers Paid** ($5/mo minimum). Bundle size is not the reason — as of the 2026-09-04
> Cloudflare change, the script size limit is 64 MiB uncompressed on both Free and Paid, and this
> Worker is ~28 MiB uncompressed, well under it. The real reason is **CPU time**: Free caps every
> request at 10ms of CPU time, fixed, not configurable. A real Free-tier staging deployment of this
> app measured every operation (homepage render, login, dashboard, editing, publishing) at 4x-120x
> over that limit, and one request (loading Payload's Media "Create New" page) was killed outright
> by Cloudflare with a real 503 (`outcome: exceededCpu`). Paid's CPU budget (30s default,
> configurable to 5min) comfortably covers everything measured (worst case seen: ~1.2s).

## One-time setup

Already done for this deployment — kept here for reference or to set up a second environment:

```bash
pnpm wrangler login
pnpm wrangler d1 create julia-gordon-bramer          # copy database_id into wrangler.jsonc
pnpm wrangler r2 bucket create julia-gordon-bramer-media
pnpm wrangler r2 bucket create julia-gordon-bramer-cache
```

`wrangler.jsonc` already has the real `database_id` for production. `vars.NEXT_PUBLIC_SERVER_URL`
is set to the production domain.

### Staging environment

`wrangler.jsonc` also defines an `env.staging` block (separate Worker name, D1 database, R2
buckets — see the file) used to test changes on Workers before they hit production. Deploy it with
`wrangler deploy --env staging`; run migrations against it with
`CLOUDFLARE_ENV=staging NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate`. It's live
at `julia-gordon-bramer-staging.<subdomain>.workers.dev`.

## Connect the Git repo (Workers Builds)

Cloudflare dashboard → **Workers & Pages → Create → Import a repository**, pick this repo and branch, then:

- **Build command:** `pnpm run deploy:database && pnpm run cf:build`
  (applies pending D1 migrations to the remote database, then builds the Worker)
- **Deploy command:** `pnpm run cf:deploy`
- **Worker name:** `julia-gordon-bramer` (must match `name` in `wrangler.jsonc`)

Add these under **Settings → Variables and secrets** — as _both_ build variables and runtime secrets
where noted, because pages are pre-rendered at build time against the remote D1:

| Name                                | Where   | Notes                                                                     |
| ------------------------------------ | ------- | -------------------------------------------------------------------------- |
| `PAYLOAD_SECRET`                    | build + runtime | `openssl rand -hex 32`                                            |
| `NEXT_PUBLIC_SERVER_URL`            | build   | Inlined into client code; also set in `wrangler.jsonc`                    |
| `RESEND_API_KEY`                    | runtime | Verify the sending domain in Resend first                                 |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | build   | `openssl rand -base64 32`. **Must stay fixed across builds** — Next.js otherwise mints a new key per build, and any Worker isolate running an older build can't decrypt Server Actions from a newer one, surfacing as random "Failed to find Server Action" errors and admin pages (e.g. collection "Add New") that silently fail to render. |

Every push to the connected branch now migrates D1, builds and deploys. Then add the custom domain
under the Worker's **Settings → Domains & Routes**.

If the build step fails on D1 auth, check the Workers Builds API token has D1 + R2 edit permissions.

## Everyday commands

```bash
pnpm dev                      # local dev — uses a local D1/R2 under .wrangler/state
pnpm payload migrate:create   # after changing collections/globals — commit the new file in src/migrations
pnpm generate:types           # Cloudflare env types + Payload types
pnpm preview                  # build and run the Worker locally in workerd
pnpm deploy                   # manual deploy (migrate + build + deploy), same as CI
```

Schema changes **must** ship with a committed migration — production never auto-pushes the schema.

## Things that behave differently on Workers

- No `sharp`: Payload can't generate resized image variants, crop or store focal points, so the
  `Media` collection has none. `next/image` resizes at request time through the Images binding.
- OG images use the original upload (there is no 1200×630 `og` size any more).
- Email requires `RESEND_API_KEY`; without it (local dev) Payload logs the email to the console.
- `drizzle-kit` is aliased to a stub in production builds (`next.config.ts`); it only matters in Node.
- `next.config.ts` caps static-generation to 1 build worker (`experimental.cpus: 1`). Next builds
  with several parallel workers by default, and D1 (local **or** the real remote database) throws
  "database is locked" (`SQLITE_BUSY`) under concurrent queries from them. This is required, not
  just a local workaround.
- The in-editor media controls use Payload's shared Server Action. It is defined at module scope
  in `src/app/(payload)/serverFunction.ts` so Next includes it in the Worker action manifest.
  The local Worker build confirms its action ID is registered and resolves at runtime. After
  deployment, verify both “Add new” and “Choose from library” in an Essay or Book form.
- CLI commands and local builds use local D1/R2 bindings. `deploy:database` explicitly selects
  the `remote` Wrangler environment; Cloudflare Workers Builds (`WORKERS_CI=1`) also uses remote
  D1 during static page generation, after migrations have run. Do not run `deploy:database` for
  local verification.
