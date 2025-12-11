
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../auth/authProvider'; // Make sure this is correctly imported

export default function GuestRoute() {
  const context = useContext(AuthContext);

  if (!context) return <>Context not available</>;

  const { user, loading } = context;

  if (loading) return <>Loading...</>;

  if (user) {
    // Redirect based on user role
    if (user.role === 'admin') return <Navigate to="/admin/user" />;
    if (user.role === 'normal') return <Navigate to="/" />;
    // Optional: fallback if role is unrecognized
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

