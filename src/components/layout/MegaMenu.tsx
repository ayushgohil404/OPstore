import { Link } from '@tanstack/react-router'

export function MegaMenu() {
  return (
    <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
      <Link to="/c/$category" params={{ category: 'men' }} className="hover:text-primary transition-colors">Men</Link>
      <Link to="/c/$category" params={{ category: 'women' }} className="hover:text-primary transition-colors">Women</Link>
      <Link to="/c/$category" params={{ category: 'kids' }} className="hover:text-primary transition-colors">Kids</Link>
      <Link to="/c/$category" params={{ category: 'accessories' }} className="hover:text-primary transition-colors">Accessories</Link>
    </nav>
  )
}
