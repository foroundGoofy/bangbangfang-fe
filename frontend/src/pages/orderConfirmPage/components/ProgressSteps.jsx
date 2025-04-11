
import React from "react";

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "合同签署" },
    { number: 2, title: "支付费用" },
    { number: 3, title: "完成交易" }
  ];

  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;
        const isPast = step.number < currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium
                  ${isActive ? 'bg-blue-500' : isPast ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                {step.number}
              </div>
              <div className={`mt-2 text-sm ${isActive ? 'text-blue-500 font-medium' : isPast ? 'text-green-500' : 'text-gray-500'}`}>
                {step.title}
              </div>
            </div>
            {!isLast && (
              <div className="flex-1 mx-4">
                <div className={`h-1 ${isPast ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
