import { Link } from '@tanstack/react-router'

export function MegaMenu() {
  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
      <Link to="/c/men" className="hover:text-primary transition-colors">Men</Link>
      <Link to="/c/women" className="hover:text-primary transition-colors">Women</Link>
      <Link to="/c/kids" className="hover:text-primary transition-colors">Kids</Link>
      <Link to="/c/accessories" className="hover:text-primary transition-colors">Accessories</Link>
    </nav>
  )
}
