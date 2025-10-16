import { useParams } from 'react-router-dom'
import { Play, Volume2, Settings, Bookmark, Share, Download, Clock, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function ReelPlayerPage() {
  const { id } = useParams()
  
  // Mock data - in real app, this would come from API
  const reel = {
    id: id || '1',
    title: 'Proper Lifting Techniques for Heavy Equipment',
    description: 'Learn the correct way to lift heavy objects to prevent injury and maintain safety standards.',
    duration: 150, // seconds
    thumbnail: '/api/placeholder/1280/720',
    videoUrl: '/api/placeholder/video.mp4',
    tags: ['safety', 'lifting', 'ergonomics', 'equipment'],
    machineModel: 'Caterpillar 320D',
    process: 'Equipment Maintenance',
    tooling: 'Hydraulic Jack, Safety Harness',
    author: {
      name: 'John Smith',
      role: 'Safety Trainer'
    },
    createdAt: '2024-01-15',
    viewCount: 1247,
    rating: 4.8,
    transcript: {
      segments: [
        { startTime: 0, endTime: 30, text: 'Welcome to today\'s safety training on proper lifting techniques.' },
        { startTime: 30, endTime: 60, text: 'First, always assess the weight and size of the object before attempting to lift.' },
        { startTime: 60, endTime: 90, text: 'Position your feet shoulder-width apart and keep your back straight.' },
        { startTime: 90, endTime: 120, text: 'Bend at the knees, not the waist, and grip the object firmly with both hands.' },
        { startTime: 120, endTime: 150, text: 'Lift using your leg muscles while keeping the object close to your body.' }
      ]
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Video Player */}
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <p className="text-white/80">Video Player Placeholder</p>
                <p className="text-white/60 text-sm">Duration: {Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</p>
              </div>
            </div>
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Play className="h-4 w-4" />
                </Button>
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div className="bg-white rounded-full h-1 w-1/3" />
                </div>
                <div className="flex items-center space-x-2 text-white text-sm">
                  <span>0:30</span>
                  <span>/</span>
                  <span>{Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</span>
                </div>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Video Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Play
              </Button>
              <Button variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Bookmark
              </Button>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <span className="font-medium">{reel.rating}</span>
                <span className="text-sm text-muted-foreground">({reel.viewCount} views)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{reel.title}</CardTitle>
                <CardDescription className="text-base">{reel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {reel.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duration: {Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Author: {reel.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Created: {new Date(reel.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Role:</span>
                    <span>{reel.author.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <CardTitle>Transcript</CardTitle>
                <CardDescription>Click on any timestamp to jump to that part of the video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reel.transcript.segments.map((segment, index) => (
                    <div key={index} className="flex space-x-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <button className="text-primary font-mono text-sm hover:underline">
                        {Math.floor(segment.startTime / 60)}:{(segment.startTime % 60).toString().padStart(2, '0')}
                      </button>
                      <p className="text-sm flex-1">{segment.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Machine Model</h4>
                  <p className="text-sm">{reel.machineModel}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Process</h4>
                  <p className="text-sm">{reel.process}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Tooling</h4>
                  <p className="text-sm">{reel.tooling}</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Reels */}
            <Card>
              <CardHeader>
                <CardTitle>Related Reels</CardTitle>
                <CardDescription>More content you might like</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-3">
                    <div className="w-20 h-12 bg-muted rounded-md flex items-center justify-center">
                      <Play className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Related Reel {i}</p>
                      <p className="text-xs text-muted-foreground">2:30 • Safety</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>Share your thoughts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Great explanation!</p>
                    <p className="text-muted-foreground">- Mike Johnson, 2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Very helpful for new employees</p>
                    <p className="text-muted-foreground">- Sarah Wilson, 1 day ago</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}