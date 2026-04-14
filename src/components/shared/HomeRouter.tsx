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
  const { currentUser, userRole, activeRole, loading } = useAuth();

  // While checking authentication status
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

  // If user is authenticated with a cached session
  if (currentUser && userRole && activeRole) {
    // Redirect to appropriate dashboard based on active role
    if (activeRole === "vendor") {
      return <Navigate to="/seller-dashboard" replace />;
    } else if (activeRole === "buyer") {
      return <Navigate to="/products" replace />;
    }
  }

  // If not authenticated, show account type selection
  return <AccountType />;
};

export default HomeRouter;
