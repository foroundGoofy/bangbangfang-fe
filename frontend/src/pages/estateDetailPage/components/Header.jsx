
import React from "react";

const Header = ({ setCurrentPage }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <a href="#" className="text-blue-600 text-xl font-bold">帮帮房</a>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">智能找房</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">我要出租</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-600">个人中心</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">管理中心</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
