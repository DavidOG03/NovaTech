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

  const [isItemClicked, setIsItemClicked] = useState<boolean>(false);

  //   const handleItemClick = () => {
  //     setIsItemClicked(true);
  //   };

  //   const handleClosePopup = () => {
  //     setIsItemClicked(false);
  //   };

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
