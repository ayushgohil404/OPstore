import { describe, it, expect, vi } from 'vitest'
import { getReviews, createReview } from './reviews'
import jwt from 'jsonwebtoken'

const prismaMock = (globalThis as any).prismaMock
const mockCookies = (globalThis as any).mockCookies

describe('reviews server functions', () => {
  const JWT_SECRET = 'test_secret_key_1234567890'

  describe('getReviews', () => {
    it('should return empty list when no reviews are found', async () => {
      prismaMock.review.findMany.mockResolvedValue([])

      const result = await getReviews({ data: 42 })
      expect(result).toEqual([])
      expect(prismaMock.review.findMany).toHaveBeenCalledWith({
        where: { productId: 42 },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    })

    it('should return mapped list of reviews with formatted ISO dates', async () => {
      const dbReview = {
        id: 1,
        userId: 'user-123',
        productId: 42,
        rating: 5,
        comment: 'Great product!',
        createdAt: new Date('2026-06-18T10:00:00.000Z'),
        user: {
          id: 'user-123',
          name: 'Jane Doe',
          avatarUrl: 'https://example.com/avatar.jpg'
        }
      }
      prismaMock.review.findMany.mockResolvedValue([dbReview])

      const result = await getReviews({ data: 42 })
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 1,
        userId: 'user-123',
        productId: 42,
        rating: 5,
        comment: 'Great product!',
        createdAt: '2026-06-18T10:00:00.000Z',
        user: {
          id: 'user-123',
          name: 'Jane Doe',
          avatarUrl: 'https://example.com/avatar.jpg'
        }
      })
    })
  })

  describe('createReview', () => {
    it('should throw error when user is not logged in', async () => {
      // No auth token cookie set
      await expect(
        createReview({ data: { productId: 42, rating: 5, comment: 'Nice!' } })
      ).rejects.toThrow('Unauthorized: Must be logged in to review.')
    })

    it('should throw error when validation fails (invalid rating)', async () => {
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)

      // Rating must be between 1 and 5
      await expect(
        createReview({ data: { productId: 42, rating: 6, comment: 'Nice!' } })
      ).rejects.toThrow('Invalid input')
    })

    it('should create and return the review when authenticated and input is valid', async () => {
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)

      const mockCreatedReview = {
        id: 2,
        userId: 'user-123',
        productId: 42,
        rating: 4,
        comment: 'Pretty good',
        createdAt: new Date('2026-06-18T12:00:00.000Z'),
        user: {
          id: 'user-123',
          name: 'Jane Doe',
          avatarUrl: 'https://example.com/avatar.jpg'
        }
      }

      prismaMock.review.create.mockResolvedValue(mockCreatedReview)

      const result = await createReview({
        data: { productId: 42, rating: 4, comment: 'Pretty good' }
      })

      expect(prismaMock.review.create).toHaveBeenCalledWith({
        data: {
          productId: 42,
          userId: 'user-123',
          rating: 4,
          comment: 'Pretty good'
        },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } }
        }
      })

      expect(result).toEqual({
        id: 2,
        userId: 'user-123',
        productId: 42,
        rating: 4,
        comment: 'Pretty good',
        createdAt: '2026-06-18T12:00:00.000Z',
        user: {
          id: 'user-123',
          name: 'Jane Doe',
          avatarUrl: 'https://example.com/avatar.jpg'
        }
      })
    })
  })
})
