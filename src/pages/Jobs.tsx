import { useEffect, useMemo, useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select';
import axios from 'axios';
import { JobForm, JobFormValues } from '../components/jobs/JobForm';

type Company = {
	id: string;
	name: string;
};

type Job = {
	id: string;
	companyId: string;
	companyName: string;
	jobTitle: string;
	jobType: string;
	description: string;
	testLink: string | null;
	status: 'OPEN' | 'CLOSED' | 'DRAFT' | string;
	company?: Company | null;
	eligibility?: {
		id: string;
		branches: string[];
		graduationYears: number[];
		minCgpa: number | null;
	} | null;
};

export function Jobs() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] =
		useState<'all' | 'OPEN' | 'CLOSED'>('all');
	const [isLoading, setIsLoading] = useState(true);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [editingJob, setEditingJob] = useState<Job | null>(null);
	const [deletingJob, setDeletingJob] = useState<Job | null>(null);
	const navigate = useNavigate();

	const getAuthHeader = () => {
		// const token = localStorage.getItem('token');
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWI1NjBkNWQxYzI5ZWZjN2U4Nzc3ZCIsIm5hbWUiOiJBbmFueWEgUGF0aSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzYzMzk5MTgyLCJleHAiOjE3NjU5OTExODJ9.7mShFVnyqVyU4gRCgwoWG6AFffOZlH23zm3z1XAj54Q"
		return token
			? {
				Authorization: `Bearer ${token}`,
			}
			: {};
	};

	// fetch companies + jobs from backend
	useEffect(() => {
		const fetchAll = async () => {
			try {
				setIsLoading(true);
				const headers = getAuthHeader();

				const [companiesRes, jobsRes] = await Promise.all([
					axios.get<Company[]>(
						'http://localhost:8000/api/v1/companies',
						{ headers }
					),
					axios.get<Job[]>(
						'http://localhost:8000/api/jobs',
						{ headers }
					),
				]);

				setCompanies(companiesRes.data);
				setJobs(jobsRes.data);
			} catch (err) {
				console.error('Failed to load jobs/companies', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAll();
	}, []);

	const filtered = useMemo(
		() =>
			jobs.filter((j) => {
				const matchesText =
					j.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
					j.companyName.toLowerCase().includes(searchTerm.toLowerCase());
				const norm = (j.status as any) === 'ACTIVE' ? 'OPEN' : j.status;
				const matchesStatus = statusFilter === 'all' || norm === statusFilter;
				return matchesText && matchesStatus;
			}),
		[jobs, searchTerm, statusFilter]
	);

	const handleEditSubmit = async (data: JobFormValues) => {
		if (!editingJob) return;

		try {
			const companyName =
				companies.find((c) => c.id === data.companyId)?.name ||
				editingJob.companyName;

			const headers = getAuthHeader();

			const res = await axios.put<{
				message: string;
				updated: Job;
			}>(
				`http://localhost:8000/api/jobs/${editingJob.id}`,
				{
					companyName,
					jobTitle: data.jobTitle,
					jobType: data.jobType,
					description: data.description,
					status: data.status,
					testLink: data.testLink,
					companyId: data.companyId,
				},
				{ headers }
			);

			const updatedJob = res.data.updated;

			setJobs((prev) =>
				prev.map((j) => (j.id === editingJob.id ? updatedJob : j))
			);
			setEditOpen(false);
			setEditingJob(null);
		} catch (err) {
			console.error('Failed to update job', err);
		}
	};

	const handleDelete = async () => {
		if (!deletingJob) return;

		try {
			const headers = getAuthHeader();

			await axios.delete(
				`http://localhost:8000/api/jobs/${deletingJob.id}`,
				{ headers }
			);
			setJobs((prev) => prev.filter((j) => j.id !== deletingJob.id));
		} catch (err) {
			console.error('Failed to delete job', err);
		} finally {
			setDeleteOpen(false);
			setDeletingJob(null);
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
						Job Listings
					</h1>
					<p className="text-sm text-muted-foreground">
						Manage job postings and opportunities
					</p>
				</div>
			</div>

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
				<Select
					value={statusFilter}
					onValueChange={(v: any) => setStatusFilter(v)}
				>
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

			<div className="rounded-md border bg-card overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted/40">
						<tr className="text-left">
							<Th className="w-[32%]">Job</Th>
							<Th>Company</Th>
							<Th className="w-32">Job Type</Th>
							<Th className="w-40">Test Link</Th>
							<Th className="w-28">Status</Th>
							<Th className="text-right w-28">Actions</Th>
						</tr>
					</thead>
					<tbody>
						{filtered.map((job) => (
							<tr key={job.id} className="border-t">
								<Td>
									<div className="font-medium">{job.jobTitle}</div>
									<div className="text-xs text-muted-foreground line-clamp-1">
										{job.description}
									</div>
								</Td>
								<Td>{job.companyName}</Td>
								<Td>{job.jobType}</Td>
								<Td>
									{job.testLink ? (
										<a
											href={job.testLink}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary underline text-xs"
										>
											Open test
										</a>
									) : (
										<span className="text-muted-foreground text-xs">—</span>
									)}
								</Td>
								<Td>
									<StatusPill
										status={
											((job.status as any) === 'ACTIVE'
												? 'OPEN'
												: job.status) as 'OPEN' | 'CLOSED'
										}
									/>
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
							initialData={{
								companyId: editingJob.companyId,
								jobTitle: editingJob.jobTitle,
								jobType: editingJob.jobType,
								description: editingJob.description,
								testLink: editingJob.testLink || '',
								status:
									((editingJob.status as any) === 'ACTIVE'
										? 'OPEN'
										: editingJob.status) as 'OPEN' | 'CLOSED',
							}}
							companies={companies}
							onSubmit={handleEditSubmit}
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
								? `This will permanently delete ${deletingJob.jobTitle}. This action cannot be undone.`
								: 'This will permanently delete the job.'}
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

function Th({
	children,
	className = '',
}: React.PropsWithChildren<{ className?: string }>) {
	return (
		<th
			className={`px-4 py-3 text-xs font-medium text-muted-foreground ${className}`}
		>
			{children}
		</th>
	);
}

function Td({
	children,
	className = '',
	colSpan,
}: React.PropsWithChildren<{ className?: string; colSpan?: number }>) {
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
		<span
			className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[status]}`}
		>
			{status}
		</span>
	);
}
