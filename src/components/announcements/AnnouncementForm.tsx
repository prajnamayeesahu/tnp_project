import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { announcementSchema, type AnnouncementFormData } from '../../lib/schemas';
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
import type { Announcement } from '../../lib/types';

interface AnnouncementFormProps {
  onSubmit: (data: AnnouncementFormData) => void;
  initialData?: Announcement;
  isLoading?: boolean;
}

export function AnnouncementForm({ onSubmit, initialData, isLoading }: AnnouncementFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          content: initialData.content,
          target: initialData.target,
          targetValue: initialData.targetValue || '',
        }
      : undefined,
  });

  const target = watch('target');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Campus Placement Drive 2025"
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register('content')}
          placeholder="Enter announcement details..."
          rows={6}
        />
        {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="target">Target Audience</Label>
          <Select
            value={target}
            onValueChange={(value : any) => setValue('target', value as any, { shouldValidate: true })}
          >
            <SelectTrigger id="target">
              <SelectValue placeholder="Select target" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Students</SelectItem>
              <SelectItem value="BRANCH">Specific Branch</SelectItem>
              <SelectItem value="BATCH">Specific Batch</SelectItem>
            </SelectContent>
          </Select>
          {errors.target && <p className="text-sm text-destructive">{errors.target.message}</p>}
        </div>

        {target && target !== 'ALL' && (
          <div className="space-y-2">
            <Label htmlFor="targetValue">
              {target === 'BRANCH' ? 'Branch' : 'Batch Year'}
            </Label>
            {target === 'BRANCH' ? (
              <Select
                value={watch('targetValue')}
                onValueChange={(value : any) => setValue('targetValue', value)}
              >
                <SelectTrigger id="targetValue">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="EEE">EEE</SelectItem>
                  <SelectItem value="MECH">MECH</SelectItem>
                  <SelectItem value="CIVIL">CIVIL</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="targetValue"
                {...register('targetValue')}
                placeholder="2022"
              />
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Announcement' : 'Create Announcement'}
        </Button>
      </div>
    </form>
  );
}
