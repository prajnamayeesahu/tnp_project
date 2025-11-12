import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { Companies } from './pages/Companies';
import { Jobs } from './components/Jobs';
import { Applications } from './pages/Applications';
import { Announcements } from './pages/Announcements';
import { StudentAnalytics } from './pages/analytics/StudentAnalytics';
import { JobAnalytics } from './pages/analytics/JobAnalytics';
import { Toaster } from './components/ui/sonner';

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
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/analytics/students" element={<StudentAnalytics />} />
              <Route path="/analytics/jobs/:id" element={<JobAnalytics />} />
              {/* Catch-all route for unmatched paths */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Layout } from '@/components/layout/Layout'
// import { Dashboard } from '@/pages/Dashboard'
// import { Students } from '@/pages/Students'
// import { Companies } from '@/pages/Companies'
// import { Jobs } from '@/pages/Jobs'
// import { Applications } from '@/pages/Applications'
// import { Announcements } from '@/pages/Announcements'
// import { Analytics } from '@/pages/Analytics'

// // Create a client
// const queryClient = new QueryClient()

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/companies" element={<Companies />} />
//             <Route path="/jobs" element={<Jobs />} />
//             <Route path="/applications" element={<Applications />} />
//             <Route path="/announcements" element={<Announcements />} />
//             <Route path="/analytics" element={<Analytics />} />
//             <Route path="/analytics/jobs/:id" element={<Analytics />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </QueryClientProvider>
//   )
// }

// export default App
