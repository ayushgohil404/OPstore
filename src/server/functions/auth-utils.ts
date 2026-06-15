import { getCookie } from '@tanstack/react-start/server'
import jwt from 'jsonwebtoken'
import { prisma } from '../db'

export const getUserIdFromCookie = () => {
  const token = getCookie('auth_token')
  if (!token) return null
  
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set')
    return null
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    return decoded.id
  } catch (e) {
    return null
  }
}

export const requireAdmin = async () => {
  const token = getCookie('auth_token')
  if (!token) throw new Error('Unauthorized')
  
  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user || user.role !== 'ADMIN') throw new Error('Forbidden: Admin access required')
    return user
  } catch (e: any) {
    throw new Error(e.message || 'Unauthorized')
  }
}
