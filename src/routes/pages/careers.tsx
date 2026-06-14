import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/careers')({
  component: CareersPage,
})

function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Careers at OPStore</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">
          Passionate about fashion, technology, and sustainability? Come join the team at OPStore! We are always looking for talented individuals to help us build the future of premium apparel.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Open Positions</h2>
        
        <div className="bg-secondary/30 border border-border p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Senior Apparel Designer</h3>
          <p className="mb-4">Location: Remote / New York</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">Apply Now</button>
        </div>

        <div className="bg-secondary/30 border border-border p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Frontend Engineer (React)</h3>
          <p className="mb-4">Location: Remote</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">Apply Now</button>
        </div>

        <div className="bg-secondary/30 border border-border p-6 rounded-xl mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Supply Chain Coordinator</h3>
          <p className="mb-4">Location: Los Angeles</p>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium">Apply Now</button>
        </div>

      </div>
    </div>
  )
}
