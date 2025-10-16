import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, LoginForm, SignupForm } from '@/types'
import { apiClient, endpoints, apiUtils } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginForm) => Promise<void>
  register: (data: SignupForm) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          const response = await apiClient.get<User>(endpoints.users.me)
          setUser(response.data)
        }
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem('auth_token')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginForm) => {
    try {
      const response = await apiUtils.login(credentials)
      setUser((response.data as any).user)
    } catch (error) {
      throw new Error(apiUtils.handleError(error))
    }
  }

  const register = async (data: SignupForm) => {
    try {
      await apiClient.post(endpoints.auth.register, data)
      // Don't automatically log in after registration
      // User needs to verify email first
    } catch (error) {
      throw new Error(apiUtils.handleError(error))
    }
  }

  const logout = async () => {
    try {
      await apiUtils.logout()
    } finally {
      setUser(null)
    }
  }

  const refreshUser = async () => {
    try {
      const response = await apiClient.get<User>(endpoints.users.me)
      setUser(response.data)
    } catch (error) {
      // If refresh fails, user is no longer authenticated
      setUser(null)
      localStorage.removeItem('auth_token')
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await apiClient.put(endpoints.users.updateProfile, data)
      setUser(response.data as User)
    } catch (error) {
      throw new Error(apiUtils.handleError(error))
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}