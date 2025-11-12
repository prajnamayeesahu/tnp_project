import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema, type JobFormData } from '../../lib/schemas';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { Job, Company } from '../../lib/types';

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  initialData?: Job;
  companies: Company[];
  isLoading?: boolean;
}

export function JobForm({ onSubmit, initialData, companies, isLoading }: JobFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData
      ? {
          companyId: initialData.companyId,
          title: initialData.title,
          description: initialData.description,
          requirements: initialData.requirements,
          salary: initialData.salary,
          location: initialData.location,
          deadline: initialData.deadline,
        }
      : undefined,
  });

  const companyId = watch('companyId');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="companyId">Company</Label>
          <Select
            value={companyId}
            onValueChange={(value: any) => setValue('companyId', value, { shouldValidate: true })}
          >
            <SelectTrigger id="companyId">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.companyId && (
            <p className="text-sm text-destructive">{errors.companyId.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" {...register('title')} placeholder="Software Engineer" />
          {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary</Label>
          <Input id="salary" {...register('salary')} placeholder="₹8-12 LPA" />
          {errors.salary && <p className="text-sm text-destructive">{errors.salary.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register('location')} placeholder="Bangalore, India" />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input id="deadline" type="date" {...register('deadline')} />
          {errors.deadline && (
            <p className="text-sm text-destructive">{errors.deadline.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Describe the role and responsibilities..."
            rows={4}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            {...register('requirements')}
            placeholder="List the skills and qualifications required..."
            rows={4}
          />
          {errors.requirements && (
            <p className="text-sm text-destructive">{errors.requirements.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}
