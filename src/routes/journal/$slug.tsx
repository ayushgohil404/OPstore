import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, User } from 'lucide-react'

export const Route = createFileRoute('/journal/$slug')({
  component: JournalArticlePage,
})

function JournalArticlePage() {
  const { slug } = Route.useParams()

  // In a real app, you would fetch the article by slug here
  // We'll use static mock data for the demo
  const article = {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Style Guide',
    date: 'Sep 15, 2026',
    author: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    content: `
      <p>The concept of a minimalist wardrobe isn't just about owning fewer clothes; it's about owning the right clothes. Pieces that interlock effortlessly, offering maximum versatility with minimal decision fatigue.</p>
      
      <h2>1. The Perfect White Tee</h2>
      <p>It sounds cliché, but the foundation of any wardrobe is a high-quality white t-shirt. Look for mid-weight cotton that drapes elegantly without clinging. It's the ultimate chameleon—wear it under a blazer for a smart-casual office look, or pair it with vintage denim for a weekend coffee run.</p>
      
      <h2>2. Tailored Trousers</h2>
      <p>A pair of perfectly tailored trousers in navy, black, or charcoal can take you anywhere. The modern silhouette leans slightly relaxed with a mid-to-high rise. They should feel as comfortable as sweatpants but look sharp enough for a boardroom.</p>

      <h2>3. The Unstructured Blazer</h2>
      <p>Gone are the days of stiff, padded shoulders. An unstructured blazer in a textured fabric like wool-hopsack or heavy linen adds instant polish to any outfit without feeling stuffy.</p>
      
      <h2>4. Classic Denim</h2>
      <p>One pair of well-fitting jeans in a medium or dark wash. Skip the heavy distressing. You want a pair that fades naturally over time, telling the story of the places you've been.</p>
      
      <h2>5. The Versatile Loafer</h2>
      <p>Sneakers are great, but a classic leather loafer bridges the gap between casual and formal perfectly. They slip on effortlessly and instantly elevate even the simplest t-shirt and jeans combination.</p>

      <br/>
      <p><em>Remember, building a wardrobe takes time. Don't rush to buy everything at once. Invest in quality over quantity, and let your personal style evolve naturally.</em></p>
    `
  }

  return (
    <article className="pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full flex items-end justify-center pb-16">
        <div className="absolute inset-0 z-0">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center text-white">
          <Link to="/journal" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
          <div className="mb-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{article.title}</h1>
          <div className="flex items-center justify-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {article.date}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4"/> {article.author}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 mt-16 max-w-3xl">
        <div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Share & Author */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-xl">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold">{article.author}</p>
              <p className="text-sm text-muted-foreground">Editor in Chief</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors">
              Share on Twitter
            </button>
            <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium transition-colors">
              Share on Facebook
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
