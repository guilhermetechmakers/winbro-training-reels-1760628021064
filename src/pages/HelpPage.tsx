import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>Get help with using Winbro Training Reels</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Help content coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}