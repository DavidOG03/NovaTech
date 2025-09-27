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

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [filterActive, setFilterActive] = useState<boolean>(false);

  // Toggle filter state

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Filter out null values before animating
    const validCards = cardsRef.current.filter((card) => card !== null);

    gsap.fromTo(
      validCards,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power2.out", stagger: 0.125 }
    );
  }, []);

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

  const similarProducts = [
    {
      id: 1,
      image: "/images/iphone.png",
      name: "Iphone 16 Pro",
      price: "N1,400,050",
      lastPrice: "N1,600,050",
    },
    {
      id: 2,
      image: "/images/oraimo_pods.png",
      name: "Oraimo Pods",
      price: "N18,000",
      lastPrice: "N26,000",
    },
    {
      id: 3,
      image: "/images/headphone.webp",
      name: "Sony Headphones",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      id: 4,
      image: "/images/ps5_portable.png",
      name: "PS5 Portable",
      price: "N480,000",
      lastPrice: "N550,000",
    },
    {
      id: 5,
      image: "/images/tablet.png",
      name: "Samsung Tablet",
      price: "N480,000",
      lastPrice: "N550,000",
    },
  ];

  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);

  const handleItemClick = () => {
    setIsItemClicked(true);
  };

  const handleClosePopup = () => {
    setIsItemClicked(false);
  };

  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            handleFilterToggle={() => setIsFiltered((prev) => !prev)}
            searchQuery={searchQuery}
            handleSearch={(q: string) => setSearchQuery(q)}
          />

          <div className="dashboard-layout px-4 md:px-6 lg:px-8 gap-[20px] md:ml-[190px] lg:ml-[270px]">
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {sidebarOpen && (
              <div className="md:hidden transition-all duration-150 fixed inset-0 z-5">
                <div
                  className="absolute inset-0 bg-[#00000050]"
                  onClick={() => setSidebarOpen(false)}
                />
              </div>
            )}

            <main className="h-auto w-auto relative">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard
                        filterEnabled={isFiltered}
                        searchQuery={searchQuery}
                        // handleItemClick={() => setIsItemClicked(true)}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart numberOfItems={0} count={0} />}
                />
                <Route path="/order" element={<Order />} />
                <Route
                  path="/product/:id"
                  element={<ProductDetails products={products} />}
                />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
              <div className="similar-products flex flex-col justify-start items-start flex-wrap gap-[10px] p-4 md:p-[30px] bg-white rounded-2xl mb-4">
                <div className="header w-full flex flex-auto justify-between items-center gap-8 mb-[2rem]">
                  <h1 className="text-[18px] md:text-[1.5rem] font-bold">
                    Similar Products you may like
                  </h1>
                  <span className="more flex justify-end items-center gap-2 text-[#515151]">
                    See More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#515151"
                        d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div className="similar-product-card w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 ">
                  {similarProducts.map((product, index) => (
                    <div
                      ref={(el) => {
                        cardsRef.current[similarProducts.length + index] = el;
                      }}
                      key={index}
                      className="h-auto min-h-[297px] transition-shadow duration-300 hover:cursor-pointer border-5 border-transparent hover:border-[#f0f0f0] flex flex-col items-center justify-center p-2 bg-white rounded-[0.75rem] overflow-hidden"
                      onClick={handleItemClick}
                    >
                      <Card
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        lastPrice={product.lastPrice}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* {isItemClicked && <Popup
            image={similarProducts[0]?.image}
            handleItemClose={handleClosePopup}
          />} */}
            </main>
          </div>

          <footer />
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
