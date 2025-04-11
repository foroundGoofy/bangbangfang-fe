
import React, { useState } from "react";
import axios from "axios";
import * as mock from './apis/mock';
import Header from "../HomePage/components/Header";
import PropertyDetail from "./components/PropertyDetail";
import PropertyGallery from "./components/PropertyGallery";
import SimulatedLiving from "./components/SimulatedLiving";
import RentalConfirmationModal from "./components/RentalConfirmationModal";
import RentalAnalysis from "./components/RentalAnalysis";
// 引入 LoadingModal 组件
import LoadingModal from "./components/LoadingModal";
import { useLocation } from "react-router-dom";
import { getDataFromMarkdown } from "./apis/markdownToJSON";

function EstateDetailPage() {
  const [currentPage, setCurrentPage] = useState("home");

  const [simulatedScenarios, setSimulatedScenarios] = useState({});
  const [showSimulatedLiving, setShowSimulatedLiving] = useState(false);
  const [showRentalModal, setShowRentalModal] = useState(false);
  // 添加状态来控制 LoadingModal 的显示和隐藏
  const [showLoadingModal, setShowLoadingModal] = useState(false);


  const location = useLocation();
  console.log("id", location.state);


  const toggleSimulatedLiving = () => {
    setShowSimulatedLiving(!showSimulatedLiving);
  };

  const toggleRentalModal = () => {
    setShowRentalModal(!showRentalModal);
  };

  const onSimulatedLivingSubmit = async (scenarios) => {
    setShowLoadingModal(true);
    const { property = {} } = location.state || {};
    const id = property.ID;
    const selectedScenarios = scenarios.map((scenario) => scenario.title);
    console.log("scenarios", scenarios);
    try{
      const resList = await Promise.all(
        selectedScenarios.map((scenario) => 
          axios.post('/api/simulate-scenario', {
            property_id: +id,// 房屋ID
            scenario // 场景名称
          }).then(res =>res.data)
        )
      )
      const simulatedScenarios = selectedScenarios.reduce((acc, cur, curIndex) => {
        acc[cur] = resList[curIndex];
        return acc;
      }, {});
      const realScenarios = getDataFromMarkdown(simulatedScenarios)
      setSimulatedScenarios(realScenarios);
      setShowLoadingModal(false);
      
    }catch(e){
      console.log("error", e)
      setShowLoadingModal(false);
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <PropertyDetail
          toggleSimulatedLiving={toggleSimulatedLiving}
          toggleRentalModal={toggleRentalModal}
        />
        {showSimulatedLiving ? (
          <SimulatedLiving onSubmit={onSimulatedLivingSubmit} />
        ) : (
          <PropertyGallery />
        )}
        {Object.keys(simulatedScenarios).length && showSimulatedLiving ? <RentalAnalysis scenarios={simulatedScenarios} />:null}
      </div>
      {showRentalModal && (
        <RentalConfirmationModal onClose={toggleRentalModal} />
      )}
      {/* 根据状态显示 LoadingModal */}
      {showLoadingModal && <LoadingModal />}
    </div>
  );
}

export default EstateDetailPage;
