import React, { ChangeEvent } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  handleFilter: () => void;
  searchQuery: string;                     
  handleSearch: (query: string) => void;   
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  handleFilter,
  searchQuery,
  handleSearch,
}) => {
  return (
    <header className="w-full flex justify-between items-center gap-[1.95rem] p-4 md:px-[1.95rem] md:py-[0.75rem] transition duration-50">
      {/* Left: Logo and Mobile Menu */}
      <div className="flex items-center gap-4">
        <button className="block md:hidden cursor-pointer" onClick={onMenuClick}>
          {/* …SVG omitted for brevity… */}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleSearch(e.target.value)
              }
              className="w-full max-w-[526px] py-[12px] pl-[3rem] rounded-[200px] bg-white outline-0 focus:outline-1"
            />
            <span className="search absolute top-[50%] left-6 -translate-y-[50%]">
              <img src="/images/search.svg" alt="search icon" />
            </span>
          </div>

          <button className="hidden md:block bg-gradient-to-br from-(--bg-pink) to-(--bg-color) transition-all duration-200 hover:bg-gradient-to-br hover:from-white hover:to-white hover:text-black text-white rounded-[3rem] py-[12px] px-8">
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
            <span className="user text-base">Rufus</span>
            <span className="greeting text-[10px]">Welcome</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
