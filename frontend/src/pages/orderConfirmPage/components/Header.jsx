
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600 mr-8">帮帮房</h1>
          <nav className="hidden md:flex space-x-6">
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
