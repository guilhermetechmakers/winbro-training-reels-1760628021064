import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
            <CardDescription>System administration and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Admin dashboard functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}