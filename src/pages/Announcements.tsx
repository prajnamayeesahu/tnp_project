import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, Megaphone, Edit, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '../components/ui/alert-dialog';
import axios from 'axios';
import {
    AnnouncementForm,
    AnnouncementFormValues,
} from '../components/announcements/AnnouncementForm';
import { AddAnnouncementModal } from '../components/Modals';

type FilterData = {
    branches?: string[];
    graduationYears?: number[];
};

type Announcement = {
    id: string;
    title: string;
    description: string;
    audience: 'ALL' | 'BRANCH' | 'BATCH';
    filterData: FilterData | null;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
};

export function Announcements() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] =
        useState<Announcement | null>(null);
    const [deletingAnnouncement, setDeletingAnnouncement] =
        useState<Announcement | null>(null);

    const getAuthHeader = () => {
        // const token = localStorage.getItem('token'); 
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWI1NjBkNWQxYzI5ZWZjN2U4Nzc3ZCIsIm5hbWUiOiJBbmFueWEgUGF0aSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzYzMzk5MTgyLCJleHAiOjE3NjU5OTExODJ9.7mShFVnyqVyU4gRCgwoWG6AFffOZlH23zm3z1XAj54Q"
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const URL = process.env.BACKEND_URI;

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setIsLoading(true);
                const headers = getAuthHeader();
                const res = await axios.get<{ data: Announcement[] }>(
                    `${URL}/api/v1/announcements`,
                    { headers }
                );
                setAnnouncements(res.data.data);
            } catch (err) {
                console.error('Failed to fetch announcements', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    const filtered = announcements.filter(
        (a) =>
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const targetLabel = (a: Announcement) => {
        if (a.audience === 'ALL') return 'All Students';
        if (a.audience === 'BRANCH') {
            const branches = a.filterData?.branches || [];
            return branches.length
                ? `${branches.join(', ')} Students`
                : 'Branch-specific';
        }
        if (a.audience === 'BATCH') {
            const years = a.filterData?.graduationYears || [];
            return years.length
                ? `Batch ${years.join(', ')}`
                : 'Batch-specific';
        }
        return 'All Students';
    };

    const handleEditSubmit = async (data: AnnouncementFormValues) => {
        if (!editingAnnouncement) return;

        try {
            const headers = getAuthHeader();

            let filterData: FilterData | undefined;
            if (data.audience === 'ALL') {
                filterData = {};
            } else if (data.audience === 'BRANCH') {
                filterData = { branches: data.branches };
            } else if (data.audience === 'BATCH') {
                filterData = { graduationYears: data.graduationYears };
            }

            const res = await axios.patch<{
                message: string;
                data: Announcement;
            }>(
                `${URL}/api/v1/announcements/${editingAnnouncement.id}`,
                {
                    title: data.title,
                    description: data.description,
                    audience: data.audience,
                    filterData,
                },
                { headers }
            );

            const updated = res.data.data;

            setAnnouncements((prev) =>
                prev.map((a) => (a.id === editingAnnouncement.id ? updated : a))
            );
            setEditOpen(false);
            setEditingAnnouncement(null);
        } catch (err) {
            console.error('Failed to update announcement', err);
        }
    };

    const handleDelete = async () => {
        if (!deletingAnnouncement) return;

        try {
            const headers = getAuthHeader();
            await axios.delete(
                `${URL}/api/v1/announcements/${deletingAnnouncement.id}`,
                { headers }
            );
            setAnnouncements((prev) =>
                prev.filter((a) => a.id !== deletingAnnouncement.id)
            );
        } catch (err) {
            console.error('Failed to delete announcement', err);
        } finally {
            setDeleteOpen(false);
            setDeletingAnnouncement(null);
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
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Announcements
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage announcements and notifications for students
                    </p>
                </div>
                <AddAnnouncementModal />
            </div>

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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Megaphone className="h-4 w-4" />
                    {filtered.length} announcements
                </div>
            </div>

            <div className="space-y-5">
                {filtered.map((a) => (
                    <div
                        key={a.id}
                        className="rounded-md border bg-card px-5 py-4 shadow-sm hover:shadow transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="font-medium text-sm md:text-base">
                                        {a.title}
                                    </h2>
                                    <span className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                        {targetLabel(a)}
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground">
                                    Published on{' '}
                                    {new Date(a.createdAt).toLocaleDateString()}{' '}
                                    at{' '}
                                    {new Date(a.createdAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
                                    onClick={() => {
                                        setEditingAnnouncement(a);
                                        setEditOpen(true);
                                    }}
                                    aria-label="Edit announcement"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-red-600 hover:text-red-700 cursor-pointer"
                                    onClick={() => {
                                        setDeletingAnnouncement(a);
                                        setDeleteOpen(true);
                                    }}
                                    aria-label="Delete announcement"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            {a.description}
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="rounded-md border bg-card px-5 py-10 text-center text-sm text-muted-foreground">
                        No announcements found.
                    </div>
                )}
            </div>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Announcement</DialogTitle>
                    </DialogHeader>
                    {editingAnnouncement && (
                        <AnnouncementForm
                            initialData={{
                                title: editingAnnouncement.title,
                                description: editingAnnouncement.description,
                                audience: editingAnnouncement.audience,
                                branches: editingAnnouncement.filterData?.branches ?? [],
                                graduationYears:
                                    editingAnnouncement.filterData?.graduationYears ?? [],
                            }}
                            onSubmit={handleEditSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-white border shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deletingAnnouncement
                                ? `This will permanently delete "${deletingAnnouncement.title}". This action cannot be undone.`
                                : 'This will permanently delete the announcement.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:scale-[1.02] transition">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] transition cursor-pointer"
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
