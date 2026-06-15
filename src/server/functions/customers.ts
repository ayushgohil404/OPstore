import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../db'
import { requireAdmin } from './auth-utils'

export const listAllCustomers = createServerFn({ method: 'GET' })
  .handler(async () => {
    await requireAdmin()
    return prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        _count: { select: { orders: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  })
