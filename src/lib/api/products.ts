import type { Product } from './types'
import { 
  listProducts as listProductsFn, 
  getProduct as getProductFn, 
  getFeatured as getFeaturedFn,
  createProduct as createProductFn
} from '../../server/functions/products'

export interface ProductsAdapter {
  listProducts: (filters?: { categoryId?: string; search?: string; limit?: number }) => Promise<Product[]>
  getProduct: (slug: string) => Promise<Product | null>
  getFeatured: () => Promise<Product[]>
  createProduct: (data: { title: string, description: string, price: number, category: string, stock: number, originalPrice?: number, imageUrl: string }) => Promise<Product>
}

export const productsApi: ProductsAdapter = {
  listProducts: async (filters) => {
    const data = await listProductsFn({ data: filters || {} })
    return data as unknown as Product[]
  },

  getProduct: async (slug) => {
    const data = await getProductFn({ data: slug })
    return data ? (data as unknown as Product) : null
  },

  getFeatured: async () => {
    const data = await getFeaturedFn()
    return data as unknown as Product[]
  },

  createProduct: async (data) => {
    const result = await createProductFn({ data })
    return result as unknown as Product
  }
}
