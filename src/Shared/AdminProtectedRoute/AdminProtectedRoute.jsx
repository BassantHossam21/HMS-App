import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children, allowedRoles }) {
  const { user, loading, saveUserData } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const token = localStorage.getItem("access_token");
  const role = user?.role;
  useEffect(() => {
    saveUserData();
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // user يرجع للـ root
  }

  // ✅ admin
  return children;
}
