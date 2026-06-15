import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')

import { getUserIdFromCookie } from '../../lib/auth'

export const requireAdmin = async () => {
  const token = getCookie('auth_token')
  if (!token) throw new Error('Unauthorized')
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user || user.role !== 'ADMIN') throw new Error('Forbidden: Admin access required')
    return user
  } catch (e: any) {
    throw new Error(e.message || 'Unauthorized')
  }
}

export const listUserOrders = createServerFn({ method: 'GET' })
  .handler(async () => {
    const userId = getUserIdFromCookie()
    if (!userId) return []

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return orders.map(o => ({
      ...o,
      items: JSON.parse(o.items)
    }))
  })

export const listAllOrders = createServerFn({ method: 'GET' })
  .handler(async () => {
    await requireAdmin()
    
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return orders.map(o => ({
      ...o,
      items: JSON.parse(o.items)
    }))
  })

export const updateOrderStatus = createServerFn({ method: 'POST' })
  .validator((data: { orderId: number, status: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin()

    const order = await prisma.order.update({
      where: { id: data.orderId },
      data: { status: data.status }
    })

    return {
      ...order,
      items: JSON.parse(order.items)
    }
  })

export const getStoreKPIs = createServerFn({ method: 'GET' })
  .handler(async () => {
    await requireAdmin()

    const totalOrders = await prisma.order.count()
    
    const revenueAgg = await prisma.order.aggregate({
      _sum: { totalAmount: true }
    })
    
    const activeCustomers = await prisma.user.count()

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })

    return {
      totalRevenue: revenueAgg._sum.totalAmount || 0,
      totalOrders,
      activeCustomers,
      recentOrders: recentOrders.map(o => ({ ...o, items: JSON.parse(o.items) }))
    }
  })
