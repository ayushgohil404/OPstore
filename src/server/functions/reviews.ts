import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const getUserIdFromCookie = () => {
  const token = getCookie('auth_token')
  if (!token) return null
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    return decoded.id
  } catch (e) {
    return null
  }
}

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
  .validator((data: { productId: number, rating: number, comment: string }) => data)
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
