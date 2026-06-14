import { getWishlist as getWishlistFn, toggleWishlist as toggleWishlistFn } from '../../server/functions/wishlist'
import type { Product } from './types'

export interface WishlistItem {
  id: number
  productId: string
  product: Product
  createdAt: string
}

export interface WishlistAdapter {
  getWishlist: () => Promise<WishlistItem[]>
  toggleWishlist: (productId: number) => Promise<{ added: boolean }>
}

export const wishlistApi: WishlistAdapter = {
  getWishlist: async () => {
    const data = await getWishlistFn()
    return data as unknown as WishlistItem[]
  },
  toggleWishlist: async (productId) => {
    return await toggleWishlistFn({ data: productId })
  }
}
