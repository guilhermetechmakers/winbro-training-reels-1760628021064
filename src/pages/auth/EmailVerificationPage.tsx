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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="font-bold text-2xl gradient-text">Winbro Training</span>
          </Link>
        </div>

        {/* Verification Card */}
        <Card className="animate-fade-in-up">
          <CardHeader className="text-center">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${getStatusColor()}`}>
              {isLoading ? (
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              ) : (
                getStatusIcon()
              )}
            </div>
            <CardTitle>
              {verificationStatus === 'success' && 'Email Verified!'}
              {verificationStatus === 'error' && 'Verification Failed'}
              {verificationStatus === 'pending' && 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              {message || 'We need to verify your email address to complete your registration.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {verificationStatus === 'success' ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  Your account is now active and ready to use. You can sign in to start using Winbro Training Reels.
                </p>
                <Button asChild className="w-full">
                  <Link to="/auth/login">
                    Continue to Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : verificationStatus === 'error' ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  The verification link is invalid or has expired. Please request a new verification email.
                </p>
                <form onSubmit={handleSubmit(resendVerification)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email')}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isResending}>
                    {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Resend Verification Email
                  </Button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  We've sent a verification email to your email address. Please check your inbox and click the verification link to activate your account.
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Didn't receive the email?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure you entered the correct email address</li>
                    <li>• Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>
                <form onSubmit={handleSubmit(resendVerification)} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      {...register('email')}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <Button type="submit" variant="outline" className="w-full" disabled={isResending}>
                    {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Resend Verification Email
                  </Button>
                </form>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Need help?{' '}
                <Link to="/help" className="text-primary hover:underline">
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