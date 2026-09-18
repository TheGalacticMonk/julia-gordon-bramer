import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

async function run() {
  const payload = await getPayload({ config })
  const site = await payload.findGlobal({ slug: 'site', depth: 0 })
  const footerNavItems = (site.footerNavItems || []).filter(
    (item: any) => item.link?.label !== 'Blog',
  )

  await payload.updateGlobal({
    slug: 'site',
    data: { footerNavItems },
    context: { disableRevalidate: true },
  })

  console.log(
    'footerNavItems now:',
    footerNavItems.map((i: any) => i.link.label),
  )
  process.exit(0)
}

run()
