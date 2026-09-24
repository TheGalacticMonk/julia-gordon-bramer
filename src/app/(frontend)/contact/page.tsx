import type { Metadata } from 'next'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMeta } from '@/utilities/generateMeta'
import { submitContactForm } from './actions'

const reasonOptions = [
  { value: 'reading', label: 'Book a reading' },
  { value: 'invite', label: 'Invite Julia to speak / teach' },
  { value: 'press', label: 'Press / media' },
  { value: 'general', label: 'General question' },
]

type Props = {
  searchParams: Promise<{ status?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const { status } = await searchParams
  const site = await getCachedGlobal('site', 0)()

  return (
    <article className="container max-w-2xl py-16">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-pretty text-ink-muted">
        Booking a reading, inviting Julia to speak, or writing as press — tell her which, and
        she&rsquo;ll get back to you directly.
      </p>

      {(site?.contactEmail || site?.contactPhone) && (
        <p className="mt-4 text-sm text-ink-muted">
          {site.contactEmail && (
            <>
              Prefer email? <a className="text-metal underline" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </>
          )}
          {site.contactEmail && site.contactPhone && ' · '}
          {site.contactPhone}
        </p>
      )}

      {status === 'success' && (
        <p role="status" className="mt-8 rounded-sm border border-rule bg-paper-raised p-4">
          Thank you — your message is on its way. Julia replies personally, so it may take a
          few days.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-8 rounded-sm border border-metal bg-paper-raised p-4">
          Something in the form didn&rsquo;t look right — please check each field and try
          again.
        </p>
      )}

      <form action={submitContactForm} className="mt-8 flex flex-col gap-6">
        {/* Honeypot: hidden from real visitors via CSS, not `hidden`, so most bots still fill it in. */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-sm border border-rule bg-paper-raised px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-sm border border-rule bg-paper-raised px-3 py-2"
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="font-medium">What&apos;s this about?</legend>
          {reasonOptions.map((option, i) => (
            <label key={option.value} className="flex items-center gap-3 py-1">
              <input
                type="radio"
                name="reason"
                value={option.value}
                required
                defaultChecked={i === 0}
                className="h-5 w-5"
              />
              {option.label}
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className="rounded-sm border border-rule bg-paper-raised px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-fit rounded-sm bg-primary px-6 py-3 font-medium text-primary-foreground motion-safe:transition-opacity hover:opacity-90"
        >
          Send message
        </button>
      </form>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    doc: { meta: { title: 'Contact', description: 'Book a reading, invite Julia to speak, or reach out for press.' }, slug: 'contact' },
  })
}
