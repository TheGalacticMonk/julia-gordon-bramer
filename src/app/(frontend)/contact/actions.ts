'use server'

import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import configPromise from '@payload-config'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Enter a valid email address'),
  reason: z.enum(['reading', 'invite', 'press', 'general']),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  // Honeypot — real users never fill this in; bots that fill every field do.
  company: z.string().max(0).optional(),
})

// Works with JavaScript disabled: the <form> posts here directly via the `action`
// attribute, and success/error state is communicated back through the redirect's
// query string rather than client-side state.
export async function submitContactForm(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    reason: formData.get('reason'),
    message: formData.get('message'),
    company: formData.get('company') || undefined,
  })

  if (!parsed.success) {
    redirect('/contact?status=error')
  }

  if (parsed.data.company) {
    // Honeypot tripped — pretend success so the bot doesn't learn anything, but drop the message.
    redirect('/contact?status=success')
  }

  const payload = await getPayload({ config: configPromise })

  await payload.create({
    collection: 'form-submissions',
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      reason: parsed.data.reason,
      message: parsed.data.message,
    },
  })

  redirect('/contact?status=success')
}
