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
  AlertCircle
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
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Question {state.currentQuestionIndex + 1} of {totalQuestions}</span>
                <Badge variant="secondary">
                  {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                </Badge>
              </CardTitle>
              <CardDescription>
                {state.currentQuiz?.title || 'Course Quiz'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              {state.timeRemaining && (
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{timeRemainingFormatted}</span>
                </div>
              )}
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          {currentQuestion.reelTimestamp && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Play className="h-4 w-4" />
              <span>Reference: {formatDuration(currentQuestion.reelTimestamp)}</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Multiple Choice */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50",
                    selectedAnswer === option && "border-primary bg-primary/5"
                  )}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* True/False */}
          {currentQuestion.type === 'true-false' && (
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              <div
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50",
                  selectedAnswer === 'true' && "border-primary bg-primary/5"
                )}
              >
                <RadioGroupItem value="true" id="true" />
                <Label htmlFor="true" className="flex-1 cursor-pointer text-sm">
                  True
                </Label>
              </div>
              <div
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:bg-muted/50",
                  selectedAnswer === 'false' && "border-primary bg-primary/5"
                )}
              >
                <RadioGroupItem value="false" id="false" />
                <Label htmlFor="false" className="flex-1 cursor-pointer text-sm">
                  False
                </Label>
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
