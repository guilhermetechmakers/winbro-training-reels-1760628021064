import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Play, 
  Edit, 
  Trash2, 
  Clock
} from 'lucide-react'
import type { Course, CourseModule, Reel } from '@/types'

interface CourseCanvasProps {
  course?: Course | null
  onAddModule: (module: Omit<CourseModule, 'id'>) => void
  onUpdateModule: (moduleId: string, updates: Partial<CourseModule>) => void
  onDeleteModule: (moduleId: string) => void
  onReorderModules?: (startIndex: number, endIndex: number) => void
  onAddReelToModule?: (moduleId: string, reel: Reel) => void
  onRemoveReelFromModule: (moduleId: string, reelId: string) => void
  isPreviewMode?: boolean
}

export function CourseCanvas({
  course,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onRemoveReelFromModule,
  isPreviewMode = false
}: CourseCanvasProps) {
  const [editingModule, setEditingModule] = useState<string | null>(null)

  const handleAddModule = () => {
    const newModule: Omit<CourseModule, 'id'> = {
      title: 'New Module',
      description: 'Module description',
      reels: [],
      order: course?.modules.length || 0,
    }
    onAddModule(newModule)
  }

  const getTotalDuration = (reels: Reel[]) => {
    return reels.reduce((total, reel) => total + reel.duration, 0)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!course) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Course Created Yet</h3>
              <p className="text-muted-foreground">
                Start building your course by adding modules and reels
              </p>
            </div>
            <Button onClick={handleAddModule} className="btn-hover">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Module
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{course.title || 'Untitled Course'}</CardTitle>
              <CardDescription className="mt-2">
                {course.description || 'Add a description for your course'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="capitalize">
                {course.difficulty}
              </Badge>
              <Badge variant="secondary">
                {course.modules.length} modules
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Modules */}
      <div className="space-y-4">
        {course.modules.map((module) => (
          <Card
            key={module.id}
            className="card-hover transition-all duration-200"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
                
                {!isPreviewMode && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingModule(editingModule === module.id ? null : module.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteModule(module.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {/* Module Stats */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Play className="h-4 w-4" />
                  <span>{module.reels.length} reels</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(getTotalDuration(module.reels))}</span>
                </div>
              </div>

              {/* Reels Grid */}
              <div className="grid gap-3 min-h-[120px] p-4 border-2 border-dashed rounded-lg border-muted-foreground/25 bg-muted/25">
                {module.reels.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">
                      {isPreviewMode ? 'No reels in this module' : 'Drag reels here or click to add'}
                    </p>
                    {!isPreviewMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          console.log('Open reel selector')
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Reels
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {module.reels.map((reel) => (
                      <div
                        key={reel.id}
                        className="group relative bg-card border rounded-lg p-3 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-16 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            <Play className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{reel.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {reel.description}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatDuration(reel.duration)}
                              </span>
                              {reel.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {!isPreviewMode && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => onRemoveReelFromModule(module.id, reel.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Module Actions */}
              {!isPreviewMode && editingModule === module.id && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
                  <div>
                    <label className="text-sm font-medium">Module Title</label>
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => onUpdateModule(module.id, { title: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      value={module.description}
                      onChange={(e) => onUpdateModule(module.id, { description: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
                      rows={2}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingModule(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Module Button */}
        {!isPreviewMode && (
          <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
            <CardContent className="p-8 text-center">
              <Button
                variant="outline"
                onClick={handleAddModule}
                className="btn-hover"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Module
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
