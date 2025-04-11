
import React from "react";
import PropertyListingPage from "./components/PropertyListingPage";
import Header from "../HomePage/components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PropertyListingPage />
    </div>
  );
}

export default App;
