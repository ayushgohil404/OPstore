import type { Category } from './types'
import { mockCategories } from './mock-seed'

export interface CategoriesAdapter {
  listCategories: () => Promise<Category[]>
  getCategory: (idOrSlug: string) => Promise<Category | null>
  getTree: () => Promise<(Category & { children: Category[] })[]>
}

export const categoriesApi: CategoriesAdapter = {
  listCategories: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockCategories
  },
  
  getCategory: async (idOrSlug) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return mockCategories.find(c => c.id === idOrSlug || c.slug === idOrSlug) || null
  },
  
  getTree: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const rootCategories = mockCategories.filter(c => !c.parentId)
    return rootCategories.map(root => ({
      ...root,
      children: mockCategories.filter(c => c.parentId === root.id)
    }))
  }
}
