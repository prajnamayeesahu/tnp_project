import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Briefcase, 
  FileText, 
  Megaphone,
  BarChart3,
  GraduationCap
} from 'lucide-react';
import { cn } from '../lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Building2, label: 'Companies', path: '/companies' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: FileText, label: 'Applications', path: '/applications' },
  { icon: Megaphone, label: 'Announcements', path: '/announcements' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics/students' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <GraduationCap className="mr-3 h-8 w-8 text-primary" />
        <div>
          <h1 className="text-lg">Placement Portal</h1>
          <p className="text-xs text-muted-foreground">Admin Dashboard</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/analytics/students' && location.pathname.startsWith('/analytics'));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-accent',
                isActive && 'bg-accent text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs text-muted-foreground">
            Logged in as <span className="text-foreground">Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
