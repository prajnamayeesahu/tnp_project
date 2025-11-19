import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { GraduationCap, UserPlus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('student');

  const [studentForm, setStudentForm] = useState({
    fullName: '',
    email: '',
    rollNumber: '',
    branch: '',
    year: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [adminForm, setAdminForm] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    department: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleStudentSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (studentForm.password !== studentForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (studentForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Demo - accept registration
    toast.success('Account created successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleAdminSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (adminForm.password !== adminForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (adminForm.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Demo - accept registration
    toast.success('Admin account created successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">Join our placement management system</p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Fill in your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student">Student Account</TabsTrigger>
                <TabsTrigger value="admin">Admin Account</TabsTrigger>
              </TabsList>

              {/* Student Signup */}
              <TabsContent value="student">
                <form onSubmit={handleStudentSignup} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name *</Label>
                      <Input
                        id="student-name"
                        placeholder="John Doe"
                        value={studentForm.fullName}
                        onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-email">Email *</Label>
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="john@university.edu"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-roll">Roll Number *</Label>
                      <Input
                        id="student-roll"
                        placeholder="CS2024001"
                        value={studentForm.rollNumber}
                        onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-phone">Phone Number *</Label>
                      <Input
                        id="student-phone"
                        type="tel"
                        placeholder="+91"
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-branch">Branch *</Label>
                      <Select value={studentForm.branch} onValueChange={(value) => setStudentForm({ ...studentForm, branch: value })}>
                        <SelectTrigger id="student-branch">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Mechanical">Mechanical</SelectItem>
                          <SelectItem value="Civil">Civil</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-year">Year *</Label>
                      <Select value={studentForm.year} onValueChange={(value) => setStudentForm({ ...studentForm, year: value })}>
                        <SelectTrigger id="student-year">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create password"
                          value={studentForm.password}
                          onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="student-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={studentForm.confirmPassword}
                          onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <p className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <UserPlus className="mr-2 size-4" />
                    Create Student Account
                  </Button>
                </form>
              </TabsContent>

              {/* Admin Signup */}
              <TabsContent value="admin">
                <form onSubmit={handleAdminSignup} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Full Name *</Label>
                      <Input
                        id="admin-name"
                        placeholder="Jane Smith"
                        value={adminForm.fullName}
                        onChange={(e) => setAdminForm({ ...adminForm, fullName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email *</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@university.edu"
                        value={adminForm.email}
                        onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-employee">Employee ID *</Label>
                      <Input
                        id="admin-employee"
                        placeholder="EMP001"
                        value={adminForm.employeeId}
                        onChange={(e) => setAdminForm({ ...adminForm, employeeId: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-phone">Phone Number *</Label>
                      <Input
                        id="admin-phone"
                        type="tel"
                        placeholder="+91 "
                        value={adminForm.phone}
                        onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="admin-department">Department *</Label>
                      <Select value={adminForm.department} onValueChange={(value) => setAdminForm({ ...adminForm, department: value })}>
                        <SelectTrigger id="admin-department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Placement Cell">Placement Cell</SelectItem>
                          <SelectItem value="Training & Placement">Training & Placement</SelectItem>
                          <SelectItem value="Career Services">Career Services</SelectItem>
                          <SelectItem value="Administration">Administration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="admin-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create password"
                          value={adminForm.password}
                          onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="admin-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                          value={adminForm.confirmPassword}
                          onChange={(e) => setAdminForm({ ...adminForm, confirmPassword: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <p className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <UserPlus className="mr-2 size-4" />
                    Create Admin Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Placement Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
