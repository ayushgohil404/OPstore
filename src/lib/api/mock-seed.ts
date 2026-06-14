import type { Product, Category, Review } from './types'

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Men', slug: 'men' },
  { id: 'c2', name: 'Women', slug: 'women' },
  { id: 'c3', name: 'Kids', slug: 'kids' },
  { id: 'c4', name: 'Accessories', slug: 'accessories' },
  { id: 'c1-1', name: 'Tops', slug: 'tops', parentId: 'c1' },
  { id: 'c1-2', name: 'Bottoms', slug: 'bottoms', parentId: 'c1' },
  { id: 'c2-1', name: 'Dresses', slug: 'dresses', parentId: 'c2' },
]

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Obsidian Essential Tee',
    slug: 'obsidian-essential-tee',
    description: 'A premium heavyweight cotton tee with a relaxed fit. The perfect foundation for any outfit.',
    categoryId: 'c1',
    subcategoryId: 'c1-1',
    price: 45,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'],
    variants: [
      { id: 'v1', size: 'M', color: 'Black', sku: 'OET-BLK-M', stock: 15 },
      { id: 'v2', size: 'L', color: 'Black', sku: 'OET-BLK-L', stock: 10 },
    ],
    materials: ['100% Organic Cotton'],
  },
  {
    id: 'p2',
    name: 'Luxe Silk Slip Dress',
    slug: 'luxe-silk-slip-dress',
    description: 'An elegant bias-cut silk dress that drapes beautifully. Features adjustable straps and a cowl neckline.',
    categoryId: 'c2',
    subcategoryId: 'c2-1',
    price: 185,
    originalPrice: 220,
    images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop'],
    variants: [
      { id: 'v3', size: 'S', color: 'Midnight Blue', sku: 'LSD-MB-S', stock: 5 },
      { id: 'v4', size: 'M', color: 'Midnight Blue', sku: 'LSD-MB-M', stock: 2 },
    ],
    materials: ['100% Mulberry Silk'],
  },
  {
    id: 'p3',
    name: 'Kids Mini Bomber Jacket',
    slug: 'kids-mini-bomber-jacket',
    description: 'A stylish and warm bomber jacket for the little ones. Features ribbed cuffs and a sturdy zipper.',
    categoryId: 'c3',
    price: 85,
    images: ['https://images.unsplash.com/photo-1519238396346-60866160e1d0?q=80&w=1000&auto=format&fit=crop'],
    variants: [
      { id: 'v5', size: '4T', color: 'Olive', sku: 'KMB-OLV-4T', stock: 20 },
    ],
  },
  {
    id: 'p4',
    name: 'Monogram Leather Tote',
    slug: 'monogram-leather-tote',
    description: 'A spacious everyday tote crafted from full-grain leather. Includes a detachable interior pouch.',
    categoryId: 'c4',
    price: 295,
    images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000&auto=format&fit=crop'],
    variants: [
      { id: 'v6', size: 'OS', color: 'Black', sku: 'MLT-BLK-OS', stock: 8 },
    ],
    materials: ['Full-grain calf leather', 'Suede lining'],
  }
]

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'Alex D.',
    rating: 5,
    comment: 'Best t-shirt I own. The material is so thick and luxurious.',
    date: '2023-10-15T10:00:00Z'
  }
]
