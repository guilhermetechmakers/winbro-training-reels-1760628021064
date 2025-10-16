// User and Authentication Types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  company: string
  avatar?: string
  createdAt: string
  lastLoginAt?: string
  preferences: UserPreferences
}

export type UserRole = 'admin' | 'curator' | 'trainer' | 'operator' | 'customer-admin'

export interface UserPreferences {
  language: string
  theme: 'light' | 'dark' | 'system'
  playbackSpeed: number
  autoplay: boolean
  captions: boolean
  notifications: NotificationSettings
}

export interface NotificationSettings {
  email: boolean
  inApp: boolean
  assignments: boolean
  certificates: boolean
  system: boolean
}

// Video and Content Types
export interface Reel {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number
  tags: string[]
  machineModel?: string
  process?: string
  tooling?: string
  author: User
  createdAt: string
  updatedAt: string
  status: ContentStatus
  transcript?: Transcript
  metadata: ReelMetadata
  assignedCustomers: string[]
  viewCount: number
  rating?: number
}

export type ContentStatus = 'draft' | 'pending-qa' | 'approved' | 'published' | 'archived'

export interface Transcript {
  id: string
  text: string
  segments: TranscriptSegment[]
  language: string
  confidence: number
  createdAt: string
  updatedAt: string
}

export interface TranscriptSegment {
  id: string
  startTime: number
  endTime: number
  text: string
  speaker?: string
}

export interface ReelMetadata {
  resolution: string
  codec: string
  bitrate: number
  frameRate: number
  fileSize: number
  uploadedAt: string
  transcodedAt?: string
}

// Course and Learning Types
export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  modules: CourseModule[]
  quiz?: Quiz
  completionRules: CompletionRules
  assignedTo: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published' | 'archived'
  estimatedDuration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface CourseModule {
  id: string
  title: string
  description: string
  reels: Reel[]
  order: number
  prerequisites?: string[]
}

export interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  passingScore: number
  timeLimit?: number
  attempts: number
  createdAt: string
  updatedAt: string
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
  reelTimestamp?: number
}

export interface CompletionRules {
  requireAllReels: boolean
  requiredReelPercentage: number
  requireQuiz: boolean
  passingScore: number
  timeLimit?: number
}

export interface CourseProgress {
  id: string
  userId: string
  courseId: string
  moduleProgress: ModuleProgress[]
  quizAttempts: QuizAttempt[]
  completedAt?: string
  certificateId?: string
  createdAt: string
  updatedAt: string
}

export interface ModuleProgress {
  moduleId: string
  reelsWatched: string[]
  completedAt?: string
}

export interface QuizAttempt {
  id: string
  answers: Record<string, any>
  score: number
  passed: boolean
  completedAt: string
  timeSpent: number
}

// Certificate Types
export interface Certificate {
  id: string
  userId: string
  courseId: string
  courseTitle: string
  issuedAt: string
  expiresAt?: string
  verificationUrl: string
  pdfUrl: string
  qrCode: string
}

// Search and Filter Types
export interface SearchFilters {
  query?: string
  tags?: string[]
  machineModels?: string[]
  processes?: string[]
  duration?: {
    min?: number
    max?: number
  }
  dateRange?: {
    start?: string
    end?: string
  }
  authors?: string[]
  status?: ContentStatus[]
  assignedCustomers?: string[]
}

export interface SearchResult {
  reels: Reel[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  facets: SearchFacets
}

export interface SearchFacets {
  tags: FacetItem[]
  machineModels: FacetItem[]
  processes: FacetItem[]
  authors: FacetItem[]
  dateRanges: FacetItem[]
}

export interface FacetItem {
  value: string
  count: number
  selected: boolean
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  metadata?: Record<string, any>
}

export type NotificationType = 
  | 'assignment'
  | 'certificate'
  | 'course_completed'
  | 'content_approved'
  | 'content_rejected'
  | 'system_update'
  | 'billing'

// Admin and Management Types
export interface AdminStats {
  totalReels: number
  totalCourses: number
  totalUsers: number
  totalPlays: number
  totalWatchTime: number
  courseCompletions: number
  certificatesIssued: number
  pendingQA: number
  flaggedContent: number
}

export interface ContentAuditLog {
  id: string
  contentId: string
  action: string
  performedBy: string
  timestamp: string
  details: Record<string, any>
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignupForm {
  name: string
  email: string
  company: string
  role: UserRole
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

export interface PasswordResetForm {
  email: string
}

export interface NewPasswordForm {
  password: string
  confirmPassword: string
  token: string
}

export interface ReelUploadForm {
  title: string
  description: string
  tags: string[]
  machineModel?: string
  process?: string
  tooling?: string
  assignedCustomers: string[]
}

export interface CourseForm {
  title: string
  description: string
  modules: Omit<CourseModule, 'id'>[]
  completionRules: CompletionRules
  assignedTo: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

// Error Types
export interface ApiError {
  message: string
  code: string
  details?: Record<string, any>
}

// Theme Types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
}

// Upload Types
export interface UploadProgress {
  fileId: string
  fileName: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'error'
  error?: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  thumbnail?: string
  metadata?: Record<string, any>
}