import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Calendar } from 'lucide-react'

export const Route = createFileRoute('/journal/')({
  component: JournalIndexPage,
})

const articles = [
  {
    slug: 'fall-winter-collection-2026',
    title: 'Introducing the Fall/Winter 2026 Collection',
    excerpt: 'Explore our latest line of premium outerwear designed to keep you warm without compromising on style.',
    category: 'Collections',
    date: 'Oct 12, 2026',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop'
  },
  {
    slug: 'sustainable-fabrics-future',
    title: 'The Future of Sustainable Fabrics',
    excerpt: 'How we are transitioning our entire supply chain to use 100% recycled or sustainably sourced materials by 2028.',
    category: 'Sustainability',
    date: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=1974&auto=format&fit=crop'
  },
  {
    slug: 'minimalist-wardrobe-essentials',
    title: 'Building a Minimalist Wardrobe: 5 Essentials',
    excerpt: "You don't need a closet full of clothes to look good. Here are the five pieces every minimalist needs.",
    category: 'Style Guide',
    date: 'Sep 15, 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop'
  },
  {
    slug: 'behind-the-scenes-manufacturing',
    title: 'Behind the Seams: Inside Our Workshops',
    excerpt: 'Take a tour of our European facilities where every garment is meticulously crafted by master tailors.',
    category: 'Behind the Scenes',
    date: 'Aug 04, 2026',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop'
  }
]

function JournalIndexPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">The Journal</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stories about design, style, sustainability, and the people behind OPStore.
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-16">
        <Link to={`/journal/${articles[0].slug}`} className="group flex flex-col md:flex-row gap-8 bg-secondary/20 border border-border rounded-3xl overflow-hidden transition-all hover:border-primary/50">
          <div className="md:w-3/5 overflow-hidden">
            <img 
              src={articles[0].image} 
              alt={articles[0].title}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="md:w-2/5 p-8 flex flex-col justify-center">
            <span className="text-primary font-medium text-sm mb-3 uppercase tracking-wider">{articles[0].category}</span>
            <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{articles[0].title}</h2>
            <p className="text-muted-foreground mb-6 line-clamp-3">{articles[0].excerpt}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="flex items-center text-sm text-muted-foreground gap-2">
                <Calendar className="w-4 h-4" /> {articles[0].date}
              </span>
              <span className="flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors gap-1">
                Read Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(1).map((article, index) => (
          <Link key={index} to={`/journal/${article.slug}`} className="group flex flex-col bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all">
            <div className="overflow-hidden aspect-[4/3]">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-primary font-medium text-xs mb-2 uppercase tracking-wider">{article.category}</span>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                <span className="text-xs text-muted-foreground">{article.date}</span>
                <span className="text-xs font-bold flex items-center gap-1 group-hover:text-primary transition-colors">
                  Read <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Newsletter */}
      <div className="mt-20 bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Never miss an update</h2>
        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter to get the latest articles, interviews, and collection drops delivered straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => { e.preventDefault(); alert('Subscribed!') }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required
            className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-white placeholder:text-primary-foreground/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button type="submit" className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
