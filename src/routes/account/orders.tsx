import { createFileRoute } from '@tanstack/react-router'
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../../lib/api/orders'

import { RouteError } from '../../components/RouteError'
import { RouteLoading } from '../../components/RouteLoading'

export const Route = createFileRoute('/account/orders')({
  errorComponent: RouteError,
  pendingComponent: RouteLoading,
  component: AccountOrders,
})

function AccountOrders() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-orders'],
    queryFn: () => ordersApi.listUserOrders()
  })

  if (isLoading) {
    return <div className="p-8 md:p-10 animate-pulse text-muted-foreground">Loading orders...</div>
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
        <Package className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
        <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
        <p className="text-muted-foreground max-w-sm">You haven't placed any orders yet. Once you do, they will appear here.</p>
      </div>
    )
  }

  return (
    <div className="p-8 md:p-10">
      <div className="mb-8 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground mt-1">View and track your recent orders.</p>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border border-border rounded-2xl overflow-hidden bg-secondary/10">
            {/* Order Header */}
            <div className="bg-secondary/30 p-4 sm:p-6 border-b border-border flex flex-wrap gap-6 items-center justify-between">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order Number</p>
                  <p className="font-semibold">#OP-{order.id.toString().padStart(4, '0')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date Placed</p>
                  <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                  <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <button className="text-sm font-medium border border-border bg-background px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                View Invoice
              </button>
            </div>

            <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-8">
              {/* Items */}
              <div className="flex-1 space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-20 h-24 rounded-lg bg-secondary overflow-hidden flex-shrink-0 border border-border flex items-center justify-center">
                      <Package className="w-8 h-8 text-muted-foreground opacity-50" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Qty: {item.quantity} | Price: ${item.price}
                      </p>
                      <button className="text-primary text-sm font-medium hover:underline mt-2">Write a Review</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Timeline */}
              <div className="w-full lg:w-72 flex-shrink-0 bg-background border border-border rounded-xl p-5">
                <h4 className="font-semibold mb-4 flex items-center gap-2 capitalize">
                  {order.status === 'COMPLETED' || order.status === 'DELIVERED' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-500" />}
                  {order.status.toLowerCase()}
                </h4>
                <p className="text-sm text-muted-foreground mb-6">
                  {order.status === 'PROCESSING' 
                    ? `Being prepared for shipping`
                    : `Status updated recently`
                  }
                </p>

                <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-border">
                  <div className="relative">
                    <div className="absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm font-medium">Order Placed</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'SHIPPED' || order.status === 'DELIVERED' ? 'bg-primary' : 'bg-border'}`} />
                    </div>
                    <p className={`text-sm font-medium ${order.status === 'PROCESSING' || order.status === 'PENDING' ? 'text-muted-foreground' : ''}`}>Shipped</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-6 w-6 h-6 bg-background rounded-full flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-primary' : 'bg-border'}`} />
                    </div>
                    <p className={`text-sm font-medium ${order.status !== 'DELIVERED' ? 'text-muted-foreground' : ''}`}>Delivered</p>
                  </div>
                </div>

                <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-medium border border-border px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                  <Truck className="w-4 h-4" /> Track Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
