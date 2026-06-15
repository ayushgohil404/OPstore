import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../db'
import { requireAdmin } from './auth-utils'

// Helper to map Prisma Product to Frontend Product
export const mapProduct = (p: any) => {
  let parsedImages = []
  try { parsedImages = typeof p.images === 'string' ? JSON.parse(p.images) : p.images } catch (e) {
    if (typeof p.images === 'string' && p.images.startsWith('http')) {
      parsedImages = [p.images]
    }
  }

  let parsedSizes = []
  try { parsedSizes = typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes } catch (e) {}

  return {
    id: p.id.toString(),
    name: p.title,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice || undefined,
    images: parsedImages,
    categoryId: p.category,
    materials: ['Cotton'], // Placeholder as DB doesn't have it
    variants: parsedSizes.length > 0
      ? parsedSizes.map((size: string, i: number) => ({
          id: `${p.id}-v${i}`,
          size,
          color: 'Black',
          sku: `SKU-${p.id}-${size}`,
          stock: p.stock
        }))
      : [{
          id: `${p.id}-v0`,
          size: 'OS',
          color: 'Black',
          sku: `SKU-${p.id}-OS`,
          stock: p.stock
        }]
  }
}

export const listProducts = createServerFn({ method: 'GET' })
  .validator((filters: { categoryId?: string; search?: string; limit?: number } | undefined) => filters)
  .handler(async ({ data: filters }) => {
    let where: any = {}
    if (filters?.categoryId) {
      where.category = filters.categoryId
    }
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    const products = await prisma.product.findMany({
      where,
      take: filters?.limit,
      orderBy: { createdAt: 'desc' }
    })

    return products.map(mapProduct)
  })

export const getProduct = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    // We map slug to title for lookup, or better yet, since we don't have slug in DB, 
    // we fetch all and find, or just lookup by title containing the slug string.
    // For exact match, we can just replace '-' with ' ' and search insensitive.
    const titleQuery = slug.replace(/-/g, ' ')
    const product = await prisma.product.findFirst({
      where: {
        title: {
          contains: titleQuery,
          mode: 'insensitive'
        }
      }
    })

    if (!product) return null
    return mapProduct(product)
  })

export const getFeatured = createServerFn({ method: 'GET' })
  .handler(async () => {
    // DB doesn't have is_featured, so we just take the 4 newest products
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' }
    })
    
    return products.map(mapProduct)
  })

export const createProduct = createServerFn({ method: 'POST' })
  .validator((data: { title: string, description: string, price: number, category: string, stock: number, originalPrice?: number, imageUrl: string }) => data)
  .handler(async ({ data }) => {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        originalPrice: data.originalPrice,
        images: JSON.stringify([data.imageUrl])
      }
    })
    return mapProduct(product)
  })

export const getLowStockProducts = createServerFn({ method: 'GET' })
  .handler(async () => {
    await requireAdmin()
    const products = await prisma.product.findMany({
      where: { stock: { lte: 5 } },
      orderBy: { stock: 'asc' },
      take: 5
    })

    return products.map(p => ({
      name: p.title,
      sku: `SKU-${p.id}`,
      stock: p.stock
    }))
  })
