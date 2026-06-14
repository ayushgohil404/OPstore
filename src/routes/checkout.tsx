import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ShieldCheck, CheckCircle2, Loader2, CreditCard } from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { cartApi } from '../lib/api/inventory-cart'
import { stripeApi } from '../lib/api/stripe'
import { processCheckout } from '../server/functions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '')

export const Route = createFileRoute('/checkout')({
  component: CheckoutWrapper,
})

// Wrapper to hold state that shouldn't re-render Elements
function CheckoutWrapper() {
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(),
  })

  const [clientSecret, setClientSecret] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const shipping = subtotal > 150 ? 0 : 15
  const total = subtotal + shipping

  useEffect(() => {
    if (total > 0 && !clientSecret) {
      stripeApi.createPaymentIntent(total)
        .then(res => setClientSecret(res.clientSecret))
        .catch(err => setError(err.message))
    }
  }, [total, clientSecret])

  if (isLoading) {
    return <div className="p-20 text-center flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  }

  if (error) {
    return <div className="p-20 text-center">
      <p className="text-destructive mb-4">{error}</p>
      <Link to="/cart" className="underline">Return to Cart</Link>
    </div>
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
        <Link to="/" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight mb-10 text-center">Checkout</h1>
      
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <CheckoutForm cartItems={cartItems} subtotal={subtotal} shipping={shipping} total={total} />
        </Elements>
      ) : (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}

type Step = 'shipping' | 'payment' | 'review'

function CheckoutForm({ cartItems, subtotal, shipping, total }: any) {
  const stripe = useStripe()
  const elements = useElements()

  const [step, setStep] = useState<Step>('shipping')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'Credit Card'
  })

  const handlePlaceOrder = async () => {
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)
    
    try {
      // 1. Confirm Stripe Payment
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/checkout?success=true',
        },
        redirect: 'if_required' // We will handle redirection manually or use API to create order
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 2. Create Order in Database
        const result = await processCheckout({ data: formData })
        if (result.success) {
          setOrderId(result.orderId)
          setIsSuccess(true)
        }
      } else {
        throw new Error('Payment was not successful. Please try again.')
      }

    } catch (e: any) {
      setError(e.message || 'Failed to place order')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. Your order number is {orderId}.</p>
        <button onClick={() => window.location.href = '/'} className="bg-secondary text-foreground px-8 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors">
          Return to Store
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="w-full lg:w-[60%] flex flex-col gap-8">
        
        {/* Stepper */}
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>1</div>
            Shipping
          </div>
          <div className="flex-1 border-t border-border mx-4" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>2</div>
            Payment
          </div>
          <div className="flex-1 border-t border-border mx-4" />
          <div className={`flex items-center gap-2 ${step === 'review' ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'review' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>3</div>
            Review
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-secondary/50 rounded-3xl p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl">
              {error}
            </div>
          )}

          {step === 'shipping' && (
            <form onSubmit={(e) => { e.preventDefault(); setStep('payment') }} className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} type="text" placeholder="First Name" className="col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} type="text" placeholder="Last Name" className="col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="Email Address" className="col-span-1 md:col-span-2 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} type="text" placeholder="Address" className="col-span-1 md:col-span-2 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" placeholder="City" className="col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
                <input required value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} type="text" placeholder="ZIP Code" className="col-span-1 bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors mt-4"
              >
                Continue to Payment
              </button>
            </form>
          )}

          <div className={step === 'payment' ? 'block animate-in fade-in slide-in-from-bottom-4' : 'hidden'}>
            <h2 className="text-xl font-bold mb-6">Payment Details</h2>
            <div className="bg-background rounded-xl p-4 border border-border">
              <PaymentElement />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="button" onClick={() => setStep('shipping')} className="px-6 py-4 rounded-xl font-medium border border-border hover:bg-background transition-colors">
                Back
              </button>
              <button type="button" onClick={() => setStep('review')} className="flex-1 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Review Order
              </button>
            </div>
          </div>

          {step === 'review' && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-xl font-bold">Review Order</h2>
              <div className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping To:</span>
                  <span className="font-medium text-right">{formData.firstName} {formData.lastName}<br/>{formData.address}<br/>{formData.city}, {formData.zipCode}</span>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-4 flex justify-between items-center">
                <span className="text-muted-foreground">Payment:</span>
                <span className="font-medium flex items-center gap-2"><CreditCard className="w-4 h-4"/> Secure Stripe Payment</span>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button onClick={() => setStep('payment')} className="px-6 py-4 rounded-xl font-medium border border-border hover:bg-background transition-colors">
                  Back
                </button>
                <button disabled={isProcessing || !stripe} onClick={handlePlaceOrder} className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70">
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Place Order - $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-full lg:w-[40%]">
        <div className="bg-secondary/30 border border-border rounded-3xl p-6 sticky top-24">
          <h2 className="font-bold mb-4">In Your Cart</h2>
          <div className="flex flex-col gap-4 mb-6">
            {cartItems.map((item: any, idx: number) => {
              const imgUrl = Array.isArray(item.product.images) ? item.product.images[0] : (typeof item.product.images === 'string' ? JSON.parse(item.product.images)[0] : '')
              return (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-background">
                    <img src={imgUrl} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-medium text-sm">{item.product.name}</span>
                    <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
          
          <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm mb-4">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-border pt-4">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-background rounded-full py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            256-bit Secure SSL Checkout
          </div>
        </div>
      </div>
    </div>
  )
}
