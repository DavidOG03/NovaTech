import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import AccountType from "../../pages/account/accountType";

/**
 * HomeRouter Component
 * Handles automatic redirection based on cached session
 * - If user is authenticated and has a cached session, redirect to their respective dashboard
 * - If user is not authenticated, show the account type selection
 */
const HomeRouter: React.FC = () => {
  const { currentUser, userProfile, activeRole, loading } = useAuth();

  // While checking authentication status
  if (loading || (currentUser && !userProfile)) {
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

  // If user is authenticated with a cached session
  if (currentUser && userProfile) {
    // Redirect to appropriate dashboard based on active role
    if (activeRole === "vendor") {
      return <Navigate to="/seller-dashboard" replace />;
    }

    if (activeRole === "buyer" || userProfile.role === "buyer") {
      return <Navigate to="/products" replace />;
    }

    if (userProfile.role === "vendor") {
      return <Navigate to="/seller-dashboard" replace />;
    }

    if (userProfile.role === "both") {
      return <Navigate to="/products" replace />;
    }
  }

  // If not authenticated, check if user has onboarded
  const hasOnboarded = localStorage.getItem("hasOnboarded") === "true";

  if (hasOnboarded) {
    return <Navigate to="/signin" replace />;
  }

  return <AccountType />;
};

export default HomeRouter;
