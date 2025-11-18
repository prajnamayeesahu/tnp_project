import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type JobFormValues = {
  companyId: string;
  jobTitle: string;
  jobType: string;
  description: string;
  testLink?: string;
  status: 'OPEN' | 'CLOSED';
};

type CompanyOption = {
  id: string;
  name: string;
};

type JobFormProps = {
  initialData?: JobFormValues;
  companies: CompanyOption[];
  onSubmit: (data: JobFormValues) => void;
};

const emptyForm: JobFormValues = {
  companyId: '',
  jobTitle: '',
  jobType: '',
  description: '',
  testLink: '',
  status: 'OPEN',
};

export function JobForm({ initialData, companies, onSubmit }: JobFormProps) {
  const [form, setForm] = useState<JobFormValues>(initialData || emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (name: keyof JobFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <Select
            value={form.companyId}
            onValueChange={(v) => handleSelect('companyId', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Job Type</label>
          <Input
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            placeholder="Full-time / Internship / etc"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select
            value={form.status}
            onValueChange={(v) => handleSelect('status', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPEN">OPEN</SelectItem>
              <SelectItem value="CLOSED">CLOSED</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Test Link</label>
          <Input
            name="testLink"
            value={form.testLink || ''}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <Input
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
