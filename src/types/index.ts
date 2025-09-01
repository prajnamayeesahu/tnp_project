export interface Student {
  id: string
  registrationNumber: string
  name: string
  email: string
  phone: string
  branch: string
  year: number
  cgpa: number
  profileCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface Company {
  id: string
  name: string
  description: string
  website: string
  email: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  title: string
  description: string
  requirements: string
  salary: string
  location: string
  type: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP'
  status: 'OPEN' | 'CLOSED'
  companyId: string
  company: Company
  deadline: string
  createdAt: string
  updatedAt: string
}

export interface Application {
  id: string
  studentId: string
  jobId: string
  status: 'PENDING' | 'SHORTLISTED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED'
  appliedAt: string
  student: Student
  job: Job
}

export interface Announcement {
  id: string
  title: string
  content: string
  targetAudience: 'ALL' | 'BRANCH' | 'BATCH'
  targetBranch?: string
  targetBatch?: number
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalStudents: number
  totalCompanies: number
  totalJobs: number
  openJobs: number
  totalApplications: number
  pendingApplications: number
}

export interface JobAnalytics {
  jobId: string
  totalApplicants: number
  shortlisted: number
  selected: number
  rejected: number
}

export interface StudentAnalytics {
  profileCompletion: {
    completed: number
    incomplete: number
  }
  branchDistribution: {
    branch: string
    count: number
  }[]
  yearDistribution: {
    year: number
    count: number
  }[]
  averageCGPA: number
}
