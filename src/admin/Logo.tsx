import { StarPath } from './Icon'

/** Login screen logo: the site wordmark (Julia in roman, Gordon-Bramer in italic) plus a welcome line. */
export default function Logo() {
  return (
    <div className="jgb-logo">
      <svg className="jgb-logo__star" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <StarPath />
      </svg>
      <p className="jgb-logo__wordmark">
        Julia <em>Gordon-Bramer</em>
      </p>
      <p className="jgb-logo__hint">Log in to update your website.</p>
    </div>
  )
}
