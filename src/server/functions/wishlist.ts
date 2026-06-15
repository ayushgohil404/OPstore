import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../db'
import { mapProduct } from './products'


import { getUserIdFromCookie } from './auth-utils'

export const getWishlist = createServerFn({ method: 'GET' })
  .handler(async () => {
    const userId = getUserIdFromCookie()
    if (!userId) return []

    const wishlists = await prisma.wishlist.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' }
    })

    return wishlists.map(w => ({
      id: w.id,
      productId: w.productId.toString(),
      product: mapProduct(w.product),
      createdAt: w.createdAt.toISOString()
    }))
  })

export const toggleWishlist = createServerFn({ method: 'POST' })
  .validator((productId: number) => productId)
  .handler(async ({ data: productId }) => {
    const userId = getUserIdFromCookie()
    if (!userId) throw new Error('Unauthorized')

    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId }
    })

    if (existing) {
      await prisma.wishlist.delete({ where: { id: existing.id } })
      return { added: false }
    } else {
      await prisma.wishlist.create({
        data: { userId, productId }
      })
      return { added: true }
    }
  })
