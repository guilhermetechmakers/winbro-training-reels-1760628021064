import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Download, 
  Eye, 
  Search, 
  Award, 
  Calendar,
  AlertCircle,
  Loader2,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { toast } from 'sonner'
import type { Certificate } from '@/types'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'course'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock certificates data for demonstration
  const mockCertificates: Certificate[] = [
    {
      id: 'cert-1',
      userId: 'user-1',
      courseId: 'course-1',
      courseTitle: 'Machine Safety Training',
      issuedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      verificationUrl: 'https://verify.winbro.com/cert-1',
      pdfUrl: '/api/certificates/cert-1.pdf',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    },
    {
      id: 'cert-2',
      userId: 'user-1',
      courseId: 'course-2',
      courseTitle: 'Advanced Manufacturing Techniques',
      issuedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      verificationUrl: 'https://verify.winbro.com/cert-2',
      pdfUrl: '/api/certificates/cert-2.pdf',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    },
    {
      id: 'cert-3',
      userId: 'user-1',
      courseId: 'course-3',
      courseTitle: 'Quality Control Procedures',
      issuedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      verificationUrl: 'https://verify.winbro.com/cert-3',
      pdfUrl: '/api/certificates/cert-3.pdf',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
    }
  ]

  // Load certificates
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // In a real app, you would fetch from the API
        // const data = await certificateApi.getCertificates()
        setCertificates(mockCertificates)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load certificates')
        toast.error('Failed to load certificates')
      } finally {
        setIsLoading(false)
      }
    }

    loadCertificates()
  }, [])

  // Filter and sort certificates
  useEffect(() => {
    let filtered = certificates.filter(cert =>
      cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Sort certificates
    filtered.sort((a, b) => {
      let comparison = 0
      if (sortBy === 'date') {
        comparison = new Date(a.issuedAt).getTime() - new Date(b.issuedAt).getTime()
      } else if (sortBy === 'course') {
        comparison = a.courseTitle.localeCompare(b.courseTitle)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredCertificates(filtered)
  }, [certificates, searchQuery, sortBy, sortOrder])

  const handleDownload = async (certificate: Certificate) => {
    try {
      // In a real app, this would download the actual PDF
      toast.success(`Downloading certificate for ${certificate.courseTitle}`)
      
      // Simulate download
      const link = document.createElement('a')
      link.href = certificate.pdfUrl
      link.download = `${certificate.courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast.error('Failed to download certificate')
    }
  }

  const handleView = (certificate: Certificate) => {
    // In a real app, this would open the certificate in a new tab
    window.open(certificate.verificationUrl, '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isExpiringSoon = (expiresAt: string | undefined) => {
    if (!expiresAt) return false
    const expiryDate = new Date(expiresAt)
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    return expiryDate <= thirtyDaysFromNow
  }

  const isExpired = (expiresAt: string | undefined) => {
    if (!expiresAt) return false
    return new Date(expiresAt) <= new Date()
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center animate-pulse">
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Loading Certificates...</h3>
                  <p className="text-muted-foreground">Please wait while we fetch your certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="animate-fade-in border-destructive">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-destructive">Error</h3>
                  <p className="text-muted-foreground">{error}</p>
                </div>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Certificates</h1>
            <p className="text-muted-foreground">
              View and manage your earned certificates
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Award className="h-3 w-3" />
              <span>{certificates.length} certificates</span>
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 input-focus"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy(sortBy === 'date' ? 'course' : 'date')}
                  className="btn-hover"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {sortBy === 'date' ? 'Date' : 'Course'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="btn-hover"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No Certificates Found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No certificates match your search.' : 'You haven\'t earned any certificates yet.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="card-hover animate-fade-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg line-clamp-2">
                        {certificate.courseTitle}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>Issued {formatDate(certificate.issuedAt)}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {isExpired(certificate.expiresAt) ? (
                        <Badge variant="destructive" className="text-xs">
                          Expired
                        </Badge>
                      ) : isExpiringSoon(certificate.expiresAt) ? (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          Expires Soon
                        </Badge>
                      ) : (
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          Valid
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{certificate.expiresAt ? formatDate(certificate.expiresAt) : 'Never'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Certificate ID:</span>
                      <span className="font-mono text-xs">{certificate.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleDownload(certificate)}
                      className="btn-hover flex-1"
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      onClick={() => handleView(certificate)}
                      variant="outline"
                      className="btn-hover"
                      size="sm"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}