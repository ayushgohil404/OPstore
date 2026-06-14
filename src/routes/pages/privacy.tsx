import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pages/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert lg:prose-lg text-muted-foreground">
        <p className="mb-6">Last updated: June 2026</p>
        
        <p className="mb-6">
          At OPStore, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Information We Collect</h2>
        <p className="mb-6">
          We collect personal data you provide to us when you create an account, place an order, or subscribe to our newsletter. This includes your name, email address, shipping address, and payment information.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>To process and fulfill your orders.</li>
          <li>To communicate with you about your account or order status.</li>
          <li>To send promotional emails (if you have opted in).</li>
          <li>To improve our website and customer service.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Data Security</h2>
        <p className="mb-6">
          We implement appropriate technical and organizational security measures to protect your personal data from unauthorized access or disclosure.
        </p>
      </div>
    </div>
  )
}
