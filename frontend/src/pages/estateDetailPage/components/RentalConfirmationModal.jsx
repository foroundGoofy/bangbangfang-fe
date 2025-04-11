
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RentalConfirmationModal = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property = {} } = location.state || {};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">确认租房</h2>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium mb-2">租房特权：</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>不看房里程积累40km，可抵扣服务费或在帮帮房商城购物</li>
              <li>3天试住特权，试住期间不满意可免费更换房子</li>
              <li>奖励30元搬家券</li>
            </ul>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              onClick={() => navigate("/order-confirm", { state:{ property } })} 
            >
              确定租房
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalConfirmationModal;
