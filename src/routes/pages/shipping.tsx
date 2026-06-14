import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/shipping')({
  component: ShippingPage,
})

function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">
          We offer fast and reliable shipping to ensure your OPStore apparel reaches you in perfect condition. We process all orders within 1-2 business days.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Domestic Shipping</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Standard Shipping:</strong> 3-5 business days (Free for orders over $150)</li>
          <li><strong>Express Shipping:</strong> 1-2 business days ($15 flat rate)</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">International Shipping</h2>
        <p className="mb-6">
          We ship worldwide! International orders typically arrive within 7-14 business days. Shipping costs are calculated at checkout based on your location and order weight.
        </p>
      </div>
    </div>
  )
}
