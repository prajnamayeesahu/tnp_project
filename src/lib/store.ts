import { create } from 'zustand';
import type { Student, Company, Job, Application, Announcement, DashboardStats } from './types';

interface AppState {
  // Data
  students: Student[];
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  announcements: Announcement[];
  dashboardStats: DashboardStats | null;

  // Loading states
  isLoading: boolean;

  // Setters
  setStudents: (students: Student[]) => void;
  setCompanies: (companies: Company[]) => void;
  setJobs: (jobs: Job[]) => void;
  setApplications: (applications: Application[]) => void;
  setAnnouncements: (announcements: Announcement[]) => void;
  setDashboardStats: (stats: DashboardStats) => void;
  setIsLoading: (isLoading: boolean) => void;

  // Add/Update/Delete helpers
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  addCompany: (company: Company) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;

  addJob: (job: Job) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;

  addApplication: (application: Application) => void;
  updateApplication: (id: string, application: Partial<Application>) => void;
  deleteApplication: (id: string) => void;

  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  students: [],
  companies: [],
  jobs: [],
  applications: [],
  announcements: [],
  dashboardStats: null,
  isLoading: false,

  // Setters
  setStudents: (students) => set({ students }),
  setCompanies: (companies) => set({ companies }),
  setJobs: (jobs) => set({ jobs }),
  setApplications: (applications) => set({ applications }),
  setAnnouncements: (announcements) => set({ announcements }),
  setDashboardStats: (dashboardStats) => set({ dashboardStats }),
  setIsLoading: (isLoading) => set({ isLoading }),

  // Students
  addStudent: (student) => set((state) => ({ students: [student, ...state.students] })),
  updateStudent: (id, updatedStudent) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, ...updatedStudent } : s)),
    })),
  deleteStudent: (id) => set((state) => ({ students: state.students.filter((s) => s.id !== id) })),

  // Companies
  addCompany: (company) => set((state) => ({ companies: [company, ...state.companies] })),
  updateCompany: (id, updatedCompany) =>
    set((state) => ({
      companies: state.companies.map((c) => (c.id === id ? { ...c, ...updatedCompany } : c)),
    })),
  deleteCompany: (id) => set((state) => ({ companies: state.companies.filter((c) => c.id !== id) })),

  // Jobs
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJob: (id, updatedJob) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updatedJob } : j)),
    })),
  deleteJob: (id) => set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) })),

  // Applications
  addApplication: (application) => set((state) => ({ applications: [application, ...state.applications] })),
  updateApplication: (id, updatedApplication) =>
    set((state) => ({
      applications: state.applications.map((a) => (a.id === id ? { ...a, ...updatedApplication } : a)),
    })),
  deleteApplication: (id) => set((state) => ({ applications: state.applications.filter((a) => a.id !== id) })),

  // Announcements
  addAnnouncement: (announcement) =>
    set((state) => ({ announcements: [announcement, ...state.announcements] })),
  updateAnnouncement: (id, updatedAnnouncement) =>
    set((state) => ({
      announcements: state.announcements.map((a) =>
        a.id === id ? { ...a, ...updatedAnnouncement } : a
      ),
    })),
  deleteAnnouncement: (id) =>
    set((state) => ({ announcements: state.announcements.filter((a) => a.id !== id) })),
}));
