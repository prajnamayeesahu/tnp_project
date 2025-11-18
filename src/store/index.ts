import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {
  Student,
  Company,
  Job,
  Application,
  Announcement,
  DashboardStats,
} from "@/types";

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
  isLoadingStudents: boolean;
  isLoadingCompanies: boolean;
  isLoadingJobs: boolean;
  isLoadingApplications: boolean;
  isLoadingAnnouncements: boolean;

  // UI state
  sidebarOpen: boolean;

  // Actions
  setStudents: (students: Student[]) => void;
  setCompanies: (companies: Company[]) => void;
  setJobs: (jobs: Job[]) => void;
  setApplications: (applications: Application[]) => void;
  setAnnouncements: (announcements: Announcement[]) => void;
  setDashboardStats: (stats: DashboardStats) => void;

  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  removeStudent: (id: string) => void;

  addCompany: (company: Company) => void;
  updateCompany: (id: string, updates: Partial<Company>) => void;
  removeCompany: (id: string) => void;

  addJob: (job: Job) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  removeJob: (id: string) => void;

  addApplication: (application: Application) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;

  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  removeAnnouncement: (id: string) => void;

  setLoading: (loading: boolean) => void;
  setLoadingStudents: (loading: boolean) => void;
  setLoadingCompanies: (loading: boolean) => void;
  setLoadingJobs: (loading: boolean) => void;
  setLoadingApplications: (loading: boolean) => void;
  setLoadingAnnouncements: (loading: boolean) => void;

  setSidebarOpen: (open: boolean) => void;

  // Computed values
  getStudentById: (id: string) => Student | undefined;
  getCompanyById: (id: string) => Company | undefined;
  getJobById: (id: string) => Job | undefined;
  getApplicationsByJobId: (jobId: string) => Application[];
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      students: [],
      companies: [],
      jobs: [],
      applications: [],
      announcements: [],
      dashboardStats: null,

      isLoading: false,
      isLoadingStudents: false,
      isLoadingCompanies: false,
      isLoadingJobs: false,
      isLoadingApplications: false,
      isLoadingAnnouncements: false,

      sidebarOpen: false,

      // Actions
      setStudents: (students) => set({ students }),
      setCompanies: (companies) => set({ companies }),
      setJobs: (jobs) => set({ jobs }),
      setApplications: (applications) => set({ applications }),
      setAnnouncements: (announcements) => set({ announcements }),
      setDashboardStats: (stats) => set({ dashboardStats: stats }),

      addStudent: (student) =>
        set((state) => ({
          students: [...state.students, student],
        })),
      updateStudent: (id, updates) =>
        set((state) => ({
          students: state.students.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      removeStudent: (id) =>
        set((state) => ({
          students: state.students.filter((s) => s.id !== id),
        })),

      addCompany: (company) =>
        set((state) => ({
          companies: [...state.companies, company],
        })),
      updateCompany: (id, updates) =>
        set((state) => ({
          companies: state.companies.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      removeCompany: (id) =>
        set((state) => ({
          companies: state.companies.filter((c) => c.id !== id),
        })),

      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),
      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
        })),
      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),

      addApplication: (application) =>
        set((state) => ({
          applications: [...state.applications, application],
        })),
      updateApplication: (id, updates) =>
        set((state) => ({
          applications: state.applications.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      addAnnouncement: (announcement) =>
        set((state) => ({
          announcements: [...state.announcements, announcement],
        })),
      updateAnnouncement: (id, updates) =>
        set((state) => ({
          announcements: state.announcements.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),
      removeAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((a) => a.id !== id),
        })),

      setLoading: (loading) => set({ isLoading: loading }),
      setLoadingStudents: (loading) => set({ isLoadingStudents: loading }),
      setLoadingCompanies: (loading) => set({ isLoadingCompanies: loading }),
      setLoadingJobs: (loading) => set({ isLoadingJobs: loading }),
      setLoadingApplications: (loading) =>
        set({ isLoadingApplications: loading }),
      setLoadingAnnouncements: (loading) =>
        set({ isLoadingAnnouncements: loading }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Computed values
      getStudentById: (id) => get().students.find((s) => s.id === id),
      getCompanyById: (id) => get().companies.find((c) => c.id === id),
      getJobById: (id) => get().jobs.find((j) => j.id === id),
      getApplicationsByJobId: (jobId) =>
        get().applications.filter((a) => a.jobId === jobId),
    }),
    {
      name: "admin-dashboard-store",
    }
  )
);
