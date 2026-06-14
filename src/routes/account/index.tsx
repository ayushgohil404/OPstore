import { createFileRoute } from '@tanstack/react-router'
import { CheckCircle2, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/account/')({
  component: AccountProfile,
})

function AccountProfile() {
  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Profile Overview</h1>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
          <CheckCircle2 className="w-3 h-3" /> Verified
        </div>
      </div>

      <form className="space-y-8 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
        {/* Personal Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">First Name</label>
              <input type="text" defaultValue="John" className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <input type="email" defaultValue="john@example.com" className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Default Shipping Address</h2>
            <button type="button" className="text-sm text-primary hover:underline font-medium">Add New</button>
          </div>
          <div className="bg-secondary/30 border border-border rounded-xl p-6 relative group">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button type="button" className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Edit</button>
            </div>
            <p className="font-medium text-foreground mb-1">Home</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              123 Fashion Ave, Suite 400<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            Your data is securely encrypted.
          </div>
          <button type="submit" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
