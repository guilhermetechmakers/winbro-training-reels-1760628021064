import { Link } from 'react-router-dom'
import { RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="text-6xl font-bold text-destructive mb-4">500</div>
            <CardTitle className="text-2xl">Server Error</CardTitle>
            <CardDescription>
              Something went wrong on our end. We're working to fix it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Our team has been notified and is working to resolve this issue. 
                Please try again in a few minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => window.location.reload()}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}