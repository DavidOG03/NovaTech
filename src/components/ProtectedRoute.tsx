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

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  const accountType = localStorage.getItem("accountType");

  // If user has no account type, force them to pick one
  if (!accountType) {
    return <Navigate to="/account" replace />;
  }

  // Route according to account type
  if (accountType === "customer" && location.pathname !== "/products") {
    return <Navigate to="/" replace />;
  }

  if (accountType === "seller" && location.pathname !== "/seller-dashboard") {
    return <Navigate to="/seller-dashboard" replace />;
  }

  return <>{children}</>;
}
