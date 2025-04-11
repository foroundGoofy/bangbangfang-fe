
import { useState } from "react";
import PropertyIntroduction from "./components/PropertyIntroduction";
import TenantReviews from "./components/TenantReviews";
import LocationMap from "./components/LocationMap";
import LivingIndex from "./components/LivingIndex";
import NearbyAmenities from "./components/NearbyAmenities";
import { Layout } from "@douyinfe/semi-ui";

function App() {
  const { Content } = Layout;
  
  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="max-w-5xl mx-auto py-6 px-4">
        <PropertyIntroduction />
        <TenantReviews />
        <LocationMap />
        <LivingIndex />
        <NearbyAmenities />
      </Content>
    </Layout>
  );
}

export default App;
