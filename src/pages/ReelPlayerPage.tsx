import { useState, useRef, useEffect } from 'react'
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
  Captions,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Search,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { toast } from 'sonner'

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
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [showTranscript, setShowTranscript] = useState(true)
  const [showComments, setShowComments] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredSegments, setFilteredSegments] = useState<any[]>([])
  const [showSettings, setShowSettings] = useState(false)
  
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

  // Search functionality for transcript
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = reel.transcript.segments.filter((segment: any) =>
        segment.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSegments(filtered)
    } else {
      setFilteredSegments(reel.transcript.segments)
    }
  }, [searchQuery, reel.transcript.segments])

  // Handle transcript segment click
  const handleSegmentClick = (startTime: number) => {
    handleSeek(startTime)
    toast.success(`Jumped to ${formatTime(startTime)}`)
  }

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
  }

  // Handle like/dislike
  const handleLike = () => {
    if (isDisliked) {
      setIsDisliked(false)
    }
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed like' : 'Liked video')
  }

  const handleDislike = () => {
    if (isLiked) {
      setIsLiked(false)
    }
    setIsDisliked(!isDisliked)
    toast.success(isDisliked ? 'Removed dislike' : 'Disliked video')
  }

  // Handle playback speed change
  const handleSpeedChange = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackSpeed(speed)
    }
  }


  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Enhanced Video Player */}
        <div className="space-y-6">
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-all duration-700">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 2px, transparent 2px),
                                radial-gradient(circle at 75% 75%, hsl(var(--secondary)) 2px, transparent 2px)`,
                backgroundSize: '40px 40px',
                animation: 'float 8s ease-in-out infinite'
              }} />
            </div>
            
            {/* Enhanced Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-500 hover:scale-125 group-hover:shadow-2xl"
                  onClick={togglePlay}
                >
                  <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform duration-300" />
                </Button>
                
                {/* Floating particles around play button */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            )}
            
            {/* Enhanced Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
              {/* Enhanced Progress Bar */}
              <div className="mb-4">
                <div 
                  className="w-full bg-white/30 rounded-full h-2 cursor-pointer group/progress hover:h-3 transition-all duration-300"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const clickX = e.clientX - rect.left
                    const newTime = (clickX / rect.width) * duration
                    handleSeek(newTime)
                  }}
                >
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary rounded-full h-2 group-hover/progress:h-3 transition-all duration-300 shadow-lg"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  
                  {/* Progress indicator dot */}
                  <div 
                    className="w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1 transition-all duration-300 opacity-0 group-hover/progress:opacity-100"
                    style={{ 
                      left: `${(currentTime / duration) * 100}%`,
                      transform: `translateX(-50%) translateY(-50%)`
                    }}
                  />
                </div>
              </div>
              
              {/* Enhanced Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2 text-white text-sm font-mono">
                    <span className="bg-black/30 px-2 py-1 rounded">{formatTime(currentTime)}</span>
                    <span>/</span>
                    <span className="bg-black/30 px-2 py-1 rounded">{formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
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
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer hover:h-2 transition-all duration-300"
                    />
                  </div>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={() => setShowCaptions(!showCaptions)}
                  >
                    <Captions className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Settings Panel */}
            {showSettings && (
              <div className="absolute bottom-16 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 space-y-3 min-w-48 animate-fade-in-up">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Playback Speed</label>
                  <div className="flex space-x-2">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <Button
                        key={speed}
                        size="sm"
                        variant={playbackSpeed === speed ? "default" : "outline"}
                        className="text-white border-white/30 hover:bg-white/20"
                        onClick={() => handleSpeedChange(speed)}
                      >
                        {speed}x
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Quality</label>
                  <div className="flex space-x-2">
                    {['Auto', '1080p', '720p', '480p'].map((quality) => (
                      <Button
                        key={quality}
                        size="sm"
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/20"
                      >
                        {quality}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Video Actions */}
          <div className="flex items-center justify-between animate-fade-in-up">
            <div className="flex items-center space-x-2">
              <Button 
                className="btn-hover shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button 
                variant="outline" 
                className={`btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 ${isBookmarked ? 'bg-primary/10 border-primary' : ''}`}
                onClick={toggleBookmark}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className={`hover:bg-red-500/10 ${isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className={`hover:bg-red-500/10 ${isDisliked ? 'text-red-500' : 'text-muted-foreground'}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">Rating:</span>
                <span className="font-medium text-primary">{reel.rating}</span>
                <span className="text-sm text-muted-foreground">({reel.viewCount.toLocaleString()} views)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Video Info */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">{reel.title}</CardTitle>
                <CardDescription className="text-base group-hover:text-foreground/80 transition-colors duration-500">{reel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {reel.tags.map((tag, index) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="group-hover:scale-105 transition-all duration-300 hover:bg-primary/10 hover:text-primary cursor-pointer"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-colors duration-500">
                    <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <span>Duration: {Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-colors duration-500">
                    <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <span>Author: {reel.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-colors duration-500">
                    <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    <span>Created: {new Date(reel.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-colors duration-500">
                    <span className="text-muted-foreground">Role:</span>
                    <span>{reel.author.role}</span>
                  </div>
                </div>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Transcript */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-500">Transcript</CardTitle>
                    <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Click on any timestamp to jump to that part of the video</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    {showTranscript ? 'Hide' : 'Show'}
                  </Button>
                </div>
                
                {/* Search functionality */}
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transcript..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 group-hover:border-primary/50 transition-colors duration-300"
                    />
                  </div>
                </div>
              </CardHeader>
              
              {showTranscript && (
                <CardContent className="relative z-10">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredSegments.map((segment, index) => (
                      <div 
                        key={index} 
                        className="flex space-x-4 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-300 hover:scale-105 group/segment"
                        onClick={() => handleSegmentClick(segment.startTime)}
                      >
                        <button className="text-primary font-mono text-sm hover:underline group-hover/segment:text-secondary transition-colors duration-300 bg-primary/10 px-2 py-1 rounded">
                          {Math.floor(segment.startTime / 60)}:{(segment.startTime % 60).toString().padStart(2, '0')}
                        </button>
                        <p className="text-sm flex-1 group-hover/segment:text-foreground/90 transition-colors duration-300">{segment.text}</p>
                      </div>
                    ))}
                    
                    {filteredSegments.length === 0 && searchQuery && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Metadata */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="group-hover:text-primary transition-colors duration-500 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors duration-300">Machine Model</h4>
                  <p className="text-sm group-hover:text-foreground/90 transition-colors duration-300">{reel.machineModel}</p>
                </div>
                <div className="group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors duration-300">Process</h4>
                  <p className="text-sm group-hover:text-foreground/90 transition-colors duration-300">{reel.process}</p>
                </div>
                <div className="group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2 group-hover:text-foreground/80 transition-colors duration-300">Tooling</h4>
                  <p className="text-sm group-hover:text-foreground/90 transition-colors duration-300">{reel.tooling}</p>
                </div>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Related Reels */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="group-hover:text-primary transition-colors duration-500 flex items-center space-x-2">
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Related Reels</span>
                </CardTitle>
                <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">More content you might like</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                {reel.relatedReels.map((relatedReel, index) => (
                  <div 
                    key={relatedReel.id} 
                    className="flex space-x-3 group-hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-20 h-12 bg-gradient-to-br from-muted to-muted/50 rounded-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                      <Play className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">{relatedReel.title}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                        {Math.floor(relatedReel.duration / 60)}:{(relatedReel.duration % 60).toString().padStart(2, '0')} • {relatedReel.tags[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Comments */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-500 flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                      <span>Comments</span>
                    </CardTitle>
                    <CardDescription className="group-hover:text-foreground/80 transition-colors duration-500">Share your thoughts</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    {showComments ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </CardHeader>
              
              {showComments && (
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    {reel.comments.map((comment, index) => (
                      <div 
                        key={comment.id} 
                        className="text-sm group-hover:scale-105 transition-all duration-300 p-3 rounded-lg hover:bg-muted/50 -m-3"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <p className="font-medium group-hover:text-primary transition-colors duration-300">{comment.text}</p>
                        <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                          - {comment.author}, {comment.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add a comment..."
                      className="resize-none group-hover:border-primary/50 transition-colors duration-300"
                    />
                    <Button 
                      variant="outline" 
                      className="w-full btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                  </div>
                </CardContent>
              )}
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}