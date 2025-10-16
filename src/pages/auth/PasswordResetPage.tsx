import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Mail, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient, endpoints } from '@/lib/api'
import { toast } from 'sonner'

const resetSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ResetForm = z.infer<typeof resetSchema>

export default function PasswordResetPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  })

  const onSubmit = async (data: ResetForm) => {
    setIsLoading(true)
    try {
      await apiClient.post(endpoints.auth.forgotPassword, data)
      setIsSubmitted(true)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 py-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          <Card className="animate-fade-in-up border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>
              <Button asChild className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl">
                <Link to="/auth/login">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Sign In
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Reset your password</h1>
            <p className="text-lg text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
        </div>

        {/* Reset Form */}
        <Card className="animate-fade-in-up border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl" style={{ animationDelay: '200ms' }}>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center text-base">
              No worries, we'll send you reset instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                  className={`h-12 text-base ${errors.email ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                />
                {errors.email && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.email.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Send Reset Link
              </Button>
            </form>

            <div className="text-center">
              <p className="text-base text-muted-foreground">
                Remember your password?{' '}
                <Link to="/auth/login" className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <p>
            Need help?{' '}
            <Link to="/help" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}