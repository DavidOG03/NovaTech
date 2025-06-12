import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CloseSquare } from "react-iconly";
interface SidebarProps {
  isOpen: Boolean;
  onClose:Boolean;
}

const Sidebar:React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [active, setActive] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const linkRefs = useRef([]);
  const navigate = useNavigate();

  const handleClick = (index) => {
    setActive(index);
    const targetLink = navItems[index].link;
    navigate(targetLink);
    if (window.innerWidth < 768) onClose(); // auto-close sidebar on mobile
  };

  useEffect(() => {
    if (linkRefs.current[active]) {
      setIndicatorTop(linkRefs.current[active].offsetTop);
    }
  }, [active]);

  const navItems = [
    {
      activeIcon: "/images/home_active.svg",
      icon: "/images/home.svg",
      label: "Home",
      link: "/",
    },
    {
      activeIcon: "/images/cart_active.svg",
      icon: "/images/cart.svg",
      label: "Cart",
      link: "/cart",
    },
    {
      activeIcon: "/images/order.svg",
      icon: "/images/order.svg",
      label: "Orders",
      link: "/order",
    },
    {
      activeIcon: "/images/profile.svg",
      icon: "/images/profile.svg",
      label: "Profile",
      link: "/",
    },
    {
      activeIcon: "/images/headphones.svg",
      icon: "/images/headphones.svg",
      label: "Support",
      link: "/",
    },
  ];

  return (
    <aside
      className={`sidebar fixed md:static top-0 left-0 z-50 transition-transform duration-300 ease-in-out  flex flex-col justify-between items-start gap-4 w-full h-screen max-h-screen max-w-[270px] rounded-r-3xl md:rounded-3xl bg-(--bg-color) py-[40px] px-[33px] ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="md:hidden flex justify-end absolute top-6 left-2">
        <button className="cursor-pointer" onClick={onClose}>
          <CloseSquare set="bold" primaryColor="white" size="large" />
        </button>
      </div>
      <ul className="w-full relative space-y-2">
        {/* Moving indicator */}
        <span
          className="absolute left-0 w-full bg-[#ffffff10] rounded-[50px] transition-all duration-300 z-0"
          style={{
            top: `${indicatorTop}px`,
            height: "60px", // match li height
          }}
        />
        {navItems.map((item, index) => (
          <li
            key={index}
            ref={(el) => (linkRefs.current[index] = el)}
            onClick={() => handleClick(index)}
            className={`link relative z-10 cursor-pointer flex items-center gap-3 px-4 py-4 rounded-[50px] transition-all duration-300 ${
              active === index ? "text-white font-semibold" : "text-gray-300"
            }`}
            role="nav-link"
          >
            <img
              src={active === index ? item.activeIcon : item.icon}
              alt={`${item.label} icon`}
              className="w-5 h-5"
            />
            <span className="relative flex items-center">
              {item.label}
              {item.label === "Cart" && cartCount > 0 && (
                <span className="ml-2 bg-[#ffffff10] text-white text-xs font-bold rounded-full w-5 h-5 grid place-items-center">
                  {cartCount}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <span className="text-white px-4 cursor-pointer flex justify-start items-center gap-2">
        <img src="/images/logout.svg" alt="logout icon" /> Log out
      </span>
    </aside>
  );
};

export default Sidebar;
