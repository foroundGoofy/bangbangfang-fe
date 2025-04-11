import React from "react";
import LocationAnalysis from "./components/LocationAnalysis";
import TransportationOptions from "./components/TransportationOptions";
import NeighborhoodAdvantages from "./components/NeighborhoodAdvantages";
import ConvenienceScore from "./components/ConvenienceScore";
import LifestyleReport from "./components/LifestyleReport";
import NeighborhoodHighlights from "./components/NeighborhoodHighlights";
const SceneCard = (props) => {
  return <div style={{margin: '0 8px', padding: 8, backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 8, boxShadow: '0 0 8px #d0d0d0'}}>
    {Object.entries(props.attrs).map(([key,val]) => <p key={key} style={{marginBottom: 4,fontSize: 13}}>{key}:{val}</p>)}
  </div>
}
const RentalAnalysis = ({scenarios}) => {
  console.log("simulatedScenarios", scenarios);
  
  return (
    <div className="mx-auto">
      {Object.keys(scenarios).map((key) => <div key={key} className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{key}</h2>
        <div style={{display: 'flex'}}>
          {scenarios[key]?.slice(0,4).map((item) => <SceneCard key={item.id} attrs={item}/>)}
        </div>
      </div>)}
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">场景分析</h2>
        <LocationAnalysis />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">交通方式情况</h2>
        <TransportationOptions />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">地段优势</h2>
        <NeighborhoodAdvantages />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">交通总评</h2>
        <p className="text-gray-600 mb-2">周边设施</p>
        <ConvenienceScore score={92} />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-bold text-gray-700 mb-4">生活体验报告</h2>
        <LifestyleReport />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">周边亮点</h2>
            <NeighborhoodHighlights 
              highlights={[
                "公共交通便利性极佳",
                "步行距离内有多种餐饮选择",
                "附近有多个医疗设施"
              ]}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">改进建议</h2>
            <NeighborhoodHighlights 
              highlights={[
                "考虑骑行作为通勤替代选择",
                "高峰期交通可能需要提前出发",
                "周末停车可能会有困难"
              ]}
              isSuggestion={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalAnalysis;
