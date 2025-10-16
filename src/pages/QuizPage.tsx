import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function QuizPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Assessment</CardTitle>
            <CardDescription>Take your course quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Quiz functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}