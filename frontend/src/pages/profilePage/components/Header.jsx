
import React from "react";
import { IconUser, IconSetting } from "@douyinfe/semi-icons";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-blue-600 font-bold text-xl">帮帮房</div>
            <nav className="ml-10">
              <ul className="flex space-x-8">
                <li className="text-gray-700 hover:text-blue-600">智能找房</li>
                <li className="text-gray-700 hover:text-blue-600">我要出租</li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
              <IconUser size="small" className="mr-1" />
              <span>个人中心</span>
            </div>
            <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
              <IconSetting size="small" className="mr-1" />
              <span>管理中心</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
