import { useState } from 'react'
import { Search, Filter, Grid, List, Clock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    tags: [] as string[],
    duration: '',
    author: '',
    dateRange: ''
  })

  // Mock search results
  const searchResults = [
    {
      id: '1',
      title: 'Proper Lifting Techniques',
      description: 'Learn the correct way to lift heavy objects to prevent injury.',
      duration: '2:30',
      thumbnail: '/api/placeholder/320/180',
      tags: ['safety', 'lifting', 'ergonomics'],
      author: 'John Smith',
      createdAt: '2024-01-15',
      viewCount: 1247
    },
    {
      id: '2',
      title: 'Machine Calibration Process',
      description: 'Step-by-step guide to calibrating industrial machinery.',
      duration: '4:15',
      thumbnail: '/api/placeholder/320/180',
      tags: ['calibration', 'maintenance', 'machinery'],
      author: 'Sarah Johnson',
      createdAt: '2024-01-10',
      viewCount: 892
    },
    {
      id: '3',
      title: 'Safety Protocol Overview',
      description: 'Essential safety procedures for all employees.',
      duration: '3:45',
      thumbnail: '/api/placeholder/320/180',
      tags: ['safety', 'protocols', 'training'],
      author: 'Mike Wilson',
      createdAt: '2024-01-08',
      viewCount: 2156
    }
  ]

  const availableTags = ['safety', 'lifting', 'ergonomics', 'calibration', 'maintenance', 'machinery', 'protocols', 'training']

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Search Content</h1>
          
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reels, courses, transcripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tags Filter */}
                <div>
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="space-y-2">
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
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
                        <label htmlFor={tag} className="text-sm cursor-pointer">
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <h4 className="font-medium mb-3">Duration</h4>
                  <div className="space-y-2">
                    {['Under 2 min', '2-5 min', '5-10 min', 'Over 10 min'].map((duration) => (
                      <div key={duration} className="flex items-center space-x-2">
                        <Checkbox
                          id={duration}
                          checked={filters.duration === duration}
                          onCheckedChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              duration: checked ? duration : ''
                            }))
                          }}
                        />
                        <label htmlFor={duration} className="text-sm cursor-pointer">
                          {duration}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({
                    tags: [],
                    duration: '',
                    author: '',
                    dateRange: ''
                  })}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="text-muted-foreground">
                  {searchResults.length} results found
                </p>
                {filters.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Filtered by:</span>
                    {filters.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Grid/List */}
            <div className={cn(
              "space-y-4",
              viewMode === 'grid' && "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            )}>
              {searchResults.map((result, index) => (
                <Card key={result.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="p-0">
                    <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-2">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Search className="w-6 h-6 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">Video Thumbnail</p>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {result.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <CardTitle className="text-lg line-clamp-2">{result.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{result.description}</CardDescription>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{result.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.createdAt}</span>
                        </div>
                      </div>
                      <span>{result.viewCount} views</span>
                    </div>
                    
                    <Button className="w-full" asChild>
                      <a href={`/reels/${result.id}`}>
                        Watch Now
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}