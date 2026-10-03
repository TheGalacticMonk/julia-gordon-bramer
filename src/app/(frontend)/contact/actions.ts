'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const formspreeEndpoint = 'https://formspree.io/f/mjyknbpe'

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  reason: z.enum(['reading', 'invite', 'press', 'general']),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  // Honeypot — real users never fill this in; bots that fill every field do.
  company: z.string().max(200).optional(),
})

// Works with JavaScript disabled: the <form> posts here directly via the `action`
// attribute, and success/error state is communicated back through the redirect's
// query string rather than client-side state.
export async function submitContactForm(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
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

  let response: Response
  try {
    response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || '',
        reason: parsed.data.reason,
        message: parsed.data.message,
      }),
      cache: 'no-store',
    })
  } catch {
    redirect('/contact?status=delivery-error')
  }

  if (response.status === 429) {
    redirect('/contact?status=rate-limited')
  }

  if (!response.ok) {
    redirect('/contact?status=delivery-error')
  }

  redirect('/contact?status=success')
}
