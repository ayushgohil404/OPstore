import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import { z } from 'zod'

const ReviewSchema = z.object({
  productId: z.number().int(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1).max(1000),
})
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')

import { getUserIdFromCookie } from '../../lib/auth'

export const getReviews = createServerFn({ method: 'GET' })
  .validator((productId: number) => productId)
  .handler(async ({ data: productId }) => {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return reviews.map(r => ({
      ...r,
      createdAt: r.createdAt.toISOString()
    }))
  })

export const createReview = createServerFn({ method: 'POST' })
  .validator((data: any) => {
    try {
      return ReviewSchema.parse(data)
    } catch {
      return { error: 'Invalid input' } as any
    }
  })
  .handler(async ({ data }) => {
    const userId = getUserIdFromCookie()
    if (!userId) throw new Error('Unauthorized: Must be logged in to review.')

    const review = await prisma.review.create({
      data: {
        productId: data.productId,
        userId: userId,
        rating: data.rating,
        comment: data.comment
      },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } }
      }
    })

    return {
      ...review,
      createdAt: review.createdAt.toISOString()
    }
  })
