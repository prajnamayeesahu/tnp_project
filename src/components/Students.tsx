import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from './ui/alert-dialog';
import { AddStudentModal } from './Modals';
import { StudentForm } from './students/studentForm';
import { useStore } from '../lib/store';
import type { Student } from '../lib/types';
import { Search, Edit, Trash2, Users } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export function Students() {
    const students = useStore((state) => state.students);
    const setStudents = useStore((state) => state.setStudents);
    const deleteStudent = useStore((state) => state.deleteStudent);
    const updateStudent = useStore((state) => state.updateStudent);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [branchFilter, setBranchFilter] = useState<'all' | 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL'>('all');
    const [yearFilter, setYearFilter] = useState<'all' | '1' | '2' | '3' | '4'>('all');
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

    useEffect(() => {
        // Load initial mock data if store is empty
        if (students.length === 0) {
            const mockStudents: Student[] = [
                { id: '1', registrationNumber: 'REG2020001', name: 'Student 1', email: 'student1@university.edu', phone: '+91 5221545175', branch: 'CSE', year: '1', cgpa: 7.98, profileCompleted: true, createdAt: '2024-01-01T10:00:00Z' },
                { id: '2', registrationNumber: 'REG2021002', name: 'Student 2', email: 'student2@university.edu', phone: '+91 5221545175', branch: 'ECE', year: '2', cgpa: 7.78, profileCompleted: false, createdAt: '2024-01-02T10:00:00Z' },
                { id: '3', registrationNumber: 'REG2022003', name: 'Student 3', email: 'student3@university.edu', phone: '+91 5221545175', branch: 'EEE', year: '3', cgpa: 7.02, profileCompleted: true, createdAt: '2024-01-03T10:00:00Z' },
                { id: '4', registrationNumber: 'REG2023004', name: 'Student 4', email: 'student4@university.edu', phone: '+91 5221545175', branch: 'MECH', year: '4', cgpa: 6.95, profileCompleted: true, createdAt: '2024-01-04T10:00:00Z' },
                { id: '5', registrationNumber: 'REG2020005', name: 'Student 5', email: 'student5@university.edu', phone: '+91 5221545175', branch: 'CIVIL', year: '1', cgpa: 7.84, profileCompleted: false, createdAt: '2024-01-05T10:00:00Z' },
                { id: '6', registrationNumber: 'REG2021006', name: 'Student 6', email: 'student6@university.edu', phone: '+91 5221545175', branch: 'CSE', year: '2', cgpa: 8.69, profileCompleted: false, createdAt: '2024-01-06T10:00:00Z' },
                { id: '7', registrationNumber: 'REG2022007', name: 'Student 7', email: 'student7@university.edu', phone: '+91 5221545175', branch: 'ECE', year: '3', cgpa: 6.60, profileCompleted: true, createdAt: '2024-01-07T10:00:00Z' },
                { id: '8', registrationNumber: 'REG2023008', name: 'Student 8', email: 'student8@university.edu', phone: '+91 5221545175', branch: 'EEE', year: '4', cgpa: 9.87, profileCompleted: false, createdAt: '2024-01-08T10:00:00Z' },
                { id: '9', registrationNumber: 'REG2020009', name: 'Student 9', email: 'student9@university.edu', phone: '+91 5221545175', branch: 'MECH', year: '1', cgpa: 9.49, profileCompleted: true, createdAt: '2024-01-09T10:00:00Z' },
                { id: '10', registrationNumber: 'REG2021010', name: 'Student 10', email: 'student10@university.edu', phone: '+91 5221545175', branch: 'CIVIL', year: '2', cgpa: 7.44, profileCompleted: false, createdAt: '2024-01-10T10:00:00Z' },
                { id: '11', registrationNumber: 'REG2022011', name: 'Student 11', email: 'student11@university.edu', phone: '+91 5221545175', branch: 'CSE', year: '3', cgpa: 6.72, profileCompleted: true, createdAt: '2024-01-11T10:00:00Z' },
                { id: '12', registrationNumber: 'REG2023012', name: 'Student 12', email: 'student12@university.edu', phone: '+91 5221545175', branch: 'ECE', year: '4', cgpa: 7.41, profileCompleted: false, createdAt: '2024-01-12T10:00:00Z' },
            ];
            setStudents(mockStudents);
        }
        setIsLoading(false);
    }, [students.length, setStudents]);

    const searchText = searchTerm.toLowerCase();
    const filteredStudents = students.filter((student) => {
        const matchesText =
            student.name.toLowerCase().includes(searchText) ||
            student.registrationNumber.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText);
        const matchesBranch = branchFilter === 'all' || student.branch === branchFilter;
        const matchesYear = yearFilter === 'all' || student.year === yearFilter;
        return matchesText && matchesBranch && matchesYear;
    });

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
                    <h1 className="text-3xl font-bold">Students</h1>
                    <p className="text-muted-foreground">Manage student records and profiles</p>
                </div>
                <AddStudentModal />
            </div>

            {/* Search and Stats */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or registration number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={branchFilter} onValueChange={(v: any) => setBranchFilter(v)}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="EEE">EEE</SelectItem>
                        <SelectItem value="MECH">MECH</SelectItem>
                        <SelectItem value="CIVIL">CIVIL</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={yearFilter} onValueChange={(v: any) => setYearFilter(v)}>
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        <SelectItem value="1">Year 1</SelectItem>
                        <SelectItem value="2">Year 2</SelectItem>
                        <SelectItem value="3">Year 3</SelectItem>
                        <SelectItem value="4">Year 4</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Students Table */}
            <div className="rounded-lg border bg-card overflow-hidden shadow-sm hover-lift">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-44">Registration No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="w-28">Branch</TableHead>
                            <TableHead className="w-20">Year</TableHead>
                            <TableHead className="w-20">CGPA</TableHead>
                            <TableHead className="w-28">Status</TableHead>
                            <TableHead className="text-right w-28">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">{student.registrationNumber}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell className="max-w-[240px] truncate text-muted-foreground">{student.email}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal">{student.branch}</Badge>
                                </TableCell>
                                <TableCell>Year {student.year}</TableCell>
                                <TableCell>{student.cgpa.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={student.profileCompleted ? 'default' : 'secondary'}>
                                        {student.profileCompleted ? 'Complete' : 'Incomplete'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        onClick={() => {
                                            setEditingStudent(student);
                                            setEditOpen(true);
                                        }}
                                        aria-label={`Edit ${student.name}`}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-600 hover:text-red-700"
                                        onClick={() => {
                                            setDeletingStudent(student);
                                            setDeleteOpen(true);
                                        }}
                                        aria-label={`Delete ${student.name}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Student Modal */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Student</DialogTitle>
                    </DialogHeader>
                    {editingStudent && (
                        <StudentForm
                            initialData={editingStudent}
                            onSubmit={(data) => {
                                updateStudent(editingStudent.id, {
                                    registrationNumber: data.registrationNumber,
                                    name: data.name,
                                    email: data.email,
                                    phone: data.phone,
                                    branch: data.branch,
                                    year: data.year,
                                    cgpa: data.cgpa
                                });
                                setEditOpen(false);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-white border shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deletingStudent
                                ? `This will permanently delete ${deletingStudent.name}'s record. This action cannot be undone.`
                                : 'This will permanently delete the record.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:scale-[1.02] transition">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] transition"
                            onClick={() => {
                                if (deletingStudent) {
                                    deleteStudent(deletingStudent.id);
                                }
                                setDeleteOpen(false);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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