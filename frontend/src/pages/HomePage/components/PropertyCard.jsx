
// 添加 React 导入
import React from 'react';
function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative pb-[65%]">
        <img 
          src={property.image} 
          alt={property.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-1">{property.title}</h3>
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-blue-600">¥{property.price}/月</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">{property.area}m² · {property.location}</div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors" onClick={()=> location.href='estate-detail'}>
          查看详情
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
