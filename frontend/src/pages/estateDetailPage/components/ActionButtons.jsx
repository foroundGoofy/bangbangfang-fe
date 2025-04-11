
import React from "react";

const ActionButtons = ({ toggleSimulatedLiving, toggleRentalModal }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md transition duration-200"
        onClick={toggleSimulatedLiving}
      >
        模拟居住
      </button>
      <button 
        className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition duration-200"
        onClick={toggleRentalModal}
      >
        我要租房
      </button>
      <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 px-4 rounded-md transition duration-200">
        问房东
      </button>
    </div>
  );
};

export default ActionButtons;
