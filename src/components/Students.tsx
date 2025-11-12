import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
    Users,
    Search,
    Plus,
    Mail,
    Phone,
    GraduationCap
} from 'lucide-react';

interface Student {
    id: string;
    registrationNumber: string;
    name: string;
    email: string;
    phone: string;
    branch: string;
    year: number;
    cgpa: number;
    profileCompleted: boolean;
}

export function Students() {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockStudents: Student[] = [
            {
                id: '1',
                registrationNumber: 'CS2021001',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                branch: 'Computer Science',
                year: 3,
                cgpa: 8.5,
                profileCompleted: true
            },
            {
                id: '2',
                registrationNumber: 'EE2021002',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '+1234567891',
                branch: 'Electrical Engineering',
                year: 4,
                cgpa: 9.2,
                profileCompleted: true
            },
            {
                id: '3',
                registrationNumber: 'ME2021003',
                name: 'Mike Johnson',
                email: 'mike.johnson@example.com',
                phone: '+1234567892',
                branch: 'Mechanical Engineering',
                year: 2,
                cgpa: 7.8,
                profileCompleted: false
            }
        ];

        setTimeout(() => {
            setStudents(mockStudents);
            setIsLoading(false);
        }, 1000);
    }, []);

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h1 className="text-3xl font-bold">Students</h1>
                    <p className="text-muted-foreground">
                        Manage student profiles and registrations
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                </Button>
            </div>

            {/* Search and Stats */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {filteredStudents.length} students
                    </span>
                </div>
            </div>

            {/* Students Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                    <Card key={student.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{student.name}</CardTitle>
                                <Badge variant={student.profileCompleted ? 'default' : 'secondary'}>
                                    {student.profileCompleted ? 'Complete' : 'Incomplete'}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {student.registrationNumber}
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span>{student.branch}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Year {student.year}</span>
                                <span className="font-medium">CGPA: {student.cgpa}</span>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" className="flex-1">
                                    View
                                </Button>
                                <Button size="sm" className="flex-1">
                                    Edit
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredStudents.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No students found</h3>
                    <p className="text-muted-foreground">
                        Try adjusting your search terms or add a new student.
                    </p>
                </div>
            )}
        </div>
    );
}