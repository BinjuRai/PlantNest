// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../auth/authProvider";

// import React, { useContext } from 'react'
// // import MainLayout from "../layouts/MainLayout";

// export default function AdminRoute() {
//     const { user, loading } = useContext(AuthContext)

//   if (loading) return <>Loading</>
  
//       if (!user) return <Navigate to = "\login" replace/>
//       // replace will note save history
  
//       if (user.role !=="admin" )return <Navigate to = "/" replace/>
//     return <Outlet/>
     
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export default AdminRoute;
