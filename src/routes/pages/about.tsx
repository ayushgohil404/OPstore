import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About OPStore</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">
          OPStore is a premium apparel brand dedicated to redefining fashion with modern aesthetics and uncompromising quality. Founded with the vision of making high-end fashion accessible, we curate the finest materials to create timeless pieces.
        </p>
        <p className="mb-6">
          Our team of designers works tirelessly to blend comfort with cutting-edge style. We believe that what you wear is an extension of who you are, and our collections are designed to empower you to express your authentic self.
        </p>
        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Our Mission</h2>
        <p>
          To provide sustainable, premium-quality apparel that inspires confidence and stands the test of time, while ensuring fair labor practices and minimizing our environmental footprint.
        </p>
      </div>
    </div>
  )
}
