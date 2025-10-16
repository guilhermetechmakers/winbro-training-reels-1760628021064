import { Link } from 'react-router-dom'
import { 
  Play, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Calendar,
  Search
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const stats = {
    coursesAssigned: 12,
    reelsWatchedToday: 8,
    certificatesEarned: 5,
    watchTimeToday: 24, // minutes
    completionRate: 85,
    streak: 7
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Assigned</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.coursesAssigned}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reels Watched Today</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reelsWatchedToday}</div>
              <p className="text-xs text-muted-foreground">
                {stats.watchTimeToday} minutes total
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completionRate}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.streak} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up!
              </p>
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
                <Card key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      <Badge variant={getDifficultyColor(course.difficulty) as any}>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{course.completedReels} of {course.totalReels} reels completed</span>
                        <span>{course.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due {new Date(course.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/courses/${course.id}`}>
                          {course.progress > 0 ? 'Continue' : 'Start'}
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
            {/* Recent Reels */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reels</CardTitle>
                <CardDescription>Your recent viewing activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReels.map((reel) => (
                  <div key={reel.id} className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {reel.watched && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{reel.title}</p>
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
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/reels">View All Reels</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recommended Reels */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <CardTitle className="text-lg">Recommended</CardTitle>
                <CardDescription>Based on your activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedReels.map((reel) => (
                  <div key={reel.id} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-muted rounded-md flex items-center justify-center">
                        <Play className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{reel.title}</p>
                        <p className="text-xs text-muted-foreground">{reel.reason}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reel.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/upload">
                    <Plus className="mr-2 h-4 w-4" />
                    Upload New Reel
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/search">
                    <Search className="mr-2 h-4 w-4" />
                    Search Content
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
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