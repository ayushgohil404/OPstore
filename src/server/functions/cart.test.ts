import { describe, it, expect } from 'vitest'
import { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart } from './cart'

const prismaMock = (globalThis as any).prismaMock
const mockCookies = (globalThis as any).mockCookies

describe('cart server functions', () => {
  describe('getCart', () => {
    it('should return an empty array if there is no store_cart cookie', async () => {
      const result = await getCart()
      expect(result).toEqual([])
    })

    it('should return empty array if JSON parsing fails', async () => {
      mockCookies.set('store_cart', 'invalid-json')
      const result = await getCart()
      expect(result).toEqual([])
    })

    it('should return empty array if products in cart do not exist in DB', async () => {
      const rawCart = [
        { productId: '101', quantity: 2 },
        { productId: '102', quantity: 1 }
      ]
      mockCookies.set('store_cart', JSON.stringify(rawCart))

      prismaMock.product.findMany.mockResolvedValue([])

      const result = await getCart()
      expect(result).toEqual([])
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { id: { in: [101, 102] } }
      })
    })

    it('should return hydrated cart items if products exist in DB', async () => {
      const rawCart = [
        { productId: '101', quantity: 2 }
      ]
      mockCookies.set('store_cart', JSON.stringify(rawCart))

      const dbProduct = {
        id: 101,
        title: 'Obsidian Essential Tee',
        description: 'A great tee',
        price: 45,
        category: 'men',
        stock: 15,
        sizes: JSON.stringify(['M', 'L']),
        images: JSON.stringify(['img1.jpg'])
      }
      prismaMock.product.findMany.mockResolvedValue([dbProduct])

      const result = await getCart()
      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        variantId: '101',
        quantity: 2,
        product: {
          id: '101',
          name: 'Obsidian Essential Tee',
          slug: 'obsidian-essential-tee',
          description: 'A great tee',
          price: 45,
          originalPrice: undefined,
          images: ['img1.jpg'],
          categoryId: 'men',
          materials: ['Cotton'],
          variants: [
            { id: '101-v0', size: 'M', color: 'Black', sku: 'SKU-101-M', stock: 15 },
            { id: '101-v1', size: 'L', color: 'Black', sku: 'SKU-101-L', stock: 15 }
          ]
        }
      })
    })
  })

  describe('addToCart', () => {
    it('should add a new item if cart is empty', async () => {
      await addToCart({ data: { variantId: '101', quantity: 3 } })
      
      const cartCookie = mockCookies.get('store_cart')
      expect(cartCookie).toBeDefined()
      expect(JSON.parse(cartCookie)).toEqual([
        { productId: '101', quantity: 3 }
      ])
    })

    it('should increment quantity if item already exists in cart', async () => {
      const initialCart = [{ productId: '101', quantity: 2 }]
      mockCookies.set('store_cart', JSON.stringify(initialCart))

      await addToCart({ data: { variantId: '101', quantity: 3 } })

      const cartCookie = mockCookies.get('store_cart')
      expect(JSON.parse(cartCookie)).toEqual([
        { productId: '101', quantity: 5 }
      ])
    })

    it('should add secondary item to cart list', async () => {
      const initialCart = [{ productId: '101', quantity: 2 }]
      mockCookies.set('store_cart', JSON.stringify(initialCart))

      await addToCart({ data: { variantId: '202', quantity: 1 } })

      const cartCookie = mockCookies.get('store_cart')
      expect(JSON.parse(cartCookie)).toEqual([
        { productId: '101', quantity: 2 },
        { productId: '202', quantity: 1 }
      ])
    })
  })

  describe('updateCartQuantity', () => {
    it('should update quantity of an existing item', async () => {
      const initialCart = [
        { productId: '101', quantity: 2 },
        { productId: '202', quantity: 4 }
      ]
      mockCookies.set('store_cart', JSON.stringify(initialCart))

      await updateCartQuantity({ data: { variantId: '202', quantity: 10 } })

      const cartCookie = mockCookies.get('store_cart')
      expect(JSON.parse(cartCookie)).toEqual([
        { productId: '101', quantity: 2 },
        { productId: '202', quantity: 10 }
      ])
    })
  })

  describe('removeFromCart', () => {
    it('should remove item from the cart', async () => {
      const initialCart = [
        { productId: '101', quantity: 2 },
        { productId: '202', quantity: 4 }
      ]
      mockCookies.set('store_cart', JSON.stringify(initialCart))

      await removeFromCart({ data: { variantId: '101' } })

      const cartCookie = mockCookies.get('store_cart')
      expect(JSON.parse(cartCookie)).toEqual([
        { productId: '202', quantity: 4 }
      ])
    })
  })

  describe('clearCart', () => {
    it('should clear all items in the cart', async () => {
      const initialCart = [{ productId: '101', quantity: 2 }]
      mockCookies.set('store_cart', JSON.stringify(initialCart))

      await clearCart()

      const cartCookie = mockCookies.get('store_cart')
      expect(JSON.parse(cartCookie)).toEqual([])
    })
  })
})
