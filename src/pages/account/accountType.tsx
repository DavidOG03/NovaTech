import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShoppingBag, Store, ArrowRight, CheckCircle2 } from "lucide-react";

type AccountType = "buyer" | "vendor" | "both";

export default function AccountType() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, userProfile, userRole } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (currentUser && userProfile) {
      // User is already registered, redirect to appropriate page
      if (userProfile.role === "buyer") {
        navigate("/products");
      } else if (userProfile.role === "vendor") {
        navigate("/seller-dashboard");
      } else if (userProfile.role === "both") {
        navigate("/products"); // Home page with role switcher
      }
    }
  }, [currentUser, userProfile, navigate]);

  const handleConfirm = () => {
    if (!accountType) return;

    // Store selected account type in localStorage for signup page
    localStorage.setItem("selectedAccountType", accountType);

    // Navigate to unified signup page with role parameter
    navigate(`/signup?role=${accountType}`);
  };

  // If user is logged in, show loading while redirecting
  if (currentUser && userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-type-selection bg-white p-8 w-full min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-5xl font-medium mb-4">
            Join as Customer or Vendor
          </h1>
          <p className="text-gray-600 text-lg">
            Choose how you'd like to use NovaTech
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Account Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Buyer/Customer Option */}
          <button
            onClick={() => setAccountType("buyer")}
            className={`relative px-8 pt-8 pb-10 border-2 rounded-3xl text-left flex flex-col justify-between items-start transition-all duration-300 hover:shadow-lg ${
              accountType === "buyer"
                ? "border-pink shadow-xl bg-pink/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Icon and Checkmark */}
            <div className="flex flex-row justify-between items-start mb-8 w-full">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                <img src="/images/customer-icon.svg" alt="customer icon" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  accountType === "buyer"
                    ? "border-pink bg-pink"
                    : "border-gray-300"
                }`}
              >
                {accountType === "buyer" && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Customer</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Browse and purchase products from verified vendors
              </p>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-sm text-light-black">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Shop thousands of products
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Track orders easily
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Save favorites
              </li>
            </ul>
          </button>

          {/* Vendor Option */}
          <button
            onClick={() => setAccountType("vendor")}
            className={`relative px-8 pt-8 pb-10 border-2 rounded-3xl text-left flex flex-col justify-between items-start transition-all duration-300 hover:shadow-lg ${
              accountType === "vendor"
                ? "border-pink shadow-xl bg-pink/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Icon and Checkmark */}
            <div className="flex flex-row justify-between items-start mb-8 w-full">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                <img src="/images/vendor-icon.svg" alt="vendor icon" />
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  accountType === "vendor"
                    ? "border-pink bg-pink"
                    : "border-gray-300"
                }`}
              >
                {accountType === "vendor" && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Vendor</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Start selling your products and grow your business
              </p>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-sm text-light-black">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Create your store
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Manage inventory
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Track sales analytics
              </li>
            </ul>
          </button>

          {/* Both Option
          <button
            onClick={() => setAccountType("both")}
            className={`relative px-8 pt-8 pb-10 border-2 rounded-3xl text-left flex flex-col justify-between items-start transition-all duration-300 hover:shadow-lg ${
              accountType === "both"
                ? "border-pink shadow-xl bg-pink/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Icon and Checkmark 
            <div className="flex flex-row justify-between items-start mb-8 w-full">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="flex items-center gap-1">
                  <img src="/images/customer-icon.svg" alt="customer icon" />
                  <img src="/images/vendor-icon.svg" alt="vendor icon" />
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  accountType === "both"
                    ? "border-pink bg-pink"
                    : "border-gray-300"
                }`}
              >
                {accountType === "both" && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>

            {/* Title and Description 
            <div>
              <h3 className="text-2xl font-semibold mb-3">Both</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Shop and sell with one account - switch anytime
              </p>
            </div>

            {/* Features 
            <ul className="mt-6 space-y-2 text-sm text-light-black">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                All customer features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                All vendor features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-light-black/90 rounded-full"></div>
                Switch roles anytime
              </li>
            </ul>
          </button> */}
        </div>

        {/* Continue Button */}
        <div className="flex flex-col justify-center items-center gap-4">
          <button
            onClick={handleConfirm}
            disabled={!accountType || loading}
            className={`group w-full max-w-md py-4 text-lg font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 ${
              accountType && !loading
                ? "bg-pink text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                : "bg-gray-300 text-light-black cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>
                  {accountType
                    ? `Continue as ${
                        accountType === "both"
                          ? "Customer & Vendor"
                          : accountType
                      }`
                    : "Select an account type"}
                </span>
                {accountType && (
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </>
            )}
          </button>

          {/* Already have account link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-pink font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>

          {/* Terms and Privacy
          <p className="text-center mt-4 max-w-2xl mx-auto text-sm text-light-black">
            By continuing, you agree to NovaTech's{" "}
            <Link to="/terms" className="text-pink hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-pink hover:underline">
              Privacy Policy
            </Link>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}
