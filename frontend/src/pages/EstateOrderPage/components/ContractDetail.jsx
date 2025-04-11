
import React,{ useState } from "react";
import PropertyCard from "./PropertyCard";
import ContractCard from "./ContractCard";

const ContractDetail = ({ contractData }) => {
  const { property, contract } = contractData;

  const handleSublet = (date) => {
    console.log("Initiating sublease process starting on:", date);
    // Implementation for sublease functionality with the selected date
  };

  const handleEarlyTermination = (date) => {
    console.log("Initiating early termination process for date:", date);
    // Implementation for early termination functionality with the selected date
  };

  return (
    <div className="space-y-6">
      <PropertyCard 
        property={property} 
        onSublet={handleSublet} 
        onTerminate={handleEarlyTermination} 
      />
      <ContractCard contract={contract} />
    </div>
  );
};

export default ContractDetail;
