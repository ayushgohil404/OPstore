import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Filter, MoreHorizontal, ChevronDown, CheckCircle, Clock, Truck, Package } from 'lucide-react'
import { ordersApi } from '../../../lib/api/orders'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/admin/orders/')({
  component: AdminOrders,
})

function AdminOrders() {
  const queryClient = useQueryClient()
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => ordersApi.listAllOrders()
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: number, status: string }) => ordersApi.updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin-kpis'] })
      toast.success('Order status updated')
    }
  })

  const filteredOrders = orders.filter(o => statusFilter === 'ALL' || o.status === statusFilter)

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              className="w-full bg-secondary/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm w-full sm:w-auto outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="ALL">All Status</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="p-8 flex justify-center text-muted-foreground">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <Package className="w-12 h-12 text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-lg font-medium">No orders found</h3>
              <p className="text-muted-foreground text-sm">There are no orders matching your current filters.</p>
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground bg-secondary/30">
                <tr>
                  <th className="px-6 py-4 font-medium">Order ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium">#OP-{order.id.toString().padStart(4, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.items.length} items</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-medium">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatusMutation.mutate({ orderId: order.id, status: e.target.value })}
                        disabled={updateStatusMutation.isPending && updateStatusMutation.variables?.orderId === order.id}
                        className={`px-2.5 py-1.5 rounded-full text-xs font-medium outline-none cursor-pointer border ${
                          order.status === 'PROCESSING' || order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          order.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                        }`}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
