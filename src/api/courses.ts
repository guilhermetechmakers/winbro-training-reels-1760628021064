import { apiClient, endpoints } from '@/lib/api'
import type { Course, CourseModule, Quiz, CourseProgress, QuizAttempt } from '@/types'

// Course API functions
export const courseApi = {
  // Get all courses
  getCourses: async (params?: {
    page?: number
    limit?: number
    status?: string
    difficulty?: string
  }) => {
    return apiClient.get(endpoints.courses.list, params)
  },

  // Get single course
  getCourse: async (id: string) => {
    return apiClient.get<Course>(endpoints.courses.get(id))
  },

  // Create course
  createCourse: async (courseData: Partial<Course>) => {
    return apiClient.post<Course>(endpoints.courses.create, courseData)
  },

  // Update course
  updateCourse: async (id: string, courseData: Partial<Course>) => {
    return apiClient.put<Course>(endpoints.courses.update(id), courseData)
  },

  // Delete course
  deleteCourse: async (id: string) => {
    return apiClient.delete(endpoints.courses.delete(id))
  },

  // Assign course to users
  assignCourse: async (id: string, userIds: string[]) => {
    return apiClient.post(endpoints.courses.assign(id), { userIds })
  },

  // Get course progress
  getCourseProgress: async (id: string) => {
    return apiClient.get<CourseProgress>(endpoints.courses.progress(id))
  },

  // Complete course
  completeCourse: async (id: string) => {
    return apiClient.post(endpoints.courses.complete(id))
  },

  // Module operations
  addModule: async (courseId: string, module: Omit<CourseModule, 'id'>) => {
    return apiClient.post(`/courses/${courseId}/modules`, module)
  },

  updateModule: async (courseId: string, moduleId: string, module: Partial<CourseModule>) => {
    return apiClient.put(`/courses/${courseId}/modules/${moduleId}`, module)
  },

  deleteModule: async (courseId: string, moduleId: string) => {
    return apiClient.delete(`/courses/${courseId}/modules/${moduleId}`)
  },

  reorderModules: async (courseId: string, moduleIds: string[]) => {
    return apiClient.put(`/courses/${courseId}/modules/reorder`, { moduleIds })
  },

  // Reel operations
  addReelToModule: async (courseId: string, moduleId: string, reelId: string) => {
    return apiClient.post(`/courses/${courseId}/modules/${moduleId}/reels`, { reelId })
  },

  removeReelFromModule: async (courseId: string, moduleId: string, reelId: string) => {
    return apiClient.delete(`/courses/${courseId}/modules/${moduleId}/reels/${reelId}`)
  },

  // Quiz operations
  updateQuiz: async (courseId: string, quiz: Quiz) => {
    return apiClient.put(`/courses/${courseId}/quiz`, quiz)
  },

  // Settings operations
  updateSettings: async (courseId: string, settings: Partial<Course>) => {
    return apiClient.put(`/courses/${courseId}/settings`, settings)
  },
}

// Quiz API functions
export const quizApi = {
  // Create quiz
  createQuiz: async (quizData: Partial<Quiz>) => {
    return apiClient.post<Quiz>(endpoints.quizzes.create, quizData)
  },

  // Get quiz
  getQuiz: async (id: string) => {
    return apiClient.get<Quiz>(endpoints.quizzes.get(id))
  },

  // Update quiz
  updateQuiz: async (id: string, quizData: Partial<Quiz>) => {
    return apiClient.put<Quiz>(endpoints.quizzes.update(id), quizData)
  },

  // Delete quiz
  deleteQuiz: async (id: string) => {
    return apiClient.delete(endpoints.quizzes.delete(id))
  },

  // Submit quiz attempt
  submitQuiz: async (id: string, answers: Record<string, any>) => {
    return apiClient.post<QuizAttempt>(endpoints.quizzes.submit(id), { answers })
  },

  // Get quiz attempts
  getQuizAttempts: async (id: string) => {
    return apiClient.get<QuizAttempt[]>(endpoints.quizzes.attempts(id))
  },
}

// Reel API functions for course builder
export const reelApi = {
  // Get available reels for course builder
  getAvailableReels: async (params?: {
    page?: number
    limit?: number
    tags?: string[]
    machineModels?: string[]
    processes?: string[]
  }) => {
    return apiClient.get('/reels/available', params)
  },

  // Search reels for course builder
  searchReels: async (query: string, filters?: {
    tags?: string[]
    machineModels?: string[]
    processes?: string[]
  }) => {
    return apiClient.post('/reels/search', { query, filters })
  },
}
