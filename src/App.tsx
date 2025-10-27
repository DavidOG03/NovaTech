import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Cart from "./pages/cart";
import ProductDetails from "./components/productDetails";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SellerSignIn from "./pages/SignIn";
import SellerSignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import CustomerSupport from "./pages/customerSupport";
import Profile from "./pages/profile";
import Orders from "./pages/order";
import AccountType from "./pages/accountType";

const App: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toggle filter state
  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const products = [
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      description: "Latest model of Iphone",
      color: "Black",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      description: "High-quality wireless earbuds",
      color: "White",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      description: "Noise-cancelling over-ear headphones",
      color: "Silver",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      description: "Portable gaming console",
      color: "Black",
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      description: "Latest model of Samsung tablet",
      color: "Silver",
    },
  ];

  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/account" element={<AccountType />} />
           
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard
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
                <DashboardLayout>
                  <Cart numberOfItems={0} count={0} />
                </DashboardLayout>
              }
            />
            <Route
              path="/order"
              element={
                <DashboardLayout>
                  <Orders />
                </DashboardLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <DashboardLayout>
                  <ProductDetails />
                </DashboardLayout>
              }
            />
            <Route
              path="/support"
              element={
                <DashboardLayout>
                  <CustomerSupport />
                </DashboardLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              }
            />
             <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
             <Route path="/seller-signup" element={<SellerSignUp />} />
            <Route path="/seller-signin" element={<SellerSignIn />} />
          </Routes>
          
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
