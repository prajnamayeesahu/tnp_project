import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Companies } from './pages/Companies';
import { Jobs } from './pages/Jobs';
import { Applications } from './pages/Applications';
import { Announcements } from './pages/Announcements';
import { StudentAnalytics } from './pages/analytics/StudentAnalytics';
import { JobAnalytics } from './pages/analytics/JobAnalytics';
import { Toaster } from './components/ui/sonner';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StudentHome } from './pages/StudentHome';
// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Default to login on app start */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Temporary student placeholder */}
            <Route path="/student" element={<StudentHome />} />

            {/* Admin-protected routes */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/analytics/students" element={<StudentAnalytics />} />
              <Route path="/analytics/jobs/:id" element={<JobAnalytics />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
