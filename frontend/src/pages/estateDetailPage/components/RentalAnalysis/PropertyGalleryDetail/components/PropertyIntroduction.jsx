
import React from "react";
import { Card, Typography } from "@douyinfe/semi-ui";

const PropertyIntroduction = () => {
  const { Title } = Typography;

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">房东介绍</Title>
      <div className="w-full bg-black aspect-video rounded-md relative">
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-2 bg-black bg-opacity-50 text-white">
          <span className="text-xs">0:00</span>
          <div className="flex items-center space-x-3">
            <button className="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-7.072m-2.828 9.9a9 9 0 010-12.728" />
              </svg>
            </button>
            <button className="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyIntroduction;
