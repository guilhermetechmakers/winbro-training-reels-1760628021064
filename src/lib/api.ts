import type { ApiResponse, PaginatedResponse } from '@/types'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const API_VERSION = 'v1'

class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseURL = `${API_BASE_URL}/${API_VERSION}`
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get auth token from localStorage or cookies
    const token = this.getAuthToken()
    if (token) {
      this.defaultHeaders.Authorization = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.message || 'An error occurred',
          errorData.code || 'UNKNOWN_ERROR',
          errorData.details
        )
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      // Network or other errors
      throw new ApiError(
        'Network error occurred',
        'NETWORK_ERROR',
        { originalError: error }
      )
    }
  }

  private getAuthToken(): string | null {
    // Try to get token from localStorage first
    const token = localStorage.getItem('auth_token')
    if (token) return token

    // Try to get token from cookies
    const cookies = document.cookie.split(';')
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('auth_token=')
    )
    
    if (tokenCookie) {
      return tokenCookie.split('=')[1]
    }

    return null
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<T>(url.pathname + url.search)
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  // File Upload
  async uploadFile<T>(
    endpoint: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const token = this.getAuthToken()
    const headers: Record<string, string> = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = (event.loaded / event.total) * 100
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (error) {
            reject(new ApiError('Invalid response format', 'INVALID_RESPONSE'))
          }
        } else {
          try {
            const errorData = JSON.parse(xhr.responseText)
            reject(new ApiError(
              errorData.message || 'Upload failed',
              errorData.code || 'UPLOAD_ERROR'
            ))
          } catch (error) {
            reject(new ApiError('Upload failed', 'UPLOAD_ERROR'))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new ApiError('Network error during upload', 'NETWORK_ERROR'))
      })

      xhr.open('POST', `${this.baseURL}${endpoint}`)
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
      xhr.send(formData)
    })
  }
}

// Create API client instance
export const apiClient = new ApiClient()

// API Error class
export class ApiError extends Error {
  public code: string
  public details?: Record<string, any>
  
  constructor(
    message: string,
    code: string,
    details?: Record<string, any>
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.details = details
  }
}

// API Endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
  },
  
  // Users
  users: {
    me: '/users/me',
    updateProfile: '/users/me',
    changePassword: '/users/me/password',
    preferences: '/users/me/preferences',
  },
  
  // Reels
  reels: {
    list: '/reels',
    create: '/reels',
    get: (id: string) => `/reels/${id}`,
    update: (id: string) => `/reels/${id}`,
    delete: (id: string) => `/reels/${id}`,
    search: '/reels/search',
    upload: '/reels/upload',
    transcribe: (id: string) => `/reels/${id}/transcribe`,
    approve: (id: string) => `/reels/${id}/approve`,
    reject: (id: string) => `/reels/${id}/reject`,
    assign: (id: string) => `/reels/${id}/assign`,
  },
  
  // Courses
  courses: {
    list: '/courses',
    create: '/courses',
    get: (id: string) => `/courses/${id}`,
    update: (id: string) => `/courses/${id}`,
    delete: (id: string) => `/courses/${id}`,
    assign: (id: string) => `/courses/${id}/assign`,
    progress: (id: string) => `/courses/${id}/progress`,
    complete: (id: string) => `/courses/${id}/complete`,
  },
  
  // Quizzes
  quizzes: {
    create: '/quizzes',
    get: (id: string) => `/quizzes/${id}`,
    update: (id: string) => `/quizzes/${id}`,
    delete: (id: string) => `/quizzes/${id}`,
    submit: (id: string) => `/quizzes/${id}/submit`,
    attempts: (id: string) => `/quizzes/${id}/attempts`,
  },
  
  // Certificates
  certificates: {
    list: '/certificates',
    get: (id: string) => `/certificates/${id}`,
    download: (id: string) => `/certificates/${id}/download`,
    verify: (id: string) => `/certificates/${id}/verify`,
  },
  
  // Search
  search: {
    reels: '/search/reels',
    courses: '/search/courses',
    suggestions: '/search/suggestions',
  },
  
  // Admin
  admin: {
    stats: '/admin/stats',
    users: '/admin/users',
    content: '/admin/content',
    auditLog: '/admin/audit-log',
    settings: '/admin/settings',
  },
  
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id: string) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
  },
} as const

// Utility functions for common API operations
export const apiUtils = {
  // Handle pagination
  getPaginatedData: async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<PaginatedResponse<T>> => {
    const response = await apiClient.get<PaginatedResponse<T>>(endpoint, params)
    return response.data
  },

  // Handle search with filters
  searchReels: async (filters: Record<string, any>) => {
    return apiClient.post(endpoints.search.reels, filters)
  },

  // Handle file upload with progress
  uploadReel: async (
    file: File,
    metadata: Record<string, any>,
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return apiClient.uploadFile(endpoints.reels.upload, file, onProgress)
  },

  // Handle authentication
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post(endpoints.auth.login, credentials)
    
    // Store token if provided
    if ((response.data as any)?.token) {
      localStorage.setItem('auth_token', (response.data as any).token)
    }
    
    return response
  },

  logout: async () => {
    try {
      await apiClient.post(endpoints.auth.logout)
    } finally {
      // Always clear local token
      localStorage.removeItem('auth_token')
    }
  },

  // Handle errors
  handleError: (error: unknown): string => {
    if (error instanceof ApiError) {
      return error.message
    }
    
    if (error instanceof Error) {
      return error.message
    }
    
    return 'An unexpected error occurred'
  },
}