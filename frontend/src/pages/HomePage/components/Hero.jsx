
// 添加 React 导入
import React from 'react';

function Hero() {
  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
            租房不看房<br />就找帮帮房
          </h1>
          <p className="text-gray-500 mb-8">足不出户租房，不踩坑<br />躺在床上出租，不空置</p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors" onClick={()=> location.href="/find-estate"}>
              开始找房
            </button>
            <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"  onClick={()=> location.href="/rent-estate"}>
              我要出租
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
            alt="Modern apartment building" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
