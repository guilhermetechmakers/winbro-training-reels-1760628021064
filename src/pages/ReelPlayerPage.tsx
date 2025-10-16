import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share, 
  Download, 
  Clock, 
  User, 
  Calendar,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Captions
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function ReelPlayerPage() {
  const { id } = useParams()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCaptions, setShowCaptions] = useState(false)
  
  // Mock data - in real app, this would come from API
  const reel = {
    id: id || '1',
    title: 'Proper Lifting Techniques for Heavy Equipment',
    description: 'Learn the correct way to lift heavy objects to prevent injury and maintain safety standards. This comprehensive guide covers proper body mechanics, equipment usage, and safety protocols.',
    duration: 150, // seconds
    thumbnail: '/api/placeholder/1280/720',
    videoUrl: '/api/placeholder/video.mp4',
    hlsUrl: '/api/placeholder/playlist.m3u8',
    tags: ['safety', 'lifting', 'ergonomics', 'equipment', 'maintenance'],
    machineModel: 'Caterpillar 320D',
    process: 'Equipment Maintenance',
    tooling: 'Hydraulic Jack, Safety Harness',
    author: {
      name: 'John Smith',
      role: 'Safety Trainer',
      avatar: '/api/placeholder/40/40'
    },
    createdAt: '2024-01-15',
    viewCount: 1247,
    rating: 4.8,
    likes: 89,
    dislikes: 3,
    transcript: {
      segments: [
        { startTime: 0, endTime: 30, text: 'Welcome to today\'s safety training on proper lifting techniques for heavy equipment operations.' },
        { startTime: 30, endTime: 60, text: 'First, always assess the weight and size of the object before attempting to lift. Check for any sharp edges or hazardous materials.' },
        { startTime: 60, endTime: 90, text: 'Position your feet shoulder-width apart and keep your back straight. This is crucial for preventing injury.' },
        { startTime: 90, endTime: 120, text: 'Bend at the knees, not the waist, and grip the object firmly with both hands. Use proper lifting straps if available.' },
        { startTime: 120, endTime: 150, text: 'Lift using your leg muscles while keeping the object close to your body. Never twist while lifting.' }
      ]
    },
    relatedReels: [
      {
        id: '2',
        title: 'Safety Equipment Inspection',
        duration: 120,
        thumbnail: '/api/placeholder/320/180',
        tags: ['safety', 'inspection']
      },
      {
        id: '3',
        title: 'Emergency Procedures',
        duration: 180,
        thumbnail: '/api/placeholder/320/180',
        tags: ['safety', 'emergency']
      },
      {
        id: '4',
        title: 'Equipment Maintenance Basics',
        duration: 200,
        thumbnail: '/api/placeholder/320/180',
        tags: ['maintenance', 'equipment']
      }
    ],
    comments: [
      {
        id: '1',
        author: 'Mike Johnson',
        text: 'Great explanation! This really helped me understand the proper technique.',
        timestamp: '2 hours ago',
        likes: 5
      },
      {
        id: '2',
        author: 'Sarah Wilson',
        text: 'Very helpful for new employees. Should be mandatory viewing.',
        timestamp: '1 day ago',
        likes: 3
      }
    ]
  }

  // Video player controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }



  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Video Player */}
        <div className="space-y-6">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={reel.thumbnail}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(reel.duration)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={reel.hlsUrl} type="application/x-mpegURL" />
              <source src={reel.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  onClick={togglePlay}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </Button>
              </div>
            )}
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Progress Bar */}
              <div className="mb-4">
                <div 
                  className="w-full bg-white/30 rounded-full h-1 cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const newTime = (clickX / rect.width) * duration
                    handleSeek(newTime)
                  }}
                >
                  <div 
                    className="bg-primary rounded-full h-1 transition-all duration-200"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2 text-white text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  
                  <div className="w-20">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={() => setShowCaptions(!showCaptions)}
                  >
                    <Captions className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>
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