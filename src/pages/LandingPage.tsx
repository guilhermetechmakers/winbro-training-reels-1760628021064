import { Link } from 'react-router-dom'
import { ArrowRight, Play, CheckCircle, Star, Users, Award, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Award className="w-3 h-3 mr-1" />
                  Trusted by 500+ Companies
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Preserve Operational Knowledge with{' '}
                  <span className="gradient-text">Training Reels</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Transform your team's expertise into searchable, 20-30 second instructional videos. 
                  Build courses, track progress, and ensure knowledge never walks out the door.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group" asChild>
                  <Link to="/demo">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  14-day free trial
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Hero Video Preview</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-card rounded-lg p-4 shadow-lg animate-bounce-in">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live Training</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card rounded-lg p-4 shadow-lg animate-bounce-in" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">2,847 views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to preserve and share knowledge
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From recording to certification, our platform handles the entire knowledge management lifecycle.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to transform your team's knowledge into powerful training content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center space-y-4 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform translate-x-8" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how companies are using Winbro Training Reels to preserve and share knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your team size and needs. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={plan.name} className={`relative ${plan.featured ? 'border-primary shadow-lg scale-105' : ''} animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold">
                      ${plan.price}
                      <span className="text-lg text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/auth/signup">
                      {plan.cta}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to preserve your team's knowledge?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of companies already using Winbro Training Reels to build better teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/demo">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-xl gradient-text">Winbro Training</span>
              </div>
              <p className="text-muted-foreground">
                Preserve operational knowledge with short, searchable training videos.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-foreground transition-colors">Demo</Link></li>
                <li><Link to="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Winbro Training Reels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data
const features = [
  {
    icon: Play,
    title: "Quick Video Recording",
    description: "Capture 20-30 second instructional videos with our intuitive recording tools."
  },
  {
    icon: Clock,
    title: "Auto-Transcription",
    description: "AI-powered transcription with timestamped segments for easy navigation."
  },
  {
    icon: Award,
    title: "Course Builder",
    description: "Create structured training modules with quizzes and certificates."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Role-based access control and secure content allocation per customer."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share knowledge across teams with comments, annotations, and bookmarks."
  },
  {
    icon: Star,
    title: "Smart Search",
    description: "Find content instantly with full-text search across transcripts and metadata."
  }
]

const steps = [
  {
    title: "Record",
    description: "Capture short instructional videos of your team's processes and procedures."
  },
  {
    title: "Tag",
    description: "Add metadata, tags, and let AI suggest relevant categories automatically."
  },
  {
    title: "Train",
    description: "Build courses, assign to teams, and track completion with certificates."
  }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Training Manager",
    company: "TechCorp",
    quote: "Winbro Training Reels has revolutionized how we preserve and share knowledge. Our onboarding time has been cut in half."
  },
  {
    name: "Mike Chen",
    role: "Operations Director",
    company: "Manufacturing Inc",
    quote: "The search functionality is incredible. We can find any procedure in seconds, even from years ago."
  },
  {
    name: "Emily Rodriguez",
    role: "HR Director",
    company: "Global Solutions",
    quote: "The course builder makes it so easy to create structured training programs. Our compliance rates have never been higher."
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small teams",
    features: [
      "Up to 10 users",
      "100 training reels",
      "Basic course builder",
      "Email support",
      "Standard security"
    ],
    cta: "Start Free Trial",
    featured: false
  },
  {
    name: "Professional",
    price: 99,
    description: "Most popular for growing teams",
    features: [
      "Up to 50 users",
      "Unlimited training reels",
      "Advanced course builder",
      "Priority support",
      "Advanced security",
      "Analytics dashboard"
    ],
    cta: "Start Free Trial",
    featured: true
  },
  {
    name: "Enterprise",
    price: 299,
    description: "For large organizations",
    features: [
      "Unlimited users",
      "Unlimited everything",
      "Custom integrations",
      "Dedicated support",
      "SSO & SCIM",
      "Custom branding"
    ],
    cta: "Contact Sales",
    featured: false
  }
]