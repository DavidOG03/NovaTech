import React, { useEffect, useState } from "react";

const Header = ({
  onMenuClick,
  handleFilter,
  searchQuery, // ← now coming from App
  handleSearch,
}) => {
  // const toggleCategory = (index) => {
  //   setActiveCategories((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  // };

  return (
    <header
      className="w-full flex justify-between items-center gap-[1.95rem] p-4 md:px-[1.95rem] md:py-[0.75rem] transition duration-50"
    >
      {/* Left: Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          className="block md:hidden cursor-pointer"
          onClick={onMenuClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            id="category"
          >
            <path
              fill="#000000"
              d="M5.9199,11.4697 C7.3299,11.4697 8.4599,12.6107 8.4599,14.0307 L8.4599,14.0307 L8.4599,17.4397 C8.4599,18.8497 7.3299,19.9997 5.9199,19.9997 L5.9199,19.9997 L2.5399,19.9997 C1.1399,19.9997 -0.0001,18.8497 -0.0001,17.4397 L-0.0001,17.4397 L-0.0001,14.0307 C-0.0001,12.6107 1.1399,11.4697 2.5399,11.4697 L2.5399,11.4697 Z M17.46,11.4697 C18.86,11.4697 20,12.6107 20,14.0307 L20,14.0307 L20,17.4397 C20,18.8497 18.86,19.9997 17.46,19.9997 L17.46,19.9997 L14.08,19.9997 C12.67,19.9997 11.54,18.8497 11.54,17.4397 L11.54,17.4397 L11.54,14.0307 C11.54,12.6107 12.67,11.4697 14.08,11.4697 L14.08,11.4697 Z M5.9199,0 C7.3299,0 8.4599,1.15 8.4599,2.561 L8.4599,2.561 L8.4599,5.97 C8.4599,7.39 7.3299,8.53 5.9199,8.53 L5.9199,8.53 L2.5399,8.53 C1.1399,8.53 -0.0001,7.39 -0.0001,5.97 L-0.0001,5.97 L-0.0001,2.561 C-0.0001,1.15 1.1399,0 2.5399,0 L2.5399,0 Z M17.46,0 C18.86,0 20,1.15 20,2.561 L20,2.561 L20,5.97 C20,7.39 18.86,8.53 17.46,8.53 L17.46,8.53 L14.08,8.53 C12.67,8.53 11.54,7.39 11.54,5.97 L11.54,5.97 L11.54,2.561 C11.54,1.15 12.67,0 14.08,0 L14.08,0 Z"
              transform="translate(2 2)"
            />
          </svg>
        </button>

        <img src="/images/novatech.svg" alt="Novatech logo" className="h-6" />
      </div>

      {/* Middle: Search */}
      <div className="middle flex flex-1/2 justify-end items-center gap-4">
        <div className="input-group flex justify-end items-center gap-[1.125rem] w-full">
          <div className="w-full max-w-[526px] relative flex justify-end items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Gadget"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full max-w-[526px] py-[12px] pl-[3rem] rounded-[200px] bg-white outline-0 focus:outline-1"
            />
            <span className="search absolute top-[50%] left-6 -translate-y-[50%]">
              <img src="/images/search.svg" alt="search icon" />
            </span>
          </div>

          <button className=" hidden md:block bg-gradient-to-br from-(--bg-pink) to-(--bg-color) transition-all duration-200 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black  text-white rounded-[3rem] py-[12px] px-8">
            Search
          </button>
        </div>
        <button
          className="filter bg-white p-[10px] rounded-full grid content-center cursor-pointer hover:bg-gray-100"
          onClick={handleFilter}
        >
          <img src="/images/filter.svg" alt="filter icon" />
        </button>
      </div>

      {/* Right: Notification and Profile */}
      <div className="hug hidden md:flex justify-end items-center gap-4">
        <button className="notification-bell bg-white p-[10px] rounded-full grid content-center cursor-pointer hover:bg-gray-100">
          <img src="/images/bell.svg" alt="notification bell" />
        </button>
        <div className="profile grid grid-cols-2 gap-2">
          <img src="/images/profile_pic.png" alt="Profile Picture" />
          <div className="flex flex-col justify-center items-start gap-1">
            <span className="user text-base ">Rufus</span>
            <span className="greeting text-[10px]">Welcome</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
