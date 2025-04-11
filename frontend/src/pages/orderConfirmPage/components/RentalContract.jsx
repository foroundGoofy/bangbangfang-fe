
import React from "react";
import { DatePicker, Button } from "@douyinfe/semi-ui";
import dayjs from "dayjs";

const RentalContract = ({ contractData, setContractData, onGenerate }) => {
  const handleStartDateChange = (date) => {
    setContractData({
      ...contractData,
      startDate: date
    });
  };

  const handleEndDateChange = (date) => {
    setContractData({
      ...contractData,
      endDate: date
    });
  };

  const isFormValid = contractData.startDate && contractData.endDate;

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">租房合同</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-2 text-gray-700">起租日期</div>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="年/月/日"
            onChange={handleStartDateChange}
            value={contractData.startDate}
            format="yyyy/MM/dd"
          />
        </div>
        
        <div>
          <div className="mb-2 text-gray-700">结束日期</div>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="年/月/日"
            onChange={handleEndDateChange}
            value={contractData.endDate}
            format="yyyy/MM/dd"
          />
        </div>
      </div>
      
      <div className="mt-8">
        <Button 
          theme="solid" 
          type="primary" 
          size="large"
          disabled={!isFormValid}
          onClick={onGenerate}
          style={{ 
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            padding: '0 24px'
          }}
        >
          生成合同
        </Button>
      </div>
    </div>
  );
};

export default RentalContract;
