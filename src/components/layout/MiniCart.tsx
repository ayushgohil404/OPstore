import { ShoppingCart } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { cartApi } from '../../lib/api/inventory-cart'

export function MiniCart() {
  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => cartApi.getCart(),
  })

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-full transition-colors flex items-center justify-center">
      <ShoppingCart className="w-5 h-5" />
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm">
          {totalQuantity}
        </span>
      )}
    </Link>
  )
}
