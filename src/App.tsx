import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Products from "./pages/products/products";
import Cart from "./pages/cart/cart";
import ProductDetails from "./pages/products/ProductDetails";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./auth/pages/SignIn";
import SignUp from "./auth/pages/SignUp";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import HomeRouter from "./components/shared/HomeRouter";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import CustomerSupport from "./pages/support/customerSupport";
import Profile from "./pages/account/profile";
import Orders from "./pages/dashboard/order";
import { Toaster } from "react-hot-toast";
import VendorSignUp from "./auth/pages/VendorSignUp";
import VendorSignIn from "./auth/pages/VendorSignIn";
import SellerDashboard from "./pages/vendor/SellerDashboard";

const App: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toggle filter state
  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const [accountType, setAccountType] = useState<string | null>(
    localStorage.getItem("selectedAccountType"),
  );

  useEffect(() => {
    const storedType = localStorage.getItem("selectedAccountType");
    if (storedType) {
      setAccountType(storedType);
    }
  }, []);

  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<HomeRouter />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/vendor/signup" element={<VendorSignUp />} />
            <Route path="/vendor/signin" element={<VendorSignIn />} />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Products
                      filterEnabled={isFiltered}
                      searchQuery={searchQuery}
                      // handleItemClick={() => setIsItemClicked(true)}
                    />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Cart numberOfItems={0} count={0} />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Orders />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProductDetails />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CustomerSupport />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route path="/seller-dashboard" element={<SellerDashboard />} />

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
