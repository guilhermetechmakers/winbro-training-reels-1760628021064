import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Quiz, QuizQuestion, QuizAttempt } from '@/types'

// Quiz State Types
interface QuizState {
  currentQuiz: Quiz | null
  currentQuestionIndex: number
  answers: Record<string, any>
  timeRemaining: number | null
  isSubmitted: boolean
  attempt: QuizAttempt | null
  isLoading: boolean
  error: string | null
}

// Quiz Actions
type QuizAction =
  | { type: 'SET_QUIZ'; payload: Quiz }
  | { type: 'SET_QUESTION_INDEX'; payload: number }
  | { type: 'SET_ANSWER'; payload: { questionId: string; answer: any } }
  | { type: 'SET_TIME_REMAINING'; payload: number | null }
  | { type: 'SUBMIT_QUIZ'; payload: QuizAttempt }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_QUIZ' }

// Initial State
const initialState: QuizState = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: null,
  isSubmitted: false,
  attempt: null,
  isLoading: false,
  error: null,
}

// Quiz Reducer
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUIZ':
      return {
        ...state,
        currentQuiz: action.payload,
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: action.payload.timeLimit ? action.payload.timeLimit * 60 : null,
        isSubmitted: false,
        attempt: null,
        error: null,
      }
    
    case 'SET_QUESTION_INDEX':
      return {
        ...state,
        currentQuestionIndex: action.payload,
      }
    
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.answer,
        },
      }
    
    case 'SET_TIME_REMAINING':
      return {
        ...state,
        timeRemaining: action.payload,
      }
    
    case 'SUBMIT_QUIZ':
      return {
        ...state,
        isSubmitted: true,
        attempt: action.payload,
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      }
    
    case 'RESET_QUIZ':
      return initialState
    
    default:
      return state
  }
}

// Context Type
interface QuizContextType {
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
  
  // Helper functions
  startQuiz: (quiz: Quiz) => void
  goToQuestion: (index: number) => void
  goToNextQuestion: () => void
  goToPreviousQuestion: () => void
  setAnswer: (questionId: string, answer: any) => void
  submitQuiz: (answers: Record<string, any>) => Promise<void>
  resetQuiz: () => void
  
  // Computed values
  currentQuestion: QuizQuestion | null
  totalQuestions: number
  progress: number
  isLastQuestion: boolean
  isFirstQuestion: boolean
  hasAnsweredAll: boolean
  timeRemainingFormatted: string
}

// Create Context
const QuizContext = createContext<QuizContextType | undefined>(undefined)

// Provider Component
interface QuizProviderProps {
  children: ReactNode
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // Helper functions
  const startQuiz = (quiz: Quiz) => {
    dispatch({ type: 'SET_QUIZ', payload: quiz })
  }

  const goToQuestion = (index: number) => {
    if (state.currentQuiz && index >= 0 && index < state.currentQuiz.questions.length) {
      dispatch({ type: 'SET_QUESTION_INDEX', payload: index })
    }
  }

  const goToNextQuestion = () => {
    if (state.currentQuiz && state.currentQuestionIndex < state.currentQuiz.questions.length - 1) {
      dispatch({ type: 'SET_QUESTION_INDEX', payload: state.currentQuestionIndex + 1 })
    }
  }

  const goToPreviousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: 'SET_QUESTION_INDEX', payload: state.currentQuestionIndex - 1 })
    }
  }

  const setAnswer = (questionId: string, answer: any) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, answer } })
  }

  const submitQuiz = async (answers: Record<string, any>) => {
    if (!state.currentQuiz) return

    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Calculate score
      let totalPoints = 0
      let earnedPoints = 0

      state.currentQuiz.questions.forEach(question => {
        totalPoints += question.points
        const userAnswer = answers[question.id]
        
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          if (userAnswer === question.correctAnswer) {
            earnedPoints += question.points
          }
        } else if (question.type === 'short-answer') {
          // Simple string matching for short answers (could be enhanced with fuzzy matching)
          if (userAnswer && typeof question.correctAnswer === 'string' &&
              question.correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim()) {
            earnedPoints += question.points
          }
        }
      })

      const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
      const passed = score >= state.currentQuiz.passingScore

      const attempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        answers,
        score,
        passed,
        completedAt: new Date().toISOString(),
        timeSpent: state.currentQuiz.timeLimit ? 
          (state.currentQuiz.timeLimit * 60) - (state.timeRemaining || 0) : 0,
      }

      dispatch({ type: 'SUBMIT_QUIZ', payload: attempt })
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to submit quiz' 
      })
    }
  }

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' })
  }

  // Computed values
  const currentQuestion = state.currentQuiz?.questions[state.currentQuestionIndex] || null
  const totalQuestions = state.currentQuiz?.questions.length || 0
  const progress = totalQuestions > 0 ? ((state.currentQuestionIndex + 1) / totalQuestions) * 100 : 0
  const isLastQuestion = state.currentQuestionIndex === totalQuestions - 1
  const isFirstQuestion = state.currentQuestionIndex === 0
  const hasAnsweredAll = state.currentQuiz ? 
    state.currentQuiz.questions.every(q => state.answers[q.id] !== undefined) : false

  const timeRemainingFormatted = state.timeRemaining ? 
    `${Math.floor(state.timeRemaining / 60)}:${(state.timeRemaining % 60).toString().padStart(2, '0')}` : 
    'No time limit'

  const value: QuizContextType = {
    state,
    dispatch,
    startQuiz,
    goToQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    setAnswer,
    submitQuiz,
    resetQuiz,
    currentQuestion,
    totalQuestions,
    progress,
    isLastQuestion,
    isFirstQuestion,
    hasAnsweredAll,
    timeRemainingFormatted,
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}

// Hook to use quiz context
export function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
