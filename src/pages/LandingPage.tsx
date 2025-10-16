import { Link } from 'react-router-dom'
import { ArrowRight, Play, CheckCircle, Star, Users, Award, Clock, Shield, Zap, Target, TrendingUp, Sparkles, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Additional floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-2xl animate-float-delayed" style={{ animationDelay: '3s' }} />
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-primary/20 rounded-lg rotate-45 animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border border-secondary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-5 animate-gradient-xy" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <Badge variant="secondary" className="w-fit animate-bounce-in group hover:scale-105 transition-transform duration-300">
                    <Award className="w-3 h-3 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                    Trusted by 500+ Companies
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground group">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium">4.9/5 rating</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Preserve Operational Knowledge with{' '}
                  <span className="gradient-text animate-gradient-x bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] relative">
                    Training Reels
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  Transform your team's expertise into searchable, 20-30 second instructional videos. 
                  Build courses, track progress, and ensure knowledge never walks out the door.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <Button size="lg" className="group btn-hover shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300" asChild>
                  <Link to="/auth/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300" asChild>
                  <Link to="/demo">
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center group hover:text-green-600 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  No credit card required
                </div>
                <div className="flex items-center group hover:text-green-600 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  14-day free trial
                </div>
                <div className="flex items-center group hover:text-green-600 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  Setup in 5 minutes
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {/* Main Video Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 group hover:shadow-3xl transition-all duration-500">
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 flex items-center justify-center relative overflow-hidden">
                  {/* Enhanced Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-ping shadow-lg" />
                    <div className="absolute top-8 right-8 w-1 h-1 bg-secondary rounded-full animate-ping shadow-lg" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary rounded-full animate-ping shadow-lg" style={{ animationDelay: '2s' }} />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-secondary rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.5s' }} />
                    
                    {/* Additional floating elements */}
                    <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '2.5s' }} />
                  </div>
                  
                  {/* Animated grid pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                                      radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 2px, transparent 2px)`,
                      backgroundSize: '40px 40px',
                      animation: 'float 8s ease-in-out infinite'
                    }} />
                  </div>
                  
                  <div className="text-center space-y-6 z-10 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow group-hover:shadow-xl group-hover:rotate-12 transition-all duration-500">
                      <Play className="w-10 h-10 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Hero Video Preview</p>
                      <p className="text-sm text-muted-foreground">See how it works in action</p>
                    </div>
                  </div>
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/10 transition-all duration-500" />
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              {/* Enhanced Floating Cards with Better Animations */}
              <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50 animate-bounce-in hover:scale-110 hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg group-hover:scale-125 transition-transform duration-300" />
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Live Training</p>
                    <p className="text-xs text-muted-foreground">2,847 watching</p>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50 animate-bounce-in hover:scale-110 hover:shadow-2xl transition-all duration-500 group cursor-pointer" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <Users className="w-5 h-5 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">2,847 views</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Enhanced Additional Floating Element */}
              <div className="absolute top-1/2 -right-12 bg-card/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border/50 animate-float hover:scale-110 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-xs font-medium text-foreground group-hover:text-green-600 transition-colors duration-300">+127% engagement</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* New floating element for engagement */}
              <div className="absolute top-1/4 -left-8 bg-card/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border/50 animate-float hover:scale-110 hover:shadow-xl transition-all duration-500 group cursor-pointer" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-xs font-medium text-foreground group-hover:text-blue-600 transition-colors duration-300">Global reach</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-secondary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Everything you need to preserve and share knowledge
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From recording to certification, our platform handles the entire knowledge management lifecycle with enterprise-grade security and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
            {features.map((feature, index) => (
              <Card key={feature.title} className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Enhanced Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px]">
                  <div className="w-full h-full bg-card rounded-lg" />
                </div>
                
                <CardHeader className="relative z-10 p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-500" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors duration-500 mt-4">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base lg:text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
              <Target className="w-4 h-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              How It Works
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Three simple steps to transform your team's knowledge into powerful training content that drives results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center space-y-6 animate-fade-in-up group cursor-pointer" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative">
                  {/* Enhanced Step Number Circle */}
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 group-hover:shadow-2xl">
                    {index + 1}
                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Enhanced Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-1 bg-gradient-to-r from-primary/30 via-primary to-secondary/30 transform translate-x-10 rounded-full group-hover:from-primary/50 group-hover:via-primary group-hover:to-secondary/50 transition-all duration-500" />
                  )}
                  
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl group-hover:blur-2xl group-hover:scale-125 transition-all duration-500" />
                  
                  {/* Floating particles around the circle */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                    <div className="absolute top-2 right-2 w-1 h-1 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-2 right-2 w-1 h-1 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mx-auto group-hover:text-foreground/80 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>
                
                {/* Enhanced Decorative Element */}
                <div className="w-16 h-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full mx-auto group-hover:w-24 group-hover:from-primary/50 group-hover:to-secondary/50 transition-all duration-500 group-hover:shadow-lg" />
                
                {/* Additional decorative elements */}
                <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-secondary/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 border border-primary/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-32 h-32 border border-secondary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Customer Stories</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              See how companies are using Winbro Training Reels to preserve and share knowledge, boost productivity, and reduce training costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer" style={{ animationDelay: `${index * 150}ms` }}>
                {/* Enhanced Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px]">
                  <div className="w-full h-full bg-card rounded-lg" />
                </div>
                
                <CardContent className="p-8 relative z-10">
                  {/* Enhanced Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  
                  {/* Quote with enhanced styling */}
                  <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed italic group-hover:text-foreground/90 transition-colors duration-500 relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-primary/20 group-hover:text-primary/30 transition-colors duration-500">"</div>
                    {testimonial.quote}
                    <div className="absolute -bottom-2 -right-2 text-4xl text-primary/20 group-hover:text-primary/30 transition-colors duration-500">"</div>
                  </blockquote>
                  
                  {/* Enhanced Author */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg">
                      <span className="text-primary font-bold text-lg group-hover:text-secondary transition-colors duration-500">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-lg group-hover:text-primary transition-colors duration-500">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground px-4 py-2 rounded-full text-sm font-medium animate-fade-in-up">
              <Target className="w-4 h-4" />
              <span>Pricing Plans</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Choose the plan that fits your team size and needs. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-stagger">
            {pricingPlans.map((plan, index) => (
              <Card key={plan.name} className={`relative group hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden cursor-pointer ${plan.featured ? 'scale-105 shadow-2xl ring-2 ring-primary/20' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
                {/* Enhanced Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 text-sm font-semibold shadow-lg animate-bounce-in group-hover:scale-110 transition-transform duration-300">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                {/* Enhanced Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px]">
                  <div className="w-full h-full bg-card rounded-lg" />
                </div>
                
                <CardHeader className="text-center pt-8 relative z-10">
                  <CardTitle className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-4 mt-6">
                    <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-secondary/90 transition-all duration-500">
                      ${plan.price}
                      <span className="text-xl text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">/month</span>
                    </div>
                    <p className="text-lg text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">{plan.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-8 relative z-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 group-hover:translate-x-2 transition-all duration-500" style={{ transitionDelay: `${featureIndex * 100}ms` }}>
                        <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
                          <CheckCircle className="w-4 h-4 text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
                        </div>
                        <span className="text-base group-hover:text-foreground/90 transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full h-12 text-lg font-semibold group-hover:scale-105 transition-all duration-300 ${plan.featured ? 'btn-hover shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary' : 'btn-hover border-2 hover:border-primary/50 hover:bg-primary/5'}`}
                    variant={plan.featured ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/auth/signup">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-1/2 right-8 w-1 h-1 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary/90 to-secondary text-white relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float-delayed" />
          
          {/* Additional floating elements */}
          <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float-delayed" style={{ animationDelay: '3s' }} />
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: '60px 60px',
              animation: 'float 10s ease-in-out infinite'
            }} />
          </div>
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight group">
              Ready to preserve your team's knowledge?
              <Sparkles className="inline-block w-8 h-8 ml-4 text-yellow-300 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
            </h2>
            <p className="text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed group-hover:opacity-100 transition-opacity duration-500">
              Join hundreds of companies already using Winbro Training Reels to build better teams, reduce training costs, and preserve critical knowledge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" variant="secondary" className="group btn-hover shadow-xl hover:shadow-2xl text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105" asChild>
                <Link to="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white hover:text-primary btn-hover text-lg px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-105" asChild>
                <Link to="/demo">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 group-hover:text-green-300 transition-colors duration-300" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 group-hover:text-green-300 transition-colors duration-300" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle className="w-4 h-4 group-hover:text-green-300 transition-colors duration-300" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-muted/50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-24 h-24 border border-secondary/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <div className="grid md:grid-cols-4 gap-12 animate-fade-in-up">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <span className="font-bold text-2xl gradient-text">Winbro Training</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Preserve operational knowledge with short, searchable training videos that drive real results.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-primary font-bold text-sm">in</span>
                </div>
              </div>
            </div>
            
            {/* Product Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-foreground">Product</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Demo', href: '/demo' },
                  { label: 'Integrations', href: '/integrations' },
                  { label: 'API', href: '/api' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-foreground">Company</h3>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Press', href: '/press' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-foreground">Legal</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Cookie Policy', href: '/cookies' },
                  { label: 'Security', href: '/security' },
                  { label: 'Compliance', href: '/compliance' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-border/50 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-center md:text-left">
              &copy; 2024 Winbro Training Reels. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Made with ❤️ for better training</span>
            </div>
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
    description: "Capture 20-30 second instructional videos with our intuitive recording tools. Built for shop-floor environments with one-touch recording and instant upload."
  },
  {
    icon: Clock,
    title: "Auto-Transcription",
    description: "AI-powered transcription with timestamped segments for easy navigation. Search within video content and jump to specific moments instantly."
  },
  {
    icon: Award,
    title: "Course Builder",
    description: "Create structured training modules with quizzes and certificates. Drag-and-drop interface makes course creation simple and intuitive."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Role-based access control and secure content allocation per customer. SOC 2 compliant with end-to-end encryption and audit trails."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share knowledge across teams with comments, annotations, and bookmarks. Real-time collaboration tools keep everyone aligned."
  },
  {
    icon: Star,
    title: "Smart Search",
    description: "Find content instantly with full-text search across transcripts and metadata. AI-powered suggestions help discover relevant content."
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Monitor learning progress with detailed analytics and completion tracking. Identify knowledge gaps and training needs."
  },
  {
    icon: Zap,
    title: "Mobile Optimized",
    description: "Access training content anywhere with our mobile-first design. Works seamlessly on phones, tablets, and desktop devices."
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics on training effectiveness, engagement metrics, and ROI. Make data-driven decisions about your training program."
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