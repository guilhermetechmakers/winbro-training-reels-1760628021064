import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CertificatesPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
            <CardDescription>View your earned certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Certificates functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}