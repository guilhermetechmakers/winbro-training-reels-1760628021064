import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, XCircle, Mail, Loader2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient, endpoints } from '@/lib/api'
import { toast } from 'sonner'

const resendSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ResendForm = z.infer<typeof resendSchema>

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [message, setMessage] = useState('')
  
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendForm>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: email || '',
    },
  })

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    }
  }, [token])

  const verifyEmail = async (verificationToken: string) => {
    setIsLoading(true)
    try {
      await apiClient.post(endpoints.auth.verifyEmail, { token: verificationToken })
      setVerificationStatus('success')
      setMessage('Your email has been successfully verified! You can now sign in to your account.')
      toast.success('Email verified successfully!')
    } catch (error) {
      setVerificationStatus('error')
      setMessage('The verification link is invalid or has expired. Please request a new one.')
      toast.error('Email verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerification = async (data: ResendForm) => {
    setIsResending(true)
    try {
      await apiClient.post(endpoints.auth.resendVerification, data)
      toast.success('Verification email sent! Check your inbox.')
    } catch (error) {
      toast.error('Failed to send verification email. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-600" />
      case 'error':
        return <XCircle className="w-16 h-16 text-destructive" />
      default:
        return <Mail className="w-16 h-16 text-primary" />
    }
  }

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'success':
        return 'bg-green-100'
      case 'error':
        return 'bg-destructive/10'
      default:
        return 'bg-primary/10'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="font-bold text-3xl gradient-text">Winbro Training</span>
          </Link>
        </div>

        {/* Verification Card */}
        <Card className="animate-fade-in-up border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl" style={{ animationDelay: '200ms' }}>
          <CardHeader className="text-center space-y-6">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-lg ${getStatusColor()} animate-bounce-in`}>
              {isLoading ? (
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              ) : (
                getStatusIcon()
              )}
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                {verificationStatus === 'success' && 'Email Verified!'}
                {verificationStatus === 'error' && 'Verification Failed'}
                {verificationStatus === 'pending' && 'Verify Your Email'}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {message || 'We need to verify your email address to complete your registration.'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {verificationStatus === 'success' ? (
              <div className="space-y-6">
                <p className="text-base text-muted-foreground text-center leading-relaxed">
                  Your account is now active and ready to use. You can sign in to start using Winbro Training Reels.
                </p>
                <Button asChild className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl">
                  <Link to="/auth/login">
                    Continue to Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            ) : verificationStatus === 'error' ? (
              <div className="space-y-6">
                <p className="text-base text-muted-foreground text-center leading-relaxed">
                  The verification link is invalid or has expired. Please request a new verification email.
                </p>
                <form onSubmit={handleSubmit(resendVerification)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email')}
                      className="w-full h-12 px-4 text-base border border-input rounded-md input-focus"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive animate-fade-in-up">{errors.email.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl" disabled={isResending}>
                    {isResending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Resend Verification Email
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-base text-muted-foreground text-center leading-relaxed">
                  We've sent a verification email to your email address. Please check your inbox and click the verification link to activate your account.
                </p>
                <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
                  <h4 className="font-semibold mb-3 text-base">Didn't receive the email?</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Check your spam or junk folder</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Make sure you entered the correct email address</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Wait a few minutes for the email to arrive</span>
                    </li>
                  </ul>
                </div>
                <form onSubmit={handleSubmit(resendVerification)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email')}
                      className="w-full h-12 px-4 text-base border border-input rounded-md input-focus"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive animate-fade-in-up">{errors.email.message}</p>
                    )}
                  </div>
                  <Button type="submit" variant="outline" className="w-full h-12 text-base font-semibold btn-hover" disabled={isResending}>
                    {isResending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Resend Verification Email
                  </Button>
                </form>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <Link to="/help" className="text-primary hover:underline font-medium">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}