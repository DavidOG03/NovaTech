import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./semantics/header";
import Sidebar from "./semantics/sidebar";
import Dashboard from "./semantics/dashboard";
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

      <div className="dashboard-layout flex flex-wrap md:grid md:grid-cols-[270px_1fr] w-full h-auto min-h-dvh px-4 md:px-[30px] gap-[20px] relative">
        {/* Desktop sidebar - always visible on md+ screens */}
        <div className="hidden md:block">
          <Sidebar
            isOpen={true}
            onClose={() => {}} 
          />
        </div>

        {/* Mobile sidebar - conditionally rendered */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar */}
            <div className="relative">
              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="h-auto w-full">
          <Routes>
            <Route
              path="/"
              element={<Dashboard filterEnabled={isFiltered} searchQuery={searchQuery} />}
            />
            <Route path="/cart" element={<Cart numberOfItems={0} count={0} />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
      </div>

      <footer />
    </Router>
  );
};

export default App;