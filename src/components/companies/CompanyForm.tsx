import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export type CompanyFormValues = {
  name: string;
  description: string;
  industry: string;
  website: string;
  contactPerson: string;
  contactEmail: string;
};

type CompanyFormProps = {
  initialData?: CompanyFormValues;
  onSubmit: (data: CompanyFormValues) => void;
};

const emptyForm: CompanyFormValues = {
  name: '',
  description: '',
  industry: '',
  website: '',
  contactPerson: '',
  contactEmail: '',
};

export function CompanyForm({ initialData, onSubmit }: CompanyFormProps) {
  const [form, setForm] = useState<CompanyFormValues>(initialData || emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <Input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            name="website"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Person
          </label>
          <Input
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Email
          </label>
          <Input
            name="contactEmail"
            type="email"
            value={form.contactEmail}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 text-sm"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
