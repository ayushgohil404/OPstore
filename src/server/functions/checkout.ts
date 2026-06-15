import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import { sendOrderConfirmationEmail } from '../../lib/email'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  zipCode: string
  paymentMethod: string // e.g. "Credit Card"
}

export const processCheckout = createServerFn({ method: 'POST' })
  .validator((data: CheckoutData) => data)
  .handler(async ({ data }) => {
    // 1. Read Cart
    const cookieStr = getCookie('store_cart')
    if (!cookieStr) throw new Error('Cart is empty')
    
    let rawCart: { productId: string, quantity: number }[] = []
    try {
      rawCart = JSON.parse(cookieStr)
    } catch {
      throw new Error('Invalid cart data')
    }

    if (rawCart.length === 0) throw new Error('Cart is empty')

    // 2. Fetch real prices from DB
    const productIds = rawCart.map(i => parseInt(i.productId, 10)).filter(id => !isNaN(id))
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } }
    })

    let subtotal = 0
    const orderItems = rawCart.map(item => {
      const p = products.find(prod => prod.id.toString() === item.productId)
      if (!p) throw new Error(`Product ${item.productId} not found`)
      
      const itemTotal = p.price * item.quantity
      subtotal += itemTotal
      
      return {
        productId: p.id,
        title: p.title,
        price: p.price,
        quantity: item.quantity
      }
    })

    const shipping = subtotal > 150 ? 0 : 15
    const totalAmount = subtotal + shipping

    // 3. Determine if user is logged in
    const token = getCookie('auth_token')
    let userId = null
    if (token) {
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET)
        userId = decoded.id
      } catch (e) {
        // invalid token, ignore
      }
    }

    // 4. Create Order in Prisma
    const customerName = `${data.firstName} ${data.lastName}`.trim()
    const fullAddress = `${data.address}, ${data.city}, ${data.zipCode}`
    
    const order = await prisma.order.create({
      data: {
        userId,
        customerName,
        phone: 'N/A', // Assuming not collected in this simple form
        address: fullAddress,
        totalAmount,
        paymentMethod: data.paymentMethod,
        paymentStatus: 'COMPLETED', // Mocking successful payment
        status: 'PROCESSING',
        items: JSON.stringify(orderItems)
      }
    })

    // 5. Send Email
    const orderIdStr = `#OP-${order.id.toString().padStart(4, '0')}`
    sendOrderConfirmationEmail({ 
      data: { email: data.email, orderId: orderIdStr, total: totalAmount } 
    }).catch(console.error)

    // 6. Clear Cart
    setCookie('store_cart', '[]', { path: '/', httpOnly: true })

    return { 
      success: true, 
      orderId: orderIdStr
    }
  })
