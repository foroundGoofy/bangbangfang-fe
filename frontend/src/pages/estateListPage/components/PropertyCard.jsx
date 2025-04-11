import  React from "react";
import { useNavigate } from "react-router-dom";
import { propertyData } from "../data/propertyData";
const PropertyCard = ({ property, viewMode,index }) => {
  console.log({index},propertyData)
  const { title } = property;
  const navigate = useNavigate();
  console.log(property);
  return (
    <div className={`bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg ${
      viewMode === "list" ? "flex" : ""
    }`} >
      <div className={`${viewMode === "list" ? "w-1/3" : "w-full"}`}>
        <img 
          src={propertyData[index % 5].imageUrl} 
          alt={title} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
        <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
        <p className="text-2xl font-bold text-blue-600 mt-2">¥{property['租金']}</p>
        <p className="text-gray-600 mt-2">匹配指数：{property['匹配值']} / 10分</p>
        <p className="text-gray-600 mt-2">位置：{property['位置']}</p>
        <p className="text-gray-600 mt-2">
          {['房屋面积', '层数', '户型'].map(key => property[key]).filter(item => item).join(' · ')}{property['电梯']=== '是' ? ' · 有电梯' : ''}
        </p>

        
        {/* {viewMode === "list" && (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
              {bedrooms && (
                <div className="flex items-center">
                  <span className="font-medium">卧室:</span>
                  <span className="ml-1">{bedrooms}间</span>
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center">
                  <span className="font-medium">卫生间:</span>
                  <span className="ml-1">{bathrooms}间</span>
                </div>
              )}
              {propertyType && (
                <div className="flex items-center">
                  <span className="font-medium">类型:</span>
                  <span className="ml-1">{propertyType}</span>
                </div>
              )}
              {availableFrom && (
                <div className="flex items-center">
                  <span className="font-medium">可入住:</span>
                  <span className="ml-1">{availableFrom}</span>
                </div>
              )}
            </div>
            
            {features && features.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">房屋特色:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )} */}
        
        <div className={`mt-4 ${viewMode === "list" ? "flex justify-end" : ""}`}>
          <button className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors ${
            viewMode === "list" ? "w-auto" : "w-full"
          }`} onClick={() => navigate('/estate-detail', { state:{ property } })}>
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
