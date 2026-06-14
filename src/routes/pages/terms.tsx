import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">Last updated: June 2026</p>
        
        <p className="mb-6">
          Welcome to OPStore. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">1. General Conditions</h2>
        <p className="mb-6">
          We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">2. Products and Pricing</h2>
        <p className="mb-6">
          Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">3. Accuracy of Billing</h2>
        <p className="mb-6">
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">4. Governing Law</h2>
        <p className="mb-6">
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction in which OPStore operates.
        </p>
      </div>
    </div>
  )
}
