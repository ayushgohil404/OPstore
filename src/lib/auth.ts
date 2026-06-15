import { getCookie } from '@tanstack/react-start/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is not set')

export const getUserIdFromCookie = () => {
  const token = getCookie('auth_token')
  if (!token) return null
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    return decoded.id
  } catch (e) {
    return null
  }
}
