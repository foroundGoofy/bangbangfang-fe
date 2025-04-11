
import React from "react";
import NotificationBanner from "./NotificationBanner";
import PropertyInfo from "./PropertyInfo";
import ActionButtons from "./ActionButtons";

const PropertyDetail = ({ toggleSimulatedLiving, toggleRentalModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <NotificationBanner />
      <div className="p-6">
        <PropertyInfo />
        <ActionButtons 
          toggleSimulatedLiving={toggleSimulatedLiving} 
          toggleRentalModal={toggleRentalModal} 
        />
      </div>
    </div>
  );
};

export default PropertyDetail;
