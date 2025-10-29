import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CloseSquare } from "react-iconly";
import { useProductContext } from "@/context/ProductContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { getCartCount, getCartTotal } = useProductContext();
  const cartCount = getCartCount();
  const totalCount = getCartTotal();

  // Initialize refs array with proper length
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active]!.offsetTop);
    }
  }, [active]);

  const handleLinkClick = (index: number) => {
    setActive(index);
    const targetLink = navItems[index].link;
    navigate(targetLink);

    if (window.innerWidth < 768) onClose(); // auto-close sidebar on mobile
  };

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active]!.offsetTop);
    }
  }, [active]);

  // ✅ Logout function
  const handleLogout = () => {
    // Clear stored auth data (adjust to your setup)
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Redirect to home page
    navigate("/");
  };

  const navItems = [
    {
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21.205 7.765a2.93 2.93 0 0 0-1.16-1.28l-6.47-4a3 3 0 0 0-3.16 0l-6.47 4a3 3 0 0 0-1.12 1.29a2.9 2.9 0 0 0-.24 1.7l1.68 10a2.94 2.94 0 0 0 1 1.79a3 3 0 0 0 1.9.7h9.62a3 3 0 0 0 1.94-.7a2.9 2.9 0 0 0 1-1.79l1.68-10a3 3 0 0 0-.2-1.71m-5.86 9.7h-6.69a1 1 0 0 1 0-2h6.69a1 1 0 1 1 0 2"
          ></path>
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m19.633 7.11l-6.474-4.02a2.23 2.23 0 0 0-2.362 0L4.324 7.133A2.23 2.23 0 0 0 3.31 9.362l1.67 10.027a2.23 2.23 0 0 0 2.228 1.86h9.582a2.23 2.23 0 0 0 2.229-1.86l1.67-10.027a2.23 2.23 0 0 0-1.058-2.251M8.636 16.459h6.685"
          ></path>
        </svg>
      ),
      label: "Home",
      link: "/products",
    },
    {
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m3.72 2.787l.55 1.863h14.654c1.84 0 3.245 1.717 2.715 3.51l-1.655 5.6c-.352 1.193-1.471 1.99-2.715 1.99H8.113c-1.244 0-2.362-.797-2.715-1.99L2.281 3.212a.75.75 0 1 1 1.438-.425M10.5 9.25a.75.75 0 0 0 0 1.5h4a.75.75 0 1 0 0-1.5zm-2 8a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5m8 0a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"
          ></path>
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16.5 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3m7.5 7h4"
          ></path>
        </svg>
      ),
      label: "Cart",
      link: "/cart",
    },
    {
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M5.586 4.586C5 5.172 5 6.114 5 8v9c0 1.886 0 2.828.586 3.414S7.114 21 9 21h6c1.886 0 2.828 0 3.414-.586S19 18.886 19 17V8c0-1.886 0-2.828-.586-3.414S16.886 4 15 4H9c-1.886 0-2.828 0-3.414.586M9 8a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeWidth={2}>
            <rect width={14} height={17} x={5} y={4} rx={2}></rect>
            <path strokeLinecap="round" d="M9 9h6m-6 4h6m-6 4h4"></path>
          </g>
        </svg>
      ),
      label: "Orders",
      link: "/order",
    },
    {
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinejoin="round"
              d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
            ></path>
            <circle cx={12} cy={7} r={3}></circle>
          </g>
        </svg>
      ),
      label: "Profile",
      link: "/profile",
    },
    {
      activeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2.75a8.52 8.52 0 0 0-5.043 1.647a8.435 8.435 0 0 0-3.149 9.058q-.121.107-.234.227c-.84.9-1.056 2.29-.565 4.12c.491 1.833 1.373 2.929 2.55 3.288c1.176.36 2.39.048 3.685-.299a.75.75 0 0 0 .531-.918l-.97-3.623l-.971-3.62a.75.75 0 0 0-.686-.556a.8.8 0 0 0-.232.024c-.619.166-1.216.33-1.764.553a6.92 6.92 0 0 1 2.692-7.043a7.04 7.04 0 0 1 8.312 0a6.92 6.92 0 0 1 2.692 7.043c-.548-.224-1.145-.387-1.764-.553a.8.8 0 0 0-.232-.024a.75.75 0 0 0-.686.555l-.97 3.621l-.971 3.623a.75.75 0 0 0 .531.918c1.296.347 2.51.658 3.686.299s2.058-1.455 2.549-3.287c.49-1.832.275-3.222-.565-4.121a4 4 0 0 0-.234-.227a8.435 8.435 0 0 0-3.149-9.058A8.52 8.52 0 0 0 12 2.75"
            color="currentColor"
          ></path>
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7.11 12.822c-2.55.684-4.29 1.378-3.376 4.787c.913 3.41 2.766 3.141 5.317 2.458l-.97-3.622zm9.78 0c2.55.684 4.29 1.378 3.376 4.787c-.913 3.41-2.766 3.141-5.317 2.458l.97-3.622zm2.429.912a7.75 7.702 0 0 0-2.72-8.732a7.75 7.702 0 0 0-9.198 0a7.75 7.702 0 0 0-2.72 8.732"
          ></path>
        </svg>
      ),
      label: "Support",
      link: "/support",
    },
  ];

  return (
    <div
      className={`fixed z-20 md:fixed left-0 md:left-4 top-0 md:top-[90px] h-full md:h-auto md:translate-none rounded-r-2xl md:rounded-3xl transition-transform duration-300 md:w-[180px] lg:w-[230px] pt-6 bg-background md:z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" md:hidden block top-4 left-4 p-4">
        <button onClick={onClose} className="text-white cursor-pointer">
          <CloseSquare size={30} />
        </button>
      </div>

      <div className="relative px-4">
        {/* Moving indicator */}
        <div
          className="absolute left-4 w-auto md:w-39 lg:w-50 h-14 bg-white/10 rounded-[50px] transition-all duration-300"
          style={{ top: `${indicatorTop}px` }}
        />

        {navItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (linkRefs.current) {
                linkRefs.current[index] = el;
              }
            }}
            onClick={() => handleLinkClick(index)}
            className={`link relative z-10 cursor-pointer flex items-center gap-3 px-4 py-4 rounded-[50px] transition-all duration-300 ${
              active === index ? "text-white font-semibold" : "text-grey"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLinkClick(index);
              }
            }}
          >
            {active === index ? item.activeIcon : item.icon}
            <span>{item.label}</span>
            {item.label === "Cart" && cartCount > 0 && (
              <span className="mr-auto bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse text-center"></span>
            )}
            {/* {item.label === "Orders" && orderUpdate && (
              <span className="mr-auto bg-red-500 text-white text-xs rounded-full w-2 h-2 animate-pulse text-center"></span>
            )} */}
          </div>
        ))}
      </div>

      <button
        className="w-full text-left flex items-center gap-4 text-white px-8 py-4 mb-4 md:mb-6 transition-colors cursor-pointer"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m12 15l3-3m0 0l-3-3m3 3H4m5-4.751V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 4 11.08 4 12.2 4h4.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2 2 0 0 1-.875.874c-.427.218-.986.218-2.104.218h-4.606c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C9 18.48 9 17.92 9 16.8v-.05"
          ></path>
        </svg>
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
