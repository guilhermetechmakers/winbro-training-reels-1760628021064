import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ManageContentPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Content</CardTitle>
            <CardDescription>Admin content management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Content management functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}