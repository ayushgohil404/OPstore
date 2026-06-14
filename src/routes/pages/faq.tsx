import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/faq')({
  component: FAQPage,
})

function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">Do you ship internationally?</h3>
          <p>Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">How can I track my order?</h3>
          <p>Once your order ships, you will receive a tracking link via email. You can also view your order status in the Orders section of your OPStore account.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">What is your return policy?</h3>
          <p>We accept returns within 30 days of delivery for unworn, unwashed items with tags attached. Final sale items are non-returnable.</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">Are your materials sustainable?</h3>
          <p>We are committed to sustainability. Many of our collections feature organic cotton, recycled polyester, and ethically sourced materials.</p>
        </div>

      </div>
    </div>
  )
}
