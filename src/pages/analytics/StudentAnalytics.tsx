import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export function StudentAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await api.getStudentAnalytics();
      setAnalytics(data);
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

  if (!analytics) return null;

  const branchData = Object.entries(analytics.branchDistribution).map(([name, value]) => ({
    name,
    value: value as number,
  }));

  const yearData = Object.entries(analytics.yearDistribution).map(([name, value]) => ({
    name: `Year ${name}`,
    value: value as number,
  }));

  const profileData = [
    { name: 'Completed', value: analytics.profileCompletion.completed },
    { name: 'Incomplete', value: analytics.profileCompletion.incomplete },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Student Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into student demographics and profiles
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Profile Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.profileCompletion.completed}</div>
            <p className="text-xs text-muted-foreground">
              {((analytics.profileCompletion.completed / analytics.totalStudents) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Average CGPA</CardTitle>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
              <span className="text-xs text-primary">★</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{analytics.averageCGPA}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Branch Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Year Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={yearData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {yearData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={profileData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Most Popular Branch</span>
              <span>
                {branchData.reduce((max, curr) => (curr.value > max.value ? curr : max)).name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Largest Year Group</span>
              <span>
                {yearData.reduce((max, curr) => (curr.value > max.value ? curr : max)).name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Profile Completion Rate</span>
              <span>
                {((analytics.profileCompletion.completed / analytics.totalStudents) * 100).toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
