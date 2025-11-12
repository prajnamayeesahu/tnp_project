import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
    Megaphone,
    Search,
    Plus,
    Calendar,
    Users,
    Clock
} from 'lucide-react';

interface Announcement {
    id: string;
    title: string;
    content: string;
    targetAudience: 'ALL' | 'BRANCH' | 'BATCH';
    targetBranch?: string;
    targetBatch?: number;
    publishedAt: string;
    createdAt: string;
}

export function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockAnnouncements: Announcement[] = [
            {
                id: '1',
                title: 'New Job Postings Available',
                content: 'Several new job opportunities have been posted from top-tier companies. Students are encouraged to check the job portal and apply for positions that match their skills and interests. Deadline for applications is approaching fast!',
                targetAudience: 'ALL',
                publishedAt: '2024-01-24T10:00:00Z',
                createdAt: '2024-01-24T10:00:00Z'
            },
            {
                id: '2',
                title: 'Resume Building Workshop',
                content: 'Join our comprehensive resume building workshop scheduled for next week. Learn how to create compelling resumes that stand out to recruiters. Limited seats available.',
                targetAudience: 'BATCH',
                targetBatch: 4,
                publishedAt: '2024-01-23T14:00:00Z',
                createdAt: '2024-01-23T14:00:00Z'
            },
            {
                id: '3',
                title: 'Technical Interview Preparation',
                content: 'Special session on technical interview preparation for Computer Science students. Topics include data structures, algorithms, system design, and coding best practices.',
                targetAudience: 'BRANCH',
                targetBranch: 'Computer Science',
                publishedAt: '2024-01-22T16:00:00Z',
                createdAt: '2024-01-22T16:00:00Z'
            },
            {
                id: '4',
                title: 'Company Visit: TechCorp Solutions',
                content: 'TechCorp Solutions will be visiting our campus next month for recruitment. They are looking for talented software engineers and data scientists. Prepare your profiles and portfolios.',
                targetAudience: 'ALL',
                publishedAt: '2024-01-21T11:00:00Z',
                createdAt: '2024-01-21T11:00:00Z'
            }
        ];

        setTimeout(() => {
            setAnnouncements(mockAnnouncements);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTargetDisplay = (announcement: Announcement) => {
        switch (announcement.targetAudience) {
            case 'ALL':
                return 'All Students';
            case 'BRANCH':
                return `${announcement.targetBranch} Students`;
            case 'BATCH':
                return `Batch ${announcement.targetBatch}`;
            default:
                return 'All Students';
        }
    };

    const getTargetColor = (targetAudience: string) => {
        switch (targetAudience) {
            case 'ALL': return 'default';
            case 'BRANCH': return 'secondary';
            case 'BATCH': return 'outline';
            default: return 'default';
        }
    };

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
                    <h1 className="text-3xl font-bold">Announcements</h1>
                    <p className="text-muted-foreground">
                        Important updates and notifications for students
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Announcement
                </Button>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {filteredAnnouncements.length} announcements
                    </span>
                </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
                {filteredAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Published {new Date(announcement.publishedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{new Date(announcement.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant={getTargetColor(announcement.targetAudience)}>
                                    <Users className="h-3 w-3 mr-1" />
                                    {getTargetDisplay(announcement)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {announcement.content}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                <div className="text-sm text-muted-foreground">
                                    Target: {getTargetDisplay(announcement)}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                        Edit
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredAnnouncements.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No announcements found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms or create a new announcement.
                    </p>
                </div>
            )}

            {announcements.length === 0 && !searchTerm && (
                <div className="text-center py-12">
                    <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No announcements yet</h3>
                    <p className="text-muted-foreground">
                        Create your first announcement to keep students informed.
                    </p>
                    <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Announcement
                    </Button>
                </div>
            )}
        </div>
    );
}