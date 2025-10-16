import { Link } from 'react-router-dom'
import { 
  Play, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Calendar,
  Search,
  Clock,
  Target,
  Zap,
  BarChart3,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function DashboardPage() {
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const stats = {
    coursesAssigned: 12,
    reelsWatchedToday: 8,
    certificatesEarned: 5,
    watchTimeToday: 24, // minutes
    completionRate: 85,
    streak: 7,
    totalWatchTime: 156, // minutes this week
    averageScore: 87,
    activeUsers: 24
  }

  // Chart data
  const weeklyProgressData = [
    { day: 'Mon', reels: 3, time: 12 },
    { day: 'Tue', reels: 5, time: 18 },
    { day: 'Wed', reels: 2, time: 8 },
    { day: 'Thu', reels: 7, time: 25 },
    { day: 'Fri', reels: 4, time: 15 },
    { day: 'Sat', reels: 1, time: 5 },
    { day: 'Sun', reels: 6, time: 22 }
  ]

  const courseProgressData = [
    { name: 'Completed', value: 8, color: '#00A676' },
    { name: 'In Progress', value: 4, color: '#0B5FFF' },
    { name: 'Not Started', value: 0, color: '#6B7280' }
  ]

  const skillDistributionData = [
    { skill: 'Safety', percentage: 95 },
    { skill: 'Maintenance', percentage: 78 },
    { skill: 'Quality Control', percentage: 82 },
    { skill: 'Troubleshooting', percentage: 65 },
    { skill: 'Documentation', percentage: 88 }
  ]

  const assignedCourses = [
    {
      id: '1',
      title: 'Machine Safety Protocols',
      description: 'Essential safety procedures for operating heavy machinery',
      progress: 75,
      totalReels: 8,
      completedReels: 6,
      estimatedTime: '45 min',
      dueDate: '2024-02-15',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      title: 'Quality Control Standards',
      description: 'Maintaining quality standards in production',
      progress: 30,
      totalReels: 12,
      completedReels: 4,
      estimatedTime: '60 min',
      dueDate: '2024-02-20',
      difficulty: 'beginner'
    },
    {
      id: '3',
      title: 'Advanced Troubleshooting',
      description: 'Diagnosing and fixing complex equipment issues',
      progress: 0,
      totalReels: 15,
      completedReels: 0,
      estimatedTime: '90 min',
      dueDate: '2024-02-25',
      difficulty: 'advanced'
    }
  ]

  const recentReels = [
    {
      id: '1',
      title: 'Proper Lifting Techniques',
      duration: '2:30',
      thumbnail: '/api/placeholder/320/180',
      tags: ['safety', 'lifting', 'ergonomics'],
      watched: true,
      watchedAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Calibrating Pressure Gauges',
      duration: '3:15',
      thumbnail: '/api/placeholder/320/180',
      tags: ['calibration', 'maintenance', 'pressure'],
      watched: false,
      watchedAt: null
    },
    {
      id: '3',
      title: 'Emergency Shutdown Procedures',
      duration: '4:00',
      thumbnail: '/api/placeholder/320/180',
      tags: ['emergency', 'safety', 'shutdown'],
      watched: true,
      watchedAt: '1 day ago'
    }
  ]

  const recommendedReels = [
    {
      id: '4',
      title: 'Preventive Maintenance Checklist',
      duration: '2:45',
      thumbnail: '/api/placeholder/320/180',
      tags: ['maintenance', 'checklist', 'preventive'],
      reason: 'Based on your recent activity'
    },
    {
      id: '5',
      title: 'Tool Selection Guide',
      duration: '3:30',
      thumbnail: '/api/placeholder/320/180',
      tags: ['tools', 'selection', 'guide'],
      reason: 'Popular in your department'
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success'
      case 'intermediate':
        return 'warning'
      case 'advanced':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your training today.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Courses Assigned</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <BookOpen className="h-5 w-5 text-primary group-hover:text-secondary transition-colors duration-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{stats.coursesAssigned}</div>
              <p className="text-sm text-muted-foreground flex items-center group-hover:text-foreground/80 transition-colors duration-500">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500 group-hover:scale-110 group-hover:text-green-600 transition-all duration-300" />
                +2 from last week
              </p>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Reels Watched Today</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Play className="h-5 w-5 text-secondary group-hover:text-primary transition-colors duration-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground group-hover:text-secondary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{stats.reelsWatchedToday}</div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                {stats.watchTimeToday} minutes total
              </p>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Certificates Earned</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Award className="h-5 w-5 text-yellow-600 group-hover:text-yellow-500 transition-colors duration-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground group-hover:text-yellow-600 transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{stats.certificatesEarned}</div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                {stats.completionRate}% completion rate
              </p>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-yellow-500/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>

          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Learning Streak</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Zap className="h-5 w-5 text-green-600 group-hover:text-green-500 transition-colors duration-500" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-foreground group-hover:text-green-600 transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{stats.streak} days</div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                Keep it up!
              </p>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-green-500/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
        </div>

        {/* Enhanced Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enhanced Weekly Progress Chart */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl group hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                <Activity className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                <span>Weekly Progress</span>
              </CardTitle>
              <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Your learning activity over the past week</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="reels" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="time" 
                      stackId="2"
                      stroke="hsl(var(--secondary))" 
                      fill="hsl(var(--secondary))" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>

          {/* Enhanced Course Progress Pie Chart */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl group hover:shadow-2xl transition-all duration-700 relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                <Target className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                <span>Course Progress</span>
              </CardTitle>
              <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Distribution of your course completion status</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {courseProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {courseProgressData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div 
                      className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Assigned Courses</h2>
              <Button variant="outline" size="sm" asChild>
                <Link to="/courses">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {assignedCourses.map((course, index) => (
                <Card key={course.id} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up relative overflow-hidden cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-[1px]">
                    <div className="w-full h-full bg-card rounded-lg" />
                  </div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{course.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">{course.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={getDifficultyColor(course.difficulty) as any}
                        className="text-xs font-semibold px-3 py-1 group-hover:scale-110 transition-transform duration-300"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 relative z-10">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="group-hover:text-foreground/80 transition-colors duration-500">Progress</span>
                        <span className="text-lg group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3 group-hover:h-4 transition-all duration-500" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1 group-hover:text-foreground/80 transition-colors duration-500">
                          <Play className="h-4 w-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                          <span>{course.completedReels} of {course.totalReels} reels completed</span>
                        </span>
                        <span className="flex items-center space-x-1 group-hover:text-foreground/80 transition-colors duration-500">
                          <Clock className="h-4 w-4 group-hover:scale-110 group-hover:text-secondary transition-all duration-300" />
                          <span>{course.estimatedTime}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-colors duration-500">
                          <Calendar className="h-4 w-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                          <span>Due {new Date(course.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="btn-hover shadow-md hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
                        asChild
                      >
                        <Link to={`/courses/${course.id}`}>
                          {course.progress > 0 ? 'Continue' : 'Start'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Skill Distribution Chart */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up group hover:shadow-2xl transition-all duration-700 relative overflow-hidden cursor-pointer" style={{ animationDelay: '400ms' }}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <BarChart3 className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <span>Skill Distribution</span>
                </CardTitle>
                <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Your proficiency across different areas</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  {skillDistributionData.map((skill, index) => (
                    <div key={skill.skill} className="space-y-2 group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium group-hover:text-foreground/90 transition-colors duration-300">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:scale-110 transition-transform duration-300">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 group-hover:h-3 transition-all duration-500">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 group-hover:h-3 rounded-full transition-all duration-1000 group-hover:shadow-lg"
                          style={{ 
                            width: `${skill.percentage}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Recent Reels */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up group hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{ animationDelay: '500ms' }}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Play className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <span>Recent Reels</span>
                </CardTitle>
                <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Your recent viewing activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {recentReels.map((reel, index) => (
                  <div key={reel.id} className="flex items-center space-x-3 group hover:bg-muted/50 rounded-lg p-2 -m-2 transition-all duration-300 hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="relative">
                      <div className="w-16 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                        <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                      {reel.watched && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg group-hover:scale-125 transition-transform duration-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">{reel.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        <span>{reel.duration}</span>
                        {reel.watched && (
                          <>
                            <span>•</span>
                            <span>{reel.watchedAt}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                  <Link to="/reels">
                    View All Reels
                    <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Recommended Reels */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up group hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{ animationDelay: '600ms' }}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Target className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <span>Recommended</span>
                </CardTitle>
                <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Based on your activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {recommendedReels.map((reel, index) => (
                  <div key={reel.id} className="space-y-3 group hover:bg-muted/50 rounded-lg p-2 -m-2 transition-all duration-300 hover:scale-105" style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                        <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">{reel.title}</p>
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{reel.reason}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reel.tags.map((tag, tagIndex) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/10 transition-all duration-300 group-hover:scale-105" style={{ transitionDelay: `${tagIndex * 50}ms` }}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up group hover:shadow-2xl transition-all duration-700 relative overflow-hidden" style={{ animationDelay: '700ms' }}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Zap className="h-5 w-5 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <Button className="w-full justify-start btn-hover shadow-md hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" asChild>
                  <Link to="/upload">
                    <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                    Upload New Reel
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                  <Link to="/search">
                    <Search className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                    Search Content
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5" asChild>
                  <Link to="/certificates">
                    <Award className="mr-2 h-4 w-4 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                    View Certificates
                  </Link>
                </Button>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}