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
  BookOpen,
  RotateCcw
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
      <Card className="animate-fade-in border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <Clock className="h-10 w-10 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold gradient-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Submitting Quiz...
              </h3>
              <p className="text-lg text-muted-foreground">Please wait while we process your answers</p>
            </div>
            <div className="w-64 mx-auto">
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (state.error) {
    return (
      <Card className="animate-fade-in border-destructive border-2 bg-gradient-to-br from-destructive/5 to-destructive/10 backdrop-blur-sm shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-destructive">Error Submitting Quiz</h3>
              <p className="text-lg text-muted-foreground">{state.error}</p>
            </div>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="btn-hover border-2 hover:border-destructive/50 hover:bg-destructive/5 group-hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQuestion) {
    return (
      <Card className="animate-fade-in border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-muted/20 rounded-full flex items-center justify-center shadow-lg">
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">No Quiz Available</h3>
              <p className="text-lg text-muted-foreground">There are no questions in this quiz</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Quiz Header */}
      <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <CardTitle className="flex items-center space-x-4 text-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <BookOpen className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-500" />
                </div>
                <div>
                  <span className="gradient-text bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent text-2xl font-bold">
                    Question {state.currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <Badge 
                    variant="secondary" 
                    className="ml-4 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription className="text-lg group-hover:text-foreground/80 transition-colors duration-500">
                {state.currentQuiz?.title || 'Course Quiz'}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-6">
              {state.timeRemaining && (
                <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl border-2 border-amber-200 dark:border-amber-800 group-hover:scale-105 transition-all duration-300">
                  <Timer className="h-5 w-5 text-amber-600 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-mono text-amber-800 dark:text-amber-200 font-bold text-lg">
                    {timeRemainingFormatted}
                  </span>
                </div>
              )}
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-primary group-hover:text-secondary transition-colors duration-500">{Math.round(progress)}%</div>
                <div className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">Complete</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium group-hover:text-foreground/80 transition-colors duration-500">
              <span>Progress</span>
              <span>{state.currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <Progress 
              value={progress} 
              className="w-full h-3 bg-muted/50 group-hover:h-4 transition-all duration-300"
            />
          </div>
        </CardContent>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        </div>
      </Card>

      {/* Enhanced Question */}
      <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardHeader className="pb-6 relative z-10">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                <Target className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-500" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl leading-relaxed text-foreground group-hover:text-primary transition-colors duration-500 group-hover:scale-105 transition-transform duration-300">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.reelTimestamp && (
                  <div className="flex items-center space-x-3 mt-4 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800 group-hover:scale-105 transition-all duration-300">
                    <Play className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-base font-semibold text-blue-800 dark:text-blue-200">
                      Reference: {formatDuration(currentQuestion.reelTimestamp)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-0 relative z-10">
          {/* Enhanced Multiple Choice */}
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
                    "group flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer relative overflow-hidden",
                    selectedAnswer === option 
                      ? "border-primary bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl scale-[1.02] ring-2 ring-primary/20" 
                      : "border-muted hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300 relative z-10"
                  />
                  <Label 
                    htmlFor={`option-${index}`} 
                    className="flex-1 cursor-pointer text-lg font-medium leading-relaxed group-hover:text-primary transition-colors duration-300 relative z-10"
                  >
                    {option}
                  </Label>
                  {selectedAnswer === option && (
                    <CheckCircle className="h-6 w-6 text-primary animate-bounce-in group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  )}
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 right-2 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              ))}
            </RadioGroup>
          )}

          {/* Enhanced True/False */}
          {currentQuestion.type === 'true-false' && (
            <RadioGroup
              value={selectedAnswer || ''}
              onValueChange={handleAnswerChange}
              className="space-y-6"
            >
              <div
                className={cn(
                  "group flex items-center space-x-6 p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer relative overflow-hidden",
                  selectedAnswer === 'true' 
                    ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 shadow-xl scale-[1.02] ring-2 ring-green-500/20" 
                    : "border-muted hover:border-green-500/50 hover:bg-gradient-to-r hover:from-green-50/30 hover:to-emerald-50/30"
                )}
                style={{ transitionDelay: '100ms' }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <RadioGroupItem value="true" id="true" className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <Label htmlFor="true" className="flex-1 cursor-pointer text-xl font-bold group-hover:text-green-600 transition-colors duration-300 relative z-10">
                  True
                </Label>
                {selectedAnswer === 'true' && (
                  <CheckCircle className="h-7 w-7 text-green-600 animate-bounce-in group-hover:scale-110 transition-transform duration-300 relative z-10" />
                )}
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-green-500/60 rounded-full animate-ping" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
              <div
                className={cn(
                  "group flex items-center space-x-6 p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer relative overflow-hidden",
                  selectedAnswer === 'false' 
                    ? "border-red-500 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 shadow-xl scale-[1.02] ring-2 ring-red-500/20" 
                    : "border-muted hover:border-red-500/50 hover:bg-gradient-to-r hover:from-red-50/30 hover:to-rose-50/30"
                )}
                style={{ transitionDelay: '200ms' }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <RadioGroupItem value="false" id="false" className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <Label htmlFor="false" className="flex-1 cursor-pointer text-xl font-bold group-hover:text-red-600 transition-colors duration-300 relative z-10">
                  False
                </Label>
                {selectedAnswer === 'false' && (
                  <CheckCircle className="h-7 w-7 text-red-600 animate-bounce-in group-hover:scale-110 transition-transform duration-300 relative z-10" />
                )}
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-2 right-2 w-1 h-1 bg-red-500/60 rounded-full animate-ping" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-rose-500/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </RadioGroup>
          )}

          {/* Enhanced Short Answer */}
          {currentQuestion.type === 'short-answer' && (
            <div className="space-y-4">
              <Label htmlFor="short-answer" className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                Your Answer
              </Label>
              <Input
                id="short-answer"
                value={shortAnswer}
                onChange={(e) => handleShortAnswerChange(e.target.value)}
                placeholder="Enter your answer here..."
                className="h-12 text-lg input-focus group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Navigation */}
      <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-xl relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-105 transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Previous
            </Button>

            <div className="flex items-center space-x-3">
              {!isLastQuestion && (
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswer && currentQuestion.type !== 'short-answer'}
                  className="btn-hover border-2 hover:border-primary/50 hover:bg-primary/5 group-hover:scale-105 transition-all duration-300"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              )}
              
              {isLastQuestion && (
                <Button
                  onClick={handleSubmit}
                  disabled={!hasAnsweredAll}
                  className="btn-hover shadow-lg hover:shadow-xl group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                >
                  Submit Quiz
                  <CheckCircle className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 right-4 w-1 h-1 bg-primary/60 rounded-full animate-ping" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        </div>
      </Card>
    </div>
  )
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}
