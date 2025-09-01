import type {
  Student,
  Company,
  Job,
  Application,
  Announcement,
  DashboardStats,
  JobAnalytics,
  StudentAnalytics
} from '@/types'

// Mock data for development
export const mockStudents: Student[] = [
  {
    id: '1',
    registrationNumber: 'CS2021001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    branch: 'Computer Science',
    year: 3,
    cgpa: 8.5,
    profileCompleted: true,
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  {
    id: '2',
    registrationNumber: 'EE2021002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    branch: 'Electrical',
    year: 4,
    cgpa: 9.2,
    profileCompleted: true,
    createdAt: '2023-01-16T10:00:00Z',
    updatedAt: '2023-01-16T10:00:00Z'
  },
  {
    id: '3',
    registrationNumber: 'ME2021003',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1234567892',
    branch: 'Mechanical',
    year: 2,
    cgpa: 7.8,
    profileCompleted: false,
    createdAt: '2023-01-17T10:00:00Z',
    updatedAt: '2023-01-17T10:00:00Z'
  }
]

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    website: 'https://techcorp.com',
    email: 'hr@techcorp.com',
    phone: '+1-555-0123',
    address: 'San Francisco, CA',
    createdAt: '2023-01-10T10:00:00Z',
    updatedAt: '2023-01-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Global Finance Inc',
    website: 'https://globalfinance.com',
    email: 'careers@globalfinance.com',
    phone: '+1-555-0124',
    address: 'New York, NY',
    createdAt: '2023-01-11T10:00:00Z',
    updatedAt: '2023-01-11T10:00:00Z'
  }
]

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer',
    companyId: '1',
    company: mockCompanies[0],
    description: 'Full-stack development position with modern technologies.',
    requirements: 'Bachelor\'s in CS, 2+ years experience',
    location: 'San Francisco, CA',
    type: 'FULL_TIME',
    salary: '80000-120000',
    status: 'OPEN',
    applicationDeadline: '2023-12-31T23:59:59Z',
    createdAt: '2023-01-20T10:00:00Z',
    updatedAt: '2023-01-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Financial Analyst',
    companyId: '2',
    company: mockCompanies[1],
    description: 'Analyze financial data and create reports.',
    requirements: 'Bachelor\'s in Finance or related field',
    location: 'New York, NY',
    type: 'FULL_TIME',
    salary: '60000-90000',
    status: 'OPEN',
    applicationDeadline: '2023-12-25T23:59:59Z',
    createdAt: '2023-01-21T10:00:00Z',
    updatedAt: '2023-01-21T10:00:00Z'
  }
]

export const mockApplications: Application[] = [
  {
    id: '1',
    studentId: '1',
    student: mockStudents[0],
    jobId: '1',
    job: mockJobs[0],
    status: 'PENDING',
    appliedAt: '2023-01-22T10:00:00Z'
  },
  {
    id: '2',
    studentId: '2',
    student: mockStudents[1],
    jobId: '1',
    job: mockJobs[0],
    status: 'SHORTLISTED',
    appliedAt: '2023-01-23T10:00:00Z'
  }
]

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'New Job Postings Available',
    content: 'Several new job opportunities have been posted. Check them out!',
    targetAudience: 'ALL',
    publishedAt: '2023-01-24T10:00:00Z',
    createdAt: '2023-01-24T10:00:00Z',
    updatedAt: '2023-01-24T10:00:00Z'
  }
]

export const mockDashboardStats: DashboardStats = {
  totalStudents: mockStudents.length,
  totalCompanies: mockCompanies.length,
  totalJobs: mockJobs.length,
  openJobs: mockJobs.filter(job => job.status === 'OPEN').length,
  totalApplications: mockApplications.length,
  pendingApplications: mockApplications.filter(app => app.status === 'PENDING').length
}

export const mockJobAnalytics: JobAnalytics = {
  jobId: '1',
  jobTitle: 'Software Engineer',
  totalApplicants: 2,
  applicantsByStatus: {
    PENDING: 1,
    SHORTLISTED: 1,
    INTERVIEW: 0,
    ACCEPTED: 0,
    REJECTED: 0
  }
}

export const mockStudentAnalytics: StudentAnalytics = {
  totalStudents: mockStudents.length,
  profileCompletionRate: (mockStudents.filter(s => s.profileCompleted).length / mockStudents.length) * 100,
  studentsByBranch: {
    'Computer Science': 1,
    'Electrical': 1,
    'Mechanical': 1,
    'Civil': 0,
    'Chemical': 0
  },
  studentsByYear: {
    1: 0,
    2: 1,
    3: 1,
    4: 1
  },
  averageCGPA: mockStudents.reduce((sum, s) => sum + s.cgpa, 0) / mockStudents.length
}
