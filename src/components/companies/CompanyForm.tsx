import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, type CompanyFormData } from '../../lib/schemas';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { Company } from '../../lib/types';

interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => void;
  initialData?: Company;
  isLoading?: boolean;
}

export function CompanyForm({ onSubmit, initialData, isLoading }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          website: initialData.website || '',
          industry: initialData.industry,
          location: initialData.location,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" {...register('name')} placeholder="Tech Corp" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            {...register('industry')}
            placeholder="Information Technology"
          />
          {errors.industry && (
            <p className="text-sm text-destructive">{errors.industry.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register('location')} placeholder="Bangalore, India" />
          {errors.location && (
            <p className="text-sm text-destructive">{errors.location.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            type="url"
            {...register('website')}
            placeholder="https://example.com"
          />
          {errors.website && <p className="text-sm text-destructive">{errors.website.message}</p>}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Brief description about the company..."
            rows={4}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Company' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
}
