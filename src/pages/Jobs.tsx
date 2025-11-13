import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AddJobModal } from '../components/Modals';
import { useStore } from '../lib/store';
import type { Job, Company } from '../lib/types';
import { Search, Edit, Trash2, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { JobForm } from '../components/jobs/JobForm';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select';

export function Jobs() {
	const jobs = useStore((s) => s.jobs);
	const companies = useStore((s) => s.companies);
	const setJobs = useStore((s) => s.setJobs);
	const setCompanies = useStore((s) => s.setCompanies);
	const updateJob = useStore((s) => s.updateJob);
	const deleteJob = useStore((s) => s.deleteJob);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState<'all' | 'OPEN' | 'CLOSED'>('all');
	const [isLoading, setIsLoading] = useState(true);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [editingJob, setEditingJob] = useState<Job | null>(null);
	const [deletingJob, setDeletingJob] = useState<Job | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Ensure companies exist so the edit form's company select can display labels
		if (companies.length === 0) {
			const mockCompanies: Company[] = [
				{
					id: '1',
					name: 'TechCorp Solutions',
					description:
						'Leading technology solutions provider specializing in software development and consulting services.',
					website: 'https://techcorp.com',
					industry: 'Technology',
					location: 'San Francisco, CA',
					createdAt: '2024-01-01T10:00:00Z',
				},
				{
					id: '2',
					name: 'Global Finance Inc',
					description:
						'International financial services company providing investment banking and wealth management solutions.',
					website: 'https://globalfinance.com',
					industry: 'Finance',
					location: 'New York, NY',
					createdAt: '2024-01-02T10:00:00Z',
				},
			];
			setCompanies(mockCompanies);
		}

		if (jobs.length === 0) {
			const mockJobs: Job[] = [
				{
					id: '1',
					companyId: '1',
					companyName: 'TechCorp Solutions',
					title: 'Software Engineer',
					description:
						'We are looking for a talented Software Engineer to join our dynamic team.',
					requirements: 'React, Node.js, SQL',
					salary: '₹8.5 LPA',
					location: 'Bangalore',
					status: 'CLOSED',
					deadline: '2025-12-05',
					createdAt: '2025-01-20',
				},
				{
					id: '2',
					companyId: '2',
					companyName: 'Global Finance Inc',
					title: 'Data Analyst',
					description:
						'We are looking for a talented Data Analyst to join our dynamic team.',
					requirements: 'SQL, Python, BI tools',
					salary: '₹9.9 LPA',
					location: 'Hyderabad',
					status: 'OPEN',
					deadline: '2025-11-24',
					createdAt: '2025-02-10',
				},
			];
			setJobs(mockJobs);
		}

		setIsLoading(false);
	}, [companies.length, jobs.length, setCompanies, setJobs]);

	const filtered = useMemo(
		() =>
			jobs.filter((j) => {
				const matchesText =
					j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					j.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					j.location.toLowerCase().includes(searchTerm.toLowerCase());
				const norm = (j.status as any) === 'ACTIVE' ? 'OPEN' : j.status; // normalize
				const matchesStatus = statusFilter === 'all' || norm === statusFilter;
				return matchesText && matchesStatus;
			}),
		[jobs, searchTerm, statusFilter]
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
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Job Listings</h1>
					<p className="text-sm text-muted-foreground">Manage job postings and opportunities</p>
				</div>
				<AddJobModal />
			</div>

			{/* Filters row */}
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
				<Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="All Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="OPEN">Open</SelectItem>
						<SelectItem value="CLOSED">Closed</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* List (table-like) */}
			<div className="rounded-md border bg-card overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr className="text-left">
							<Th className="w-[32%]">Job</Th>
							<Th>Company</Th>
							<Th className="w-32">Location</Th>
							<Th className="w-24">Salary</Th>
							<Th className="w-32">Deadline</Th>
							<Th className="w-28">Status</Th>
							<Th className="text-right w-28">Actions</Th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((job) => (
							<tr key={job.id} className="border-t">
								<Td>
									<div className="font-medium">{job.title}</div>
									<div className="text-xs text-muted-foreground line-clamp-1">
										{job.description}
									</div>
								</Td>
								<Td>{job.companyName}</Td>
								<Td>{job.location}</Td>
								<Td>{job.salary}</Td>
								<Td>{new Date(job.deadline).toLocaleDateString()}</Td>
								<Td>
									<StatusPill status={(job.status as any) === 'ACTIVE' ? 'OPEN' : job.status} />
								</Td>
								<Td className="text-right whitespace-nowrap">
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 mr-1 bg-muted hover:bg-muted/80 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
										onClick={() => navigate(`/analytics/jobs/${job.id}`)}
										aria-label="View job analytics"
									>
										<BarChart2 className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
										onClick={() => {
											setEditingJob(job);
											setEditOpen(true);
										}}
										aria-label="Edit job"
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="h-8 w-8 text-red-600 hover:text-red-700 cursor-pointer"
										onClick={() => {
											setDeletingJob(job);
											setDeleteOpen(true);
										}}
										aria-label="Delete job"
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
						<DialogTitle className="text-xl">Edit Job</DialogTitle>
					</DialogHeader>
					{editingJob && (
						<JobForm
							key={`${editingJob.id}-${companies.length}`}
							initialData={editingJob}
							companies={companies}
							onSubmit={(data) => {
								const companyName = companies.find((c) => c.id === data.companyId)?.name || editingJob.companyName;
								updateJob(editingJob.id, {
									companyId: data.companyId,
									companyName,
									title: data.title,
									description: data.description,
									requirements: data.requirements,
									salary: data.salary,
									location: data.location,
									deadline: data.deadline,
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
						<AlertDialogTitle>Delete Job</AlertDialogTitle>
						<AlertDialogDescription>
							{deletingJob
								? `This will permanently delete ${deletingJob.title}. This action cannot be undone.`
								: 'This will permanently delete the job.'}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="hover:scale-[1.02] transition">Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-[1.02] transition cursor-pointer"
							onClick={() => {
								if (deletingJob) deleteJob(deletingJob.id);
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

function StatusPill({ status }: { status: 'OPEN' | 'CLOSED' }) {
	const map: Record<string, string> = {
		OPEN: 'bg-blue-100 text-blue-700',
		CLOSED: 'bg-muted text-muted-foreground',
	};
	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[status]}`}>
			{status}
		</span>
	);
}
