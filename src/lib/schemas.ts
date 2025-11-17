import { z } from 'zod';

export const studentSchema = z.object({
  // Allow either all digits OR alphanumeric with at least one letter and one number
  registrationNumber: z
    .string()
    .min(1, 'Registration number is required')
    .regex(/^(?:\d+|(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+)$/,
      'Registration number must be all digits or a mix of letters and numbers (no spaces)'
    ),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[A-Za-z][A-Za-z .'-]*$/, "Name can contain letters, spaces, .' and - only"),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .regex(/^(?!.*\.{2})[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Enter a valid email address'
    ),
  branch: z.enum(['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL'], {
    message: 'Branch is required',
  }),
  year: z.enum(['1', '2', '3', '4'], {
    message: 'Year is required',
  }),
  cgpa: z.number().min(0, 'CGPA must be at least 0').max(10, 'CGPA cannot exceed 10'),
  // Optional phone; accept common formatting then validate digit count (10-15)
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        const digits = val.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: 'Phone number must contain 10–15 digits' },
    ),
});

export const companySchema = z.object({
  name: z.string().min(2, 'Company name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  location: z.string().min(2, 'Location is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .regex(/^(?!.*\.{2})[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Enter a valid email address'
    ),
  phone: z
    .string()
    .trim()
    .refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: 'Phone number must contain 10–15 digits' },
    ),
  address: z.string().min(5, 'Address is required'),
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


