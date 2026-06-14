import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { authApi } from '../lib/api'
import { sendWelcomeEmail } from '../lib/email'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const formEmail = formData.get('email') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const password = formData.get('password') as string
    
    try {
      const res = await authApi.register({ email: formEmail, firstName, lastName, password })
      if (res.requireOtp) {
        setEmail(formEmail)
        setStep(2)
        toast.success('Verification code sent to your email!')
      } else {
        toast.success('Account created successfully!')
        navigate({ to: '/account' })
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const otp = formData.get('otp') as string
    
    try {
      await authApi.verifyRegistration({ email, otp })
      toast.success('Account verified successfully!')
      navigate({ to: '/account' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to verify account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      await authApi.loginWithOAuth('google')
    } catch (error) {
      toast.error('Failed to authenticate with Google')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-row-reverse">
      {/* Right Image Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070&auto=format&fit=crop" 
          alt="Fashion models" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-12 right-12 z-20 max-w-md text-right">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-white mb-6 block">OPStore</Link>
          <p className="text-lg text-zinc-300">
            Join the exclusive club. Get access to limited drops, personalized styling, and faster checkout.
          </p>
        </div>
      </div>

      {/* Left Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-background border-r border-border">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {step === 1 ? 'Create Account' : 'Verify Email'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {step === 1 ? 'Fill in your details to get started.' : `Enter the 6-digit code sent to ${email}`}
            </p>
          </div>

          {step === 1 && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  type="button"
                  onClick={handleGoogleAuth}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-secondary transition-colors font-medium text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background text-muted-foreground">Or register with email</span>
                </div>
              </div>
            </>
          )}
          
          <form method="POST" className="space-y-6" onSubmit={step === 1 ? handleStep1Submit : handleStep2Submit}>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      placeholder=" "
                      className="block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                    />
                    <label htmlFor="firstName" className="absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs">
                      First Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      placeholder=" "
                      className="block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                    />
                    <label htmlFor="lastName" className="absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs">
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                  />
                  <label htmlFor="email" className="absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs">
                    Email address
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                  />
                  <label htmlFor="password" className="absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs">
                    Create Password
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={6}
                    placeholder=" "
                    className="block w-full px-4 py-4 text-center text-2xl tracking-[1em] font-mono border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                  />
                </div>
                <button type="button" onClick={() => setStep(1)} className="text-sm text-primary hover:underline">
                  Change email address
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {step === 1 ? 'Continue' : 'Verify & Create Account'}
                  <ArrowRight className="absolute right-6 h-5 w-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {step === 1 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
