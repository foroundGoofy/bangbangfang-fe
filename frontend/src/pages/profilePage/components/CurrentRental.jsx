
import React from "react";

const CurrentRental = ({ rental }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold">当前租房</h3>
      </div>
      {rental ? (
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-lg">{rental.name}</h4>
              <p className="text-sm text-gray-600">{rental.description}</p>
              <p className="text-blue-600 font-medium">{rental.price}</p>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              {rental.status}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div>起租日期：{rental.startDate}</div>
            <div>结束日期：{rental.endDate}</div>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded" onClick={()=> location.href="/estate-order"}>
            查看详情
          </button>
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          您当前没有租房记录
        </div>
      )}
    </div>
  );
};

export default CurrentRental;
