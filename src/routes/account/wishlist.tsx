import { createFileRoute, Link } from '@tanstack/react-router'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { wishlistApi } from '../../lib/api/wishlist'
import { cartApi } from '../../lib/api/inventory-cart'
import { toast } from 'sonner'

export const Route = createFileRoute('/account/wishlist')({
  component: AccountWishlist,
})

function AccountWishlist() {
  const queryClient = useQueryClient()

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.getWishlist()
  })

  const removeMutation = useMutation({
    mutationFn: (productId: number) => wishlistApi.toggleWishlist(productId),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      toast.success('Removed from wishlist.')
    }
  })

  const cartMutation = useMutation({
    mutationFn: (productId: string) => cartApi.addItem({ variantId: productId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Added to cart!')
    }
  })

  const handleMoveToCart = (item: any) => {
    cartMutation.mutate(item.productId)
    removeMutation.mutate(parseInt(item.productId))
  }

  const handleRemove = (item: any) => {
    removeMutation.mutate(parseInt(item.productId))
  }

  if (isLoading) {
    return <div className="p-8 md:p-10 text-muted-foreground animate-pulse">Loading wishlist...</div>
  }

  return (
    <div className="p-8 md:p-10">
      <div className="mb-8 pb-6 border-b border-border flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" /> Your Wishlist
          </h1>
          <p className="text-muted-foreground mt-1">{wishlistItems.length} items saved</p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-secondary/10 rounded-3xl border border-border border-dashed">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-30" />
          <p className="text-xl font-medium mb-2">Your wishlist is empty</p>
          <p className="text-muted-foreground mb-6">Save items you love to build your perfect collection.</p>
          <Link to="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm inline-block">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="group flex flex-col gap-3 bg-secondary/10 border border-border p-4 rounded-2xl">
              <Link to={`/p/${item.product.slug}`} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary block">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-col gap-1 mt-2">
                <Link to={`/p/${item.product.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors truncate">
                  {item.product.name}
                </Link>
                <span className="text-primary font-bold">${item.product.price.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleMoveToCart(item)}
                  disabled={cartMutation.isPending || removeMutation.isPending}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" /> Move to Cart
                </button>
                <button 
                  onClick={() => handleRemove(item)}
                  disabled={removeMutation.isPending}
                  className="p-2.5 border border-border bg-background rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/10 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
