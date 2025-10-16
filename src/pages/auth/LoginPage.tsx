import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // Implement Google OAuth
    toast.info('Google login coming soon!')
  }

  const handleSSOLogin = () => {
    // Implement SSO
    toast.info('SSO login coming soon!')
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
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your account to continue your training journey
            </p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="animate-fade-in-up border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl" style={{ animationDelay: '200ms' }}>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className={`h-12 text-base ${errors.email ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                />
                {errors.email && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={`h-12 text-base pr-12 ${errors.password ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="rememberMe"
                    {...register('rememberMe')}
                    className="w-5 h-5"
                  />
                  <Label htmlFor="rememberMe" className="text-base cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/auth/password-reset"
                  className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Sign In
              </Button>
            </form>

            {/* Social Login */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-4 text-muted-foreground font-medium">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full h-12 btn-hover"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSSOLogin}
                  className="w-full h-12 btn-hover"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  SSO
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-base text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <p>
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}