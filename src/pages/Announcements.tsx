import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AddAnnouncementModal } from '../components/Modals';
import { useStore } from '../lib/store';
import type { Announcement } from '../lib/types';
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
import { AnnouncementForm } from '../components/announcements/AnnouncementForm';

export function Announcements() {
    const announcements = useStore((s) => s.announcements);
    const setAnnouncements = useStore((s) => s.setAnnouncements);
    const updateAnnouncement = useStore((s) => s.updateAnnouncement);
    const deleteAnnouncement = useStore((s) => s.deleteAnnouncement);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | null>(null);

    useEffect(() => {
        if (announcements.length === 0) {
            const mock: Announcement[] = [
                {
                    id: '1',
                    title: 'New Job Postings Available',
                    content: 'Several new job opportunities have been posted from top-tier companies. Check the job portal and apply before deadlines.',
                    target: 'ALL',
                    createdAt: '2024-01-24T10:00:00Z',
                    updatedAt: '2024-01-24T10:00:00Z',
                },
            ];
            setAnnouncements(mock);
        }
        setIsLoading(false);
    }, [announcements.length, setAnnouncements]);

    const filtered = announcements.filter(
        (a) =>
            a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    const targetLabel = (a: Announcement) => {
        switch (a.target) {
            case 'ALL':
                return 'All Students';
            case 'BRANCH':
                return `${a.targetValue} Students`;
            case 'BATCH':
                return `Batch ${a.targetValue}`;
            default:
                return 'All Students';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Announcements</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage announcements and notifications for students
                    </p>
                </div>
                {/* Keep existing modal trigger */}
                <AddAnnouncementModal />
            </div>

            {/* Search + count */}
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

            {/* Card list */}
            <div className="space-y-5">
                {filtered.map((a) => (
                    <div
                        key={a.id}
                        className="rounded-md border bg-card px-5 py-4 shadow-sm hover:shadow transition-shadow"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="font-medium text-sm md:text-base">{a.title}</h2>
                                    <span className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                        {targetLabel(a)}
                                    </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground">
                                    Published on {new Date(a.createdAt).toLocaleDateString()} at{' '}
                                    {new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                                    className="h-8 w-8 text-red-600 hover:text-red-700"
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
                            {a.content}
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
                            initialData={editingAnnouncement}
                            onSubmit={(data) => {
                                updateAnnouncement(editingAnnouncement.id, {
                                    title: data.title,
                                    content: data.content,
                                    target: data.target,
                                    targetValue: data.targetValue,
                                });
                                setEditOpen(false);
                            }}
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
                        <AlertDialogCancel className="hover:scale-[1.02] transition">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] transition"
                            onClick={() => {
                                if (deletingAnnouncement) deleteAnnouncement(deletingAnnouncement.id);
                                setDeleteOpen(false);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
