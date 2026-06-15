import { createFileRoute, Link, notFound, useRouter } from '@tanstack/react-router'
import { productsApi } from '../lib/api'
import { cartApi } from '../lib/api/inventory-cart'
import { wishlistApi } from '../lib/api/wishlist'
import { reviewsApi } from '../lib/api/reviews'
import { authApi } from '../lib/api'
import { useSuspenseQuery, useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Star, Minus, Plus, Heart, Truck, RefreshCw, ShieldCheck, ChevronDown, User } from 'lucide-react'
import { toast } from 'sonner'

import { RouteError } from '../components/RouteError'
import { RouteLoading } from '../components/RouteLoading'

export const Route = createFileRoute('/p/$slug')({
  errorComponent: RouteError,
  pendingComponent: RouteLoading,
  loader: async ({ context, params }) => {
    const product = await context.queryClient.ensureQueryData({
      queryKey: ['products', 'detail', params.slug],
      queryFn: () => productsApi.getProduct(params.slug),
    })
    
    if (!product) {
      throw notFound()
    }
    
    return { product }
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product
    if (!product) return {}
    return {
      meta: [
        { title: `${product.name} | OPStore` },
        { name: 'description', content: product.description },
        { property: 'og:title', content: `${product.name} | OPStore` },
        { property: 'og:image', content: product.images[0] },
      ]
    }
  },
  component: ProductPDP,
})

function ProductPDP() {
  const { slug } = Route.useParams()
  const { data: product } = useSuspenseQuery({
    queryKey: ['products', 'detail', slug],
    queryFn: () => productsApi.getProduct(slug),
  })

  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => authApi.getCurrentUser()
  })

  // Fetch Wishlist
  const { data: wishlist = [] } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.getWishlist()
  })
  const isWishlisted = product ? wishlist.some((w: any) => w.productId === product.id.toString()) : false

  // Fetch Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', product?.id],
    queryFn: () => reviewsApi.getReviews(parseInt(product!.id)),
    enabled: !!product
  })

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  
  // Review Form State
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  if (!product) return null

  const sizes = Array.from(new Set(product.variants.map(v => v.size)))
  const colors = Array.from(new Set(product.variants.map(v => v.color)))
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'Midnight Blue': '#1e3a8a',
    'Olive': '#4d7c0f',
  }

  const queryClient = useQueryClient()
  const router = useRouter()

  const addMutation = useMutation({
    mutationFn: () => cartApi.addItem({ variantId: product.id.toString(), quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      router.invalidate()
      toast.success(`${quantity}x ${product.name} added to cart!`)
    }
  })

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color')
      return
    }
    addMutation.mutate()
  }

  const wishlistMutation = useMutation({
    mutationFn: () => wishlistApi.toggleWishlist(parseInt(product.id)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      if (data.added) {
        toast.success('Added to wishlist!')
      } else {
        toast.success('Removed from wishlist')
      }
    },
    onError: () => {
      toast.error('You must be logged in to use the wishlist.')
    }
  })

  const reviewMutation = useMutation({
    mutationFn: () => reviewsApi.createReview({ productId: parseInt(product.id), rating: reviewRating, comment: reviewComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', product.id] })
      setReviewComment('')
      setReviewRating(5)
      toast.success('Review submitted successfully!')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to submit review')
    }
  })

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewComment.trim()) {
      toast.error('Please write a comment for your review.')
      return
    }
    reviewMutation.mutate()
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0

  return (
    <div className="container mx-auto px-4 py-10">
      <nav className="text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/c/$category" params={{ category: product.categoryId }} className="hover:text-primary transition-colors capitalize">
          {product.categoryId}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left Panel: Gallery */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button key={i} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary transition-colors">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel: Product Info */}
        <div className="w-full lg:w-[45%] flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-4 h-4 ${star <= Math.round(averageRating) ? 'fill-current' : 'fill-muted text-muted'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground underline decoration-dotted underline-offset-4 cursor-pointer" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>
              {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Size</span>
              <button className="text-sm text-muted-foreground underline">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-12 rounded-xl border flex items-center justify-center text-sm transition-all ${
                    selectedSize === size 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : 'border-border hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <span className="font-medium block mb-3">Color {selectedColor && <span className="text-muted-foreground font-normal ml-1">- {selectedColor}</span>}</span>
            <div className="flex flex-wrap gap-3">
              {colors.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ring-offset-2 ring-offset-background transition-all ${
                    selectedColor === color ? 'border-primary ring-2 ring-primary' : 'border-border hover:border-primary'
                  }`}
                  style={{ backgroundColor: colorMap[color] || '#333' }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium">In Stock</span>
            </div>
            
            <div className="flex items-center border border-border rounded-xl h-12">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full flex items-center justify-center hover:bg-secondary transition-colors rounded-l-xl"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="w-12 h-full flex items-center justify-center font-medium border-x border-border">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-full flex items-center justify-center hover:bg-secondary transition-colors rounded-r-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground h-14 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              ADD TO CART
            </button>
            <button 
              onClick={() => wishlistMutation.mutate()}
              disabled={wishlistMutation.isPending}
              className={`w-full border border-border h-14 rounded-xl font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2 ${isWishlisted ? 'text-rose-500 hover:text-rose-600' : ''}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} /> 
              {isWishlisted ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-border py-6 mb-8">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">Free Shipping<br/>Over $150</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">30-Day<br/>Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted-foreground">Secure<br/>Checkout</span>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-border border-b border-border">
            <details className="group" open>
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4">
                Description
                <span className="transition group-open:rotate-180">
                  <ChevronDown className="w-5 h-5" />
                </span>
              </summary>
              <div className="text-muted-foreground text-sm pb-4 animate-accordion-down">
                {product.description}
              </div>
            </details>
            
            {product.materials && (
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4">
                  Materials & Care
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                <div className="text-muted-foreground text-sm pb-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {product.materials.map((mat, i) => <li key={i}>{mat}</li>)}
                    <li>Machine wash cold with like colors</li>
                    <li>Do not bleach</li>
                    <li>Tumble dry low</li>
                  </ul>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div id="reviews" className="max-w-4xl mx-auto pt-16 border-t border-border">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Reviews List */}
          <div className="flex-1 space-y-8">
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-secondary/10 rounded-2xl border border-border border-dashed">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-1">No reviews yet</h3>
                <p className="text-muted-foreground text-sm">Be the first to review this product!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        {review.user.avatarUrl ? (
                          <img src={review.user.avatarUrl} alt={review.user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{review.user.name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'fill-current' : 'fill-muted text-muted'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Write Review Form */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-secondary/20 rounded-2xl p-6 border border-border sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Write a Review</h3>
              
              {!user ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm mb-4">You must be logged in to leave a review.</p>
                  <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium inline-block w-full">
                    Log In
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-current' : 'text-muted-foreground'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <textarea 
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                      placeholder="What did you think about this product?"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={reviewMutation.isPending}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
