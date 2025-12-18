
// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../auth/authProvider'; // Make sure this is correctly imported

// export default function GuestRoute() {
//   const context = useContext(AuthContext);

//   if (!context) return <>Context not available</>;

//   const { user, loading } = context;

//   if (loading) return <>Loading...</>;

//   if (user) {
//     // Redirect based on user role
//     if (user.role === 'admin') return <Navigate to="/admin/user" />;
//     if (user.role === 'normal') return <Navigate to="/" />;
//     // Optional: fallback if role is unrecognized
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// }


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

  // If user is logged in, redirect based on role
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
;
    return <Navigate to="/" replace />; // Normal users go to homepage
  }

  // If not logged in, allow access to login/register pages
  return <Outlet />;
}

