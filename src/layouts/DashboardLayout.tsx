import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
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

      <div className="dashboard-layout px-4 md:px-6 lg:px-8 gap-[20px] md:ml-[190px] lg:ml-[230px] bg-grey">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div className="md:hidden transition-all duration-150 fixed inset-0 z-5">
            <div
              className="absolute inset-0 bg-[#00000050]"
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
