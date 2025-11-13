import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
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
        <Button onClick={() => navigate('/jobs')} className="mt-4 cursor-pointer">
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

  // Pre-compute percentages for cleaner rendering
  const percentages = useMemo(() => {
    const total = analytics.total || 0;
    const pct = (val: number) => (total > 0 ? ((val / total) * 100).toFixed(1) + '%' : '0%');
    return {
      applied: pct(analytics.applied),
      shortlisted: pct(analytics.shortlisted),
      accepted: pct(analytics.accepted),
      rejected: pct(analytics.rejected),
    };
  }, [analytics]);

  return (
    <div className="space-y-8 animate-fade-in">
      <button
        onClick={() => navigate('/jobs')}
        className="text-sm text-muted-foreground inline-flex items-center gap-1 hover:text-foreground cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
        <p className="text-sm text-muted-foreground">{job.companyName}</p>
      </div>

      {/* Stat Cards Row */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatsCard label="Total Applications" value={analytics.total} icon={<Users className="h-4 w-4" />} color="bg-blue-50 text-blue-600" />
        <StatsCard label="Applied" value={analytics.applied} sub={percentages.applied} icon={<Clock className="h-4 w-4" />} color="bg-sky-50 text-sky-600" />
        <StatsCard label="Shortlisted" value={analytics.shortlisted} sub={percentages.shortlisted} icon={<Clock className="h-4 w-4" />} color="bg-purple-50 text-purple-600" />
        <StatsCard label="Accepted" value={analytics.accepted} sub={percentages.accepted} icon={<CheckCircle className="h-4 w-4" />} color="bg-green-50 text-green-600" />
        <StatsCard label="Rejected" value={analytics.rejected} sub={percentages.rejected} icon={<XCircle className="h-4 w-4" />} color="bg-red-50 text-red-600" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border">
          <CardContent className="p-5">
            <h3 className="text-xs font-medium mb-4 tracking-wide">Application Status Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-5">
            <h3 className="text-xs font-medium mb-4 tracking-wide">Status Distribution</h3>
            {pieData.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-muted-foreground text-sm">
                No applications yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Job Details */}
      <Card className="border">
        <CardContent className="p-5 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium mt-1">{job.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="font-medium mt-1">{new Date(job.deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="mt-1 leading-relaxed">{job.description}</p>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Salary</p>
                <p className="font-medium mt-1">{job.salary}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-medium mt-1">{job.status}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requirements</p>
                <p className="mt-1 leading-relaxed">{job.requirements}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCard({ label, value, sub, icon, color }: { label: string; value: number; sub?: string; icon: React.ReactNode; color: string }) {
  return (
    <Card className="border p-4 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium tracking-wide text-muted-foreground">{label}</span>
        <span className={`rounded-md p-2 ${color} inline-flex items-center justify-center`}>{icon}</span>
      </div>
      <div className="text-lg font-semibold">{value}</div>
      {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </Card>
  );
}
