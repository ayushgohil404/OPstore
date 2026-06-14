import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { authApi } from '../lib/api'
import { ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const formEmail = formData.get('email') as string
    
    try {
      await authApi.forgotPasswordStep1(formEmail)
      setEmail(formEmail)
      setStep(2)
      toast.success('If an account exists, an OTP was sent to ' + formEmail)
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const formOtp = formData.get('otp') as string
    
    // We don't verify yet, just move to step 3 so they can enter password.
    setOtp(formOtp)
    setStep(3)
  }

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      await authApi.resetPassword({ email, otp, password })
      toast.success('Password reset successfully. Please sign in.')
      navigate({ to: '/login' })
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password. OTP may be invalid.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-background">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {step === 1 && 'Reset Password'}
              {step === 2 && 'Enter Security Code'}
              {step === 3 && 'Create New Password'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {step === 1 && 'Enter your email address and we will send you a 6-digit code to reset your password.'}
              {step === 2 && `Enter the 6-digit code we sent to ${email}`}
              {step === 3 && 'Choose a strong new password for your account.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={
            step === 1 ? handleStep1Submit : 
            step === 2 ? handleStep2Submit : 
            handleStep3Submit
          }>
            {step === 1 && (
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
            )}

            {step === 2 && (
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
                  Use a different email
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
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
                    New Password
                  </label>
                </div>
                <div className="relative group">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder=" "
                    className="block w-full px-4 pt-6 pb-2 border border-border bg-background text-foreground rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all peer"
                  />
                  <label htmlFor="confirmPassword" className="absolute left-4 top-4 text-muted-foreground text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs">
                    Confirm Password
                  </label>
                </div>
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
                  {step === 1 && 'Send Code'}
                  {step === 2 && 'Verify Code'}
                  {step === 3 && 'Reset Password'}
                  <ArrowRight className="absolute right-6 h-5 w-5 text-primary-foreground group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="hidden lg:flex w-1/2 relative bg-zinc-900 border-l border-border">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Fashion models" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-12 right-12 z-20 max-w-md text-right">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-white mb-6 block">OPStore</Link>
          <p className="text-lg text-zinc-300">
            Forgot your password? No worries. Securely reset it and get back to shopping the latest drops.
          </p>
        </div>
      </div>
    </div>
  )
}
