'use client'

import { ValidationError, useForm } from '@formspree/react'
import { useState, type FormEvent } from 'react'

import type { contactDefaults } from '@/globals/PageText/defaults'

import { submitContactForm } from './actions'
import styles from './contact.module.css'

const reasonOptions = [
  { value: 'reading', label: 'Book a reading' },
  { value: 'invite', label: 'Invite Julia to speak / teach' },
  { value: 'press', label: 'Press / media' },
  { value: 'general', label: 'General question' },
]

export const ContactView = ({ t, status }: { t: typeof contactDefaults; status?: string }) => {
  const [formState, submitToFormspree] = useForm('mjyknbpe')
  const [botSubmitted, setBotSubmitted] = useState(false)
  const succeeded = status === 'success' || formState.succeeded || botSubmitted

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)

    if (fields.get('company')) {
      setBotSubmitted(true)
      return
    }

    // Send only visitor fields; the fallback Server Action adds its own hidden fields.
    void submitToFormspree({
      name: String(fields.get('name') || ''),
      email: String(fields.get('email') || ''),
      phone: String(fields.get('phone') || ''),
      reason: String(fields.get('reason') || ''),
      message: String(fields.get('message') || ''),
    })
  }

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

            {succeeded && (
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
            {status === 'delivery-error' && (
              <p
                role="alert"
                className="mt-8 rounded-md border border-metal bg-paper-raised p-4 text-sm"
              >
                Your message couldn&rsquo;t be sent right now. Please try again in a little while.
              </p>
            )}
            {status === 'rate-limited' && (
              <p
                role="alert"
                className="mt-8 rounded-md border border-metal bg-paper-raised p-4 text-sm"
              >
                Too many messages have been sent recently. Please wait a few minutes and try again.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-raised">
        <div className="container py-16 md:py-20">
          <div className={`mx-auto max-w-xl ${styles.formPanel}`}>
            {!succeeded && (
              <form
                action={submitContactForm}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Honeypot: hidden from real visitors via CSS, not `hidden`, so most bots still fill it in. */}
                <div className="absolute left-[-9999px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={200}
                    className={styles.input}
                  />
                  <ValidationError
                    field="name"
                    errors={formState.errors}
                    role="alert"
                    className={styles.error}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                      Email
                    </label>
                    <input id="email" name="email" type="email" required className={styles.input} />
                    <ValidationError
                      field="email"
                      errors={formState.errors}
                      role="alert"
                      className={styles.error}
                    />
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
                      maxLength={40}
                      className={styles.input}
                    />
                    <ValidationError
                      field="phone"
                      errors={formState.errors}
                      role="alert"
                      className={styles.error}
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
                <ValidationError
                  field="reason"
                  errors={formState.errors}
                  role="alert"
                  className={styles.error}
                />

                <div className={styles.field}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={5000}
                    className={styles.textarea}
                  />
                  <ValidationError
                    field="message"
                    errors={formState.errors}
                    role="alert"
                    className={styles.error}
                  />
                </div>

                <ValidationError errors={formState.errors} role="alert" className={styles.error} />

                <button type="submit" className={styles.submit} disabled={formState.submitting}>
                  {formState.submitting ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}
