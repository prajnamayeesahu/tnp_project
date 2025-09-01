import React, { useEffect } from 'react'
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  TrendingUp,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAppStore } from '@/store'
import { dashboardAPI } from '@/services/api'
import { useToast } from '@/hooks/use-toast'

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color
}: {
  title: string
  value: number
  icon: React.ElementType
  description: string
  trend?: string
  color: string
}) => (
  <Card className="card-professional">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted">{title}</CardTitle>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-heading mb-1">{value.toLocaleString()}</div>
      <p className="text-sm text-muted mb-2">{description}</p>
      {trend && (
        <div className="flex items-center text-sm text-green-600 font-medium">
          <TrendingUp className="h-3 w-3 mr-1" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
)

export function Dashboard() {
  const { dashboardStats, setDashboardStats, setLoading } = useAppStore()
  const { toast } = useToast()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const stats = await dashboardAPI.getStats()
        setDashboardStats(stats)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [setDashboardStats, setLoading, toast])

  if (!dashboardStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-heading mb-2">Dashboard</h1>
        <p className="text-muted">
          Welcome to your placement management dashboard. Here's an overview of your system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Students"
          value={dashboardStats.totalStudents}
          icon={Users}
          description="Registered students in the system"
          color="bg-blue-600"
        />
        <StatCard
          title="Total Companies"
          value={dashboardStats.totalCompanies}
          icon={Building2}
          description="Partner companies"
          color="bg-purple-600"
        />
        <StatCard
          title="Total Jobs"
          value={dashboardStats.totalJobs}
          icon={Briefcase}
          description="Job listings created"
          color="bg-green-600"
        />
        <StatCard
          title="Open Jobs"
          value={dashboardStats.openJobs}
          icon={Briefcase}
          description="Currently active job postings"
          color="bg-orange-600"
        />
        <StatCard
          title="Total Applications"
          value={dashboardStats.totalApplications}
          icon={FileText}
          description="Applications submitted"
          color="bg-indigo-600"
        />
        <StatCard
          title="Pending Applications"
          value={dashboardStats.pendingApplications}
          icon={Clock}
          description="Applications awaiting review"
          color="bg-pink-600"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="glass-effect shadow-glow-hover border-0 card-hover">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full pulse-glow"></div>
                <p className="text-sm font-semibold text-gray-800">New student registration</p>
                <span className="text-xs text-gray-600 ml-auto bg-white/50 px-2 py-1 rounded-full">2 min ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50 hover:shadow-lg transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full pulse-glow"></div>
                <p className="text-sm font-semibold text-gray-800">Job application submitted</p>
                <span className="text-xs text-gray-600 ml-auto bg-white/50 px-2 py-1 rounded-full">5 min ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pulse-glow"></div>
                <p className="text-sm font-semibold text-gray-800">Company profile updated</p>
                <span className="text-xs text-gray-600 ml-auto bg-white/50 px-2 py-1 rounded-full">10 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect shadow-glow-hover border-0 card-hover">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-500/10 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg button-glow">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Add new student</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg button-glow">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Create job posting</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 cursor-pointer group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg button-glow">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Send announcement</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
