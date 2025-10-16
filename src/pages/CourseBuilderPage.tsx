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
  ArrowLeft,
  Sparkles,
  Zap
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
        {/* Enhanced Header */}
        <div className="flex items-center justify-between animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-accent hover:scale-110 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold gradient-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {course ? 'Edit Course' : 'Create New Course'}
              </h1>
              <p className="text-lg text-muted-foreground">
                Build structured training courses with video reels and quizzes
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-105 transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={isSaving}
              className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-105 transition-all duration-300"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              )}
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={currentCourse.modules.length === 0}
              className="btn-hover shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Publish Course
            </Button>
          </div>
        </div>

        {/* Enhanced Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-stagger">
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <BookOpen className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Modules</p>
                  <p className="text-3xl font-bold group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                    {currentCourse.modules.length}
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
          
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <Play className="h-6 w-6 text-secondary group-hover:text-primary transition-colors duration-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Reels</p>
                  <p className="text-3xl font-bold group-hover:text-secondary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                    {currentCourse.modules.reduce((acc, module) => acc + module.reels.length, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
          
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <Clock className="h-6 w-6 text-blue-600 group-hover:text-cyan-600 transition-colors duration-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Duration</p>
                  <p className="text-3xl font-bold group-hover:text-blue-600 transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                    {currentCourse.estimatedDuration}m
                  </p>
                </div>
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-blue-500/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
          
          <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden cursor-pointer">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <Award className="h-6 w-6 text-yellow-600 group-hover:text-orange-600 transition-colors duration-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Difficulty</p>
                  <Badge 
                    variant="outline" 
                    className="capitalize group-hover:scale-110 transition-transform duration-300 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 group-hover:text-yellow-600"
                  >
                    {currentCourse.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-4 right-4 w-1 h-1 bg-yellow-500/60 rounded-full animate-ping" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Course Builder */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-card to-card/50 backdrop-blur-sm border-0 shadow-lg">
                <TabsTrigger 
                  value="modules" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white group-hover:scale-105 transition-all duration-300"
                >
                  <BookOpen className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Modules</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="quiz" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white group-hover:scale-105 transition-all duration-300"
                >
                  <Award className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Quiz</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/90 data-[state=active]:text-white group-hover:scale-105 transition-all duration-300"
                >
                  <Settings className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-6 animate-fade-in-up">
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

              <TabsContent value="quiz" className="space-y-6 animate-fade-in-up">
                <QuizEditor
                  quiz={currentCourse.quiz}
                  onUpdateQuiz={updateQuiz}
                  courseReels={currentCourse.modules.flatMap(m => m.reels)}
                />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 animate-fade-in-up">
                <CourseSettings
                  course={currentCourse}
                  onUpdateSettings={updateSettings}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Course Info */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Course Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Status</p>
                  <Badge 
                    variant={currentCourse.status === 'published' ? 'default' : 'secondary'}
                    className="mt-1 group-hover:scale-110 transition-transform duration-300"
                  >
                    {currentCourse.status}
                  </Badge>
                </div>
                
                <div className="group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '100ms' }}>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Created</p>
                  <p className="text-sm group-hover:text-foreground/90 transition-colors duration-300">{new Date(currentCourse.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="group-hover:scale-105 transition-transform duration-300" style={{ transitionDelay: '200ms' }}>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">Last Updated</p>
                  <p className="text-sm group-hover:text-foreground/90 transition-colors duration-300">{new Date(currentCourse.updatedAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>

            {/* Enhanced Quick Actions */}
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm relative overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-lg flex items-center space-x-2 group-hover:text-primary transition-colors duration-500">
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform duration-500" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <Button
                  variant="outline"
                  className="w-full justify-start btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => setActiveTab('modules')}
                >
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  Add Module
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => setActiveTab('quiz')}
                >
                  <Award className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Create Quiz
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start btn-hover group-hover:scale-105 transition-all duration-300 border-2 hover:border-primary/50 hover:bg-primary/5"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Course Settings
                </Button>
              </CardContent>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-4 right-4 w-1 h-1 bg-secondary/60 rounded-full animate-ping" />
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}