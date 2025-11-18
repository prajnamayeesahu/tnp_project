import axios from 'axios'
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
import {
  mockStudents,
  mockCompanies,
  mockJobs,
  mockApplications,
  mockAnnouncements,
  mockDashboardStats,
  mockJobAnalytics,
  mockStudentAnalytics
} from './mockData'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      // Try real API first
      const response = await api.get('/dashboard/stats')
      return response.data
    } catch (error) {
      // Fall back to mock data if API is not available
      console.log('Using mock data for dashboard stats')
      await delay(500) // Simulate API delay
      return mockDashboardStats
    }
  },
}

// Students API
export const studentsAPI = {
  getAll: async (): Promise<Student[]> => {
    try {
      const response = await api.get('/students')
      return response.data
    } catch (error) {
      console.log('Using mock data for students')
      await delay(300)
      return mockStudents
    }
  },

  getById: async (id: string): Promise<Student> => {
    try {
      const response = await api.get(`/students/${id}`)
      return response.data
    } catch (error) {
      console.log('Using mock data for student')
      await delay(200)
      const student = mockStudents.find(s => s.id === id)
      if (!student) throw new Error('Student not found')
      return student
    }
  },

  create: async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> => {
    try {
      const response = await api.post('/students', data)
      return response.data
    } catch (error) {
      console.log('Using mock data for student creation')
      await delay(400)
      const newStudent: Student = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      mockStudents.push(newStudent)
      return newStudent
    }
  },

  update: async (id: string, data: Partial<Student>): Promise<Student> => {
    try {
      const response = await api.put(`/students/${id}`, data)
      return response.data
    } catch (error) {
      console.log('Using mock data for student update')
      await delay(400)
      const studentIndex = mockStudents.findIndex(s => s.id === id)
      if (studentIndex === -1) throw new Error('Student not found')
      mockStudents[studentIndex] = {
        ...mockStudents[studentIndex],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return mockStudents[studentIndex]
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/students/${id}`)
    } catch (error) {
      console.log('Using mock data for student deletion')
      await delay(300)
      const studentIndex = mockStudents.findIndex(s => s.id === id)
      if (studentIndex !== -1) {
        mockStudents.splice(studentIndex, 1)
      }
    }
  },
}

// Companies API
export const companiesAPI = {
  getAll: async (): Promise<Company[]> => {
    try {
      const response = await api.get('/companies')
      return response.data
    } catch (error) {
      console.log('Using mock data for companies')
      await delay(300)
      return mockCompanies
    }
  },

  getById: async (id: string): Promise<Company> => {
    try {
      const response = await api.get(`/companies/${id}`)
      return response.data
    } catch (error) {
      console.log('Using mock data for company')
      await delay(200)
      const company = mockCompanies.find(c => c.id === id)
      if (!company) throw new Error('Company not found')
      return company
    }
  },

  create: async (data: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> => {
    try {
      const response = await api.post('/companies', data)
      return response.data
    } catch (error) {
      console.log('Using mock data for company creation')
      await delay(400)
      const newCompany: Company = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      mockCompanies.push(newCompany)
      return newCompany
    }
  },

  update: async (id: string, data: Partial<Company>): Promise<Company> => {
    try {
      const response = await api.put(`/companies/${id}`, data)
      return response.data
    } catch (error) {
      console.log('Using mock data for company update')
      await delay(400)
      const companyIndex = mockCompanies.findIndex(c => c.id === id)
      if (companyIndex === -1) throw new Error('Company not found')
      mockCompanies[companyIndex] = {
        ...mockCompanies[companyIndex],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return mockCompanies[companyIndex]
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/companies/${id}`)
    } catch (error) {
      console.log('Using mock data for company deletion')
      await delay(300)
      const companyIndex = mockCompanies.findIndex(c => c.id === id)
      if (companyIndex !== -1) {
        mockCompanies.splice(companyIndex, 1)
      }
    }
  },
}

