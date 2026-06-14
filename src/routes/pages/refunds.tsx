import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/refunds')({
  component: RefundsPage,
})

function RefundsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">
          We want you to be completely satisfied with your purchase. If you're not happy with your OPStore apparel, we're here to help.
        </p>
        
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Return Policy</h2>
        <p className="mb-6">
          You have 30 days from the date of delivery to return your item(s). Items must be unworn, unwashed, and in their original condition with all tags attached.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">How to Return</h2>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li>Log in to your account and go to the Orders section.</li>
          <li>Select the item(s) you wish to return and choose a reason.</li>
          <li>Print the prepaid return label and attach it to your package.</li>
          <li>Drop off the package at any authorized carrier location.</li>
        </ol>

        <p className="mt-8 text-sm italic">
          Please note that final sale items and intimates are not eligible for returns or exchanges.
        </p>
      </div>
    </div>
  )
}
