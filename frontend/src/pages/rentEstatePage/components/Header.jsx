
import React from "react";

const Header = ({ currentPage, setCurrentPage }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-blue-600 font-bold text-2xl">
              帮帮房
            </a>
          </div>
          <div className="flex items-center">
            <a 
              href="/profile" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              个人中心
            </a>
            <a 
              href="/manage-list" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              管理中心
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
