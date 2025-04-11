
import React,{ useState } from "react";
import { Nav } from "@douyinfe/semi-ui";
import { IconUser, IconSetting } from "@douyinfe/semi-icons";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <Nav
          mode="horizontal"
          className="h-16"
          selectedKeys={[activeTab]}
          onSelect={({ selectedKeys }) => setActiveTab(selectedKeys)}
        >
          <Nav.Header>
            <div className="text-blue-500 font-bold text-xl cursor-pointer">帮帮房</div>
          </Nav.Header>
          <Nav.Item itemKey="findHouse">智能找房</Nav.Item>
          <Nav.Item itemKey="rentOut">我要出租</Nav.Item>
          <Nav.Footer>
            <Nav.Item itemKey="personal">
              <div className="flex items-center">
                <IconUser size="large" />
                <span className="ml-1">个人中心</span>
              </div>
            </Nav.Item>
            <Nav.Item itemKey="management">
              <div className="flex items-center">
                <IconSetting size="large" />
                <span className="ml-1">管理中心</span>
              </div>
            </Nav.Item>
          </Nav.Footer>
        </Nav>
      </div>
    </div>
  );
};

export default Header;
