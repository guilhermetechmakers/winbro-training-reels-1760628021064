import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function UploadPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>Upload new training reels</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upload functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}