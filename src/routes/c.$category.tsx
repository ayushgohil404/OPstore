import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { productsApi } from '../lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Filter, ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/c/$category')({
  head: ({ params }) => {
    const title = params.category.charAt(0).toUpperCase() + params.category.slice(1)
    return {
      meta: [
        { title: `${title} | OPStore` },
        { name: 'description', content: `Discover our latest ${title} collection. Premium quality, modern aesthetic.` },
      ]
    }
  },
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData({
      queryKey: ['products', 'category', params.category],
      queryFn: () => productsApi.listProducts({ categoryId: params.category }),
    })
  },
  component: CategoryPLP,
})

function CategoryPLP() {
  const { category } = Route.useParams()
  const { data: products } = useSuspenseQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productsApi.listProducts({ categoryId: category }),
  })

  // Format category name
  const title = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground">
          Discover our latest {title.toLowerCase()} collection. Premium quality, modern aesthetic.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Rail (Mock) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="flex items-center gap-2 font-semibold text-lg pb-4 border-b border-border">
              <Filter className="w-5 h-5" />
              Filters
            </div>
            
            {/* Size Filter */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center justify-between">
                Size <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button key={size} className="border border-border hover:border-primary rounded-md py-2 text-sm text-center transition-colors">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center justify-between">
                Color <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Black', hex: '#000000' },
                  { name: 'White', hex: '#ffffff' },
                  { name: 'Navy', hex: '#1e3a8a' },
                  { name: 'Olive', hex: '#4d7c0f' },
                  { name: 'Stone', hex: '#d6d3d1' },
                ].map(color => (
                  <button 
                    key={color.name}
                    className="w-8 h-8 rounded-full border border-border ring-offset-background hover:ring-2 hover:ring-ring hover:ring-offset-2 transition-all"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center justify-between">
                Price <ChevronDown className="w-4 h-4" />
              </h3>
              <div className="flex items-center gap-2">
                <input type="text" placeholder="Min" className="w-full bg-secondary rounded-md px-3 py-2 text-sm" />
                <span>-</span>
                <input type="text" placeholder="Max" className="w-full bg-secondary rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-muted-foreground">{products.length} Products</span>
            <select className="bg-transparent border border-border rounded-md px-3 py-1.5 text-sm">
              <option>Recommended</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {products.map(product => (
                <Link key={product.id} to={`/p/${product.slug}`} className="group flex flex-col gap-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
