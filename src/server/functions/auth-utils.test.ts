import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getUserIdFromCookie, requireAdmin } from './auth-utils'
import jwt from 'jsonwebtoken'

const prismaMock = (globalThis as any).prismaMock
const mockCookies = (globalThis as any).mockCookies

describe('auth-utils', () => {
  const JWT_SECRET = 'test_secret_key_1234567890'

  beforeEach(() => {
    process.env.JWT_SECRET = JWT_SECRET
  })

  describe('getUserIdFromCookie', () => {
    it('should return null when no token is present', () => {
      expect(getUserIdFromCookie()).toBeNull()
    })

    it('should return null when JWT_SECRET is not set', () => {
      delete process.env.JWT_SECRET
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)
      
      expect(getUserIdFromCookie()).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalledWith('JWT_SECRET is not set')
      consoleErrorSpy.mockRestore()
    })

    it('should return null when token is invalid', () => {
      mockCookies.set('auth_token', 'invalid-token-value')
      expect(getUserIdFromCookie()).toBeNull()
    })

    it('should return the user ID when token is valid', () => {
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)
      expect(getUserIdFromCookie()).toBe('user-123')
    })
  })

  describe('requireAdmin', () => {
    it('should throw Unauthorized error when no token is present', async () => {
      await expect(requireAdmin()).rejects.toThrow('Unauthorized')
    })

    it('should throw JWT_SECRET error when JWT_SECRET is not set', async () => {
      delete process.env.JWT_SECRET
      mockCookies.set('auth_token', 'some-token')
      await expect(requireAdmin()).rejects.toThrow('JWT_SECRET environment variable is not set')
    })

    it('should throw Unauthorized if token verification fails', async () => {
      mockCookies.set('auth_token', 'invalid-token')
      await expect(requireAdmin()).rejects.toThrow()
    })

    it('should throw Forbidden: Admin access required when user is not found in database', async () => {
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)
      
      prismaMock.user.findUnique.mockResolvedValue(null)

      await expect(requireAdmin()).rejects.toThrow('Forbidden: Admin access required')
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-123' }
      })
    })

    it('should throw Forbidden: Admin access required when user role is not ADMIN', async () => {
      const token = jwt.sign({ id: 'user-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)
      
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'user-123',
        name: 'Normal User',
        email: 'user@example.com',
        role: 'USER'
      })

      await expect(requireAdmin()).rejects.toThrow('Forbidden: Admin access required')
    })

    it('should return the user object when user is ADMIN', async () => {
      const token = jwt.sign({ id: 'admin-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)
      
      const adminUser = {
        id: 'admin-123',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'ADMIN'
      }
      prismaMock.user.findUnique.mockResolvedValue(adminUser)

      const result = await requireAdmin()
      expect(result).toEqual(adminUser)
    })
  })
})
