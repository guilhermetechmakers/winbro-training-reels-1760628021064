import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Plus, 
  Save, 
  Eye, 
  Settings, 
  Play,
  Clock,
  Award,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner'
import { CourseCanvas } from '@/components/course/CourseCanvas'
import { QuizEditor } from '@/components/course/QuizEditor'
import { CourseSettings } from '@/components/course/CourseSettings'
import { useCourseBuilder } from '@/hooks/useCourseBuilder'

export default function CourseBuilderPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('modules')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const {
    course,
    isLoading,
    isSaving,
    saveCourse,
    publishCourse,
    addModule,
    updateModule,
    deleteModule,
    reorderModules,
    addReelToModule,
    removeReelFromModule,
    updateQuiz,
    updateSettings
  } = useCourseBuilder(courseId)

  // Initialize course if it doesn't exist
  const currentCourse = course || {
    id: courseId || `course-${Date.now()}`,
    title: 'Untitled Course',
    description: '',
    thumbnail: '',
    modules: [],
    completionRules: {
      requireAllReels: true,
      requiredReelPercentage: 100,
      requireQuiz: false,
      passingScore: 70,
    },
    assignedTo: [],
    createdBy: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft' as const,
    estimatedDuration: 0,
    difficulty: 'beginner' as const,
  }

  const handleSave = async () => {
    try {
      await saveCourse()
      toast.success('Course saved successfully')
    } catch (error) {
      toast.error('Failed to save course')
    }
  }

  const handlePublish = async () => {
    try {
      await publishCourse()
      toast.success('Course published successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Failed to publish course')
    }
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {course ? 'Edit Course' : 'Create New Course'}
              </h1>
              <p className="text-muted-foreground">
                Build structured training courses with video reels and quizzes
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="btn-hover"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="btn-hover"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={currentCourse.modules.length === 0}
              className="btn-hover"
            >
              <Play className="h-4 w-4 mr-2" />
              Publish Course
            </Button>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Modules</p>
                  <p className="text-2xl font-bold">{currentCourse.modules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium">Reels</p>
                  <p className="text-2xl font-bold">
                    {currentCourse.modules.reduce((acc, module) => acc + module.reels.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-info" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-2xl font-bold">{currentCourse.estimatedDuration}m</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent-green" />
                <div>
                  <p className="text-sm font-medium">Difficulty</p>
                  <Badge variant="outline" className="capitalize">
                    {currentCourse.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Course Builder */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="modules" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Modules</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>Quiz</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-6">
                <CourseCanvas
                  course={currentCourse}
                  onAddModule={addModule}
                  onUpdateModule={updateModule}
                  onDeleteModule={deleteModule}
                  onReorderModules={reorderModules}
                  onAddReelToModule={addReelToModule}
                  onRemoveReelFromModule={removeReelFromModule}
                  isPreviewMode={isPreviewMode}
                />
              </TabsContent>

              <TabsContent value="quiz" className="space-y-6">
                <QuizEditor
                  quiz={currentCourse.quiz}
                  onUpdateQuiz={updateQuiz}
                  courseReels={currentCourse.modules.flatMap(m => m.reels)}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <CourseSettings
                  course={currentCourse}
                  onUpdateSettings={updateSettings}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Course Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge 
                    variant={currentCourse.status === 'published' ? 'default' : 'secondary'}
                    className="mt-1"
                  >
                    {currentCourse.status}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm">{new Date(currentCourse.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{new Date(currentCourse.updatedAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab('modules')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Module
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab('quiz')}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Course Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}