// Jobs API
export const jobsAPI = {
  getAll: async (): Promise<Job[]> => {
    try {
      const response = await api.get('/jobs')
      return response.data
    } catch (error) {
      console.log('Using mock data for jobs')
      await delay(300)
      return mockJobs
    }
  },

  getById: async (id: string): Promise<Job> => {
    try {
      const response = await api.get(`/jobs/${id}`)
      return response.data
    } catch (error) {
      console.log('Using mock data for job')
      await delay(200)
      const job = mockJobs.find(j => j.id === id)
      if (!job) throw new Error('Job not found')
      return job
    }
  },

  create: async (data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> => {
    try {
      const response = await api.post('/jobs', data)
      return response.data
    } catch (error) {
      console.log('Using mock data for job creation')
      await delay(400)
      const newJob: Job = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      mockJobs.push(newJob)
      return newJob
    }
  },

  update: async (id: string, data: Partial<Job>): Promise<Job> => {
    try {
      const response = await api.put(`/jobs/${id}`, data)
      return response.data
    } catch (error) {
      console.log('Using mock data for job update')
      await delay(400)
      const jobIndex = mockJobs.findIndex(j => j.id === id)
      if (jobIndex === -1) throw new Error('Job not found')
      mockJobs[jobIndex] = {
        ...mockJobs[jobIndex],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return mockJobs[jobIndex]
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/jobs/${id}`)
    } catch (error) {
      console.log('Using mock data for job deletion')
      await delay(300)
      const jobIndex = mockJobs.findIndex(j => j.id === id)
      if (jobIndex !== -1) {
        mockJobs.splice(jobIndex, 1)
      }
    }
  },

  updateStatus: async (id: string, status: 'OPEN' | 'CLOSED'): Promise<Job> => {
    try {
      const response = await api.patch(`/jobs/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.log('Using mock data for job status update')
      await delay(300)
      const jobIndex = mockJobs.findIndex(j => j.id === id)
      if (jobIndex === -1) throw new Error('Job not found')
      mockJobs[jobIndex] = {
        ...mockJobs[jobIndex],
        status,
        updatedAt: new Date().toISOString()
      }
      return mockJobs[jobIndex]
    }
  },
}

// Applications API
export const applicationsAPI = {
  getAll: async (): Promise<Application[]> => {
    try {
      const response = await api.get('/applications')
      return response.data
    } catch (error) {
      console.log('Using mock data for applications')
      await delay(300)
      return mockApplications
    }
  },

  getByJobId: async (jobId: string): Promise<Application[]> => {
    try {
      const response = await api.get(`/jobs/${jobId}/applications`)
      return response.data
    } catch (error) {
      console.log('Using mock data for job applications')
      await delay(200)
      return mockApplications.filter(app => app.jobId === jobId)
    }
  },

  updateStatus: async (id: string, status: Application['status']): Promise<Application> => {
    try {
      const response = await api.patch(`/applications/${id}/status`, { status })
      return response.data
    } catch (error) {
      console.log('Using mock data for application status update')
      await delay(300)
      const appIndex = mockApplications.findIndex(app => app.id === id)
      if (appIndex === -1) throw new Error('Application not found')
      mockApplications[appIndex] = {
        ...mockApplications[appIndex],
        status
      }
      return mockApplications[appIndex]
    }
  },
}

// Announcements API
export const announcementsAPI = {
  getAll: async (): Promise<Announcement[]> => {
    try {
      const response = await api.get('/announcements')
      return response.data
    } catch (error) {
      console.log('Using mock data for announcements')
      await delay(300)
      return mockAnnouncements
    }
  },

  getById: async (id: string): Promise<Announcement> => {
    try {
      const response = await api.get(`/announcements/${id}`)
      return response.data
    } catch (error) {
      console.log('Using mock data for announcement')
      await delay(200)
      const announcement = mockAnnouncements.find(a => a.id === id)
      if (!announcement) throw new Error('Announcement not found')
      return announcement
    }
  },

  create: async (data: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>): Promise<Announcement> => {
    try {
      const response = await api.post('/announcements', data)
      return response.data
    } catch (error) {
      console.log('Using mock data for announcement creation')
      await delay(400)
      const newAnnouncement: Announcement = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      mockAnnouncements.push(newAnnouncement)
      return newAnnouncement
    }
  },

  update: async (id: string, data: Partial<Announcement>): Promise<Announcement> => {
    try {
      const response = await api.put(`/announcements/${id}`, data)
      return response.data
    } catch (error) {
      console.log('Using mock data for announcement update')
      await delay(400)
      const announcementIndex = mockAnnouncements.findIndex(a => a.id === id)
      if (announcementIndex === -1) throw new Error('Announcement not found')
      mockAnnouncements[announcementIndex] = {
        ...mockAnnouncements[announcementIndex],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return mockAnnouncements[announcementIndex]
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/announcements/${id}`)
    } catch (error) {
      console.log('Using mock data for announcement deletion')
      await delay(300)
      const announcementIndex = mockAnnouncements.findIndex(a => a.id === id)
      if (announcementIndex !== -1) {
        mockAnnouncements.splice(announcementIndex, 1)
      }
    }
  },
}

// Analytics API
export const analyticsAPI = {
  getJobAnalytics: async (jobId: string): Promise<JobAnalytics> => {
    try {
      const response = await api.get(`/analytics/jobs/${jobId}`)
      return response.data
    } catch (error) {
      console.log('Using mock data for job analytics')
      await delay(300)
      return mockJobAnalytics
    }
  },

  getStudentAnalytics: async (): Promise<StudentAnalytics> => {
    try {
      const response = await api.get('/analytics/students')
      return response.data
    } catch (error) {
      console.log('Using mock data for student analytics')
      await delay(300)
      return mockStudentAnalytics
    }
  },
}

export default api
