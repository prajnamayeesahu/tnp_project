import { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
    FileText,
    Search,
    User,
    Briefcase,
    Clock
} from 'lucide-react';

interface Application {
    id: string;
    student: {
        name: string;
        registrationNumber: string;
        branch: string;
        cgpa: number;
    };
    job: {
        title: string;
        company: {
            name: string;
        };
    };
    status: 'PENDING' | 'SHORTLISTED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
    appliedAt: string;
}

export function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockApplications: Application[] = [
            {
                id: '1',
                student: {
                    name: 'John Doe',
                    registrationNumber: 'CS2021001',
                    branch: 'Computer Science',
                    cgpa: 8.5
                },
                job: {
                    title: 'Software Engineer',
                    company: { name: 'TechCorp Solutions' }
                },
                status: 'PENDING',
                appliedAt: '2024-01-22T10:00:00Z'
            },
            {
                id: '2',
                student: {
                    name: 'Jane Smith',
                    registrationNumber: 'EE2021002',
                    branch: 'Electrical Engineering',
                    cgpa: 9.2
                },
                job: {
                    title: 'Software Engineer',
                    company: { name: 'TechCorp Solutions' }
                },
                status: 'SHORTLISTED',
                appliedAt: '2024-01-23T10:00:00Z'
            },
            {
                id: '3',
                student: {
                    name: 'Mike Johnson',
                    registrationNumber: 'ME2021003',
                    branch: 'Mechanical Engineering',
                    cgpa: 7.8
                },
                job: {
                    title: 'Financial Analyst',
                    company: { name: 'Global Finance Inc' }
                },
                status: 'INTERVIEW',
                appliedAt: '2024-01-24T10:00:00Z'
            }
        ];

        setTimeout(() => {
            setApplications(mockApplications);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredApplications = applications.filter(application => {
        const matchesSearch =
            application.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'secondary';
            case 'SHORTLISTED': return 'default';
            case 'INTERVIEW': return 'outline';
            case 'ACCEPTED': return 'default';
            case 'REJECTED': return 'destructive';
            default: return 'secondary';
        }
    };

    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Applications</h1>
                    <p className="text-muted-foreground">
                        Track and manage job applications
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-5">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold">{applications.length}</div>
                            <div className="text-sm text-muted-foreground">Total</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{statusCounts.PENDING || 0}</div>
                            <div className="text-sm text-muted-foreground">Pending</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{statusCounts.SHORTLISTED || 0}</div>
                            <div className="text-sm text-muted-foreground">Shortlisted</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{statusCounts.INTERVIEW || 0}</div>
                            <div className="text-sm text-muted-foreground">Interview</div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{statusCounts.ACCEPTED || 0}</div>
                            <div className="text-sm text-muted-foreground">Accepted</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-background"
                >
                    <option value="all">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="SHORTLISTED">Shortlisted</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="ACCEPTED">Accepted</option>
                    <option value="REJECTED">Rejected</option>
                </select>
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {filteredApplications.length} applications
                    </span>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {filteredApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">{application.student.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {application.student.registrationNumber}
                                            </p>
                                        </div>
                                        <Badge variant={getStatusColor(application.status)}>
                                            {application.status}
                                        </Badge>
                                    </div>

                                    <div className="grid gap-2 md:grid-cols-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            <span>{application.student.branch}</span>
                                            <span className="text-muted-foreground">•</span>
                                            <span>CGPA: {application.student.cgpa}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                            <span>{application.job.title}</span>
                                            <span className="text-muted-foreground">at</span>
                                            <span>{application.job.company.name}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-4">
                                    <Button size="sm" variant="outline">
                                        View Details
                                    </Button>
                                    <Button size="sm">
                                        Update Status
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                        {searchTerm ? 'No applications found' : 'No applications yet'}
                    </h3>
                    <p className="text-muted-foreground">
                        {searchTerm
                            ? 'Try adjusting your search terms or filters.'
                            : 'Applications will appear here once students start applying for jobs.'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}