
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import pick from 'lodash-es/pick'

import PropertyDescription from "./form/PropertyDescription";
import LocationInfo from "./form/LocationInfo";
import PropertyDetails from "./form/PropertyDetails";
import PricingInfo from "./form/PricingInfo";
import AvailabilityInfo from "./form/AvailabilityInfo";
import ImageUpload from "./form/ImageUpload";
import DocumentUpload from "./form/DocumentUpload";
import SubmitButton from "./form/SubmitButton";
import { Notification } from '@douyinfe/semi-ui';

const HousingRegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    street: "",
    community: "",
    address: "",
    lnglat: null,
    floor: "",
    propertyType: "",
    roomAge: "",
    propertyCondition: "",
    minRent: "1000",
    maxRent: "10000",
    availableDate: "",
    propertyFeatures: [],
    images: [],
    documents: []
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      street: location.street || formData.street,
      community: location.community || formData.community,
      address: location.address || formData.address,
      lnglat: location.lnglat || formData.lnglat
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 选取 formData 中的部分字段
    const selectedFields = pick(formData, [
      
      'floor'
    ]);
    const selectedData = {
      "user_id": 12345,
      ...formData,
      has_elevator: formData.propertyFeatures.includes("电梯"),
      district: formData.street,
      "address": formData.community,
      rent: +formData.minRent,
      layout: formData.propertyType,
      floor: +formData.floor,
      area: 78.5
    };
    
    try {

      const response = await fetch('/api/property/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedData)
      });
      console.log("selectedData", response)


      if (response.ok) {
        const res = await response.json();
        console.log("Response:", res.propertyID);
        Notification.success({
          content: '房屋信息提交成功！',
          duration: 1,
          onClose: () => {
            navigate('/rent-order-detail', {state: {rentEstateDetail: selectedData,id: res.propertyID} });
            // window.location.href = "/rent-order-detail";
          }
        });
      } else {
        Notification.error({
          content: '房屋信息提交失败，请重试！',
          duration: 3
        });
        // Notification.success({
        //   content: '房屋信息提交成功！',
        //   duration: 1,
        //   onClose: () => {
        //     navigate('/rent-order-detail', {state: {rentEstateDetail: selectedData} });
        //   }
        // });
      }
    } catch (error) {
      // console.error("Error submitting form:", error);
      Notification.error({
        content: '发生错误，请重试！',
        duration: 3
      });
      navigate('/rent-order-detail', {state: {rentEstateDetail: selectedData} });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-medium text-gray-900">房屋信息登记</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* <PropertyDescription 
          value={formData.description} 
          onChange={(value) => handleChange("description", value)} 
        /> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LocationInfo 
            street={formData.street}
            community={formData.community}
            onStreetChange={(value) => handleChange("street", value)}
            onCommunityChange={(value) => handleChange("community", value)}
            onLocationSelect={handleLocationSelect}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyDetails 
            floor={formData.floor}
            propertyType={formData.propertyType}
            roomAge={formData.roomAge}
            propertyCondition={formData.propertyCondition}
            onFloorChange={(value) => handleChange("floor", value)}
            onPropertyTypeChange={(value) => handleChange("propertyType", value)}
            onRoomAgeChange={(value) => handleChange("roomAge", value)}
            onPropertyConditionChange={(value) => handleChange("propertyCondition", value)}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <PricingInfo 
            minRent={formData.minRent}
            maxRent={formData.maxRent}
            onMinRentChange={(value) => handleChange("minRent", value)}
            onMaxRentChange={(value) => handleChange("maxRent", value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AvailabilityInfo 
            availableDate={formData.availableDate}
            propertyFeatures={formData.propertyFeatures}
            onAvailableDateChange={(value) => handleChange("availableDate", value)}
            onPropertyFeaturesChange={(value) => handleChange("propertyFeatures", value)}
          />
        </div>
        
        <ImageUpload 
          images={formData.images}
          onImagesChange={(value) => handleChange("images", value)}
        />
        
        <DocumentUpload 
          documents={formData.documents}
          onDocumentsChange={(value) => handleChange("documents", value)}
        />
        
        <SubmitButton onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default HousingRegistrationForm;
