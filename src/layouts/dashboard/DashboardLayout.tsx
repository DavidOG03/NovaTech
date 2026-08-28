import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { SearchProvider } from "@/context/SearchContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchProvider>
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        handleFilterToggle={() => setIsFiltered((prev) => !prev)}
      />

      <div className="dashboard-layout px-4 md:px-6 lg:px-8 gap-5 md:ml-47.5 lg:ml-57.5 bg-color">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div className="md:hidden transition-all duration-150 fixed inset-0 z-5">
            <div
              className="absolute inset-0 bg-color"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <main className="min-h-screen w-auto relative">{children}</main>
      </div>
    </SearchProvider>
  );
};
export default DashboardLayout;
