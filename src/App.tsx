import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryProvider } from '@/contexts/QueryProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { QuizProvider } from '@/contexts/QuizContext'
import { Header } from '@/components/layout/Header'
import { Toaster } from 'sonner'

// Pages
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import PasswordResetPage from '@/pages/auth/PasswordResetPage'
import EmailVerificationPage from '@/pages/auth/EmailVerificationPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import ReelPlayerPage from '@/pages/ReelPlayerPage'
import SearchPage from '@/pages/SearchPage'
import CourseBuilderPage from '@/pages/CourseBuilderPage'
import QuizPage from '@/pages/QuizPage'
import CertificatesPage from '@/pages/CertificatesPage'
import UploadPage from '@/pages/UploadPage'
import ManageContentPage from '@/pages/admin/ManageContentPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import ProfilePage from '@/pages/ProfilePage'
import SettingsPage from '@/pages/SettingsPage'
import HelpPage from '@/pages/HelpPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderHistoryPage from '@/pages/OrderHistoryPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import TermsOfServicePage from '@/pages/TermsOfServicePage'
import CookiePolicyPage from '@/pages/CookiePolicyPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ServerErrorPage from '@/pages/ServerErrorPage'

// Protected Route Component
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Header />
              <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/auth/password-reset" element={<PasswordResetPage />} />
                <Route path="/auth/verify-email" element={<EmailVerificationPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/reels/:id" element={
                  <ProtectedRoute>
                    <ReelPlayerPage />
                  </ProtectedRoute>
                } />
                <Route path="/search" element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                } />
                <Route path="/courses" element={
                  <ProtectedRoute>
                    <Navigate to="/dashboard" replace />
                  </ProtectedRoute>
                } />
                <Route path="/courses/builder" element={
                  <ProtectedRoute>
                    <CourseBuilderPage />
                  </ProtectedRoute>
                } />
                <Route path="/courses/:id/quiz" element={
                  <ProtectedRoute>
                    <QuizPage />
                  </ProtectedRoute>
                } />
                <Route path="/certificates" element={
                  <ProtectedRoute>
                    <CertificatesPage />
                  </ProtectedRoute>
                } />
                <Route path="/upload" element={
                  <ProtectedRoute>
                    <UploadPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/content" element={
                  <ProtectedRoute requiredRole="admin">
                    <ManageContentPage />
                  </ProtectedRoute>
                } />
                
                {/* Error Pages */}
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </main>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))',
                    border: '1px solid hsl(var(--border))',
                  },
                }}
              />
            </div>
          </Router>
        </QuizProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

export default App