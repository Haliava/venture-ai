import { useAuth } from '@/shared/store/user';
import { Navigate, Outlet } from 'react-router'

export const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
