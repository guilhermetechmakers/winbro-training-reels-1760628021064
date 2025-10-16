import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Users, 
  Clock, 
  Award,
  Target,
  CheckCircle
} from 'lucide-react'
import type { Course, CompletionRules } from '@/types'

interface CourseSettingsProps {
  course?: Course | null
  onUpdateSettings: (settings: Partial<Course>) => void
}

export function CourseSettings({ course, onUpdateSettings }: CourseSettingsProps) {

  const handleUpdateField = (field: string, value: any) => {
    onUpdateSettings({ [field]: value })
  }

  const handleUpdateCompletionRules = (rules: Partial<CompletionRules>) => {
    if (!course) return
    
    const updatedRules = {
      ...course.completionRules,
      ...rules,
    }
    
    onUpdateSettings({ completionRules: updatedRules })
  }

  if (!course) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Course Created Yet</h3>
              <p className="text-muted-foreground">
                Create a course first to configure its settings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Basic Settings</span>
          </CardTitle>
          <CardDescription>
            Configure the basic information for your course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                value={course.title || ''}
                onChange={(e) => handleUpdateField('title', e.target.value)}
                className="input-focus"
                placeholder="Enter course title"
              />
            </div>
            <div>
              <Label htmlFor="course-difficulty">Difficulty Level</Label>
              <select
                id="course-difficulty"
                value={course.difficulty || 'beginner'}
                onChange={(e) => handleUpdateField('difficulty', e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="course-description">Description</Label>
            <textarea
              id="course-description"
              value={course.description || ''}
              onChange={(e) => handleUpdateField('description', e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
              rows={3}
              placeholder="Enter course description"
            />
          </div>
        </CardContent>
      </Card>

      {/* Completion Rules */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Completion Rules</span>
          </CardTitle>
          <CardDescription>
            Define what learners need to do to complete the course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Require All Reels</h4>
                  <p className="text-sm text-muted-foreground">
                    Learners must watch all reels in the course
                  </p>
                </div>
              </div>
              <Button
                variant={course.completionRules.requireAllReels ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateCompletionRules({ requireAllReels: !course.completionRules.requireAllReels })}
              >
                {course.completionRules.requireAllReels ? "Required" : "Optional"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Required Reel Percentage</h4>
                  <p className="text-sm text-muted-foreground">
                    Minimum percentage of reels that must be watched
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={course.completionRules.requiredReelPercentage}
                  onChange={(e) => handleUpdateCompletionRules({ requiredReelPercentage: parseInt(e.target.value) || 0 })}
                  className="w-20 input-focus"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Require Quiz</h4>
                  <p className="text-sm text-muted-foreground">
                    Learners must pass the quiz to complete the course
                  </p>
                </div>
              </div>
              <Button
                variant={course.completionRules.requireQuiz ? "default" : "outline"}
                size="sm"
                onClick={() => handleUpdateCompletionRules({ requireQuiz: !course.completionRules.requireQuiz })}
              >
                {course.completionRules.requireQuiz ? "Required" : "Optional"}
              </Button>
            </div>

            {course.completionRules.requireQuiz && (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Passing Score</h4>
                    <p className="text-sm text-muted-foreground">
                      Minimum score required to pass the quiz
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={course.completionRules.passingScore}
                    onChange={(e) => handleUpdateCompletionRules({ passingScore: parseInt(e.target.value) || 0 })}
                    className="w-20 input-focus"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Settings */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Assignment Settings</span>
          </CardTitle>
          <CardDescription>
            Configure who can access this course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="assigned-to">Assigned To</Label>
            <div className="mt-2 space-y-2">
              {course.assignedTo.length === 0 ? (
                <p className="text-sm text-muted-foreground">No assignments yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {course.assignedTo.map((userId) => (
                    <Badge key={userId} variant="secondary">
                      User {userId}
                    </Badge>
                  ))}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // This would open a user selection modal
                  console.log('Open user selector')
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign Users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Status */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Course Status</span>
          </CardTitle>
          <CardDescription>
            Current status and metadata for this course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <div className="mt-1">
                <Badge 
                  variant={course.status === 'published' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {course.status}
                </Badge>
              </div>
            </div>
            <div>
              <Label>Estimated Duration</Label>
              <div className="mt-1 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{course.estimatedDuration} minutes</span>
              </div>
            </div>
            <div>
              <Label>Created</Label>
              <div className="mt-1">
                <span className="text-sm text-muted-foreground">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div>
              <Label>Last Updated</Label>
              <div className="mt-1">
                <span className="text-sm text-muted-foreground">
                  {new Date(course.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
