import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import type { UserRole } from '@/types'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name is required'),
  role: z.enum(['admin', 'curator', 'trainer', 'operator', 'customer-admin'] as const),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const password = watch('password')

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      toast.success('Account created successfully! Please check your email to verify your account.')
      navigate('/auth/verify-email')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    // Implement Google OAuth
    toast.info('Google signup coming soon!')
  }

  const handleSSOSignup = () => {
    // Implement SSO
    toast.info('SSO signup coming soon!')
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(password || '')

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
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="text-lg text-muted-foreground">
              Get started with your free trial today and transform your team's knowledge
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <Card className="animate-fade-in-up border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl" style={{ animationDelay: '200ms' }}>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
            <CardDescription className="text-center text-base">
              Create your account to start preserving knowledge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    {...register('name')}
                    className={`h-12 text-base ${errors.name ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive animate-fade-in-up">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    {...register('email')}
                    className={`h-12 text-base ${errors.email ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive animate-fade-in-up">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-base font-medium">Company</Label>
                <Input
                  id="company"
                  placeholder="Your Company Inc."
                  {...register('company')}
                  className={`h-12 text-base ${errors.company ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                />
                {errors.company && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.company.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-base font-medium">Role</Label>
                <Select onValueChange={(value) => setValue('role', value as UserRole)}>
                  <SelectTrigger className={`h-12 text-base ${errors.role ? 'border-destructive focus:border-destructive' : 'input-focus'}`}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="curator">Curator</SelectItem>
                    <SelectItem value="customer-admin">Customer Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.role.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
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
                {password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 w-full rounded-full transition-all duration-300 ${
                            level <= passwordStrength
                              ? passwordStrength <= 2
                                ? 'bg-destructive'
                                : passwordStrength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {passwordStrength <= 2
                        ? 'Weak password'
                        : passwordStrength <= 3
                        ? 'Medium strength'
                        : 'Strong password'}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                    className={`h-12 text-base pr-12 ${errors.confirmPassword ? 'border-destructive focus:border-destructive' : 'input-focus'}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive animate-fade-in-up">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="termsAccepted"
                    {...register('termsAccepted')}
                    className="mt-1 w-5 h-5"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="termsAccepted" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline font-medium">
                        Privacy Policy
                      </Link>
                    </Label>
                    {errors.termsAccepted && (
                      <p className="text-sm text-destructive animate-fade-in-up">{errors.termsAccepted.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold btn-hover shadow-lg hover:shadow-xl" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Create Account
              </Button>
            </form>

            {/* Social Signup */}
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
                  onClick={handleGoogleSignup}
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
                  onClick={handleSSOSignup}
                  className="w-full h-12 btn-hover"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  SSO
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-base text-muted-foreground">
                Already have an account?{' '}
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
            By creating an account, you agree to our{' '}
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