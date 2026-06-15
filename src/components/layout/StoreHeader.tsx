import { Link } from '@tanstack/react-router'
import { User, Menu, Search, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { SearchBar } from './SearchBar'
import { MiniCart } from './MiniCart'
import { useState } from 'react'

export function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button 
          className="md:hidden p-2 -ml-2 hover:bg-secondary rounded-full"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight flex-1 md:flex-none">
          OPStore
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex flex-1 justify-center">
          <MegaMenu />
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
          <SearchBar />
          
          <Link to="/search" className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          
          <Link to="/login" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <User className="w-5 h-5" />
          </Link>
          
          <MiniCart />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-background md:hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border h-16">
            <span className="font-bold text-xl tracking-tight">Menu</span>
            <button 
              className="p-2 -mr-2 hover:bg-secondary rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-4 text-lg font-medium">
            <Link to="/c/$category" params={{ category: 'men' }} onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-border/50">Men</Link>
            <Link to="/c/$category" params={{ category: 'women' }} onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-border/50">Women</Link>
            <Link to="/c/$category" params={{ category: 'kids' }} onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-border/50">Kids</Link>
            <Link to="/c/$category" params={{ category: 'accessories' }} onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-border/50">Accessories</Link>
            <Link to="/journal" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-border/50">Journal</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
