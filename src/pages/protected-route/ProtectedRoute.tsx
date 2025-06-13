import { useAuth } from '@/shared/store/user';
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const { isLoggedIn, token } = useAuth();
  return (isLoggedIn && !!token) ? <Outlet /> : <Navigate to="/login" replace />;
}
