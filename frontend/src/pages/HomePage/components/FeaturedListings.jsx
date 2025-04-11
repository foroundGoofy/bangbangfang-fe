
// 添加 React 导入
import React from 'react';
import PropertyCard from "./PropertyCard";
import { propertyData } from "../data/propertyData";

function FeaturedListings() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">精选房源</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyData.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedListings;
