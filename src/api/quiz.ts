import { apiClient, endpoints } from '@/lib/api'
import type { Quiz, QuizAttempt, Certificate } from '@/types'

// Quiz API Functions
export const quizApi = {
  // Get quiz by ID
  async getQuiz(quizId: string): Promise<Quiz> {
    const response = await apiClient.get<Quiz>(endpoints.quizzes.get(quizId))
    return response.data
  },

  // Submit quiz attempt
  async submitQuiz(quizId: string, answers: Record<string, any>): Promise<QuizAttempt> {
    const response = await apiClient.post<QuizAttempt>(
      endpoints.quizzes.submit(quizId),
      { answers }
    )
    return response.data
  },

  // Get quiz attempts for a user
  async getQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
    const response = await apiClient.get<QuizAttempt[]>(endpoints.quizzes.attempts(quizId))
    return response.data
  },

  // Create a new quiz
  async createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quiz> {
    const response = await apiClient.post<Quiz>(endpoints.quizzes.create, quiz)
    return response.data
  },

  // Update quiz
  async updateQuiz(quizId: string, updates: Partial<Quiz>): Promise<Quiz> {
    const response = await apiClient.put<Quiz>(endpoints.quizzes.update(quizId), updates)
    return response.data
  },

  // Delete quiz
  async deleteQuiz(quizId: string): Promise<void> {
    await apiClient.delete(endpoints.quizzes.delete(quizId))
  }
}

// Certificate API Functions
export const certificateApi = {
  // Get user's certificates
  async getCertificates(): Promise<Certificate[]> {
    const response = await apiClient.get<Certificate[]>(endpoints.certificates.list)
    return response.data
  },

  // Get certificate by ID
  async getCertificate(certificateId: string): Promise<Certificate> {
    const response = await apiClient.get<Certificate>(endpoints.certificates.get(certificateId))
    return response.data
  },

  // Download certificate PDF
  async downloadCertificate(certificateId: string): Promise<Blob> {
    const response = await fetch(`${apiClient['baseURL']}${endpoints.certificates.download(certificateId)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to download certificate')
    }
    
    return response.blob()
  },

  // Verify certificate
  async verifyCertificate(certificateId: string): Promise<{ valid: boolean; certificate?: Certificate }> {
    const response = await apiClient.get<{ valid: boolean; certificate?: Certificate }>(
      endpoints.certificates.verify(certificateId)
    )
    return response.data
  },

  // Generate certificate for course completion
  async generateCertificate(courseId: string, userId: string): Promise<Certificate> {
    const response = await apiClient.post<Certificate>('/certificates/generate', {
      courseId,
      userId
    })
    return response.data
  }
}

// Course Progress API Functions
export const courseProgressApi = {
  // Get course progress
  async getCourseProgress(courseId: string): Promise<any> {
    const response = await apiClient.get<any>(endpoints.courses.progress(courseId))
    return response.data
  },

  // Mark course as complete
  async completeCourse(courseId: string): Promise<any> {
    const response = await apiClient.post<any>(endpoints.courses.complete(courseId))
    return response.data
  },

  // Update module progress
  async updateModuleProgress(courseId: string, moduleId: string, progress: any): Promise<any> {
    const response = await apiClient.patch<any>(`/courses/${courseId}/modules/${moduleId}/progress`, progress)
    return response.data
  }
}

// Utility functions
export const quizUtils = {
  // Calculate quiz score
  calculateScore(quiz: Quiz, answers: Record<string, any>): { score: number; passed: boolean } {
    let totalPoints = 0
    let earnedPoints = 0

    quiz.questions.forEach(question => {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (userAnswer === question.correctAnswer) {
          earnedPoints += question.points
        }
      } else if (question.type === 'short-answer') {
        // Simple string matching for short answers
        if (userAnswer && typeof question.correctAnswer === 'string' &&
            question.correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim()) {
          earnedPoints += question.points
        }
      }
    })

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0
    const passed = score >= quiz.passingScore

    return { score, passed }
  },

  // Format time duration
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  },

  // Validate quiz answers
  validateAnswers(quiz: Quiz, answers: Record<string, any>): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    quiz.questions.forEach(question => {
      const answer = answers[question.id]
      
      if (question.type === 'multiple-choice' && question.options) {
        if (!answer || !question.options.includes(answer)) {
          errors.push(`Invalid answer for question: ${question.question}`)
        }
      } else if (question.type === 'true-false') {
        if (answer !== 'true' && answer !== 'false') {
          errors.push(`Invalid answer for question: ${question.question}`)
        }
      } else if (question.type === 'short-answer') {
        if (!answer || typeof answer !== 'string' || answer.trim().length === 0) {
          errors.push(`Answer required for question: ${question.question}`)
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors
    }
  }
}
