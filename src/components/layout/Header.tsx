import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/auth/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-xl gradient-text">Winbro Training</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/reels" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Reels
            </Link>
            <Link 
              to="/courses" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Courses
            </Link>
            <Link 
              to="/search" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Search
            </Link>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    name="search"
                    placeholder="Search reels, courses..."
                    className="w-64"
                    autoFocus
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                  <Button type="submit" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/certificates">Certificates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/reels" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reels
              </Link>
              <Link 
                to="/courses" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/search" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Search
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}