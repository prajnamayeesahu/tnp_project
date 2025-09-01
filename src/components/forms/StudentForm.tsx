
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { studentSchema, type StudentFormData } from '@/lib/validations'
import { studentsAPI } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import type { Student } from '@/types'

interface StudentFormProps {
  student?: Student | null
  onSuccess: () => void
}

export function StudentForm({ student, onSuccess }: StudentFormProps) {
  const { toast } = useToast()
  const isEditing = !!student

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: student ? {
      registrationNumber: student.registrationNumber,
      name: student.name,
      email: student.email,
      phone: student.phone,
      branch: student.branch,
      year: student.year,
      cgpa: student.cgpa,
    } : {
      registrationNumber: '',
      name: '',
      email: '',
      phone: '',
      branch: '',
      year: 1,
      cgpa: 0,
    },
  })

  const branches = ['Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Chemical']
  const years = [1, 2, 3, 4]

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEditing && student) {
        await studentsAPI.update(student.id, data)
        toast({
          title: "Success",
          description: "Student updated successfully",
        })
      } else {
        // Add default values for new students
        const studentData = {
          ...data,
          profileCompleted: false,
        }
        await studentsAPI.create(studentData)
        toast({
          title: "Success",
          description: "Student created successfully",
        })
      }
      onSuccess()
    } catch (error) {
      console.error('Failed to save student:', error)
      toast({
        title: "Error",
        description: "Failed to save student",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Registration Number *</Label>
          <Input
            id="registrationNumber"
            {...register('registrationNumber')}
            placeholder="Enter registration number"
          />
          {errors.registrationNumber && (
            <p className="text-sm text-red-600">{errors.registrationNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            {...register('phone')}
            placeholder="Enter phone number"
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branch *</Label>
          <Select
            value={watch('branch')}
            onValueChange={(value) => setValue('branch', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.branch && (
            <p className="text-sm text-red-600">{errors.branch.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Select
            value={watch('year').toString()}
            onValueChange={(value) => setValue('year', parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>Year {year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && (
            <p className="text-sm text-red-600">{errors.year.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cgpa">CGPA *</Label>
          <Input
            id="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            {...register('cgpa', { valueAsNumber: true })}
            placeholder="Enter CGPA (0-10)"
          />
          {errors.cgpa && (
            <p className="text-sm text-red-600">{errors.cgpa.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Student' : 'Create Student'}
        </Button>
      </div>
    </form>
  )
}
