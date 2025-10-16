import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Play, 
  BookOpen, 
  Search, 
  Upload, 
  Award, 
  Settings, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()
  const location = useLocation()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      roles: ['admin', 'curator', 'trainer', 'operator', 'customer-admin']
    },
    {
      name: 'Reels',
      href: '/reels',
      icon: Play,
      roles: ['admin', 'curator', 'trainer', 'operator', 'customer-admin']
    },
    {
      name: 'Courses',
      href: '/courses',
      icon: BookOpen,
      roles: ['admin', 'curator', 'trainer', 'operator', 'customer-admin']
    },
    {
      name: 'Search',
      href: '/search',
      icon: Search,
      roles: ['admin', 'curator', 'trainer', 'operator', 'customer-admin']
    },
    {
      name: 'Upload',
      href: '/upload',
      icon: Upload,
      roles: ['admin', 'curator', 'trainer']
    },
    {
      name: 'Certificates',
      href: '/certificates',
      icon: Award,
      roles: ['admin', 'curator', 'trainer', 'operator', 'customer-admin']
    },
  ]

  const adminNavigation = [
    {
      name: 'Admin Dashboard',
      href: '/admin',
      icon: BarChart3,
      roles: ['admin']
    },
    {
      name: 'Manage Content',
      href: '/admin/content',
      icon: FileText,
      roles: ['admin', 'curator']
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      roles: ['admin', 'customer-admin']
    },
  ]

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  )

  const filteredAdminNavigation = adminNavigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  )

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {!sidebarCollapsed && (
              <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="font-bold text-lg gradient-text">Winbro</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="space-y-1">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="ml-3">{item.name}</span>
                  )}
                </Link>
              ))}
            </div>

            {/* Admin section */}
            {filteredAdminNavigation.length > 0 && (
              <div className="pt-4">
                <div className="px-3 py-2">
                  {!sidebarCollapsed && (
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Administration
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  {filteredAdminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="ml-3">{item.name}</span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* User info */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* Mobile header */}
        <div className="lg:hidden flex h-16 items-center justify-between px-4 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg gradient-text">Winbro</span>
          </Link>
          <div className="w-10" />
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}