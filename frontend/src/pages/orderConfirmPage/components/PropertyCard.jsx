
import React from "react";

const PropertyCard = ({ property }) => {
  const { name, description, price, deposit } = property;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">¥{price}/月</div>
          <div className="text-gray-500 mt-1">押金：¥{deposit}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
