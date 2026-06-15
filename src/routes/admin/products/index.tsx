import { createFileRoute, Link } from '@tanstack/react-router'
import { productsApi } from '../../../lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react'

export const Route = createFileRoute('/admin/products/')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ['admin', 'products'],
      queryFn: () => productsApi.listProducts(),
    })
  },
  component: AdminProductsList,
})

function AdminProductsList() {
  const { data: products } = useSuspenseQuery({
    queryKey: ['admin', 'products'],
    queryFn: () => productsApi.listProducts(),
  })

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Products</h1>
          <p className="text-muted-foreground">Manage your catalog, inventory, and pricing.</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-background border border-border rounded-2xl flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium bg-background hover:bg-secondary transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-muted-foreground border-b border-border bg-secondary/10">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0)
                const inStock = totalStock > 0

                return (
                  <tr key={product.id} className="hover:bg-secondary/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{product.variants.length} Variants</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{product.categoryId}</td>
                    <td className="px-6 py-4 font-medium">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-destructive'}`} />
                        <span className={inStock ? '' : 'text-destructive font-medium'}>
                          {inStock ? `${totalStock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-secondary/10">
          <span>Showing 1 to {products.length} of {products.length} products</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-border rounded-md opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-border rounded-md hover:bg-secondary transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
