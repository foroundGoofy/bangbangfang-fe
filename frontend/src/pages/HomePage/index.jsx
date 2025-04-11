
// 添加 React 导入
import React from 'react';
import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ValueProposition from "./components/ValueProposition";
import FeaturedListings from "./components/FeaturedListings";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === "home" && (
        <>
          <Hero />
          <ValueProposition />
          <FeaturedListings />
        </>
      )}
    </div>
  );
}

export default App;
