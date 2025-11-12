import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { StudentForm } from './students/studentForm';
import { CompanyForm } from './companies/CompanyForm';
import { JobForm } from './jobs/JobForm';
import { AnnouncementForm } from './announcements/AnnouncementForm';
import { Plus, UserPlus, Building2, Briefcase, Megaphone } from 'lucide-react';
import { toast } from 'sonner';
import { useStore } from '../lib/store';
import type { StudentFormData, CompanyFormData, JobFormData, AnnouncementFormData } from '../lib/schemas';
import type { Student, Company, Job, Announcement, JobStatus, AnnouncementTarget } from '../lib/types';

// Student Modal
export function AddStudentModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addStudent = useStore((state) => state.addStudent);

    const handleSubmit = async (data: StudentFormData) => {
        setIsLoading(true);
        try {
            const newStudent: Student = {
                id: Date.now().toString(), // Simple ID generation
                registrationNumber: data.registrationNumber,
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                branch: data.branch,
                year: data.year,
                cgpa: data.cgpa,
                profileCompleted: false, // Default to incomplete profile
                createdAt: new Date().toISOString()
            };

            addStudent(newStudent);
            toast.success('Student added successfully!');
            setOpen(false);
        } catch (error) {
            toast.error('Failed to add student');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Student
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <UserPlus className="h-5 w-5" />
                        Add New Student
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Fill in the student details below to add them to the system.
                    </DialogDescription>
                </DialogHeader>
                <StudentForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}

// Company Modal
export function AddCompanyModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addCompany = useStore((state) => state.addCompany);

    const handleSubmit = async (data: CompanyFormData) => {
        setIsLoading(true);
        try {
            const newCompany: Company = {
                id: Date.now().toString(),
                name: data.name,
                description: data.description,
                website: data.website,
                industry: data.industry,
                location: data.location,
                createdAt: new Date().toISOString()
            };

            addCompany(newCompany);
            toast.success('Company added successfully!');
            setOpen(false);
        } catch (error) {
            toast.error('Failed to add company');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Company
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <Building2 className="h-5 w-5" />
                        Add New Company
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Enter company information to add them as a partner.
                    </DialogDescription>
                </DialogHeader>
                <CompanyForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}

// Job Modal
export function AddJobModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addJob = useStore((state) => state.addJob);
    const companies = useStore((state) => state.companies);

    const handleSubmit = async (data: JobFormData) => {
        setIsLoading(true);
        try {
            const selectedCompany = companies.find(c => c.id === data.companyId);
            const newJob: Job = {
                id: Date.now().toString(),
                companyId: data.companyId,
                companyName: selectedCompany?.name || 'Unknown Company',
                title: data.title,
                description: data.description,
                requirements: data.requirements,
                salary: data.salary,
                location: data.location,
                status: 'ACTIVE' as JobStatus,
                deadline: data.deadline,
                createdAt: new Date().toISOString()
            };

            addJob(newJob);
            toast.success('Job posted successfully!');
            setOpen(false);
        } catch (error) {
            toast.error('Failed to post job');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post Job
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <Briefcase className="h-5 w-5" />
                        Post New Job
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Create a new job posting for students to apply.
                    </DialogDescription>
                </DialogHeader>
                <JobForm onSubmit={handleSubmit} isLoading={isLoading} companies={companies} />
            </DialogContent>
        </Dialog>
    );
}

// Announcement Modal
export function AddAnnouncementModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addAnnouncement = useStore((state) => state.addAnnouncement);

    const handleSubmit = async (data: AnnouncementFormData) => {
        setIsLoading(true);
        try {
            const newAnnouncement: Announcement = {
                id: Date.now().toString(),
                title: data.title,
                content: data.content,
                target: data.target as AnnouncementTarget,
                targetValue: data.targetValue,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            addAnnouncement(newAnnouncement);
            toast.success('Announcement created successfully!');
            setOpen(false);
        } catch (error) {
            toast.error('Failed to create announcement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Announcement
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-gray-900">
                        <Megaphone className="h-5 w-5" />
                        Create New Announcement
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Share important information with students.
                    </DialogDescription>
                </DialogHeader>
                <AnnouncementForm onSubmit={handleSubmit} isLoading={isLoading} />
            </DialogContent>
        </Dialog>
    );
}