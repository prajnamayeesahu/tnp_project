import { z } from 'zod';

export const studentSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  branch: z.enum(['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'], {
    message: 'Branch is required',
  }),
  year: z.enum(['1', '2', '3', '4'], {
    message: 'Year is required',
  }),
  cgpa: z.number().min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot exceed 10'),
  phone: z.string().optional(),
});

export const companySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  location: z.string().min(2, 'Location is required'),
});

export const jobSchema = z.object({
  companyId: z.string().min(1, 'Company is required'),
  title: z.string().min(2, 'Job title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  requirements: z.string().min(10, 'Requirements must be at least 10 characters'),
  salary: z.string().min(1, 'Salary information is required'),
  location: z.string().min(2, 'Location is required'),
  deadline: z.string().min(1, 'Deadline is required'),
});

export const announcementSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  target: z.enum(['ALL', 'BRANCH', 'BATCH'], {
    message: 'Target audience is required',
  }),
  targetValue: z.string().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type JobFormData = z.infer<typeof jobSchema>;
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
