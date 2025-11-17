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

export type AnnouncementFormValues = {
  title: string;
  description: string;
  audience: 'ALL' | 'BRANCH' | 'BATCH';
  branches: string[];
  graduationYears: number[];
};

type Props = {
  initialData?: AnnouncementFormValues;
  onSubmit: (data: AnnouncementFormValues) => void;
};

const empty: AnnouncementFormValues = {
  title: '',
  description: '',
  audience: 'ALL',
  branches: [],
  graduationYears: [],
};

export function AnnouncementForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<AnnouncementFormValues>(initialData || empty);
  const [branchesText, setBranchesText] = useState(
    (initialData?.branches ?? []).join(', ')
  );
  const [yearsText, setYearsText] = useState(
    (initialData?.graduationYears ?? []).join(', ')
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAudienceChange = (value: 'ALL' | 'BRANCH' | 'BATCH') => {
    setForm((prev) => ({ ...prev, audience: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const branches =
      branchesText.trim().length === 0
        ? []
        : branchesText.split(',').map((b) => b.trim());

    const graduationYears =
      yearsText.trim().length === 0
        ? []
        : yearsText.split(',').map((y) => Number(y.trim()));

    onSubmit({
      ...form,
      branches,
      graduationYears,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <Input
          name="title"
          value={form.title}
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
          rows={4}
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Audience</label>
          <Select
            value={form.audience}
            onValueChange={(v) => handleAudienceChange(v as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Students</SelectItem>
              <SelectItem value="BRANCH">By Branch</SelectItem>
              <SelectItem value="BATCH">By Batch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {form.audience === 'BRANCH' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Branches (comma separated)
            </label>
            <Input
              value={branchesText}
              onChange={(e) => setBranchesText(e.target.value)}
              placeholder="CSE, IT, ECE"
            />
          </div>
        )}

        {form.audience === 'BATCH' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Graduation Years (comma separated)
            </label>
            <Input
              value={yearsText}
              onChange={(e) => setYearsText(e.target.value)}
              placeholder="2025, 2026"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
