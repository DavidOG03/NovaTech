import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Order from "./order";
import Cart from "./cart";
import { gsap } from "gsap";
import Card from "./components/card";
import Product from "./components/productDetails";
import ProductDetails from "./components/productDetails";
import { ProductProvider } from "./context/productContent";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
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
                  <Order />
                </DashboardLayout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <DashboardLayout>
                  <ProductDetails products={products} />
                </DashboardLayout>
              }
            />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
