// Mock API calls - Replace these with actual API endpoints
import type {
  Student,
  Company,
  Job,
  Application,
  Announcement,
  DashboardStats,
  Branch,
  Year,
  JobStatus,
  ApplicationStatus,
} from './types';

// Mock data generators
const generateMockStudents = (): Student[] => {
  const branches: Branch[] = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'];
  const years: Year[] = ['1', '2', '3', '4'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `student-${i + 1}`,
    registrationNumber: `REG${2020 + (i % 4)}${String(i + 1).padStart(3, '0')}`,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@university.edu`,
    branch: branches[i % branches.length],
    year: years[i % years.length],
    cgpa: Number((6 + Math.random() * 4).toFixed(2)),
    phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    profileCompleted: Math.random() > 0.3,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

const generateMockCompanies = (): Company[] => {
  const companies = [
    { name: 'Tech Corp', industry: 'Information Technology', location: 'Bangalore' },
    { name: 'InnoSoft Solutions', industry: 'Software Development', location: 'Hyderabad' },
    { name: 'DataSys Inc', industry: 'Data Analytics', location: 'Pune' },
    { name: 'CloudNet Systems', industry: 'Cloud Computing', location: 'Mumbai' },
    { name: 'AI Innovations', industry: 'Artificial Intelligence', location: 'Bangalore' },
    { name: 'CyberSec Pro', industry: 'Cybersecurity', location: 'Chennai' },
    { name: 'FinTech Solutions', industry: 'Financial Technology', location: 'Gurgaon' },
    { name: 'AutoMotive Tech', industry: 'Automotive', location: 'Pune' },
  ];

  return companies.map((company, i) => ({
    id: `company-${i + 1}`,
    name: company.name,
    description: `${company.name} is a leading company in ${company.industry}. We are committed to innovation and excellence.`,
    website: `https://www.${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
    industry: company.industry,
    location: company.location,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  }));
};

const generateMockJobs = (companies: Company[]): Job[] => {
  const jobTitles = [
    'Software Engineer',
    'Data Analyst',
    'Full Stack Developer',
    'DevOps Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Machine Learning Engineer',
    'Backend Developer',
  ];

  return Array.from({ length: 15 }, (_, i) => {
    const company = companies[i % companies.length];
    return {
      id: `job-${i + 1}`,
      companyId: company.id,
      companyName: company.name,
      title: jobTitles[i % jobTitles.length],
      description: `We are looking for a talented ${jobTitles[i % jobTitles.length]} to join our dynamic team.`,
      requirements: 'Bachelor\'s degree in relevant field, Strong problem-solving skills, Good communication',
      salary: `₹${(6 + Math.random() * 14).toFixed(1)} LPA`,
      location: company.location,
      status: (i % 3 === 0 ? 'CLOSED' : 'OPEN') as JobStatus,
      deadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
    };
  });
};

