import React from 'react';

import { Card } from "@douyinfe/semi-ui";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { convertToEnglish } from './utils'
const LivingIndexAnalysis = ({ indexData, competitiveness }) => {
  const radarData = ['交通便利性','性价比','环境优质','居住舒适','生活配套'].map((item, index) => ({
    subject: item,
    value: +indexData[convertToEnglish(item)],
    fullMark: 5

  }));
  console.log({indexData}, { competitiveness });

  const { housingAdv = [], housingDisadv = [] } = competitiveness || {}

  return (
    <Card className="shadow-sm">
      <h2 className="text-xl font-bold mb-4">居住指数分析</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject"/>
              <PolarRadiusAxis domain={[0, 5]} />
              <Radar
                name="居住指数"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center " style={{alignItems:'stretch'}}>
          <div className="bg-blue-50 p-4 rounded-md shrink-0 flex flex-col justify-center">
            <h3 className="text-gray-700 mb-2">总体评分</h3>
            <div className="text-4xl font-bold text-blue-600">{indexData.score}/5</div>
          </div>
          <div className="flex-1 ml-2 flex flex-col">
            {housingAdv.length > 1 ?<div className="bg-green-50 rounded-md flex-1 p-2">
              <h3 className="text-gray-700 mb-2 font-bold text-l">优势</h3>
              {housingAdv.slice(1).map(adv => <p className="text-gray-800" key={adv}>{adv}</p>)}
            </div>: null}
            {housingDisadv.length > 1 ?<div className="bg-red-50 mt-2 rounded-md flex-1 p-2">
              <h3 className="text-gray-700 mb-2 font-bold text-l">劣势</h3>
              {housingDisadv.slice(1).map(disadv => <p className="text-gray-800"  key={disadv}>{disadv}</p>)}
            </div>:null}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LivingIndexAnalysis;
