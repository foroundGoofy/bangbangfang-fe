
import React, { useState } from "react";
import Header from "./components/Header";
import HousingRegistrationForm from "./components/HousingRegistrationForm";

function App() {
  const [currentPage, setCurrentPage] = useState("registration");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mx-auto px-4 py-6">
        {currentPage === "registration" && <HousingRegistrationForm />}
      </div>
    </div>
  );
}

export default App;
