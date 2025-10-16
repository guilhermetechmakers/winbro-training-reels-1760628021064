import { z } from 'zod'

// Course schemas
export const courseModuleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Module title is required'),
  description: z.string().min(1, 'Module description is required'),
  reels: z.array(z.any()).default([]),
  order: z.number().min(0),
  prerequisites: z.array(z.string()).optional(),
})

export const completionRulesSchema = z.object({
  requireAllReels: z.boolean().default(true),
  requiredReelPercentage: z.number().min(0).max(100).default(100),
  requireQuiz: z.boolean().default(false),
  passingScore: z.number().min(0).max(100).default(70),
  timeLimit: z.number().min(0).optional(),
})

export const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Course title is required'),
  description: z.string().min(1, 'Course description is required'),
  thumbnail: z.string().optional(),
  modules: z.array(courseModuleSchema).default([]),
  completionRules: completionRulesSchema,
  assignedTo: z.array(z.string()).default([]),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  estimatedDuration: z.number().min(0).default(0),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
})

// Quiz schemas
export const quizQuestionSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['multiple-choice', 'true-false', 'short-answer']),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().optional(),
  points: z.number().min(1).default(1),
  reelTimestamp: z.number().optional(),
})

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(quizQuestionSchema).default([]),
  passingScore: z.number().min(0).max(100).default(70),
  timeLimit: z.number().min(0).optional(),
  attempts: z.number().min(1).default(3),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Form schemas
export const courseFormSchema = z.object({
  title: z.string().min(1, 'Course title is required'),
  description: z.string().min(1, 'Course description is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  modules: z.array(courseModuleSchema.omit({ id: true })),
  completionRules: completionRulesSchema,
  assignedTo: z.array(z.string()),
})

export const quizFormSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  passingScore: z.number().min(0).max(100),
  timeLimit: z.number().min(0).optional(),
  questions: z.array(quizQuestionSchema.omit({ id: true })),
})

export const moduleFormSchema = z.object({
  title: z.string().min(1, 'Module title is required'),
  description: z.string().min(1, 'Module description is required'),
  order: z.number().min(0),
  prerequisites: z.array(z.string()).optional(),
})

export const questionFormSchema = z.object({
  type: z.enum(['multiple-choice', 'true-false', 'short-answer']),
  question: z.string().min(1, 'Question is required'),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  explanation: z.string().optional(),
  points: z.number().min(1),
  reelTimestamp: z.number().optional(),
})

// Type exports
export type CourseFormData = z.infer<typeof courseFormSchema>
export type QuizFormData = z.infer<typeof quizFormSchema>
export type ModuleFormData = z.infer<typeof moduleFormSchema>
export type QuestionFormData = z.infer<typeof questionFormSchema>
export type CompletionRulesData = z.infer<typeof completionRulesSchema>
