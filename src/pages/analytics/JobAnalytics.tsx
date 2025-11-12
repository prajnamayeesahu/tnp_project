import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = {
  applied: '#3b82f6',
  shortlisted: '#8b5cf6',
  interview: '#f59e0b',
  accepted: '#10b981',
  rejected: '#ef4444',
};

export function JobAnalytics() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const [jobData, analyticsData] = await Promise.all([
        api.getJobById(id),
        api.getJobAnalytics(id),
      ]);
      setJob(jobData);
      setAnalytics(analyticsData);
    } catch (error) {
      toast.error('Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!job || !analytics) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <p className="text-muted-foreground">Job not found</p>
        <Button onClick={() => navigate('/jobs')} className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  const chartData = [
    { name: 'Applied', value: analytics.applied, color: COLORS.applied },
    { name: 'Shortlisted', value: analytics.shortlisted, color: COLORS.shortlisted },
    { name: 'Interview', value: analytics.interview, color: COLORS.interview },
    { name: 'Accepted', value: analytics.accepted, color: COLORS.accepted },
    { name: 'Rejected', value: analytics.rejected, color: COLORS.rejected },
  ];

  const pieData = chartData.filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-3xl">{job.title}</h1>
        <p className="text-muted-foreground">{job.companyName}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Applied</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.applied}</div>
            {analytics.total > 0 && (
              <p className="text-xs text-muted-foreground">
                {((analytics.applied / analytics.total) * 100).toFixed(1)}%
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Shortlisted</CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500/20" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.shortlisted}</div>
            {analytics.total > 0 && (
              <p className="text-xs text-muted-foreground">
                {((analytics.shortlisted / analytics.total) * 100).toFixed(1)}%
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.accepted}</div>
            {analytics.total > 0 && (
              <p className="text-xs text-muted-foreground">
                {((analytics.accepted / analytics.total) * 100).toFixed(1)}%
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.rejected}</div>
            {analytics.total > 0 && (
              <p className="text-xs text-muted-foreground">
                {((analytics.rejected / analytics.total) * 100).toFixed(1)}%
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                No applications yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p>{job.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salary</p>
              <p>{job.salary}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p>{new Date(job.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p>{job.status}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Description</p>
            <p className="text-sm">{job.description}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Requirements</p>
            <p className="text-sm">{job.requirements}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
