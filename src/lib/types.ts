// Core types for the admin dashboard

export type Branch = 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL';
export type Year = '1' | '2' | '3' | '4';
export type JobStatus = 'OPEN' | 'CLOSED';
export type ApplicationStatus = 'APPLIED' | 'SHORTLISTED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
export type AnnouncementTarget = 'ALL' | 'BRANCH' | 'BATCH';

export interface Student {
  id: string;
  registrationNumber: string;
  name: string;
  email: string;
  branch: Branch;
  year: Year;
  cgpa: number;
  phone?: string;
  profileCompleted: boolean;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website?: string;
  industry: string;
  location: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string;
  salary: string;
  location: string;
  status: JobStatus;
  deadline: string;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target: AnnouncementTarget;
  targetValue?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalCompanies: number;
  activeJobs: number;
  pendingApplications: number;
  profileCompletion: number;
  placedStudents: number;
}
