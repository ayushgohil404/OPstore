import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { cartApi } from '../lib/api/inventory-cart'
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react'

export const Route = createFileRoute('/cart')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ['cart'],
      queryFn: () => cartApi.getCart(),
    })
  },
  component: CartPage,
})

function CartPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const { data: cartItems } = useSuspenseQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(),
  })

  const updateMutation = useMutation({
    mutationFn: ({ variantId, quantity }: { variantId: string, quantity: number }) => 
      cartApi.updateQuantity(variantId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      router.invalidate()
    }
  })

  const removeMutation = useMutation({
    mutationFn: (variantId: string) => cartApi.removeItem(variantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      router.invalidate()
    }
  })

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 150 ? 0 : 15
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground pb-4 border-b border-border">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="flex flex-col gap-6">
            {cartItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-border/50">
                
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                    <img src={JSON.parse(item.product.images)[0] || ''} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <Link to={`/p/${item.product.id}`} className="font-semibold hover:text-primary transition-colors">
                      {item.product.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">
                      Category: {item.product.category}
                    </div>
                    <div className="text-primary font-medium mt-1">${item.product.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 flex md:justify-center items-center gap-4">
                  <span className="md:hidden text-sm text-muted-foreground">Qty:</span>
                  <div className="flex items-center border border-border rounded-lg h-10">
                    <button 
                      onClick={() => updateMutation.mutate({ variantId: item.variantId, quantity: Math.max(1, item.quantity - 1) })}
                      disabled={updateMutation.isPending}
                      className="w-10 h-full flex items-center justify-center hover:bg-secondary rounded-l-lg transition-colors"
                    >
                      -
                    </button>
                    <div className="w-10 h-full flex items-center justify-center text-sm font-medium border-x border-border">
                      {updateMutation.isPending && updateMutation.variables?.variantId === item.variantId ? <Loader2 className="w-4 h-4 animate-spin" /> : item.quantity}
                    </div>
                    <button 
                      onClick={() => updateMutation.mutate({ variantId: item.variantId, quantity: item.quantity + 1 })}
                      disabled={updateMutation.isPending}
                      className="w-10 h-full flex items-center justify-center hover:bg-secondary rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 flex justify-between md:justify-end items-center gap-4">
                  <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeMutation.mutate(item.variantId)}
                    disabled={removeMutation.isPending}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  >
                    {removeMutation.isPending && removeMutation.variables === item.variantId ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-secondary rounded-3xl p-8 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 text-sm mb-6 border-b border-border/50 pb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
            </div>

            <Link 
              to="/checkout" 
              className="w-full bg-primary text-primary-foreground h-14 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
