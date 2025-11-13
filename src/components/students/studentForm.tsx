import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema, type StudentFormData } from '../../lib/schemas';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { Student } from '../../lib/types';

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  initialData?: Student;
  isLoading?: boolean;
}

export function StudentForm({ onSubmit, initialData, isLoading }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData
      ? {
        registrationNumber: initialData.registrationNumber,
        name: initialData.name,
        email: initialData.email,
        branch: initialData.branch,
        year: initialData.year,
        cgpa: initialData.cgpa,
        phone: initialData.phone || '',
      }
      : undefined,
  });

  const branch = watch('branch');
  const year = watch('year');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input
            id="registrationNumber"
            inputMode="text"
            pattern="^(?:[0-9]+|(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+)$"
            title="Use only digits OR a mix of letters and numbers; no spaces"
            {...register('registrationNumber')}
            placeholder="REG2024001"
          />
          {errors.registrationNumber && (
            <p className="text-sm text-destructive">{errors.registrationNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            autoCapitalize="words"
            autoComplete="name"
            pattern="[A-Za-z][A-Za-z .' -]*"
            title="Use letters, spaces, . ' and - only"
            {...register('name')}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="student@university.edu"
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            inputMode="tel"
            pattern="^[0-9()+\-\s]{10,20}$"
            title="Enter 10–15 digits (spaces, +, - and parentheses allowed)"
            {...register('phone')}
            placeholder="+91 9876543210"
          />
          {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branch</Label>
          <Select
            value={branch}
            onValueChange={(value: any) => setValue('branch', value as any, { shouldValidate: true })}
          >
            <SelectTrigger id="branch">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CSE">Computer Science (CSE)</SelectItem>
              <SelectItem value="ECE">Electronics (ECE)</SelectItem>
              <SelectItem value="EEE">Electrical (EEE)</SelectItem>
              <SelectItem value="MECH">Mechanical (MECH)</SelectItem>
              <SelectItem value="CIVIL">Civil (CIVIL)</SelectItem>
            </SelectContent>
          </Select>
          {errors.branch && <p className="text-sm text-destructive">{errors.branch.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={year}
            onValueChange={(value: any) => setValue('year', value as any, { shouldValidate: true })}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Year</SelectItem>
              <SelectItem value="2">2nd Year</SelectItem>
              <SelectItem value="3">3rd Year</SelectItem>
              <SelectItem value="4">4th Year</SelectItem>
            </SelectContent>
          </Select>
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="cgpa">CGPA</Label>
          <Input
            id="cgpa"
            type="number"
            step="0.01"
            {...register('cgpa', { valueAsNumber: true })}
            placeholder="8.5"
          />
          {errors.cgpa && <p className="text-sm text-destructive">{errors.cgpa.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}
