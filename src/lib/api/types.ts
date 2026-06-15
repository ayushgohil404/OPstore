export interface Product {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  subcategoryId?: string
  price: number
  originalPrice?: number
  images: string[]
  variants: Variant[]
  features?: string[]
  materials?: string[]
}

export interface Variant {
  id: string
  size: string
  color: string
  sku: string
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  image?: string
}

