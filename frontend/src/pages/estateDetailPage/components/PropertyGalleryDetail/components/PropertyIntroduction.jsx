
import React from "react";
import { Card, Typography } from "@douyinfe/semi-ui";
import  videoMP4 from '../assets/introduce.mp4'
const PropertyIntroduction = () => {
  const { Title } = Typography;

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">房东介绍</Title>
      <div className="w-full bg-black aspect-video rounded-md relative">
        <video src={videoMP4} autoPlay loop muted className="w-full h-full object-cover" controls	 />
      </div>
    </Card>
  );
};

export default PropertyIntroduction;
