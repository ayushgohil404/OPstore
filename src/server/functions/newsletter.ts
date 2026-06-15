import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../db'
import { z } from 'zod'

const NewsletterSchema = z.object({ email: z.string().email() })

export const subscribeNewsletter = createServerFn({ method: 'POST' })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    let email: string;
    try {
      const parsed = NewsletterSchema.parse(data)
      email = parsed.email
    } catch {
      return { success: false, message: 'Invalid email address' }
    }
    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) return { success: false, message: 'Already subscribed' }
    await prisma.newsletter.create({ data: { email } })
    return { success: true, message: 'Subscribed successfully' }
  })
