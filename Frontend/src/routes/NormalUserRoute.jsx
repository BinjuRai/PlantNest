// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from '../auth/authProvider'; 

// import { useContext } from "react";

// import React from 'react'

// export default function NormalUserRoute() {
//     const { user, loading } = useContext(AuthContext)
//     if (loading) return <>Loading</>

//     if (!user) return <Navigate to = "/login" replace/>
//     // replace will note save history

//     if (user.role !=="normal" )return <Navigate to = "/admin" replace/>
//   return <Outlet/>
   
// }





import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function NormalUserRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "normal") return <Navigate to="/admin" replace />;

  return <Outlet />;
}