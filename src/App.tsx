import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./ui/header";
import Sidebar from "./ui/sidebar";
import Dashboard from "./ui/dashboard";
import Order from "./order";
import Cart from "./cart";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Router>
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        handleFilter={() => setIsFiltered((prev) => !prev)}
        searchQuery={searchQuery}
        handleSearch={(q: string) => setSearchQuery(q)}
      />

      <div className="dashboard-layout flex flex-wrap md:grid w-full h-full px-4 md:px-[30px] gap-[20px] relative md:ml-[280px]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div className="md:hidden transition-all duration-150 fixed inset-0 z-5">
            <div
              className="absolute inset-0 bg-[#00000050]"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <main className="h-auto w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  filterEnabled={isFiltered}
                  searchQuery={searchQuery}
                />
              }
            />
            <Route
              path="/cart"
              element={<Cart numberOfItems={0} count={0} />}
            />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
      </div>

      <footer />
    </Router>
  );
};

export default App;
