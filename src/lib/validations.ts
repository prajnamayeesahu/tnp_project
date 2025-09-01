import { z } from 'zod'

// Student validation schema
export const studentSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  branch: z.string().min(1, 'Branch is required'),
  year: z.number().min(1).max(4, 'Year must be between 1 and 4'),
  cgpa: z.number().min(0).max(10, 'CGPA must be between 0 and 10'),
})

export type StudentFormData = z.infer<typeof studentSchema>

// Company validation schema
export const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(1, 'Address is required'),
})

export type CompanyFormData = z.infer<typeof companySchema>

// Job validation schema
export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  requirements: z.string().min(1, 'Requirements are required'),
  salary: z.string().min(1, 'Salary information is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['FULL_TIME', 'PART_TIME', 'INTERNSHIP']),
  companyId: z.string().min(1, 'Company is required'),
  deadline: z.string().min(1, 'Deadline is required'),
})

export type JobFormData = z.infer<typeof jobSchema>

// Announcement validation schema
export const announcementSchema = z.object({
  title: z.string().min(1, 'Announcement title is required'),
  content: z.string().min(1, 'Announcement content is required'),
  targetAudience: z.enum(['ALL', 'BRANCH', 'BATCH']),
  targetBranch: z.string().optional(),
  targetBatch: z.number().min(1).max(4).optional(),
})

export type AnnouncementFormData = z.infer<typeof announcementSchema>

// Application status update schema
export const applicationStatusSchema = z.object({
  status: z.enum(['PENDING', 'SHORTLISTED', 'INTERVIEW', 'ACCEPTED', 'REJECTED']),
})

export type ApplicationStatusFormData = z.infer<typeof applicationStatusSchema>

// Job status update schema
export const jobStatusSchema = z.object({
  status: z.enum(['OPEN', 'CLOSED']),
})

export type JobStatusFormData = z.infer<typeof jobStatusSchema>
