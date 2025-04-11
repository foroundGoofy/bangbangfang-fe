
import React,{ useState } from "react";
import PropertyIntroduction from "./components/PropertyIntroduction";
import TenantReviews from "./components/TenantReviews";
import LocationMap from "./components/LocationMap";
import LivingIndex from "./components/LivingIndex";
import NearbyAmenities from "./components/NearbyAmenities";

function App() {
  
  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <PropertyIntroduction />
      <div className="mb-6"/>
      <TenantReviews />
      <div className="mb-6"/>
      <LocationMap />
      <div className="mb-6"/>
      <LivingIndex />
      {/* <div className="mb-6"/>
      <NearbyAmenities /> */}
    </div>
  );
}

export default App;
