
import React from "react";

const NotificationBanner = () => {
  return (
    <div className="bg-green-50 p-4 border-l-4 border-green-500">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">预计可获得不看房里程分：40km</h3>
          <div className="mt-2 flex space-x-4">
            <span className="text-green-700 text-sm">不用看房</span>
            <span className="text-green-700 text-sm">低碳租房</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            不看房签约，可以获得不看房里程分，不看房里程分可以抵扣搬家费用，也可以抵扣平台服务费。
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
