import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { analyticsAPI } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import type { JobAnalytics, StudentAnalytics } from '@/types'

export function Analytics() {
  const { id: jobId } = useParams()
  const { toast } = useToast()
  const [jobAnalytics, setJobAnalytics] = useState<JobAnalytics | null>(null)
  const [studentAnalytics, setStudentAnalytics] = useState<StudentAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (jobId) {
      fetchJobAnalytics(jobId)
    } else {
      fetchStudentAnalytics()
    }
  }, [jobId])

  const fetchJobAnalytics = async (id: string) => {
    try {
      setIsLoading(true)
      const data = await analyticsAPI.getJobAnalytics(id)
      setJobAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch job analytics:', error)
      toast({
        title: "Error",
        description: "Failed to load job analytics",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStudentAnalytics = async () => {
    try {
      setIsLoading(true)
      const data = await analyticsAPI.getStudentAnalytics()
      setStudentAnalytics(data)
    } catch (error) {
      console.error('Failed to fetch student analytics:', error)
      toast({
        title: "Error",
        description: "Failed to load student analytics",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (jobId && jobAnalytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Analytics</h1>
          <p className="text-muted-foreground">
            Detailed analytics for job ID: {jobId}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobAnalytics.totalApplicants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobAnalytics.shortlisted}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobAnalytics.selected}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{jobAnalytics.rejected}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization will be implemented here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (studentAnalytics) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Analytics</h1>
          <p className="text-muted-foreground">
            Overview of student data and metrics
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="branch">Branch Distribution</TabsTrigger>
            <TabsTrigger value="year">Year Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentAnalytics.profileCompletion.completed}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {studentAnalytics.profileCompletion.incomplete} incomplete
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average CGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentAnalytics.averageCGPA.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="branch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Students by Branch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {studentAnalytics.branchDistribution.map((item) => (
                    <div key={item.branch} className="flex justify-between items-center">
                      <span>{item.branch}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="year" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Students by Year</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {studentAnalytics.yearDistribution.map((item) => (
                    <div key={item.year} className="flex justify-between items-center">
                      <span>Year {item.year}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed analytics and insights
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            Select a specific job to view its analytics, or view general student analytics.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
