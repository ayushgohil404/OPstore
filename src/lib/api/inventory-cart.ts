import type { Product } from './types'
import { 
  getCart as getCartFn,
  addToCart as addToCartFn,
  removeFromCart as removeFromCartFn,
  updateCartQuantity as updateCartQuantityFn,
  clearCart as clearCartFn
} from '../../server/functions/cart'

// Inventory API (Keep mock for now, or could query Prisma)
export interface InventoryAdapter {
  getStock: (variantId: string) => Promise<number>
  updateStock: (variantId: string, quantity: number) => Promise<boolean>
}

export const inventoryApi: InventoryAdapter = {
  getStock: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return 10
  },
  updateStock: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return true
  }
}

// Cart API
export interface CartItem {
  variantId: string
  quantity: number
  product: Product
}

export interface CartAdapter {
  getCart: () => Promise<CartItem[]>
  addItem: (item: { variantId: string, quantity: number }) => Promise<void>
  removeItem: (variantId: string) => Promise<void>
  updateQuantity: (variantId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
}

export const cartApi: CartAdapter = {
  getCart: async () => {
    const data = await getCartFn()
    return data as unknown as CartItem[]
  },
  addItem: async (item) => {
    await addToCartFn({ data: item })
  },
  removeItem: async (variantId) => {
    await removeFromCartFn({ data: { variantId } })
  },
  updateQuantity: async (variantId, quantity) => {
    await updateCartQuantityFn({ data: { variantId, quantity } })
  },
  clearCart: async () => {
    await clearCartFn()
  }
}
