import { describe, it, expect } from 'vitest'
import { cartApi, inventoryApi } from './inventory-cart'

const prismaMock = (globalThis as any).prismaMock
const mockCookies = (globalThis as any).mockCookies

describe('inventory-cart client api', () => {
  describe('inventoryApi', () => {
    it('should return mock stock', async () => {
      const stock = await inventoryApi.getStock('v1')
      expect(stock).toBe(10)
    })

    it('should update stock and return true', async () => {
      const success = await inventoryApi.updateStock('v1', 5)
      expect(success).toBe(true)
    })
  })

  describe('cartApi', () => {
    it('should get cart items correctly', async () => {
      const rawCart = [{ productId: '101', quantity: 3 }]
      mockCookies.set('store_cart', JSON.stringify(rawCart))

      const dbProduct = {
        id: 101,
        title: 'Obsidian Essential Tee',
        description: 'Tee description',
        price: 45,
        category: 'men',
        stock: 10,
        sizes: JSON.stringify(['M']),
        images: JSON.stringify(['img.jpg'])
      }
      prismaMock.product.findMany.mockResolvedValue([dbProduct])

      const result = await cartApi.getCart()
      expect(result).toHaveLength(1)
      expect(result[0].variantId).toBe('101')
      expect(result[0].quantity).toBe(3)
      expect(result[0].product.name).toBe('Obsidian Essential Tee')
    })

    it('should add item to cart', async () => {
      await cartApi.addItem({ variantId: '202', quantity: 2 })
      const cookieVal = mockCookies.get('store_cart')
      expect(JSON.parse(cookieVal)).toEqual([{ productId: '202', quantity: 2 }])
    })

    it('should update cart quantity', async () => {
      mockCookies.set('store_cart', JSON.stringify([{ productId: '202', quantity: 2 }]))
      await cartApi.updateQuantity('202', 5)
      const cookieVal = mockCookies.get('store_cart')
      expect(JSON.parse(cookieVal)).toEqual([{ productId: '202', quantity: 5 }])
    })

    it('should remove item from cart', async () => {
      mockCookies.set('store_cart', JSON.stringify([
        { productId: '202', quantity: 2 },
        { productId: '101', quantity: 1 }
      ]))
      await cartApi.removeItem('202')
      const cookieVal = mockCookies.get('store_cart')
      expect(JSON.parse(cookieVal)).toEqual([{ productId: '101', quantity: 1 }])
    })

    it('should clear cart', async () => {
      mockCookies.set('store_cart', JSON.stringify([{ productId: '202', quantity: 2 }]))
      await cartApi.clearCart()
      const cookieVal = mockCookies.get('store_cart')
      expect(JSON.parse(cookieVal)).toEqual([])
    })
  })
})
