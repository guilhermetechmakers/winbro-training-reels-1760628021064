import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile management functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}