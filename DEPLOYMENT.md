# Deploying to Cloudflare Workers (Git-connected)

The site runs as a single Cloudflare Worker: Next.js via [OpenNext](https://opennext.js.org/cloudflare),
Payload CMS inside it. Config lives in `wrangler.jsonc` and `open-next.config.ts`.

| Concern           | Service                                                         |
| ----------------- | --------------------------------------------------------------- |
| Payload database  | D1 (`D1` binding, SQLite) — schema applied by `src/migrations/` |
| Media uploads     | R2 bucket `julia-gordon-bramer-media` (`R2` binding)            |
| Next.js caches    | R2 bucket `julia-gordon-bramer-cache` + Durable Objects         |
| `next/image`      | Cloudflare Images binding (`IMAGES`)                            |
| Contact-form mail | [Resend](https://resend.com) HTTP API (`RESEND_API_KEY`)        |

> The bundled Worker is ~6 MiB gzipped, so it needs the **Workers Paid** plan (free tier limit is 3 MiB).

## One-time setup

```bash
pnpm wrangler login
pnpm wrangler d1 create julia-gordon-bramer          # copy database_id into wrangler.jsonc
pnpm wrangler r2 bucket create julia-gordon-bramer-media
pnpm wrangler r2 bucket create julia-gordon-bramer-cache
```

Then in `wrangler.jsonc` replace `REPLACE_WITH_D1_DATABASE_ID`, and review `vars`
(`NEXT_PUBLIC_SERVER_URL` is set to the production domain).

## Connect the Git repo (Workers Builds)

Cloudflare dashboard → **Workers & Pages → Create → Import a repository**, pick this repo and branch, then:

- **Build command:** `pnpm run deploy:database && pnpm run cf:build`
  (applies pending D1 migrations to the remote database, then builds the Worker)
- **Deploy command:** `pnpm run cf:deploy`
- **Worker name:** `julia-gordon-bramer` (must match `name` in `wrangler.jsonc`)

Add these under **Settings → Variables and secrets** — as _both_ build variables and runtime secrets
where noted, because pages are pre-rendered at build time against the remote D1:

| Name                     | Where           | Notes                                                  |
| ------------------------ | --------------- | ------------------------------------------------------ |
| `PAYLOAD_SECRET`         | build + runtime | `openssl rand -hex 32`                                 |
| `NEXT_PUBLIC_SERVER_URL` | build           | Inlined into client code; also set in `wrangler.jsonc` |
| `PREVIEW_SECRET`         | build + runtime | Live-preview validation                                |
| `CRON_SECRET`            | runtime         |                                                        |
| `RESEND_API_KEY`         | runtime         | Verify the sending domain in Resend first              |

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
- Local production builds against a _local_ D1 can hit `SQLITE_BUSY` because Next builds with parallel
  workers; real builds use the remote D1 and don't.
