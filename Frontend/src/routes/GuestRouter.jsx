

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/authProvider';

export default function GuestRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }


  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
;
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
}

