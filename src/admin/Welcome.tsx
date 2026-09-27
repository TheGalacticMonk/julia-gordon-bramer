import type { Payload, SanitizedPermissions, TypedUser } from 'payload'
import { formatAdminURL } from 'payload/shared'

import { getServerSideURL } from '@/utilities/getURL'

import { icons, type IconName } from './icons'

type Props = {
  payload: Payload
  permissions: SanitizedPermissions
  user?: TypedUser | null
}

type Task = {
  title: string
  text: string
  icon: IconName
  href: string
  allowed: boolean
  external?: boolean
  more?: { href: string; label: string }
}

const firstName = (user?: TypedUser | null) => {
  const name = user && 'name' in user && typeof user.name === 'string' ? user.name.trim() : ''
  return name.split(/\s+/)[0] || ''
}

/**
 * The dashboard: a greeting, the common jobs as large cards, and a short note on how
 * publishing works. Rendered by ./Dashboard for every signed-in person.
 */
export default async function Welcome({ payload, permissions, user }: Props) {
  const adminRoute = payload.config.routes.admin
  const url = (path: `/${string}`) => formatAdminURL({ adminRoute, path })
  const canEditPage = (slug: string) => Boolean(permissions?.globals?.[slug]?.update)
  const canAdd = (slug: string) => Boolean(permissions?.collections?.[slug]?.create)
  const canRead = (slug: string) => Boolean(permissions?.collections?.[slug]?.read)

  const page = (slug: string, title: string, text: string, icon: IconName): Task => ({
    title,
    text,
    icon,
    href: url(`/globals/${slug}`),
    allowed: canEditPage(slug),
  })

  const add = (
    slug: string,
    title: string,
    text: string,
    icon: IconName,
    moreLabel: string,
  ): Task => ({
    title,
    text,
    icon,
    href: url(`/collections/${slug}/create`),
    allowed: canAdd(slug),
    more: { href: url(`/collections/${slug}`), label: moreLabel },
  })

  const list = (slug: string, title: string, text: string, icon: IconName): Task => ({
    title,
    text,
    icon,
    href: url(`/collections/${slug}`),
    allowed: canRead(slug),
  })

  const sections: { heading: string; tasks: Task[] }[] = [
    {
      heading: 'Edit a page',
      tasks: [
        page('home', 'Edit the Home page', 'Your name, introduction and About text.', 'home'),
        page('tarotPage', 'Edit Tarot', 'The words on your Tarot page.', 'palette'),
        page(
          'decodingPage',
          'Edit Decoding Sylvia Plath',
          'The main page for your essay series.',
          'pen',
        ),
        page(
          'booksPage',
          'Edit the Books page',
          'The heading and introduction above your books.',
          'book',
        ),
        page(
          'eventsPage',
          'Edit the Events page',
          'The heading and introduction above your events.',
          'calendar',
        ),
        page(
          'contactPage',
          'Edit Contact',
          'The words on the Contact page and the thank-you message.',
          'mail',
        ),
      ],
    },
    {
      heading: 'Add to your website',
      tasks: [
        add(
          'posts',
          'Add an essay',
          'A new Decoding Sylvia Plath essay.',
          'pen',
          'See all essays or reorder',
        ),
        add(
          'books',
          'Add a book',
          'Add a book to your Books page.',
          'book',
          'See all books or reorder',
        ),
        add(
          'events',
          'Add an upcoming event',
          'A reading, signing or talk. It drops off the site after its date.',
          'calendar',
          'See all events',
        ),
      ],
    },
    {
      heading: 'Quotes',
      tasks: [
        list(
          'press-quotes',
          'Edit In the Press',
          'Change the press quotes on your Home page.',
          'quote',
        ),
        {
          title: 'View your website',
          text: 'Opens the live site in a new tab.',
          icon: 'external',
          href: getServerSideURL(),
          allowed: true,
          external: true,
        },
      ],
    },
  ]

  const name = firstName(user)
  const recent = await recentEdits(payload, user, url)

  return (
    <div className="jgb-welcome">
      <header className="jgb-welcome__header">
        <h1 className="jgb-welcome__title">{name ? `Hello, ${name}.` : 'Hello.'}</h1>
        <p className="jgb-welcome__lede">What would you like to work on today?</p>
      </header>

      {sections.map(({ heading, tasks }) => {
        const visible = tasks.filter((t) => t.allowed)
        if (visible.length === 0) return null
        return (
          <section key={heading} className="jgb-welcome__section" aria-label={heading}>
            <h2 className="jgb-welcome__section-title">{heading}</h2>
            <ul className="jgb-cards">
              {visible.map((task) => (
                <li key={task.title} className="jgb-card">
                  <span className="jgb-card__icon">{icons[task.icon]}</span>
                  <a
                    className="jgb-card__link"
                    href={task.href}
                    {...(task.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {task.title}
                    {task.external && (
                      <span className="jgb-visually-hidden"> (opens in a new tab)</span>
                    )}
                  </a>
                  <p className="jgb-card__text">{task.text}</p>
                  {task.more && (
                    <a className="jgb-card__more" href={task.more.href}>
                      {task.more.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <div className="jgb-welcome__columns">
        <section className="jgb-note" aria-labelledby="jgb-how">
          <h2 id="jgb-how" className="jgb-note__title">
            How publishing works
          </h2>
          <ol className="jgb-note__steps">
            <li>
              <strong>Your edits are kept as a draft.</strong> Pages save the draft by themselves as
              you type; nobody sees it yet.
            </li>
            <li>
              <strong>The preview beside the editor</strong> shows exactly how your changes will
              look.
            </li>
            <li>
              <strong>Press “Publish changes”</strong> to put them live. The website updates within
              seconds. Press quotes have no draft: they go live when you press Save.
            </li>
          </ol>
        </section>

        {recent.length > 0 && (
          <section className="jgb-note" aria-labelledby="jgb-recent">
            <h2 id="jgb-recent" className="jgb-note__title">
              Recently edited
            </h2>
            <ul className="jgb-recent">
              {recent.map((item) => (
                <li key={item.href + item.when}>
                  <a href={item.href}>{item.title}</a>
                  <span className="jgb-recent__when">{item.ago}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

type Recent = { title: string; href: string; when: number; ago: string }

const pageNames: Record<string, string> = {
  home: 'Home page',
  tarotPage: 'Tarot page',
  decodingPage: 'Decoding Sylvia Plath page',
  booksPage: 'Books page',
  eventsPage: 'Events page',
  contactPage: 'Contact page',
}

const itemKinds = [
  { slug: 'posts', kind: 'Essay', titleField: 'title' },
  { slug: 'books', kind: 'Book', titleField: 'title' },
  { slug: 'events', kind: 'Event', titleField: 'title' },
  { slug: 'press-quotes', kind: 'Press quote', titleField: 'source' },
] as const

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const timeAgo = (then: number) => {
  const seconds = Math.round((then - Date.now()) / 1000)
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit)
  }
  return 'just now'
}

/** The last few things anyone changed, newest first. Never breaks the dashboard. */
async function recentEdits(
  payload: Payload,
  user: TypedUser | null | undefined,
  url: (path: `/${string}`) => string,
): Promise<Recent[]> {
  if (!user) return []
  try {
    const results = await Promise.all([
      ...Object.entries(pageNames).map(async ([slug, title]) => {
        const doc = await payload.findGlobal({
          slug: slug as 'home',
          depth: 0,
          draft: true,
          overrideAccess: false,
          user,
        })
        const when = doc?.updatedAt ? Date.parse(doc.updatedAt) : NaN
        return Number.isNaN(when) ? [] : [{ title, href: url(`/globals/${slug}`), when }]
      }),
      ...itemKinds.map(async ({ slug, kind, titleField }) => {
        const { docs } = await payload.find({
          collection: slug,
          depth: 0,
          draft: true,
          limit: 3,
          sort: '-updatedAt',
          overrideAccess: false,
          user,
        })
        return docs.map((doc) => {
          const label = String((doc as unknown as Record<string, unknown>)[titleField] || '').trim()
          return {
            title: label ? `${kind}: ${label}` : kind,
            href: url(`/collections/${slug}/${doc.id}`),
            when: Date.parse(doc.updatedAt),
          }
        })
      }),
    ])
    return results
      .flat()
      .sort((a, b) => b.when - a.when)
      .slice(0, 5)
      .map((item) => ({ ...item, ago: timeAgo(item.when) }))
  } catch (error) {
    payload.logger.warn({ err: error, msg: 'Dashboard: could not load recent edits' })
    return []
  }
}
