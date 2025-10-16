import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Play,
  AlertCircle,
  Timer,
  Target,
  BookOpen
} from 'lucide-react'
import { useQuiz } from '@/contexts/QuizContext'
import { cn } from '@/lib/utils'

interface QuizDisplayProps {
  onComplete?: (passed: boolean, score: number) => void
}

export function QuizDisplay({ onComplete }: QuizDisplayProps) {
  const {
    state,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    isFirstQuestion,
    hasAnsweredAll,
    timeRemainingFormatted,
    goToNextQuestion,
    goToPreviousQuestion,
    setAnswer,
    submitQuiz,
  } = useQuiz()

  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [shortAnswer, setShortAnswer] = useState('')

  // Update selected answer when question changes
  useEffect(() => {
    if (currentQuestion) {
      const currentAnswer = state.answers[currentQuestion.id]
      setSelectedAnswer(currentAnswer)
      setShortAnswer(currentAnswer || '')
    }
  }, [currentQuestion, state.answers])

  // Timer effect
  useEffect(() => {
    if (state.timeRemaining && state.timeRemaining > 0) {
      const timer = setInterval(() => {
        const newTime = state.timeRemaining! - 1
        if (newTime <= 0) {
          // Time's up - auto submit
          handleSubmit()
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [state.timeRemaining])

  const handleAnswerChange = (answer: any) => {
    if (!currentQuestion) return
    
    setSelectedAnswer(answer)
    setAnswer(currentQuestion.id, answer)
  }

  const handleShortAnswerChange = (value: string) => {
    if (!currentQuestion) return
    
    setShortAnswer(value)
    setAnswer(currentQuestion.id, value)
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      goToNextQuestion()
    }
  }

  const handlePrevious = () => {
    goToPreviousQuestion()
  }

  const handleSubmit = async () => {
    await submitQuiz(state.answers)
    if (onComplete && state.attempt) {
      onComplete(state.attempt.passed, state.attempt.score)
    }
  }

  if (state.isLoading) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center animate-pulse">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Submitting Quiz...</h3>
              <p className="text-muted-foreground">Please wait while we process your answers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (state.error) {
    return (
      <Card className="animate-fade-in border-destructive">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-destructive">Error</h3>
              <p className="text-muted-foreground">{state.error}</p>
            </div>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQuestion) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Quiz Available</h3>
              <p className="text-muted-foreground">There are no questions in this quiz</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quiz Header */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center space-x-3 text-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="gradient-text">Question {state.currentQuestionIndex + 1} of {totalQuestions}</span>
                  <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary hover:bg-primary/20">
                    {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription className="text-base">
                {state.currentQuiz?.title || 'Course Quiz'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-6">
              {state.timeRemaining && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <Timer className="h-4 w-4 text-amber-600" />
                  <span className="font-mono text-amber-800 dark:text-amber-200 font-semibold">
                    {timeRemainingFormatted}
                  </span>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{state.currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <Progress 
              value={progress} 
              className="w-full h-3 bg-muted/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
        <CardHeader className="pb-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl leading-relaxed text-foreground">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.reelTimestamp && (
                  <div className="flex items-center space-x-2 mt-3 px-3 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Play className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Reference: {formatDuration(currentQuestion.reelTimestamp)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-0">
          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "group flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
                    selectedAnswer === option 
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]" 
                      : "border-muted hover:border-primary/50 hover:bg-muted/30"
                  )}
                >
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="w-5 h-5 text-primary"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-base font-medium leading-relaxed group-hover:text-primary transition-colors"
                  >
                    {option}
                  </Label>
                  {selectedAnswer === option && (
                    <CheckCircle className="h-5 w-5 text-primary animate-bounce-in" />
                  )}
                </div>
              ))}
            </RadioGroup>
          )}

          {/* True/False */}
          {currentQuestion.type === 'true-false' && (
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              <div
                className={cn(
                  "group flex items-center space-x-4 p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
                  selectedAnswer === 'true' 
                    ? "border-green-500 bg-green-50 dark:bg-green-950/20 shadow-md scale-[1.02]" 
                    : "border-muted hover:border-green-500/50 hover:bg-green-50/30"
                )}
              >
                <RadioGroupItem value="true" id="true" className="w-5 h-5 text-green-600" />
                <Label htmlFor="true" className="flex-1 cursor-pointer text-lg font-semibold group-hover:text-green-600 transition-colors">
                  True
                </Label>
                {selectedAnswer === 'true' && (
                  <CheckCircle className="h-6 w-6 text-green-600 animate-bounce-in" />
                )}
              </div>
              <div
                className={cn(
                  "group flex items-center space-x-4 p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer",
                  selectedAnswer === 'false' 
                    ? "border-red-500 bg-red-50 dark:bg-red-950/20 shadow-md scale-[1.02]" 
                    : "border-muted hover:border-red-500/50 hover:bg-red-50/30"
                )}
              >
                <RadioGroupItem value="false" id="false" className="w-5 h-5 text-red-600" />
                <Label htmlFor="false" className="flex-1 cursor-pointer text-lg font-semibold group-hover:text-red-600 transition-colors">
                  False
                </Label>
                {selectedAnswer === 'false' && (
                  <CheckCircle className="h-6 w-6 text-red-600 animate-bounce-in" />
                )}
              </div>
            </RadioGroup>
          )}

          {/* Short Answer */}
          {currentQuestion.type === 'short-answer' && (
            <div className="space-y-2">
              <Label htmlFor="short-answer">Your Answer</Label>
              <Input
                id="short-answer"
                value={shortAnswer}
                onChange={(e) => handleShortAnswerChange(e.target.value)}
                placeholder="Enter your answer here..."
                className="input-focus"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="btn-hover"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {!isLastQuestion && (
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer && currentQuestion.type !== 'short-answer'}
                  className="btn-hover"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              
              {isLastQuestion && (
                <Button
                  onClick={handleSubmit}
                  disabled={!hasAnsweredAll}
                  className="btn-hover bg-primary hover:bg-primary/90"
                >
                  Submit Quiz
                  <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
