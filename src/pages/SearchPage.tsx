import { useState, useMemo } from 'react'
import { Search, Filter, Grid, List, Clock, User, Play, Star, Calendar, Tag, X, Sparkles, Target, BarChart3, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    tags: [] as string[],
    duration: [0, 600] as [number, number], // in seconds
    author: '',
    dateRange: '',
    machineModel: '',
    process: '',
    difficulty: '',
    rating: 0
  })

  // Enhanced mock search results
  const searchResults = [
    {
      id: '1',
      title: 'Proper Lifting Techniques for Heavy Equipment',
      description: 'Learn the correct way to lift heavy objects to prevent injury and maintain safety standards. This comprehensive guide covers proper body mechanics, equipment usage, and safety protocols.',
      duration: 150, // in seconds
      thumbnail: '/api/placeholder/320/180',
      tags: ['safety', 'lifting', 'ergonomics', 'equipment'],
      author: 'John Smith',
      createdAt: '2024-01-15',
      viewCount: 1247,
      rating: 4.8,
      machineModel: 'Caterpillar 320D',
      process: 'Equipment Maintenance',
      difficulty: 'beginner',
      isBookmarked: false,
      isWatched: false
    },
    {
      id: '2',
      title: 'Machine Calibration Process',
      description: 'Step-by-step guide to calibrating industrial machinery. Learn the essential procedures for maintaining accuracy and preventing equipment failure.',
      duration: 255,
      thumbnail: '/api/placeholder/320/180',
      tags: ['calibration', 'maintenance', 'machinery', 'precision'],
      author: 'Sarah Johnson',
      createdAt: '2024-01-10',
      viewCount: 892,
      rating: 4.6,
      machineModel: 'CNC Mill',
      process: 'Quality Control',
      difficulty: 'intermediate',
      isBookmarked: true,
      isWatched: true
    },
    {
      id: '3',
      title: 'Safety Protocol Overview',
      description: 'Essential safety procedures for all employees. Comprehensive training on workplace safety, emergency procedures, and hazard identification.',
      duration: 225,
      thumbnail: '/api/placeholder/320/180',
      tags: ['safety', 'protocols', 'training', 'emergency'],
      author: 'Mike Wilson',
      createdAt: '2024-01-08',
      viewCount: 2156,
      rating: 4.9,
      machineModel: 'General',
      process: 'Safety Training',
      difficulty: 'beginner',
      isBookmarked: false,
      isWatched: false
    },
    {
      id: '4',
      title: 'Advanced Troubleshooting Techniques',
      description: 'Master the art of diagnosing and fixing complex equipment issues. Advanced techniques for experienced technicians.',
      duration: 420,
      thumbnail: '/api/placeholder/320/180',
      tags: ['troubleshooting', 'advanced', 'diagnostics', 'repair'],
      author: 'Alex Chen',
      createdAt: '2024-01-05',
      viewCount: 567,
      rating: 4.7,
      machineModel: 'Hydraulic Press',
      process: 'Maintenance',
      difficulty: 'advanced',
      isBookmarked: true,
      isWatched: false
    },
    {
      id: '5',
      title: 'Quality Control Standards',
      description: 'Understanding and implementing quality control measures in manufacturing processes.',
      duration: 180,
      thumbnail: '/api/placeholder/320/180',
      tags: ['quality', 'control', 'standards', 'manufacturing'],
      author: 'Lisa Rodriguez',
      createdAt: '2024-01-03',
      viewCount: 743,
      rating: 4.5,
      machineModel: 'Assembly Line',
      process: 'Quality Assurance',
      difficulty: 'intermediate',
      isBookmarked: false,
      isWatched: true
    },
    {
      id: '6',
      title: 'Emergency Shutdown Procedures',
      description: 'Critical safety procedures for emergency situations. Learn when and how to safely shut down equipment.',
      duration: 120,
      thumbnail: '/api/placeholder/320/180',
      tags: ['emergency', 'shutdown', 'safety', 'procedures'],
      author: 'David Kim',
      createdAt: '2024-01-01',
      viewCount: 1834,
      rating: 4.9,
      machineModel: 'General',
      process: 'Emergency Response',
      difficulty: 'beginner',
      isBookmarked: true,
      isWatched: true
    }
  ]

  const availableTags = ['safety', 'lifting', 'ergonomics', 'calibration', 'maintenance', 'machinery', 'protocols', 'training', 'equipment', 'precision', 'emergency', 'quality', 'control', 'standards', 'manufacturing', 'shutdown', 'procedures', 'troubleshooting', 'advanced', 'diagnostics', 'repair']
  const availableAuthors = ['John Smith', 'Sarah Johnson', 'Mike Wilson', 'Alex Chen', 'Lisa Rodriguez', 'David Kim']
  const availableMachineModels = ['Caterpillar 320D', 'CNC Mill', 'Hydraulic Press', 'Assembly Line', 'General']
  const difficultyLevels = ['beginner', 'intermediate', 'advanced']

  // Search and filter logic
  const filteredResults = useMemo(() => {
    let results = searchResults

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(result =>
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.tags.some(tag => tag.toLowerCase().includes(query)) ||
        result.author.toLowerCase().includes(query)
      )
    }

    // Tag filter
    if (filters.tags.length > 0) {
      results = results.filter(result =>
        filters.tags.some(tag => result.tags.includes(tag))
      )
    }

    // Duration filter
    results = results.filter(result =>
      result.duration >= filters.duration[0] && result.duration <= filters.duration[1]
    )

    // Author filter
    if (filters.author) {
      results = results.filter(result => result.author === filters.author)
    }

    // Machine model filter
    if (filters.machineModel) {
      results = results.filter(result => result.machineModel === filters.machineModel)
    }

    // Process filter
    if (filters.process) {
      results = results.filter(result => result.process === filters.process)
    }

    // Difficulty filter
    if (filters.difficulty) {
      results = results.filter(result => result.difficulty === filters.difficulty)
    }

    // Rating filter
    if (filters.rating > 0) {
      results = results.filter(result => result.rating >= filters.rating)
    }

    // Sort results
    switch (sortBy) {
      case 'relevance':
        // Keep original order for now (in real app, this would be based on search relevance)
        break
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'most-viewed':
        results.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'highest-rated':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'duration-asc':
        results.sort((a, b) => a.duration - b.duration)
        break
      case 'duration-desc':
        results.sort((a, b) => b.duration - a.duration)
        break
    }

    return results
  }, [searchQuery, filters, sortBy])

  // Handle search
  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success(`Found ${filteredResults.length} results`)
    }, 1000)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      tags: [],
      duration: [0, 600],
      author: '',
      dateRange: '',
      machineModel: '',
      process: '',
      difficulty: '',
      rating: 0
    })
    toast.success('Filters cleared')
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Enhanced Search Header */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold gradient-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Search Content
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover training reels, courses, and knowledge across your organization
            </p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <Input
                  placeholder="Search reels, courses, transcripts, machine models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-12 h-12 text-lg group-hover:border-primary/50 transition-all duration-300"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button 
                size="lg" 
                className="px-8 h-12 btn-hover shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Search
                  </>
                )}
              </Button>
            </div>
            
            {/* Quick Search Suggestions */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['safety protocols', 'machine maintenance', 'quality control', 'emergency procedures'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Filter className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Filters</span>
                </CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                    {filteredResults.length} results
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden group-hover:scale-110 transition-transform duration-300"
                  >
                    {showFilters ? 'Hide' : 'Show'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                {/* Tags Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2 group-hover:text-foreground/90 transition-colors duration-300">
                    <Tag className="h-4 w-4" />
                    <span>Tags</span>
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                        <Checkbox
                          id={tag}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters(prev => ({
                                ...prev,
                                tags: [...prev.tags, tag]
                              }))
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                tags: prev.tags.filter(t => t !== tag)
                              }))
                            }
                          }}
                        />
                        <label htmlFor={tag} className="text-sm cursor-pointer group-hover:text-foreground/90 transition-colors duration-300">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2 group-hover:text-foreground/90 transition-colors duration-300">
                    <Clock className="h-4 w-4" />
                    <span>Duration</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="px-2">
                      <Slider
                        value={filters.duration}
                        onValueChange={(value: number[]) => setFilters(prev => ({ ...prev, duration: value as [number, number] }))}
                        max={600}
                        step={30}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>{formatDuration(filters.duration[0])}</span>
                        <span>{formatDuration(filters.duration[1])}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Author Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2 group-hover:text-foreground/90 transition-colors duration-300">
                    <User className="h-4 w-4" />
                    <span>Author</span>
                  </h4>
                  <Select value={filters.author} onValueChange={(value) => setFilters(prev => ({ ...prev, author: value }))}>
                    <SelectTrigger className="group-hover:border-primary/50 transition-colors duration-300">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAuthors.map((author) => (
                        <SelectItem key={author} value={author}>{author}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Machine Model Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2 group-hover:text-foreground/90 transition-colors duration-300">
                    <Target className="h-4 w-4" />
                    <span>Machine Model</span>
                  </h4>
                  <Select value={filters.machineModel} onValueChange={(value) => setFilters(prev => ({ ...prev, machineModel: value }))}>
                    <SelectTrigger className="group-hover:border-primary/50 transition-colors duration-300">
                      <SelectValue placeholder="Select machine" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMachineModels.map((model) => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2 group-hover:text-foreground/90 transition-colors duration-300">
                    <BarChart3 className="h-4 w-4" />
                    <span>Difficulty</span>
                  </h4>
                  <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}>
                    <SelectTrigger className="group-hover:border-primary/50 transition-colors duration-300">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficultyLevels.map((level) => (
                        <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5"
                  onClick={clearFilters}
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>
          </div>

          {/* Enhanced Search Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Enhanced Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold">
                    {filteredResults.length} results found
                  </p>
                </div>
                
                {/* Active Filters */}
                <div className="flex flex-wrap gap-2">
                  {filters.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="text-xs hover:bg-primary/10 hover:text-primary cursor-pointer transition-all duration-300 group-hover:scale-105"
                      onClick={() => setFilters(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}
                    >
                      {tag}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                  {filters.author && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs hover:bg-primary/10 hover:text-primary cursor-pointer transition-all duration-300 group-hover:scale-105"
                      onClick={() => setFilters(prev => ({ ...prev, author: '' }))}
                    >
                      Author: {filters.author}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                  {filters.machineModel && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs hover:bg-primary/10 hover:text-primary cursor-pointer transition-all duration-300 group-hover:scale-105"
                      onClick={() => setFilters(prev => ({ ...prev, machineModel: '' }))}
                    >
                      {filters.machineModel}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="most-viewed">Most Viewed</SelectItem>
                    <SelectItem value="highest-rated">Highest Rated</SelectItem>
                    <SelectItem value="duration-asc">Duration (Short)</SelectItem>
                    <SelectItem value="duration-desc">Duration (Long)</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="btn-hover"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="btn-hover"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Results Grid/List */}
            <div className={cn(
              "space-y-4",
              viewMode === 'grid' && "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            )}>
              {filteredResults.map((result, index) => (
                <Card 
                  key={result.id} 
                  className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer animate-fade-in-up" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <CardHeader className="p-0 relative z-10">
                    <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-t-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2 group-hover:scale-110 transition-transform duration-300">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            <Play className="w-6 h-6 text-primary group-hover:text-secondary transition-colors duration-300" />
                          </div>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Video Thumbnail</p>
                        </div>
                      </div>
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded group-hover:scale-110 transition-transform duration-300">
                        {formatDuration(result.duration)}
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="absolute top-2 left-2 flex space-x-1">
                        {result.isBookmarked && (
                          <div className="w-6 h-6 bg-yellow-500/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                        {result.isWatched && (
                          <div className="w-6 h-6 bg-green-500/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4 space-y-3 relative z-10">
                    <div>
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                        {result.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 group-hover:text-foreground/80 transition-colors duration-500">
                        {result.description}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs group-hover:scale-105 transition-all duration-300 hover:bg-primary/10 hover:text-primary cursor-pointer"
                          style={{ transitionDelay: `${tagIndex * 50}ms` }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 group-hover:text-foreground/80 transition-colors duration-300">
                          <User className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                          <span>{result.author}</span>
                        </div>
                        <div className="flex items-center space-x-1 group-hover:text-foreground/80 transition-colors duration-300">
                          <Calendar className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
                          <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{result.rating}</span>
                        </div>
                        <span className="text-xs">{result.viewCount.toLocaleString()} views</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">{result.machineModel}</span> • <span className="capitalize">{result.difficulty}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full btn-hover shadow-md hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
                      asChild
                    >
                      <a href={`/reels/${result.id}`}>
                        <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                        Watch Now
                      </a>
                    </Button>
                  </CardContent>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </Card>
              ))}
              
              {/* Empty State */}
              {filteredResults.length === 0 && (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Enhanced Pagination */}
            <div className="flex items-center justify-center space-x-2 animate-fade-in-up">
              <Button variant="outline" disabled className="btn-hover">
                Previous
              </Button>
              <Button variant="outline" className="btn-hover bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" className="btn-hover hover:bg-primary/10 hover:border-primary/50">2</Button>
              <Button variant="outline" className="btn-hover hover:bg-primary/10 hover:border-primary/50">3</Button>
              <Button variant="outline" className="btn-hover">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}