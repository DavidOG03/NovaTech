import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Cart from "./pages/cart";
import ProductDetails from "./components/productDetails";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import SellerSignIn from "./auth/SellerSignIn";
import SellerSignUp from "./auth/SellerSignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import CustomerSupport from "./pages/customerSupport";
import Profile from "./pages/profile";
import Orders from "./pages/order";
import AccountType from "./pages/accountType";
import SellerDashboard from "./pages/sellerDashboard";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Toggle filter state
  const toggleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const [accountType, setAccountType] = useState<string | null>(
    localStorage.getItem("accountType")
  );

  useEffect(() => {
    const storedType = localStorage.getItem("accountType");
    if (storedType) {
      setAccountType(storedType);
    }
  }, []);

  const handleAccountSelect = (type: string) => {
    localStorage.setItem("accountType", type);
    setAccountType(type);
  };

  const products = [
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 13 Pro",
      price: "N1,400,050",
      lastPrice: "N1,500,000",
      description:
        "512 GB, Fast charging, Wireless charging, Titanium body, 3,561 mAh battery, A18 Bionic chip, 48MP main camera, IOS 18, Face ID",
      quantity: 5,
      color: "Black",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N25,000",
      description:
        "Bluetooth 5.3, 20-hour battery life with case, Deep bass sound, Touch control, Noise reduction mic, Type-C fast charging, Ergonomic fit design",
      quantity: 5,
      color: "Black",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "Wireless over-ear design, Active Noise Cancellation, 30-hour battery life, Fast charging via USB-C, Hi-Res audio, Touch sensor controls, Built-in Alexa support",
      quantity: 5,
      color: "Black",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "8-inch Full HD display, DualSense wireless controls, Wi-Fi connectivity, Adaptive triggers, Haptic feedback, Cloud & local gaming support, Long-lasting battery",
      color: "Black",
      quantity: 5,
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N520,000",
      description:
        "256 GB storage, 12.4-inch Super AMOLED display, S Pen support, Snapdragon processor, 10,090 mAh battery, 45W fast charging, Android 14 OS, Quad speakers by AKG",
      quantity: 5,
      color: "Silver",
    },
  ];

  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route
              path="/"
              // element={
              //   !accountType ? (
              //     <AccountType
              //     // onSelectAccount={handleAccountSelect}
              //     // accountType={accountType}
              //     />
              //   ) : (
              //     // redirect based on account type
              //     <Navigate
              //       to={accountType === "seller" ? "/seller-signin" : "/signin"}
              //       replace
              //     />
              //   )
              // }
              element={<AccountType />}
            />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/seller-signup" element={<SellerSignUp />} />
            <Route path="/seller-signin" element={<SellerSignIn />} />

            <Route
              path="/products"
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
