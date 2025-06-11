// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./semantics/header";
import Sidebar from "./semantics/sidebar";
import Dashboard from "./semantics/dashboard";
import Order from "./order";
import Cart from "./cart";

function App() {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [isFiltered, setIsFiltered] = useState(false)

  return (
    <Router>
      <Header onMenuClick={() => setSidebarOpen(true)} handleFilter={() => setIsFiltered(!isFiltered)} />

      <div className={`dashboard-layout flex flex-wrap md:grid md:grid-cols-[270px_1fr] w-full h-auto min-h-dvh px-4 md:px-[30px] gap-[20px] relative`}>
        {/* Sidebar hidden on small screens, shown if showSidebar is true */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} className={`md:hidden ${sidebarOpen ? "block" : "hidden"}`} />

        {/* Main content */}
        <main className="h-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard filterProducts={isFiltered} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
      </div>

      <footer></footer>
    </Router>
  );
}

export default App;
