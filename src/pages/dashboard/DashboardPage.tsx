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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-stagger">
          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Courses Assigned</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.coursesAssigned}</div>
              <p className="text-sm text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Reels Watched Today</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Play className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.reelsWatchedToday}</div>
              <p className="text-sm text-muted-foreground">
                {stats.watchTimeToday} minutes total
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Certificates Earned</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.certificatesEarned}</div>
              <p className="text-sm text-muted-foreground">
                {stats.completionRate}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Learning Streak</CardTitle>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.streak} days</div>
              <p className="text-sm text-muted-foreground">
                Keep it up!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Progress Chart */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Weekly Progress</span>
              </CardTitle>
              <CardDescription>Your learning activity over the past week</CardDescription>
            </CardHeader>
            <CardContent>
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
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="reels" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="time" 
                      stackId="2"
                      stroke="hsl(var(--secondary))" 
                      fill="hsl(var(--secondary))" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Course Progress Pie Chart */}
          <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Course Progress</span>
              </CardTitle>
              <CardDescription>Distribution of your course completion status</CardDescription>
            </CardHeader>
            <CardContent>
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
                        borderRadius: '8px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {courseProgressData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
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
                <Card key={course.id} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{course.description}</CardDescription>
                      </div>
                      <Badge 
                        variant={getDifficultyColor(course.difficulty) as any}
                        className="text-xs font-semibold px-3 py-1"
                      >
                        {course.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>Progress</span>
                        <span className="text-lg">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Play className="h-4 w-4" />
                          <span>{course.completedReels} of {course.totalReels} reels completed</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.estimatedTime}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Due {new Date(course.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="btn-hover shadow-md hover:shadow-lg" 
                        asChild
                      >
                        <Link to={`/courses/${course.id}`}>
                          {course.progress > 0 ? 'Continue' : 'Start'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skill Distribution Chart */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Skill Distribution</span>
                </CardTitle>
                <CardDescription>Your proficiency across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillDistributionData.map((skill, index) => (
                    <div key={skill.skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
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
            </Card>

            {/* Recent Reels */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Play className="h-5 w-5 text-primary" />
                  <span>Recent Reels</span>
                </CardTitle>
                <CardDescription>Your recent viewing activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReels.map((reel) => (
                  <div key={reel.id} className="flex items-center space-x-3 group hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="relative">
                      <div className="w-16 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {reel.watched && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{reel.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
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
                <Button variant="outline" size="sm" className="w-full btn-hover" asChild>
                  <Link to="/reels">View All Reels</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Reels */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Recommended</span>
                </CardTitle>
                <CardDescription>Based on your activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedReels.map((reel) => (
                  <div key={reel.id} className="space-y-3 group hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{reel.title}</p>
                        <p className="text-xs text-muted-foreground">{reel.reason}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reel.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/10 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start btn-hover shadow-md hover:shadow-lg" asChild>
                  <Link to="/upload">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload New Reel
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start btn-hover" asChild>
                  <Link to="/search">
                    <Search className="mr-2 h-4 w-4" />
                    Search Content
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start btn-hover" asChild>
                  <Link to="/certificates">
                    <Award className="mr-2 h-4 w-4" />
                    View Certificates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}