import { Link } from '@tanstack/react-router'

export function StoreFooter() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">OPStore</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Premium apparel for everyone. Redefining fashion with modern aesthetics and uncompromising quality.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/c/men" className="hover:text-primary transition-colors">Men's Fashion</Link></li>
              <li><Link to="/c/women" className="hover:text-primary transition-colors">Women's Fashion</Link></li>
              <li><Link to="/c/kids" className="hover:text-primary transition-colors">Kids & Baby</Link></li>
              <li><Link to="/c/accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pages/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/journal" className="hover:text-primary transition-colors">Journal & Blog</Link></li>
              <li><Link to="/pages/shipping" className="hover:text-primary transition-colors">Shipping Information</Link></li>
              <li><Link to="/pages/refunds" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/pages/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/pages/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/pages/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/pages/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/pages/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OPStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
