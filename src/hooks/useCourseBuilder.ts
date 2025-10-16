import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, endpoints } from '@/lib/api'
import type { Course, CourseModule, Quiz, Reel } from '@/types'
import { toast } from 'sonner'

export function useCourseBuilder(courseId?: string) {
  const queryClient = useQueryClient()
  const [isSaving, setIsSaving] = useState(false)

  // Fetch course data
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null
      const response = await apiClient.get<Course>(endpoints.courses.get(courseId))
      return response.data
    },
    enabled: !!courseId,
  })

  // Create/Update course mutation
  const createCourseMutation = useMutation({
    mutationFn: async (courseData: Partial<Course>) => {
      const response = await apiClient.post<Course>(endpoints.courses.create, courseData)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['course', data.id], data)
      toast.success('Course created successfully')
    },
    onError: (error) => {
      toast.error('Failed to create course')
      console.error('Create course error:', error)
    },
  })

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Course> }) => {
      const response = await apiClient.put<Course>(endpoints.courses.update(id), data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['course', data.id], data)
    },
    onError: (error) => {
      toast.error('Failed to update course')
      console.error('Update course error:', error)
    },
  })

  // Save course
  const saveCourse = useCallback(async () => {
    if (!course) return

    setIsSaving(true)
    try {
      if (courseId) {
        await updateCourseMutation.mutateAsync({ id: courseId, data: course })
      } else {
        const newCourse = await createCourseMutation.mutateAsync(course)
        // Update the course ID for future operations
        queryClient.setQueryData(['course', newCourse.id], newCourse)
      }
    } finally {
      setIsSaving(false)
    }
  }, [course, courseId, updateCourseMutation, createCourseMutation, queryClient])

  // Publish course
  const publishCourse = useCallback(async () => {
    if (!course) return

    setIsSaving(true)
    try {
      const updatedCourse = { ...course, status: 'published' as const }
      if (courseId) {
        await updateCourseMutation.mutateAsync({ id: courseId, data: updatedCourse })
      } else {
        await createCourseMutation.mutateAsync(updatedCourse)
      }
    } finally {
      setIsSaving(false)
    }
  }, [course, courseId, updateCourseMutation, createCourseMutation])

  // Module operations
  const addModule = useCallback((module: Omit<CourseModule, 'id'>) => {
    const currentCourse = course || {
      id: courseId || `course-${Date.now()}`,
      title: 'Untitled Course',
      description: '',
      thumbnail: '',
      modules: [],
      completionRules: {
        requireAllReels: true,
        requiredReelPercentage: 100,
        requireQuiz: false,
        passingScore: 70,
      },
      assignedTo: [],
      createdBy: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft' as const,
      estimatedDuration: 0,
      difficulty: 'beginner' as const,
    }

    const newModule: CourseModule = {
      ...module,
      id: `module-${Date.now()}`,
    }

    const updatedCourse = {
      ...currentCourse,
      modules: [...currentCourse.modules, newModule],
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  const updateModule = useCallback((moduleId: string, updates: Partial<CourseModule>) => {
    if (!course) return

    const updatedModules = course.modules.map(module =>
      module.id === moduleId ? { ...module, ...updates } : module
    )

    const updatedCourse = {
      ...course,
      modules: updatedModules,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  const deleteModule = useCallback((moduleId: string) => {
    if (!course) return

    const updatedModules = course.modules.filter(module => module.id !== moduleId)

    const updatedCourse = {
      ...course,
      modules: updatedModules,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  const reorderModules = useCallback((startIndex: number, endIndex: number) => {
    if (!course) return

    const updatedModules = Array.from(course.modules)
    const [removed] = updatedModules.splice(startIndex, 1)
    updatedModules.splice(endIndex, 0, removed)

    // Update order property
    const reorderedModules = updatedModules.map((module, index) => ({
      ...module,
      order: index,
    }))

    const updatedCourse = {
      ...course,
      modules: reorderedModules,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  // Reel operations
  const addReelToModule = useCallback((moduleId: string, reel: Reel) => {
    if (!course) return

    const updatedModules = course.modules.map(module =>
      module.id === moduleId
        ? { ...module, reels: [...module.reels, reel] }
        : module
    )

    const updatedCourse = {
      ...course,
      modules: updatedModules,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  const removeReelFromModule = useCallback((moduleId: string, reelId: string) => {
    if (!course) return

    const updatedModules = course.modules.map(module =>
      module.id === moduleId
        ? { ...module, reels: module.reels.filter(reel => reel.id !== reelId) }
        : module
    )

    const updatedCourse = {
      ...course,
      modules: updatedModules,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  // Quiz operations
  const updateQuiz = useCallback((quiz: Quiz) => {
    if (!course) return

    const updatedCourse = {
      ...course,
      quiz,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  // Settings operations
  const updateSettings = useCallback((settings: Partial<Course>) => {
    if (!course) return

    const updatedCourse = {
      ...course,
      ...settings,
    }

    queryClient.setQueryData(['course', courseId], updatedCourse)
  }, [course, courseId, queryClient])

  return {
    course,
    isLoading,
    isSaving,
    saveCourse,
    publishCourse,
    addModule,
    updateModule,
    deleteModule,
    reorderModules,
    addReelToModule,
    removeReelFromModule,
    updateQuiz,
    updateSettings,
  }
}
