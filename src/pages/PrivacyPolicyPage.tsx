import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <CardDescription>How we protect your data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Privacy policy content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}