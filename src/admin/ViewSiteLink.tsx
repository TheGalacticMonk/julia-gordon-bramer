import { getServerSideURL } from '@/utilities/getURL'

/** Shown at the bottom of the side menu (admin.components.afterNavLinks) on every screen. */
export default function ViewSiteLink() {
  return (
    <a className="jgb-nav-site" href={getServerSideURL()} target="_blank" rel="noopener noreferrer">
      View your website
      <span aria-hidden="true"> ↗</span>
      <span className="jgb-visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}
