import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  Download, 
  RotateCcw,
  Clock,
  Trophy,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizAttempt } from '@/types'

interface FeedbackPanelProps {
  attempt: QuizAttempt
  passingScore: number
  onRetake?: () => void
  onDownloadCertificate?: () => void
  onBackToCourse?: () => void
}

export function FeedbackPanel({ 
  attempt, 
  passingScore, 
  onRetake, 
  onDownloadCertificate,
  onBackToCourse 
}: FeedbackPanelProps) {
  const scorePercentage = attempt.score
  const passed = attempt.passed
  const timeSpent = attempt.timeSpent

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Results Header */}
      <Card className={cn(
        "card-hover",
        passed ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20" : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20"
      )}>
        <CardHeader className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-background shadow-lg">
            {passed ? (
              <CheckCircle className="h-12 w-12 text-green-600" />
            ) : (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </div>
          <CardTitle className={cn(
            "text-2xl",
            passed ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
          )}>
            {passed ? 'Congratulations!' : 'Quiz Not Passed'}
          </CardTitle>
          <CardDescription className="text-lg">
            {passed 
              ? 'You have successfully completed the quiz and earned your certificate!' 
              : `You scored ${scorePercentage}% but needed ${passingScore}% to pass.`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">
              {scorePercentage}%
            </div>
            <div className="space-y-2">
              <Progress 
                value={scorePercentage} 
                className="w-full h-3"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span className="font-medium">Passing Score: {passingScore}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{scorePercentage}%</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">{formatTime(timeSpent)}</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-bold">
                {passed ? 'PASSED' : 'FAILED'}
              </div>
              <div className="text-sm text-muted-foreground">Result</div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge 
              variant={passed ? "default" : "destructive"}
              className={cn(
                "text-lg px-4 py-2",
                passed ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              )}
            >
              {passed ? (
                <>
                  <Award className="h-4 w-4 mr-2" />
                  Certificate Earned
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Not Passed
                </>
              )}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {passed && onDownloadCertificate && (
              <Button
                onClick={onDownloadCertificate}
                className="btn-hover bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </Button>
            )}
            
            {!passed && onRetake && (
              <Button
                onClick={onRetake}
                variant="outline"
                className="btn-hover"
                size="lg"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake Quiz
              </Button>
            )}
            
            {onBackToCourse && (
              <Button
                onClick={onBackToCourse}
                variant="outline"
                className="btn-hover"
                size="lg"
              >
                Back to Course
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      {!passed && (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                Need Help?
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Review the course material and try again. You can retake this quiz as many times as needed.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {passed && (
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                Well Done!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your certificate has been generated and is ready for download. 
                You can also view it in your certificates page.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
