import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Plus, 
  Trash2, 
  Edit, 
  Clock,
  Award,
  Play,
  CheckCircle,
  XCircle
} from 'lucide-react'
import type { Quiz, QuizQuestion, Reel } from '@/types'
import { cn } from '@/lib/utils'

interface QuizEditorProps {
  quiz?: Quiz
  onUpdateQuiz: (quiz: Quiz) => void
  courseReels: Reel[]
}

export function QuizEditor({ quiz, onUpdateQuiz }: QuizEditorProps) {
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)
  const [newQuestion, setNewQuestion] = useState<Partial<QuizQuestion>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    points: 1,
  })

  const handleAddQuestion = () => {
    if (!quiz) {
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: 'Course Quiz',
        questions: [],
        passingScore: 70,
        timeLimit: 30,
        attempts: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      onUpdateQuiz(newQuiz)
      return
    }

    const question: QuizQuestion = {
      id: `question-${Date.now()}`,
      type: newQuestion.type as 'multiple-choice' | 'true-false' | 'short-answer',
      question: newQuestion.question || '',
      options: newQuestion.options || [],
      correctAnswer: newQuestion.correctAnswer || '',
      explanation: newQuestion.explanation || '',
      points: newQuestion.points || 1,
      reelTimestamp: newQuestion.reelTimestamp,
    }

    const updatedQuiz = {
      ...quiz,
      questions: [...quiz.questions, question],
      updatedAt: new Date().toISOString(),
    }

    onUpdateQuiz(updatedQuiz)
    setNewQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 1,
    })
  }

  const handleUpdateQuestion = (questionId: string, updates: Partial<QuizQuestion>) => {
    if (!quiz) return

    const updatedQuestions = quiz.questions.map(q =>
      q.id === questionId ? { ...q, ...updates } : q
    )

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      updatedAt: new Date().toISOString(),
    }

    onUpdateQuiz(updatedQuiz)
  }

  const handleDeleteQuestion = (questionId: string) => {
    if (!quiz) return

    const updatedQuestions = quiz.questions.filter(q => q.id !== questionId)

    const updatedQuiz = {
      ...quiz,
      questions: updatedQuestions,
      updatedAt: new Date().toISOString(),
    }

    onUpdateQuiz(updatedQuiz)
  }

  const handleUpdateQuizSettings = (updates: Partial<Quiz>) => {
    if (!quiz) return

    const updatedQuiz = {
      ...quiz,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    onUpdateQuiz(updatedQuiz)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!quiz) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Quiz Created Yet</h3>
              <p className="text-muted-foreground">
                Create a quiz to test learners' understanding of the course material
              </p>
            </div>
            <Button onClick={handleAddQuestion} className="btn-hover">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Quiz Settings</span>
          </CardTitle>
          <CardDescription>
            Configure the quiz parameters and requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input
                id="quiz-title"
                value={quiz.title}
                onChange={(e) => handleUpdateQuizSettings({ title: e.target.value })}
                className="input-focus"
              />
            </div>
            <div>
              <Label htmlFor="passing-score">Passing Score (%)</Label>
              <Input
                id="passing-score"
                type="number"
                min="0"
                max="100"
                value={quiz.passingScore}
                onChange={(e) => handleUpdateQuizSettings({ passingScore: parseInt(e.target.value) || 0 })}
                className="input-focus"
              />
            </div>
            <div>
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input
                id="time-limit"
                type="number"
                min="0"
                value={quiz.timeLimit || 0}
                onChange={(e) => handleUpdateQuizSettings({ timeLimit: parseInt(e.target.value) || 0 })}
                className="input-focus"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {quiz.timeLimit ? `${quiz.timeLimit} minutes` : 'No time limit'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {quiz.passingScore}% to pass
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {quiz.questions.length} questions
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Questions</h3>
          <Badge variant="secondary">
            {quiz.questions.length} questions
          </Badge>
        </div>

        {quiz.questions.map((question, index) => (
          <Card key={question.id} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">Q{index + 1}</Badge>
                  <div>
                    <CardTitle className="text-base">{question.question}</CardTitle>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant="secondary" className="capitalize">
                        {question.type.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {question.points} point{question.points !== 1 ? 's' : ''}
                      </span>
                      {question.reelTimestamp && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Play className="h-3 w-3" />
                          <span>{formatDuration(question.reelTimestamp)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingQuestion(editingQuestion === question.id ? null : question.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Question Preview */}
              <div className="space-y-3">
                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={cn(
                          "flex items-center space-x-2 p-2 rounded border",
                          option === question.correctAnswer
                            ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                            : "border-muted"
                        )}
                      >
                        {option === question.correctAnswer ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="space-y-2">
                    <div className={cn(
                      "flex items-center space-x-2 p-2 rounded border",
                      question.correctAnswer === 'true'
                        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                        : "border-muted"
                    )}>
                      {question.correctAnswer === 'true' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">True</span>
                    </div>
                    <div className={cn(
                      "flex items-center space-x-2 p-2 rounded border",
                      question.correctAnswer === 'false'
                        ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950"
                        : "border-muted"
                    )}>
                      {question.correctAnswer === 'false' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm">False</span>
                    </div>
                  </div>
                )}

                {question.type === 'short-answer' && (
                  <div className="p-2 border rounded bg-muted/50">
                    <span className="text-sm text-muted-foreground">
                      Correct answer: {question.correctAnswer}
                    </span>
                  </div>
                )}

                {question.explanation && (
                  <div className="p-3 bg-muted/50 rounded">
                    <p className="text-sm text-muted-foreground">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Edit Form */}
              {editingQuestion === question.id && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-4">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={question.question}
                      onChange={(e) => handleUpdateQuestion(question.id, { question: e.target.value })}
                      className="input-focus"
                    />
                  </div>

                  <div>
                    <Label>Question Type</Label>
                    <select
                      value={question.type}
                      onChange={(e) => handleUpdateQuestion(question.id, { 
                        type: e.target.value as 'multiple-choice' | 'true-false' | 'short-answer',
                        options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : undefined
                      })}
                      className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
                    >
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="true-false">True/False</option>
                      <option value="short-answer">Short Answer</option>
                    </select>
                  </div>

                  {question.type === 'multiple-choice' && (
                    <div>
                      <Label>Options</Label>
                      <div className="space-y-2">
                        {question.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(question.options || [])]
                                newOptions[index] = e.target.value
                                handleUpdateQuestion(question.id, { options: newOptions })
                              }}
                              className="input-focus"
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newOptions = question.options?.filter((_, i) => i !== index) || []
                                handleUpdateQuestion(question.id, { options: newOptions })
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newOptions = [...(question.options || []), '']
                            handleUpdateQuestion(question.id, { options: newOptions })
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Correct Answer</Label>
                    {question.type === 'multiple-choice' ? (
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => handleUpdateQuestion(question.id, { correctAnswer: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
                      >
                        <option value="">Select correct answer</option>
                        {question.options?.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : question.type === 'true-false' ? (
                      <select
                        value={question.correctAnswer}
                        onChange={(e) => handleUpdateQuestion(question.id, { correctAnswer: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-md input-focus"
                      >
                        <option value="">Select correct answer</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    ) : (
                      <Input
                        value={question.correctAnswer}
                        onChange={(e) => handleUpdateQuestion(question.id, { correctAnswer: e.target.value })}
                        className="input-focus"
                        placeholder="Enter correct answer"
                      />
                    )}
                  </div>

                  <div>
                    <Label>Explanation (optional)</Label>
                    <Input
                      value={question.explanation || ''}
                      onChange={(e) => handleUpdateQuestion(question.id, { explanation: e.target.value })}
                      className="input-focus"
                      placeholder="Explain why this is the correct answer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label>Points</Label>
                      <Input
                        type="number"
                        min="1"
                        value={question.points}
                        onChange={(e) => handleUpdateQuestion(question.id, { points: parseInt(e.target.value) || 1 })}
                        className="w-20 input-focus"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setEditingQuestion(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add Question Button */}
        <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
          <CardContent className="p-8 text-center">
            <Button
              variant="outline"
              onClick={handleAddQuestion}
              className="btn-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
