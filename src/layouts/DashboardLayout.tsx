import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <>
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        handleFilterToggle={() => setIsFiltered((prev) => !prev)}
        searchQuery={searchQuery}
        handleSearch={(q: string) => setSearchQuery(q)}
      />

      <div className="dashboard-layout px-4 md:px-6 lg:px-8 gap-[20px] md:ml-[190px] lg:ml-[270px]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div className="md:hidden transition-all duration-150 fixed inset-0 z-5">
            <div
              className="absolute inset-0 bg-[#00000050]"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <main className="h-auto w-auto relative">{children}</main>
      </div>
    </>
  );
};
export default DashboardLayout;
