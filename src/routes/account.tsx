import { createFileRoute, Link, Outlet, useRouterState, redirect } from '@tanstack/react-router'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import { getCurrentUser } from '../server/functions/auth'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../lib/api'

export const Route = createFileRoute('/account')({
  beforeLoad: async () => {
    const user = await getCurrentUser()
    if (!user) {
      throw redirect({ to: '/login' })
    }
  },
  component: AccountLayout,
})

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => authApi.getCurrentUser()
  })

  const initials = user?.firstName
    ? user.firstName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  const handleLogout = async () => {
    await authApi.logout()
    window.location.href = '/'
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-[70vh]">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-secondary/20 rounded-3xl p-6 border border-border sticky top-24 shadow-sm">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                {initials}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-lg truncate">{user?.firstName || 'User'}</div>
                <div className="text-sm text-muted-foreground truncate">{user?.email || ''}</div>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <SidebarLink to="/account" icon={<User className="w-5 h-5" />} label="Profile Overview" isActive={pathname === '/account'} />
              <SidebarLink to="/account/orders" icon={<Package className="w-5 h-5" />} label="Order History" isActive={pathname.includes('/account/orders')} />
              <SidebarLink to="/account/wishlist" icon={<Heart className="w-5 h-5" />} label="Wishlist" isActive={pathname.includes('/account/wishlist')} />
              <SidebarLink to="/account/settings" icon={<Settings className="w-5 h-5" />} label="Account Settings" isActive={pathname.includes('/account/settings')} />
            </nav>

            <div className="mt-8 pt-6 border-t border-border">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-background border border-border rounded-3xl shadow-sm min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarLink({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) {
  return (
    <Link 
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        isActive 
          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}