const generateMockApplications = (students: Student[], jobs: Job[]): Application[] => {
  const statuses: ApplicationStatus[] = ['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'];
  
  return Array.from({ length: 100 }, (_, i) => {
    const student = students[i % students.length];
    const job = jobs[i % jobs.length];
    
    return {
      id: `app-${i + 1}`,
      jobId: job.id,
      studentId: student.id,
      studentName: student.name,
      jobTitle: job.title,
      companyName: job.companyName,
      status: statuses[i % statuses.length],
      appliedAt: new Date(Date.now() - Math.random() * 3000000000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    };
  });
};

const generateMockAnnouncements = (): Announcement[] => {
  return [
    {
      id: 'ann-1',
      title: 'Campus Placement Drive 2025',
      content: 'The campus placement drive for the year 2025 will commence from January 15th. All eligible students are requested to update their profiles.',
      target: 'ALL',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ann-2',
      title: 'Resume Workshop for CSE Students',
      content: 'A resume building workshop will be conducted for all CSE students on December 20th at 2 PM in the seminar hall.',
      target: 'BRANCH',
      targetValue: 'CSE',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'ann-3',
      title: 'Important Notice for 2022 Batch',
      content: 'All students from the 2022 batch must complete their profile verification by December 30th to be eligible for upcoming placements.',
      target: 'BATCH',
      targetValue: '2022',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

// Initialize mock data
let mockStudents = generateMockStudents();
let mockCompanies = generateMockCompanies();
let mockJobs = generateMockJobs(mockCompanies);
let mockApplications = generateMockApplications(mockStudents, mockJobs);
let mockAnnouncements = generateMockAnnouncements();

// Helper function to simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const api = {
  // Dashboard
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay();
    const acceptedCount = mockApplications.filter(app => app.status === 'ACCEPTED').length;
    const profileCompletedCount = mockStudents.filter(s => s.profileCompleted).length;
    
    return {
      totalStudents: mockStudents.length,
      totalCompanies: mockCompanies.length,
      activeJobs: mockJobs.filter(j => j.status === 'OPEN').length,
      pendingApplications: mockApplications.filter(app => app.status === 'APPLIED').length,
      profileCompletion: Math.round((profileCompletedCount / mockStudents.length) * 100),
      placedStudents: acceptedCount,
    };
  },

  // Students
  getStudents: async (filters?: { branch?: Branch; year?: Year; search?: string }): Promise<Student[]> => {
    await delay();
    let filtered = [...mockStudents];
    
    if (filters?.branch) {
      filtered = filtered.filter(s => s.branch === filters.branch);
    }
    if (filters?.year) {
      filtered = filtered.filter(s => s.year === filters.year);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.registrationNumber.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search)
      );
    }
    
    return filtered;
  },

  createStudent: async (data: Omit<Student, 'id' | 'createdAt'>): Promise<Student> => {
    await delay();
    const newStudent: Student = {
      ...data,
      id: `student-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockStudents = [newStudent, ...mockStudents];
    return newStudent;
  },

  updateStudent: async (id: string, data: Partial<Student>): Promise<Student> => {
    await delay();
    const index = mockStudents.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Student not found');
    
    mockStudents[index] = { ...mockStudents[index], ...data };
    return mockStudents[index];
  },

  deleteStudent: async (id: string): Promise<void> => {
    await delay();
    mockStudents = mockStudents.filter(s => s.id !== id);
  },

  // Companies
  getCompanies: async (): Promise<Company[]> => {
    await delay();
    return [...mockCompanies];
  },

  createCompany: async (data: Omit<Company, 'id' | 'createdAt'>): Promise<Company> => {
    await delay();
    const newCompany: Company = {
      ...data,
      id: `company-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockCompanies = [newCompany, ...mockCompanies];
    return newCompany;
  },

  updateCompany: async (id: string, data: Partial<Company>): Promise<Company> => {
    await delay();
    const index = mockCompanies.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Company not found');
    
    mockCompanies[index] = { ...mockCompanies[index], ...data };
    return mockCompanies[index];
  },

  deleteCompany: async (id: string): Promise<void> => {
    await delay();
    mockCompanies = mockCompanies.filter(c => c.id !== id);
  },

  // Jobs
  getJobs: async (filters?: { status?: JobStatus }): Promise<Job[]> => {
    await delay();
    let filtered = [...mockJobs];
    
    if (filters?.status) {
      filtered = filtered.filter(j => j.status === filters.status);
    }
    
    return filtered;
  },

  getJobById: async (id: string): Promise<Job | undefined> => {
    await delay();
    return mockJobs.find(j => j.id === id);
  },

  createJob: async (data: Omit<Job, 'id' | 'createdAt' | 'companyName'>): Promise<Job> => {
    await delay();
    const company = mockCompanies.find(c => c.id === data.companyId);
    if (!company) throw new Error('Company not found');
    
    const newJob: Job = {
      ...data,
      id: `job-${Date.now()}`,
      companyName: company.name,
      createdAt: new Date().toISOString(),
    };
    mockJobs = [newJob, ...mockJobs];
    return newJob;
  },

  updateJob: async (id: string, data: Partial<Job>): Promise<Job> => {
    await delay();
    const index = mockJobs.findIndex(j => j.id === id);
    if (index === -1) throw new Error('Job not found');
    
    mockJobs[index] = { ...mockJobs[index], ...data };
    return mockJobs[index];
  },

  deleteJob: async (id: string): Promise<void> => {
    await delay();
    mockJobs = mockJobs.filter(j => j.id !== id);
  },

  // Applications
  getApplications: async (filters?: { jobId?: string }): Promise<Application[]> => {
    await delay();
    let filtered = [...mockApplications];
    
    if (filters?.jobId) {
      filtered = filtered.filter(a => a.jobId === filters.jobId);
    }
    
    return filtered;
  },

  updateApplicationStatus: async (id: string, status: ApplicationStatus): Promise<Application> => {
    await delay();
    const index = mockApplications.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Application not found');
    
    mockApplications[index] = {
      ...mockApplications[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return mockApplications[index];
  },

  // Announcements
  getAnnouncements: async (): Promise<Announcement[]> => {
    await delay();
    return [...mockAnnouncements];
  },

  createAnnouncement: async (data: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Announcement> => {
    await delay();
    const newAnnouncement: Announcement = {
      ...data,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockAnnouncements = [newAnnouncement, ...mockAnnouncements];
    return newAnnouncement;
  },

  updateAnnouncement: async (id: string, data: Partial<Announcement>): Promise<Announcement> => {
    await delay();
    const index = mockAnnouncements.findIndex(a => a.id === id);
    if (index === -1) throw new Error('Announcement not found');
    
    mockAnnouncements[index] = {
      ...mockAnnouncements[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockAnnouncements[index];
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    await delay();
    mockAnnouncements = mockAnnouncements.filter(a => a.id !== id);
  },

  // Analytics
  getStudentAnalytics: async () => {
    await delay();
    const branchDistribution = mockStudents.reduce((acc, student) => {
      acc[student.branch] = (acc[student.branch] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const yearDistribution = mockStudents.reduce((acc, student) => {
      acc[student.year] = (acc[student.year] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const profileCompletion = {
      completed: mockStudents.filter(s => s.profileCompleted).length,
      incomplete: mockStudents.filter(s => !s.profileCompleted).length,
    };

    return {
      branchDistribution,
      yearDistribution,
      profileCompletion,
      averageCGPA: (mockStudents.reduce((sum, s) => sum + s.cgpa, 0) / mockStudents.length).toFixed(2),
      totalStudents: mockStudents.length,
    };
  },

  getJobAnalytics: async (jobId: string) => {
    await delay();
    const applications = mockApplications.filter(a => a.jobId === jobId);
    
    const statusDistribution = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: applications.length,
      applied: statusDistribution['APPLIED'] || 0,
      shortlisted: statusDistribution['SHORTLISTED'] || 0,
      interview: statusDistribution['INTERVIEW'] || 0,
      accepted: statusDistribution['ACCEPTED'] || 0,
      rejected: statusDistribution['REJECTED'] || 0,
    };
  },
};
