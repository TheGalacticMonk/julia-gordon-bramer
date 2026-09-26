import type { DashboardViewServerProps } from '@payloadcms/next/views'
import { Gutter } from '@payloadcms/ui'
import { CollectionCards } from '@payloadcms/ui/rsc'

import Welcome from './Welcome'

/**
 * Replaces Payload's dashboard (admin.components.views.dashboard).
 *
 * Editors see only the task cards in ./Welcome: one obvious way to reach each job.
 * Admins also get Payload's full list of sections underneath, for developer work.
 * This also leaves out 3.x's experimental widget editor ("Edit dashboard" menu),
 * which would only confuse a non-technical editor.
 */
export default function Dashboard(props: DashboardViewServerProps) {
  const { initPageResult, payload, user } = props
  const permissions = props.permissions ?? initPageResult.permissions
  const isAdmin = Boolean(user && 'role' in user && user.role === 'admin')

  return (
    <Gutter className="dashboard jgb-dashboard">
      <Welcome payload={payload} permissions={permissions} user={user} />
      {isAdmin && (
        <section className="jgb-dashboard__all" aria-labelledby="jgb-all">
          <h2 id="jgb-all" className="jgb-welcome__section-title">
            Everything (developer view)
          </h2>
          <CollectionCards
            req={initPageResult.req}
            permissions={permissions}
            cookies={initPageResult.cookies}
            locale={initPageResult.locale}
            widgetSlug="collections"
          />
        </section>
      )}
    </Gutter>
  )
}
