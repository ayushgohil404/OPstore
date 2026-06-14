import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Bell,
  Search
} from 'lucide-react'
import { getCurrentUser } from '../../server/functions/auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-secondary/30 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/" className="font-bold text-xl tracking-tight text-primary">
            OPStore Admin
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <SidebarItem to="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />
          <SidebarItem to="/admin/products" icon={<Package className="w-5 h-5" />} label="Products" />
          <SidebarItem to="/admin/orders" icon={<ShoppingCart className="w-5 h-5" />} label="Orders" />
          <SidebarItem to="/admin/customers" icon={<Users className="w-5 h-5" />} label="Customers" />
          
          <div className="pt-6 mt-6 border-t border-border/50">
            <h4 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Settings</h4>
            <SidebarItem to="/admin/settings" icon={<Settings className="w-5 h-5" />} label="Store Settings" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center w-full max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="w-full bg-secondary rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-muted-foreground hover:bg-secondary rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-secondary/10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function SidebarItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      to={to}
      activeProps={{ className: 'bg-primary/10 text-primary font-medium' }}
      inactiveProps={{ className: 'text-muted-foreground hover:bg-secondary hover:text-foreground' }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
    >
      {icon}
      {label}
    </Link>
  )
}
