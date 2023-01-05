import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./../context/AuthContext";

function ProtectedRoute() {
  const { loggedIn,  } = useAuth();
  
  return (
    <>
    
       


      {loggedIn  ? <Navigate to="/profile" /> : <Outlet />}

    
    
    </>
    )
}

export default ProtectedRoute;
