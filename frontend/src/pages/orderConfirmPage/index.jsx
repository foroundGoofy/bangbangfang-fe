
import React, { useState } from "react";
import Header from '../rentEstatePage/components/Header';
import PropertyCard from "./components/PropertyCard";
import ProgressSteps from "./components/ProgressSteps";
import RentalContract from "./components/RentalContract";
import PaymentDetails from "./components/PaymentDetails";
import CompletionPage from "./components/CompletionPage";
import ContractPreviewModal from "./components/ContractPreviewModal";
import { useLocation } from "react-router-dom";

function OrderConfirmPage() {
  const location = useLocation();
  console.log("id", location.state);
  const { property = {} } = location.state || {};
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState({
    startDate: null,
    endDate: null
  });
  const [showContractModal, setShowContractModal] = useState(false);

  const propertyInfo = {
    name: "房屋确认",
    description: property['位置'],
    price: property['租金'],
    deposit:  property['租金'] * 2.5,
  };

  const handleContractGeneration = () => {
    if (contractData.startDate && contractData.endDate) {
      // Show contract preview modal instead of directly moving to next step
      setShowContractModal(true);
    }
  };

  const handleContractSign = () => {
    // Close modal and move to payment step
    setShowContractModal(false);
    setCurrentStep(2);
  };

  const handlePaymentComplete = () => {
    // Move to the completion step when payment is completed
    setCurrentStep(3);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RentalContract 
            contractData={contractData}
            setContractData={setContractData}
            onGenerate={handleContractGeneration}
          />
        );
      case 2:
        return (
          <PaymentDetails 
            property={propertyInfo}
            onPaymentComplete={handlePaymentComplete}
          />
        );
      case 3:
        return <CompletionPage property={propertyInfo} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <PropertyCard property={propertyInfo} />
        <div className="my-8">
          <ProgressSteps currentStep={currentStep} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {renderStepContent()}
        </div>
      </div>
      
      {showContractModal && (
        <ContractPreviewModal 
          property={propertyInfo}
          contractData={contractData}
          onClose={() => setShowContractModal(false)}
          onSign={handleContractSign}
        />
      )}
    </div>
  );
}

export default OrderConfirmPage;
