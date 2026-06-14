import { Link } from '@tanstack/react-router'
import { User, Menu } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { SearchBar } from './SearchBar'
import { MiniCart } from './MiniCart'

export function StoreHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 -ml-2">
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          OPStore
        </Link>

        {/* Center Nav */}
        <div className="flex-1 flex justify-center">
          <MegaMenu />
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
          <SearchBar />
          
          <Link to="/login" className="hidden sm:flex p-2 hover:bg-secondary rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
          
          <MiniCart />
        </div>
      </div>
    </header>
  )
}
