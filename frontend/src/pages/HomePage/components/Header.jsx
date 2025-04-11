
// 添加 React 导入
import React from 'react';
function Header({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: "smart", label: "智能找房", href: "/find-estate" },
    { id: "publish", label: "我要出租", href: "/rent-estate" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex" style={{justifyContent: 'space-between'}}>
        <div className="flex space-x-8" style={{alignItems: 'center'}}>
          <a className='text-blue-600 font-bold text-2xl' href='/'>
            帮帮房
          </a>
          {menuItems.map(item => (
              <a key={item.id}
                className={`text-base font-medium ${
                  currentPage === item.id ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
                }`}
                href={item.href}
              >
                {item.label}
              </a>
          ))}
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
      </nav>
    </header>
  );
}

export default Header;
