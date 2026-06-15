import { createServerFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { prisma } from '../db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const PasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
})

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')

import { getUserIdFromCookie } from '../../lib/auth'

export const updateProfile = createServerFn({ method: 'POST' })
  .validator((data: { name: string; email: string }) => data)
  .handler(async ({ data }) => {
    const userId = getUserIdFromCookie()
    if (!userId) throw new Error('Unauthorized')

    // Check if email is already taken by another user
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing && existing.id !== userId) {
      throw new Error('Email is already in use by another account.')
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email
      }
    })

    return { success: true, user: { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email } }
  })

export const updatePassword = createServerFn({ method: 'POST' })
  .validator((data: any) => {
    try {
      return PasswordSchema.parse(data)
    } catch {
      return { error: 'Invalid input' } as any
    }
  })
  .handler(async ({ data }) => {
    const userId = getUserIdFromCookie()
    if (!userId) throw new Error('Unauthorized')

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new Error('User not found')

    const isValid = await bcrypt.compare(data.currentPassword, user.password)
    if (!isValid) {
      throw new Error('Current password is incorrect.')
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })

    return { success: true }
  })
