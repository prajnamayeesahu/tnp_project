import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../lib/store';
import type { Application } from '../lib/types';
import { FileText } from 'lucide-react';

export function Applications() {
    const applications = useStore((s) => s.applications);
    const setApplications = useStore((s) => s.setApplications);
    const updateApplication = useStore((s) => s.updateApplication);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (applications.length === 0) {
            const mock: Application[] = [
                // Software Engineer — Tech Corp 
                { id: 'a1', jobId: 'job1', studentId: 's1', studentName: 'Student 1', jobTitle: 'Software Engineer', companyName: 'Tech Corp', status: 'APPLIED', appliedAt: '2025-10-21', updatedAt: '2025-11-07' },
                { id: 'a2', jobId: 'job1', studentId: 's16', studentName: 'Student 16', jobTitle: 'Software Engineer', companyName: 'Tech Corp', status: 'APPLIED', appliedAt: '2025-10-27', updatedAt: '2025-11-12' },
                { id: 'a3', jobId: 'job1', studentId: 's31', studentName: 'Student 31', jobTitle: 'Software Engineer', companyName: 'Tech Corp', status: 'APPLIED', appliedAt: '2025-10-17', updatedAt: '2025-11-06' },
                { id: 'a4', jobId: 'job1', studentId: 's46', studentName: 'Student 46', jobTitle: 'Software Engineer', companyName: 'Tech Corp', status: 'APPLIED', appliedAt: '2025-11-01', updatedAt: '2025-11-10' },
                { id: 'a7', jobId: 'job1', studentId: 's41', studentName: 'Student 41', jobTitle: 'Software Engineer', companyName: 'Tech Corp', status: 'APPLIED', appliedAt: '2025-11-05', updatedAt: '2025-11-07' },
                // Data Analyst — InnoSoft Solutions 
                { id: 'b1', jobId: 'job2', studentId: 's2', studentName: 'Student 2', jobTitle: 'Data Analyst', companyName: 'InnoSoft Solutions', status: 'SHORTLISTED', appliedAt: '2025-11-03', updatedAt: '2025-11-10' },
                { id: 'b2', jobId: 'job2', studentId: 's17', studentName: 'Student 17', jobTitle: 'Data Analyst', companyName: 'InnoSoft Solutions', status: 'SHORTLISTED', appliedAt: '2025-10-17', updatedAt: '2025-11-02' },
            ];
            setApplications(mock);
        }
        setIsLoading(false);
    }, [applications.length, setApplications]);
    // Group by jobId (fallback to jobTitle|companyName if id missing)
    const groups = useMemo(() => {
        const m: Record<string, { key: string; jobTitle: string; companyName: string; items: Application[] }> = {};
        for (const a of applications) {
            const key = a.jobId || `${a.jobTitle}|${a.companyName}`;
            if (!m[key]) m[key] = { key, jobTitle: a.jobTitle, companyName: a.companyName, items: [] };
            m[key].items.push(a);
        }
        return Object.values(m);
    }, [applications]);

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Applications</h1>
                <p className="text-sm text-muted-foreground">Track and manage student job applications</p>
            </div>

            {groups.map((g) => (
                <div key={g.key} className="rounded-md border overflow-hidden bg-background">
                    {/* Group header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/60">
                        <div>
                            <div className="font-medium text-sm">{g.jobTitle}</div>
                            <div className="text-xs text-muted-foreground">{g.companyName}</div>
                        </div>
                        <span className="text-[11px] rounded-full border px-2 py-0.5 text-muted-foreground">
                            {g.items.length} Applications
                        </span>
                    </div>
                    {/* Group table */}
                    <div className="w-full">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-muted-foreground bg-background/80">
                                    <Th>Student</Th>
                                    <Th className="w-40">Applied On</Th>
                                    <Th className="w-40">Last Updated</Th>
                                    <Th className="w-32">Status</Th>
                                    <Th className="w-40">Update Status</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {g.items.map((a) => (
                                    <tr key={a.id} className="border-t">
                                        <Td>{a.studentName}</Td>
                                        <Td>{new Date(a.appliedAt).toLocaleDateString()}</Td>
                                        <Td>{new Date(a.updatedAt).toLocaleDateString()}</Td>
                                        <Td>
                                            <StatusBadge status={a.status} />
                                        </Td>
                                        <Td>
                                            <select
                                                value={a.status}
                                                onChange={(e) =>
                                                    updateApplication(a.id, { status: e.target.value as any, updatedAt: new Date().toISOString() })
                                                }
                                                className="px-3 py-1.5 border rounded-md bg-background text-sm"
                                            >
                                                <option value="APPLIED">Applied</option>
                                                <option value="SHORTLISTED">Shortlisted</option>
                                                <option value="INTERVIEW">Interview</option>
                                                <option value="ACCEPTED">Accepted</option>
                                                <option value="REJECTED">Rejected</option>
                                            </select>
                                        </Td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {groups.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                    <p className="text-muted-foreground">Applications will appear here once students start applying for jobs.</p>
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

function StatusBadge({ status }: { status: Application['status'] }) {
    const map: Record<string, string> = {
        APPLIED: 'bg-blue-100 text-blue-700',
        SHORTLISTED: 'bg-purple-100 text-purple-700',
        INTERVIEW: 'bg-amber-100 text-amber-700',
        ACCEPTED: 'bg-green-100 text-green-700',
        REJECTED: 'bg-red-100 text-red-700',
    };
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[status] || 'bg-muted text-muted-foreground'}`}>
            {status}
        </span>
    );
}