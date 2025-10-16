import { z } from 'zod'

// Quiz Question Types
export const quizQuestionTypeSchema = z.enum(['multiple-choice', 'true-false', 'short-answer'])

// Quiz Question Schema
export const quizQuestionSchema = z.object({
  id: z.string(),
  type: quizQuestionTypeSchema,
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  points: z.number().min(1, 'Points must be at least 1'),
  reelTimestamp: z.number().optional(),
})

// Quiz Schema
export const quizSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(quizQuestionSchema).min(1, 'At least one question is required'),
  passingScore: z.number().min(0).max(100, 'Passing score must be between 0 and 100'),
  timeLimit: z.number().min(0).optional(),
  attempts: z.number().min(1, 'At least 1 attempt is required'),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Quiz Attempt Schema
export const quizAttemptSchema = z.object({
  id: z.string(),
  answers: z.record(z.any()),
  score: z.number().min(0).max(100),
  passed: z.boolean(),
  completedAt: z.string(),
  timeSpent: z.number().min(0),
})

// Certificate Schema
export const certificateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  courseTitle: z.string(),
  issuedAt: z.string(),
  expiresAt: z.string().optional(),
  verificationUrl: z.string().url(),
  pdfUrl: z.string().url(),
  qrCode: z.string(),
})

// Quiz Submission Schema
export const quizSubmissionSchema = z.object({
  answers: z.record(z.any()),
  timeSpent: z.number().min(0).optional(),
})

// Quiz Creation Schema
export const createQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(quizQuestionSchema).min(1, 'At least one question is required'),
  passingScore: z.number().min(0).max(100, 'Passing score must be between 0 and 100'),
  timeLimit: z.number().min(0).optional(),
  attempts: z.number().min(1, 'At least 1 attempt is required'),
})

// Quiz Update Schema
export const updateQuizSchema = createQuizSchema.partial()

// Course Progress Schema
export const courseProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  moduleProgress: z.array(z.object({
    moduleId: z.string(),
    reelsWatched: z.array(z.string()),
    completedAt: z.string().optional(),
  })),
  quizAttempts: z.array(quizAttemptSchema),
  completedAt: z.string().optional(),
  certificateId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

// Validation Functions
export const validateQuiz = (data: unknown) => {
  return quizSchema.parse(data)
}

export const validateQuizSubmission = (data: unknown) => {
  return quizSubmissionSchema.parse(data)
}

export const validateQuizAttempt = (data: unknown) => {
  return quizAttemptSchema.parse(data)
}

export const validateCertificate = (data: unknown) => {
  return certificateSchema.parse(data)
}

// Type exports
export type QuizQuestionType = z.infer<typeof quizQuestionTypeSchema>
export type QuizQuestion = z.infer<typeof quizQuestionSchema>
export type Quiz = z.infer<typeof quizSchema>
export type QuizAttempt = z.infer<typeof quizAttemptSchema>
export type Certificate = z.infer<typeof certificateSchema>
export type QuizSubmission = z.infer<typeof quizSubmissionSchema>
export type CreateQuiz = z.infer<typeof createQuizSchema>
export type UpdateQuiz = z.infer<typeof updateQuizSchema>
export type CourseProgress = z.infer<typeof courseProgressSchema>
