import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { productsApi } from '../lib/api'
import { useQuery } from '@tanstack/react-query'
import { Search as SearchIcon, X, Filter, ChevronDown, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

type SearchSearch = {
  q?: string
  category?: string
}

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>): SearchSearch => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
      category: typeof search.category === 'string' ? search.category : undefined,
    }
  },
  component: SearchPage,
})

function SearchPage() {
  const { q, category } = Route.useSearch()
  const navigate = useNavigate({ from: '/search' })
  const [inputValue, setInputValue] = useState(q || '')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ search: { q: inputValue || undefined, category }, replace: true })
    }, 400)
    return () => clearTimeout(timer)
  }, [inputValue, category, navigate])

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'search', q, category],
    queryFn: () => productsApi.listProducts({ search: q, categoryId: category }),
    enabled: !!q || !!category,
  })

  const trendingSearches = ['leather tote', 'silk dress', 'essential tee', 'kids bomber']
  const categoriesList = ['Men', 'Women', 'Kids', 'Accessories']

  const handleCategoryToggle = (cat: string) => {
    const newCat = category === cat.toLowerCase() ? undefined : cat.toLowerCase()
    navigate({ search: { q, category: newCat }, replace: true })
  }

  const hasSearchOrFilter = !!q || !!category

  return (
    <div className="container mx-auto px-4 py-8 min-h-[80vh]">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative group">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What are you looking for?" 
            className="w-full bg-secondary/30 border-2 border-border rounded-full pl-20 pr-16 py-6 text-2xl font-medium focus:outline-none focus:border-primary transition-all shadow-sm"
            autoFocus
          />
          {inputValue && (
            <button 
              onClick={() => setInputValue('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-background rounded-full text-muted-foreground hover:text-foreground hover:shadow-md transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Empty State / Discovery Hub */}
      {!hasSearchOrFilter && (
        <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
              <TrendingUpIcon className="w-4 h-4" /> Trending Now
            </h3>
            <div className="flex flex-wrap gap-3">
              {trendingSearches.map(term => (
                <button 
                  key={term}
                  onClick={() => setInputValue(term)}
                  className="px-6 py-3 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Explore Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Men', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=400&auto=format&fit=crop' },
                { name: 'Women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop' },
                { name: 'Kids', image: 'https://images.unsplash.com/photo-1519238396346-60866160e1d0?q=80&w=400&auto=format&fit=crop' }
              ].map(cat => (
                <button 
                  key={cat.name} 
                  onClick={() => handleCategoryToggle(cat.name)}
                  className="group relative h-48 rounded-2xl overflow-hidden block w-full"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <span className="text-white text-2xl font-bold tracking-tight">{cat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearchOrFilter && (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Filters Sidebar */}
          <aside className={`w-full lg:w-64 flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 space-y-8 bg-secondary/20 p-6 rounded-3xl border border-border">
              <div className="flex items-center gap-2 font-bold text-lg pb-4 border-b border-border">
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium flex items-center justify-between">
                  Category <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {categoriesList.map(cat => {
                    const isChecked = category === cat.toLowerCase()
                    return (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleCategoryToggle(cat)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-primary border-primary text-primary-foreground' : 'border-border group-hover:border-primary'}`}>
                          {isChecked && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <span className="text-sm">{cat}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-medium">
                {q ? (
                  <span>Results for "<span className="font-bold">{q}</span>"</span>
                ) : category ? (
                  <span className="capitalize">{category} Collection</span>
                ) : (
                  <span>All Products</span>
                )}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm">
                  {isLoading ? 'Searching...' : `${products?.length || 0} items`}
                </span>
                <button 
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 animate-pulse">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-[3/4] bg-secondary rounded-2xl"></div>
                    <div className="h-4 bg-secondary w-3/4 rounded mt-2"></div>
                    <div className="h-4 bg-secondary w-1/4 rounded"></div>
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {products.map(product => (
                  <Link key={product.id} to={`/p/${product.slug}`} className="group flex flex-col gap-3">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-secondary/20 rounded-3xl border border-border border-dashed">
                <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">No matching items</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We couldn't find anything matching your filters. Try checking for typos or using more general terms.
                </p>
                <button 
                  onClick={() => { setInputValue(''); navigate({ search: { q: undefined, category: undefined } }) }}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function TrendingUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
