import React from 'react';

import { Card } from "@douyinfe/semi-ui";

const AmenitySection = ({ title, items }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-700">{item.name}</span>
            <span className="text-gray-500">{item.distance}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SurroundingAmenities = ({ amenities }) => {
  return (
    <Card className="shadow-sm">
      <h2 className="text-xl font-bold mb-4">周边配套分析</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AmenitySection title="交通设施" items={amenities.transportation} />
        <AmenitySection title="教育资源" items={amenities.education} />
        <AmenitySection title="医疗设施" items={amenities.medical} />
        <AmenitySection title="生活设施" items={amenities.lifestyle} />
      </div>
    </Card>
  );
};

export default SurroundingAmenities;
