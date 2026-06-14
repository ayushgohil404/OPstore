import { Search } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm hidden lg:block">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        placeholder="Search apparel..."
        className="w-full bg-secondary text-secondary-foreground rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
      />
    </div>
  )
}
