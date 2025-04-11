import React from 'react';

import { Nav } from "@douyinfe/semi-ui";
import { IconHome, IconUser, IconSetting } from "@douyinfe/semi-icons";

const Navbar = () => {
  return (
    <Nav mode="horizontal" className="bg-white border-b border-gray-200">
      <Nav.Header>
        <div className="text-blue-600 font-bold text-xl px-4">帮帮房</div>
      </Nav.Header>
      <Nav.Item itemKey="smart" text="智能找房" />
      <Nav.Item itemKey="rent" text="我要出租" />
      <div className="flex-grow" />
      <Nav.Item itemKey="profile" text="个人中心" icon={<IconUser />} />
      <Nav.Item itemKey="manage" text="管理中心" icon={<IconSetting />} />
    </Nav>
  );
};

export default Navbar;
