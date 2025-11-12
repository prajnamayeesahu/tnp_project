import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AddCompanyModal } from '../components/Modals';
import { useStore } from '../lib/store';
import type { Company } from '../lib/types';
import { Search, Building2, Edit, Trash2, ExternalLink } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '../components/ui/dialog';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '../components/ui/alert-dialog';
import { CompanyForm } from '../components/companies/CompanyForm';

export function Companies() {
    const companies = useStore((state) => state.companies);
    const setCompanies = useStore((state) => state.setCompanies);
    const deleteCompany = useStore((state) => state.deleteCompany);
    const updateCompany = useStore((state) => state.updateCompany);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load initial mock data if store is empty
        if (companies.length === 0) {
            const mockCompanies: Company[] = [
                {
                    id: '1',
                    name: 'TechCorp Solutions',
                    description: 'Leading technology solutions provider specializing in software development and consulting services.',
                    website: 'https://techcorp.com',
                    industry: 'Technology',
                    location: 'San Francisco, CA',
                    createdAt: '2024-01-01T10:00:00Z'
                },
                {
                    id: '2',
                    name: 'Global Finance Inc',
                    description: 'International financial services company providing investment banking and wealth management solutions.',
                    website: 'https://globalfinance.com',
                    industry: 'Finance',
                    location: 'New York, NY',
                    createdAt: '2024-01-02T10:00:00Z'
                }
            ];
            setCompanies(mockCompanies);
        }
        setIsLoading(false);
    }, [companies.length, setCompanies]);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h1 className="text-3xl font-bold">Companies</h1>
                    <p className="text-muted-foreground">Manage company profiles and partnerships</p>
                </div>
                <AddCompanyModal />
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden shadow-sm hover-lift">
                <table className="w-full text-sm">
                    <thead className="bg-muted/40">
                        <tr className="text-left">
                            <Th className="w-[45%]">Company Name</Th>
                            <Th className="w-48">Industry</Th>
                            <Th className="w-36">Location</Th>
                            <Th className="w-28">Website</Th>
                            <Th className="text-right w-28">Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map((company) => (
                            <tr key={company.id} className="border-t hover:bg-muted/50 transition-colors">
                                <Td>
                                    <div className="font-medium">{company.name}</div>
                                    <div className="text-xs text-muted-foreground line-clamp-1">{company.description}</div>
                                </Td>
                                <Td>{company.industry}</Td>
                                <Td>{company.location}</Td>
                                <Td>
                                    {company.website ? (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary inline-flex items-center gap-1 hover:underline"
                                        >
                                            Visit <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground">—</span>
                                    )}
                                </Td>
                                <Td className="text-right whitespace-nowrap">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        onClick={() => {
                                            setEditingCompany(company);
                                            setEditOpen(true);
                                        }}
                                        aria-label="Edit company"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-600 hover:text-red-700"
                                        onClick={() => {
                                            setDeletingCompany(company);
                                            setDeleteOpen(true);
                                        }}
                                        aria-label="Delete company"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Edit Company</DialogTitle>
                    </DialogHeader>
                    {editingCompany && (
                        <CompanyForm
                            initialData={editingCompany}
                            onSubmit={(data) => {
                                updateCompany(editingCompany.id, {
                                    name: data.name,
                                    description: data.description,
                                    website: data.website,
                                    industry: data.industry,
                                    location: data.location,
                                });
                                setEditOpen(false);
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-white border shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Company</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deletingCompany
                                ? `This will permanently delete ${deletingCompany.name}. This action cannot be undone.`
                                : 'This will permanently delete the company.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="hover:scale-[1.02] transition">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] transition"
                            onClick={() => {
                                if (deletingCompany) deleteCompany(deletingCompany.id);
                                setDeleteOpen(false);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {filteredCompanies.length === 0 && searchTerm && (
                <div className="text-center py-12">
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No companies found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms or add a new company.</p>
                </div>
            )}
        </div>
    );
}

function Th({ children, className = '' }: React.PropsWithChildren<{ className?: string }>) {
    return <th className={`px-4 py-3 text-xs font-medium text-muted-foreground ${className}`}>{children}</th>;
}
function Td({ children, className = '', colSpan }: React.PropsWithChildren<{ className?: string; colSpan?: number }>) {
    return (
        <td className={`px-4 py-3 align-middle ${className}`} colSpan={colSpan}>
            {children}
        </td>
    );
}