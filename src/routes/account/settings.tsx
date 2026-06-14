import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../lib/api'
import { settingsApi } from '../../lib/api/settings'

export const Route = createFileRoute('/account/settings')({
  component: AccountSettings,
})

function AccountSettings() {
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['auth-user'],
    queryFn: () => authApi.getCurrentUser()
  })

  // Profile Form State
  const [profileData, setProfileData] = useState({ name: '', email: '' })
  
  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || '', email: user.email || '' })
    }
  }, [user])

  // Password Form State
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' })

  const profileMutation = useMutation({
    mutationFn: () => settingsApi.updateProfile({ name: profileData.name, email: profileData.email }),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth-user'], data.user)
      toast.success('Profile updated successfully.')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update profile.')
    }
  })

  const passwordMutation = useMutation({
    mutationFn: () => settingsApi.updatePassword({ currentPassword: passwordData.current, newPassword: passwordData.new }),
    onSuccess: () => {
      setPasswordData({ current: '', new: '', confirm: '' })
      toast.success('Password updated successfully.')
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update password.')
    }
  })

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!profileData.name || !profileData.email) {
      return toast.error('Name and email are required.')
    }
    profileMutation.mutate()
  }

  const handleUpdatePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      return toast.error('All password fields are required.')
    }
    if (passwordData.new !== passwordData.confirm) {
      return toast.error('New passwords do not match.')
    }
    if (passwordData.new.length < 6) {
      return toast.error('New password must be at least 6 characters.')
    }
    passwordMutation.mutate()
  }

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Preferences saved successfully.')
  }

  return (
    <div className="p-8 md:p-10">
      <div className="mb-8 pb-6 border-b border-border">
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile, password, and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-10">
        
        {/* Profile Info */}
        <form onSubmit={handleSaveProfile}>
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
                />
              </div>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={profileMutation.isPending}
            className="mt-4 text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {profileMutation.isPending ? 'Saving...' : 'Save Profile'}
          </button>
        </form>

        {/* Change Password */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Current Password</label>
              <input 
                type="password" 
                value={passwordData.current}
                onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <input 
                type="password" 
                value={passwordData.new}
                onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <input 
                type="password" 
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" 
              />
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleUpdatePassword}
            disabled={passwordMutation.isPending}
            className="mt-4 text-sm font-medium border border-border bg-background px-6 py-2.5 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
          >
            {passwordMutation.isPending ? 'Updating...' : 'Update Password'}
          </button>
        </div>

        {/* Notification Preferences */}
        <form onSubmit={handleSavePreferences} className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-1">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Order Updates</p>
                <p className="text-sm text-muted-foreground">Receive emails about your order status, shipping, and delivery.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-1">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Exclusive Offers</p>
                <p className="text-sm text-muted-foreground">Get early access to sales, new drops, and personalized recommendations.</p>
              </div>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="mt-1">
                <input type="checkbox" className="w-4 h-4 text-primary focus:ring-primary border-border rounded bg-background accent-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive text messages for delivery updates.</p>
              </div>
            </label>
          </div>
          <button type="submit" className="mt-6 bg-secondary text-foreground border border-border px-8 py-2.5 rounded-xl font-medium hover:bg-secondary/80 transition-colors">
            Save Preferences
          </button>
        </form>

        {/* Danger Zone */}
        <div className="pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button type="button" onClick={() => toast.error('This action is disabled for demo accounts.')} className="text-sm font-medium border border-destructive text-destructive hover:bg-destructive/10 px-4 py-2 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
