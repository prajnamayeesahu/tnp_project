import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
