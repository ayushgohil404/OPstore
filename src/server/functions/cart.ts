import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import { mapProduct } from './products'

interface CartItemRaw {
  productId: string
  quantity: number
}

// Helper to get raw cart from cookie
const getRawCart = (): CartItemRaw[] => {
  const cookieStr = getCookie('store_cart')
  if (!cookieStr) return []
  try {
    return JSON.parse(cookieStr)
  } catch {
    return []
  }
}

// Helper to save raw cart to cookie
const saveRawCart = (cart: CartItemRaw[]) => {
  setCookie('store_cart', JSON.stringify(cart), {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 // 30 days
  })
}

export const getCart = createServerFn({ method: 'GET' })
  .handler(async () => {
    const rawCart = getRawCart()
    if (rawCart.length === 0) return []

    const productIds = rawCart.map(i => parseInt(i.productId, 10)).filter(id => !isNaN(id))
    
    // Fetch products from DB
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    })

    // Map and assemble hydrated cart
    return rawCart.map(item => {
      const p = products.find(prod => prod.id.toString() === item.productId)
      if (!p) return null
      return {
        variantId: item.productId, // using productId as variantId for now
        quantity: item.quantity,
        product: mapProduct(p)
      }
    }).filter(Boolean)
  })

export const addToCart = createServerFn({ method: 'POST' })
  .validator((data: { variantId: string, quantity: number }) => data)
  .handler(async ({ data }) => {
    const rawCart = getRawCart()
    const existing = rawCart.find(i => i.productId === data.variantId)
    
    if (existing) {
      existing.quantity += data.quantity
    } else {
      rawCart.push({ productId: data.variantId, quantity: data.quantity })
    }
    
    saveRawCart(rawCart)
    return { success: true }
  })

export const updateCartQuantity = createServerFn({ method: 'POST' })
  .validator((data: { variantId: string, quantity: number }) => data)
  .handler(async ({ data }) => {
    const rawCart = getRawCart()
    const existing = rawCart.find(i => i.productId === data.variantId)
    
    if (existing) {
      existing.quantity = data.quantity
    }
    
    saveRawCart(rawCart)
    return { success: true }
  })

export const removeFromCart = createServerFn({ method: 'POST' })
  .validator((data: { variantId: string }) => data)
  .handler(async ({ data }) => {
    let rawCart = getRawCart()
    rawCart = rawCart.filter(i => i.productId !== data.variantId)
    saveRawCart(rawCart)
    return { success: true }
  })

export const clearCart = createServerFn({ method: 'POST' })
  .handler(async () => {
    saveRawCart([])
    return { success: true }
  })
