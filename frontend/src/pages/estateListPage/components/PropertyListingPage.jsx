
import  React, { useState,useEffect } from "react";
import PropertyCard from "./PropertyCard";
import ViewToggle from "./ViewToggle";
import { useLocation } from "react-router-dom";

const PropertyListingPage = () => {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [propertyData, setPropertyData] = useState([]); // 假设有一个名为propertyData的数组，包含房源信息
  const location = useLocation();

  useEffect(() => {
    const propertyDataFromPrev = location.state.list;
    setPropertyData(propertyDataFromPrev);
  },[])
  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">房源列表</h1>
        <ViewToggle currentView={viewMode} onToggle={toggleViewMode} />
      </div>

      <div 
        className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}
      >
        {propertyData.map((property,index) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
            viewMode={viewMode}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyListingPage;
