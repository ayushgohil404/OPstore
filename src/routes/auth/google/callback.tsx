import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authApi } from '../../../lib/api'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/auth/google/callback')({
  component: GoogleCallback,
})

function GoogleCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Usually, you extract 'code' from URL search params and send to backend
    // to exchange for token. Since we don't have a real Google Client Secret
    // configured in the backend yet, we'll mock the exchange for testing.
    
    const searchParams = new URLSearchParams(window.location.search)
    const code = searchParams.get('code')
    const err = searchParams.get('error')
    
    if (err) {
      setError('Google authentication failed or was cancelled.')
      setTimeout(() => navigate({ to: '/login' }), 2000)
      return
    }

    if (code) {
      // In a real app, send `code` to backend to get tokens.
      // Here we mock the user info payload that Google would return:
      
      // We will pretend we fetched this from Google's userinfo endpoint
      const mockGoogleProfile = {
        email: 'google-user@example.com',
        name: 'Google User',
        sub: '1234567890'
      }

      // If the user actually provided real keys, we should decode the JWT from google,
      // but without the backend implementation of oauth2client, we'll simulate the login payload.
      // We will use the Google profile data.
      authApi.loginWithGoogle(mockGoogleProfile)
        .then(() => {
          toast.success('Successfully logged in with Google')
          navigate({ to: '/account' })
        })
        .catch((e: any) => {
          setError(e.message || 'Failed to authenticate with our servers.')
          setTimeout(() => navigate({ to: '/login' }), 2000)
        })
    } else {
      setError('No authorization code found.')
      setTimeout(() => navigate({ to: '/login' }), 2000)
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {error ? (
          <div className="text-destructive">
            <h2 className="text-2xl font-bold mb-2">Authentication Error</h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Authenticating</h2>
            <p className="text-muted-foreground">Please wait while we log you in...</p>
          </div>
        )}
      </div>
    </div>
  )
}
