import { z } from 'zod'

// Student validation schema
export const studentSchema = z.object({
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
    phone: z
        .string()
        .trim()
        .optional()
        .refine((val) => {
            if (!val || val.length === 0) return true;
            const digits = val.replace(/\D/g, '');
            return digits.length >= 10 && digits.length <= 15;
        }, {
            message: 'Phone number must contain 10–15 digits',
        }),
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
        .refine((val) => {
            const digits = val.replace(/\D/g, '');
            return digits.length >= 10 && digits.length <= 15;
        }, {
            message: 'Phone number must contain 10–15 digits',
        }),
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
