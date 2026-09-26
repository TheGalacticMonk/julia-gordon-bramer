import type { contactDefaults } from '@/globals/PageText/defaults'

import { submitContactForm } from './actions'
import styles from './contact.module.css'

const reasonOptions = [
  { value: 'reading', label: 'Book a reading' },
  { value: 'invite', label: 'Invite Julia to speak / teach' },
  { value: 'press', label: 'Press / media' },
  { value: 'general', label: 'General question' },
]

export type ContactSite = { contactEmail?: string | null; contactPhone?: string | null } | null

export const ContactView = ({
  t,
  site,
  status,
}: {
  t: typeof contactDefaults
  site: ContactSite
  status?: string
}) => {
  return (
    <article>
      <section className="section-base">
        <div className="container py-10 md:py-14">
          {/* max-width lives on this nested div, not on `.container` itself — `.container`
              carries its own responsive max-width (up to 76rem) that otherwise wins the
              cascade over a max-w-* utility placed on the same element, which is why this
              page rendered edge-to-edge before. */}
          <div className={`mx-auto max-w-xl ${styles.intro}`}>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-metal">
              {t.eyebrow}
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl">{t.heading}</h1>
            <p className="mt-4 text-pretty text-ink-muted">{t.intro}</p>

            {(site?.contactEmail || site?.contactPhone) && (
              <p className="mt-4 text-sm text-ink-muted">
                {site.contactEmail && (
                  <>
                    Prefer email?{' '}
                    <a className="text-metal underline" href={`mailto:${site.contactEmail}`}>
                      {site.contactEmail}
                    </a>
                  </>
                )}
                {site.contactEmail && site.contactPhone && ' · '}
                {site.contactPhone}
              </p>
            )}

            {status === 'success' && (
              <p
                role="status"
                className="mt-8 rounded-md border border-rule bg-paper-raised p-4 text-sm"
              >
                {t.successMessage}
              </p>
            )}
            {status === 'error' && (
              <p
                role="alert"
                className="mt-8 rounded-md border border-metal bg-paper-raised p-4 text-sm"
              >
                Something in the form didn&rsquo;t look right — please check each field and try
                again.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-raised">
        <div className="container py-16 md:py-20">
          <div className={`mx-auto max-w-xl ${styles.formPanel}`}>
            <form action={submitContactForm} className="flex flex-col gap-6">
              {/* Honeypot: hidden from real visitors via CSS, not `hidden`, so most bots still fill it in. */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input id="name" name="name" type="text" required className={styles.input} />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={styles.input} />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={styles.input}
                  />
                </div>
              </div>

              <fieldset className={styles.field}>
                <legend className={styles.label}>What&apos;s this about?</legend>
                <div className={styles.reasonGroup}>
                  {reasonOptions.map((option, i) => (
                    <label key={option.value} className={styles.reasonOption}>
                      <input
                        type="radio"
                        name="reason"
                        value={option.value}
                        required
                        defaultChecked={i === 0}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </article>
  )
}
