import { getReviews as getReviewsFn, createReview as createReviewFn } from '../../server/functions/reviews'

export interface Review {
  id: number
  userId: string
  user: {
    id: string
    name: string
    avatarUrl: string | null
  }
  productId: number
  rating: number
  comment: string
  createdAt: string
}

export interface ReviewsAdapter {
  getReviews: (productId: number) => Promise<Review[]>
  createReview: (data: { productId: number, rating: number, comment: string }) => Promise<Review>
}

export const reviewsApi: ReviewsAdapter = {
  getReviews: async (productId) => {
    const data = await getReviewsFn({ data: productId })
    return data as unknown as Review[]
  },
  createReview: async (data) => {
    const result = await createReviewFn({ data })
    return result as unknown as Review
  }
}
