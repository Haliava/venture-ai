import { Outlet } from 'react-router'

export const ProtectedRoute = () => {
  return <Outlet />;
  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
