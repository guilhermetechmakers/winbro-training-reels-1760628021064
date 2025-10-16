import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  BookOpen, 
  ArrowLeft,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { QuizProvider, useQuiz } from '@/contexts/QuizContext'
import { QuizDisplay } from '@/components/quiz/QuizDisplay'
import { FeedbackPanel } from '@/components/quiz/FeedbackPanel'
import { toast } from 'sonner'
import type { Quiz, Course } from '@/types'

// Mock quiz data for demonstration
const mockQuiz: Quiz = {
  id: 'quiz-1',
  title: 'Machine Safety Quiz',
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What is the first step when approaching a machine for maintenance?',
      options: [
        'Start the machine immediately',
        'Lock out and tag out the machine',
        'Check if anyone else is using it',
        'Clean the machine first'
      ],
      correctAnswer: 'Lock out and tag out the machine',
      explanation: 'Lock out/tag out (LOTO) procedures must always be followed before any maintenance work.',
      points: 10,
      reelTimestamp: 15
    },
    {
      id: 'q2',
      type: 'true-false',
      question: 'It is safe to remove safety guards while the machine is running if you are careful.',
      correctAnswer: 'false',
      explanation: 'Safety guards should never be removed while the machine is running, regardless of how careful you are.',
      points: 10
    },
    {
      id: 'q3',
      type: 'short-answer',
      question: 'What does PPE stand for?',
      correctAnswer: 'Personal Protective Equipment',
      explanation: 'PPE refers to equipment worn to minimize exposure to hazards.',
      points: 10
    }
  ],
  passingScore: 70,
  timeLimit: 10, // 10 minutes
  attempts: 3,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

function QuizContent() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { state, startQuiz, resetQuiz } = useQuiz()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load course and quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real app, you would fetch the course and quiz from the API
        // For now, we'll use mock data
        const mockCourse: Course = {
          id: courseId || 'course-1',
          title: 'Machine Safety Training',
          description: 'Comprehensive safety training for machine operators',
          thumbnail: '/api/placeholder/400/300',
          modules: [],
          completionRules: {
            requireAllReels: true,
            requiredReelPercentage: 100,
            requireQuiz: true,
            passingScore: 70
          },
          assignedTo: [],
          createdBy: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'published',
          estimatedDuration: 30,
          difficulty: 'beginner'
        }

        setCourse(mockCourse)
        
        // Start the quiz
        startQuiz(mockQuiz)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz')
        toast.error('Failed to load quiz')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuiz()
  }, [courseId, startQuiz])

  const handleQuizComplete = (passed: boolean, score: number) => {
    if (passed) {
      toast.success(`Congratulations! You passed with ${score}%`)
    } else {
      toast.error(`Quiz not passed. You scored ${score}%`)
    }
  }

  const handleRetake = () => {
    resetQuiz()
    startQuiz(mockQuiz)
  }

  const handleDownloadCertificate = async () => {
    try {
      // In a real app, this would download the actual certificate
      toast.success('Certificate download started')
    } catch (error) {
      toast.error('Failed to download certificate')
    }
  }

  const handleBackToCourse = () => {
    navigate(`/courses/${courseId}`)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center animate-pulse">
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Loading Quiz...</h3>
                  <p className="text-muted-foreground">Please wait while we prepare your quiz</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="animate-fade-in border-destructive">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-destructive">Error</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
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
              onClick={() => navigate(-1)}
              className="btn-hover"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Quiz Assessment</h1>
              <p className="text-muted-foreground">
                {course?.title || 'Course Quiz'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>Course Quiz</span>
            </Badge>
            {state.currentQuiz?.timeLimit && (
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{state.currentQuiz.timeLimit} min</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Quiz Content */}
        {state.isSubmitted && state.attempt ? (
          <FeedbackPanel
            attempt={state.attempt}
            passingScore={state.currentQuiz?.passingScore || 70}
            onRetake={handleRetake}
            onDownloadCertificate={state.attempt.passed ? handleDownloadCertificate : undefined}
            onBackToCourse={handleBackToCourse}
          />
        ) : (
          <QuizDisplay onComplete={handleQuizComplete} />
        )}
      </div>
    </DashboardLayout>
  )
}

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizContent />
    </QuizProvider>
  )
}