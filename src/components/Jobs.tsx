import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { AddJobModal } from './Modals';
import {
    Briefcase,
    Search,
    MapPin,
    DollarSign,
    Calendar,
    Building2,
    Clock
} from 'lucide-react';

interface Job {
    id: string;
    title: string;
    company: {
        name: string;
    };
    description: string;
    location: string;
    salary: string;
    type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP';
    status: 'OPEN' | 'CLOSED';
    deadline: string;
    createdAt: string;
}

export function Jobs() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockJobs: Job[] = [
            {
                id: '1',
                title: 'Software Engineer',
                company: { name: 'TechCorp Solutions' },
                description: 'Full-stack development position with modern technologies.',
                location: 'San Francisco, CA',
                salary: '$80,000 - $120,000',
                type: 'FULL_TIME',
                status: 'OPEN',
                deadline: '2024-12-31',
                createdAt: '2024-01-20'
            },
            {
                id: '2',
                title: 'Financial Analyst',
                company: { name: 'Global Finance Inc' },
                description: 'Analyze financial data and create comprehensive reports.',
                location: 'New York, NY',
                salary: '$60,000 - $90,000',
                type: 'FULL_TIME',
                status: 'OPEN',
                deadline: '2024-12-25',
                createdAt: '2024-01-21'
            },
            {
                id: '3',
                title: 'Data Science Intern',
                company: { name: 'Analytics Pro' },
                description: 'Learn data science and machine learning techniques.',
                location: 'Remote',
                salary: '$2,000/month',
                type: 'INTERNSHIP',
                status: 'OPEN',
                deadline: '2024-11-30',
                createdAt: '2024-01-22'
            }
        ];

        setTimeout(() => {
            setJobs(mockJobs);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'FULL_TIME': return 'default';
            case 'PART_TIME': return 'secondary';
            case 'INTERNSHIP': return 'outline';
            default: return 'default';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'OPEN' ? 'default' : 'destructive';
    };

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Jobs</h1>
                    <p className="text-muted-foreground">
                        Browse and manage job opportunities
                    </p>
                </div>
                <AddJobModal />
            </div>

            {/* Search and Stats */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {filteredJobs.length} jobs
                    </span>
                </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">{job.title}</CardTitle>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Building2 className="h-4 w-4" />
                                        <span>{job.company.name}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={getTypeColor(job.type)}>
                                        {job.type.replace('_', ' ')}
                                    </Badge>
                                    <Badge variant={getStatusColor(job.status)}>
                                        {job.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground line-clamp-2">
                                {job.description}
                            </p>

                            <div className="grid gap-3 md:grid-cols-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span>{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                        View Details
                                    </Button>
                                    <Button size="sm">
                                        Apply Now
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredJobs.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms or check back later for new opportunities.
                    </p>
                </div>
            )}
        </div>
    );
}