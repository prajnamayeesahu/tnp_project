import { useEffect, useState } from 'react';
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
import { CompanyForm, CompanyFormValues } from './companies/CompanyForm';
import { JobForm, JobFormValues } from './jobs/JobForm';
import {
    AnnouncementForm,
    AnnouncementFormValues,
} from './announcements/AnnouncementForm';
import { Plus, UserPlus, Building2, Briefcase, Megaphone } from 'lucide-react';
import { toast } from 'sonner';
import { useStore } from '../lib/store'; 
import type { StudentFormData } from '../lib/schemas';
import type { Student } from '../lib/types';
import axios from 'axios';

// --------- helpers ---------
const getAuthHeader = () => {
    // const token = localStorage.getItem('token'); 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWI1NjBkNWQxYzI5ZWZjN2U4Nzc3ZCIsIm5hbWUiOiJBbmFueWEgUGF0aSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzYzMzk5MTgyLCJleHAiOjE3NjU5OTExODJ9.7mShFVnyqVyU4gRCgwoWG6AFffOZlH23zm3z1XAj54Q"
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// =======================
// Student Modal (local store hi rehne de abhi)
// =======================
export function AddStudentModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const addStudent = useStore((state) => state.addStudent);

    const handleSubmit = async (data: StudentFormData) => {
        setIsLoading(true);
        try {
            const newStudent: Student = {
                id: Date.now().toString(),
                registrationNumber: data.registrationNumber,
                name: data.name,
                email: data.email,
                phone: data.phone || '',
                branch: data.branch,
                year: data.year,
                cgpa: data.cgpa,
                profileCompleted: false,
                createdAt: new Date().toISOString(),
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
                <Button disabled={isLoading}>
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

// =======================
// Company Modal (hits /api/v1/companies, admin only)
// =======================
export function AddCompanyModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: CompanyFormValues) => {
        setIsLoading(true);
        try {
            const headers = getAuthHeader();

            await axios.post(
                'http://localhost:8000/api/v1/companies',
                {
                    name: data.name,
                    description: data.description,
                    industry: data.industry,
                    website: data.website,
                    contactPerson: data.contactPerson,
                    contactEmail: data.contactEmail,
                },
                { headers }
            );

            toast.success('Company added successfully!');
            setOpen(false);

            // simplest refresh so Companies list picks it up
            // (agar nahi chahiye toh ye line hata sakta hai)
            // window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add company');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
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
                <CompanyForm onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    );
}

// =======================
// Job Modal (hits /api/v1/jobs, admin only)
// =======================
type CompanyOption = {
    id: string;
    name: string;
};

export function AddJobModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [companies, setCompanies] = useState<CompanyOption[]>([]);
    const [loadingCompanies, setLoadingCompanies] = useState(false);

    // load companies for select
    useEffect(() => {
        if (!open) return;
        const fetchCompanies = async () => {
            try {
                setLoadingCompanies(true);
                const headers = getAuthHeader();
                const res = await axios.get<CompanyOption[]>(
                    'http://localhost:8000/api/v1/companies',
                    { headers }
                );
                setCompanies(res.data);
            } catch (err) {
                console.error('Failed to load companies for job form', err);
            } finally {
                setLoadingCompanies(false);
            }
        };
        fetchCompanies();
    }, [open]);

    const handleSubmit = async (data: JobFormValues) => {
        setIsLoading(true);
        try {
            const headers = getAuthHeader();
            const selectedCompany = companies.find((c) => c.id === data.companyId);
            const companyName = selectedCompany?.name || 'Unknown Company';

            await axios.post(
                'http://localhost:8000/api/v1/jobs',
                {
                    companyId: data.companyId,
                    companyName,
                    jobTitle: data.jobTitle,
                    jobType: data.jobType,
                    description: data.description,
                    testLink: data.testLink,
                    status: data.status, // 'OPEN' | 'CLOSED'
                    eligibility: {
                        branches: [],
                        graduationYears: [],
                        minCgpa: null,
                    },
                },
                { headers }
            );

            toast.success('Job posted successfully!');
            setOpen(false);
            // window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Failed to post job');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
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
                {loadingCompanies ? (
                    <div className="py-6 text-sm text-muted-foreground">
                        Loading companies...
                    </div>
                ) : (
                    <JobForm onSubmit={handleSubmit} companies={companies} />
                )}
            </DialogContent>
        </Dialog>
    );
}

// =======================
// Announcement Modal (hits /api/v1/announcements, admin only)
// =======================
export function AddAnnouncementModal() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: AnnouncementFormValues) => {
        setIsLoading(true);
        try {
            const headers = getAuthHeader();

            let filterData: any = {};
            if (data.audience === 'BRANCH') {
                filterData = { branches: data.branches };
            } else if (data.audience === 'BATCH') {
                filterData = { graduationYears: data.graduationYears };
            }

            await axios.post(
                'http://localhost:8000/api/v1/announcements',
                {
                    title: data.title,
                    description: data.description,
                    audience: data.audience,
                    filterData,
                },
                { headers }
            );

            toast.success('Announcement created successfully!');
            setOpen(false);
            // window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create announcement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
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
                <AnnouncementForm onSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    );
}
