import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Save, AlertTriangle } from 'lucide-react'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettings,
})

function AdminSettings() {
  const [storeName, setStoreName] = useState('OPStore')
  const [contactEmail, setContactEmail] = useState('contact@opstore.com')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Settings saved successfully')
  }

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your store configurations.</p>
      </div>

      {/* Section 1: Store Info */}
      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Store Information</h2>
          <p className="text-sm text-muted-foreground mt-1">Update your basic store details and contact information.</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-secondary/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-secondary/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save changes
            </button>
          </form>
        </div>
      </div>

      {/* Section 2: Danger Zone */}
      <div className="bg-background border border-red-500/30 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-red-500/20 bg-red-500/5">
          <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </h2>
          <p className="text-sm text-red-600/80 mt-1">Irreversible and destructive actions.</p>
        </div>
        <div className="p-6 bg-red-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-foreground">Clear all sessions</h3>
              <p className="text-sm text-muted-foreground mt-1">Force all users to log out immediately. This cannot be undone.</p>
            </div>
            <button 
              type="button"
              onClick={() => toast.error('This action is not available in demo mode')}
              className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shrink-0"
            >
              Clear all sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
