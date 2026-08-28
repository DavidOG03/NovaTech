import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-color flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl p-8 shadow-sm text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-10 h-10 text-important" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-accent-secondary">404</h1>
          <h2 className="text-xl font-semibold text-accent-secondary">
            Page Not Found
          </h2>
          <p className="text-muted">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link
          to="/"
          className="bg-linear-to-br from-accent-light to-accent text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:opacity-85"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
