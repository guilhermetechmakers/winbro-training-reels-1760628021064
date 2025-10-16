import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
            <CardDescription>Terms and conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Terms of service content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}