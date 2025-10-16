import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CourseBuilderPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Builder</CardTitle>
            <CardDescription>Create and manage training courses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Course builder functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}