import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Step 1: Wait for Firebase auth to finish initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img
          src="/images/novatech.svg"
          alt="Novatech Logo"
          className="animate-pulse"
        />
      </div>
    );
  }

  // If user is not authenticated, send to SignIn
  if (!user)
    return <Navigate to="/" replace state={{ from: location }} />;

  // If user is authenticated but no account type selected yet
  const accountType = localStorage.getItem("accountType");
  if (!accountType) return <Navigate to="/" replace />;

  return <>{children}</>;
}
