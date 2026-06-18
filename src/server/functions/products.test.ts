import { describe, it, expect, vi } from 'vitest'
import { mapProduct, listProducts, getProduct, getFeatured, createProduct, getLowStockProducts } from './products'
import jwt from 'jsonwebtoken'

const prismaMock = (globalThis as any).prismaMock
const mockCookies = (globalThis as any).mockCookies

describe('products server functions', () => {
  const JWT_SECRET = 'test_secret_key_1234567890'

  const sampleDbProduct = {
    id: 101,
    title: 'Obsidian Essential Tee',
    description: 'A premium tee',
    price: 45,
    originalPrice: 50,
    category: 'men',
    stock: 12,
    sizes: JSON.stringify(['S', 'M', 'L']),
    images: JSON.stringify(['img1.jpg', 'img2.jpg']),
    createdAt: new Date()
  }

  describe('mapProduct', () => {
    it('should map a database product correctly', () => {
      const mapped = mapProduct(sampleDbProduct)
      expect(mapped).toEqual({
        id: '101',
        name: 'Obsidian Essential Tee',
        slug: 'obsidian-essential-tee',
        description: 'A premium tee',
        price: 45,
        originalPrice: 50,
        images: ['img1.jpg', 'img2.jpg'],
        categoryId: 'men',
        materials: ['Cotton'],
        variants: [
          { id: '101-v0', size: 'S', color: 'Black', sku: 'SKU-101-S', stock: 12 },
          { id: '101-v1', size: 'M', color: 'Black', sku: 'SKU-101-M', stock: 12 },
          { id: '101-v2', size: 'L', color: 'Black', sku: 'SKU-101-L', stock: 12 }
        ]
      })
    })

    it('should fall back if sizes or images parsing fails', () => {
      const dbProductRaw = {
        ...sampleDbProduct,
        sizes: 'invalid-json',
        images: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
      }
      const mapped = mapProduct(dbProductRaw)
      expect(mapped.images).toEqual(['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'])
      expect(mapped.variants).toEqual([
        { id: '101-v0', size: 'OS', color: 'Black', sku: 'SKU-101-OS', stock: 12 }
      ])
    })
  })

  describe('listProducts', () => {
    it('should fetch all products if no filters are provided', async () => {
      prismaMock.product.findMany.mockResolvedValue([sampleDbProduct])

      const result = await listProducts()
      expect(result).toHaveLength(1)
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {},
        take: undefined,
        orderBy: { createdAt: 'desc' }
      })
    })

    it('should filter by category and search term if provided', async () => {
      prismaMock.product.findMany.mockResolvedValue([])

      await listProducts({ data: { categoryId: 'men', search: 'tee', limit: 5 } })
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: {
          category: 'men',
          OR: [
            { title: { contains: 'tee', mode: 'insensitive' } },
            { description: { contains: 'tee', mode: 'insensitive' } }
          ]
        },
        take: 5,
        orderBy: { createdAt: 'desc' }
      })
    })
  })

  describe('getProduct', () => {
    it('should query by modified title and return mapped product', async () => {
      prismaMock.product.findFirst.mockResolvedValue(sampleDbProduct)

      const result = await getProduct({ data: 'obsidian-essential-tee' })
      expect(prismaMock.product.findFirst).toHaveBeenCalledWith({
        where: {
          title: {
            contains: 'obsidian essential tee',
            mode: 'insensitive'
          }
        }
      })
      expect(result).toBeDefined()
      expect(result?.name).toBe('Obsidian Essential Tee')
    })

    it('should return null if no product is found', async () => {
      prismaMock.product.findFirst.mockResolvedValue(null)

      const result = await getProduct({ data: 'not-found' })
      expect(result).toBeNull()
    })
  })

  describe('getFeatured', () => {
    it('should fetch top 4 newest products', async () => {
      prismaMock.product.findMany.mockResolvedValue([sampleDbProduct])

      const result = await getFeatured()
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        take: 4,
        orderBy: { createdAt: 'desc' }
      })
      expect(result).toHaveLength(1)
    })
  })

  describe('createProduct', () => {
    it('should create product in database and return mapped object', async () => {
      prismaMock.product.create.mockResolvedValue(sampleDbProduct)

      const payload = {
        title: 'New Shirt',
        description: 'New Description',
        price: 30,
        category: 'women',
        stock: 50,
        originalPrice: 40,
        imageUrl: 'new.jpg'
      }

      const result = await createProduct({ data: payload })
      expect(prismaMock.product.create).toHaveBeenCalledWith({
        data: {
          title: 'New Shirt',
          description: 'New Description',
          price: 30,
          category: 'women',
          stock: 50,
          originalPrice: 40,
          images: JSON.stringify(['new.jpg'])
        }
      })
      expect(result).toBeDefined()
    })
  })

  describe('getLowStockProducts', () => {
    it('should throw error if user is not authorized as ADMIN', async () => {
      await expect(getLowStockProducts()).rejects.toThrow('Unauthorized')
    })

    it('should return low stock products when user is ADMIN', async () => {
      const token = jwt.sign({ id: 'admin-123' }, JWT_SECRET)
      mockCookies.set('auth_token', token)

      prismaMock.user.findUnique.mockResolvedValue({
        id: 'admin-123',
        role: 'ADMIN'
      })

      prismaMock.product.findMany.mockResolvedValue([
        { id: 102, title: 'Low Stock Item', stock: 2 }
      ])

      const result = await getLowStockProducts()
      expect(prismaMock.product.findMany).toHaveBeenCalledWith({
        where: { stock: { lte: 5 } },
        orderBy: { stock: 'asc' },
        take: 5
      })
      expect(result).toEqual([
        { name: 'Low Stock Item', sku: 'SKU-102', stock: 2 }
      ])
    })
  })
})
