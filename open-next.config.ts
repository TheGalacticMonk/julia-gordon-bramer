import { defineCloudflareConfig } from '@opennextjs/cloudflare/config'
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache'
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache'
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue'
import doShardedTagCache from '@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache'

// The Payload revalidate* hooks call revalidateTag/revalidatePath, which need an
// incremental cache (R2), a tag cache and a queue (Durable Objects) on Workers.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
    bypassTagCacheOnCacheHit: true,
  }),
  queue: doQueue,
  tagCache: doShardedTagCache({ baseShardSize: 12 }),
})
