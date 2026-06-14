import { createFileRoute, Link } from '@tanstack/react-router'
import { DollarSign, ShoppingBag, Users, TrendingUp, TrendingDown, PackageOpen } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../../lib/api/orders'
import { getLowStockProducts } from '../../server/functions/products'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { data: kpis, isLoading } = useQuery({
    queryKey: ['admin-kpis'],
    queryFn: () => ordersApi.getStoreKPIs()
  })

  const { data: lowStockItems = [] } = useQuery({
    queryKey: ['admin-low-stock'],
    queryFn: () => getLowStockProducts()
  })

  if (isLoading || !kpis) {
    return <div className="p-8 text-muted-foreground animate-pulse">Loading dashboard...</div>
  }

  const { totalRevenue, totalOrders, activeCustomers, recentOrders } = kpis

  // Fake averages for now since we don't have historical data to compare
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back. Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-background border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none">
            <option>All Time</option>
            <option>Today</option>
            <option>Last 7 Days</option>
          </select>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Total Revenue" 
          value={`$${totalRevenue.toFixed(2)}`} 
          change="+14.5%" 
          trend="up" 
          icon={<DollarSign className="w-5 h-5" />} 
        />
        <KpiCard 
          title="Total Orders" 
          value={totalOrders.toString()} 
          change="+8.2%" 
          trend="up" 
          icon={<ShoppingBag className="w-5 h-5" />} 
        />
        <KpiCard 
          title="Active Customers" 
          value={activeCustomers.toString()} 
          change="-2.4%" 
          trend="down" 
          icon={<Users className="w-5 h-5" />} 
        />
        <KpiCard 
          title="Avg. Order Value" 
          value={`$${avgOrderValue.toFixed(2)}`} 
          change="+4.1%" 
          trend="up" 
          icon={<TrendingUp className="w-5 h-5" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-muted-foreground border-b border-border">
                <tr>
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No recent orders</td></tr>
                ) : recentOrders.map((order: any, i: number) => (
                  <tr key={i} className="hover:bg-secondary/50 transition-colors">
                    <td className="py-4 font-medium">#OP-{order.id.toString().padStart(4, '0')}</td>
                    <td className="py-4">{order.customerName}</td>
                    <td className="py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 font-medium">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        order.status === 'PROCESSING' || order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' :
                        order.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-background border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PackageOpen className="w-5 h-5 text-destructive" />
              Low Stock
            </h2>
            <Link to="/admin/products" className="text-sm text-primary hover:underline font-medium">Manage</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            {lowStockItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">All products are well stocked!</p>
            ) : lowStockItems.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-secondary/30">
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.sku}</span>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-destructive/10 text-destructive font-bold text-xs">
                  {item.stock}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, change, trend, icon }: any) {
  const isUp = trend === 'up'
  return (
    <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">{value}</div>
        <div className={`flex items-center text-sm font-medium ${isUp ? 'text-emerald-500' : 'text-destructive'}`}>
          {isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
    </div>
  )
}
