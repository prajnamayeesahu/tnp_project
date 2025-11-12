import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
    Users,
    Building2,
    Briefcase,
    FileText,
    TrendingUp,
    Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalCompanies: 0,
        totalJobs: 0,
        openJobs: 0,
        totalApplications: 0,
        pendingApplications: 0
    });

    useEffect(() => {
        // Mock data - replace with actual API call
        setStats({
            totalStudents: 150,
            totalCompanies: 25,
            totalJobs: 45,
            openJobs: 12,
            totalApplications: 89,
            pendingApplications: 23
        });
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                    Overview of your Training & Placement activities
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                        <p className="text-xs text-muted-foreground">
                            Registered students
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Companies</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCompanies}</div>
                        <p className="text-xs text-muted-foreground">
                            Partner companies
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Open Jobs</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.openJobs}</div>
                        <p className="text-xs text-muted-foreground">
                            Out of {stats.totalJobs} total jobs
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Applications</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalApplications}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.pendingApplications} pending review
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Student Management
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Manage student profiles and registrations
                        </p>
                        <div className="flex gap-2">
                            <Button asChild size="sm">
                                <Link to="/students">View Students</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Company Portal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Manage company partnerships and job postings
                        </p>
                        <div className="flex gap-2">
                            <Button asChild size="sm">
                                <Link to="/companies">View Companies</Link>
                            </Button>
                            <Button asChild size="sm" variant="outline">
                                <Link to="/jobs">View Jobs</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            View detailed analytics and reports
                        </p>
                        <div className="flex gap-2">
                            <Button asChild size="sm" variant="outline">
                                <Link to="/analytics/students">Student Analytics</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">New company registration</p>
                                <p className="text-xs text-muted-foreground">TechCorp Solutions joined 2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 bg-blue-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Job posting created</p>
                                <p className="text-xs text-muted-foreground">Software Engineer position posted 4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-2 bg-orange-500 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Student applications</p>
                                <p className="text-xs text-muted-foreground">5 new applications received today</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}