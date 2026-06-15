import { createFileRoute, Link } from '@tanstack/react-router'
import { productsApi } from '../lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'

import { RouteError } from '../components/RouteError'
import { RouteLoading } from '../components/RouteLoading'

export const Route = createFileRoute('/')({
  errorComponent: RouteError,
  pendingComponent: RouteLoading,
  head: () => ({
    meta: [
      { title: 'OPStore | Premium Apparel For All' },
      { name: 'description', content: 'Redefined fashion for Men, Women, and Kids. Experience the perfect blend of comfort and modern aesthetics.' },
    ]
  }),
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ['products', 'featured'],
      queryFn: () => productsApi.getFeatured(),
    })
  },
  component: Home,
})

function Home() {
  const { data: featuredProducts } = useSuspenseQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsApi.getFeatured(),
  })

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[600px] md:h-[700px] relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Models" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              PREMIUM APPAREL
            </span>
            <br />
            FOR ALL
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            Redefined fashion for Men, Women, and Kids. Experience the perfect blend of comfort and modern aesthetics.
          </p>
          <Link 
            to="/c/$category" params={{ category: 'men' }} 
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CategoryCard 
            title="Men" 
            to="/c/$category"
            params={{ category: 'men' }}
            image="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" 
          />
          <CategoryCard 
            title="Women" 
            to="/c/$category"
            params={{ category: 'women' }}
            image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
          />
          <CategoryCard 
            title="Kids" 
            to="/c/$category"
            params={{ category: 'kids' }}
            image="https://images.unsplash.com/photo-1519238396346-60866160e1d0?q=80&w=800&auto=format&fit=crop" 
          />
        </div>
      </section>

      {/* Featured Arrivals */}
      <section className="container mx-auto px-4 py-10 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Arrivals</h2>
          <Link to="/search" className="text-primary hover:underline font-medium">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <Link key={product.id} to="/p/$slug" params={{ slug: product.slug }} className="group flex flex-col gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, to, params, image }: { title: string, to: string, params?: any, image: string }) {
  return (
    <Link to={to as any} params={params} className="group relative h-[400px] overflow-hidden rounded-3xl bg-secondary block">
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end">
        <h3 className="text-3xl font-bold text-white">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  )
}
