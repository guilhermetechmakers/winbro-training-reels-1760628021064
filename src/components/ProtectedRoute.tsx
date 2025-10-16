import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/types'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: UserRole
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}