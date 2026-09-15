import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { CMSLink } from '@/components/Link'

export async function AnnouncementBar() {
  const siteData = await getCachedGlobal('site', 1)()

  if (!siteData?.announcementEnabled || !siteData.announcementMessage) return null

  return (
    <div className="border-b border-rule bg-metal/10 py-2 text-center text-sm">
      <p className="container">
        {siteData.announcementMessage}
        {siteData.announcementLinkUrl && (
          <CMSLink
            appearance="inline"
            className="ml-2 underline"
            url={siteData.announcementLinkUrl}
            label={siteData.announcementLinkLabel || 'Learn more'}
          />
        )}
      </p>
    </div>
  )
}
