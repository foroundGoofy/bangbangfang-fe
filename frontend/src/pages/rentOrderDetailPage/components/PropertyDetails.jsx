import React,{ useEffect, useState } from "react";
import SuccessNotification from "./SuccessNotification";
import PropertyInfo from "./PropertyInfo";
import LivingIndexAnalysis from "./LivingIndexAnalysis";
import SurroundingAmenities from "./SurroundingAmenities";
import RentalSuggestions from "./RentalSuggestions";
import RentalSuccessPrediction from "./RentalSuccessPrediction";
import { useLocation } from 'react-router-dom';
import { markdownToJSON } from "./utils";
import axios from "axios";

const mockPropertyData= {
  livingIndex: {
    score: 84,
    transportation: 85,
    costPerformance: 75,
    environment: 80,
    livingFacilities: 90,
    convenience: 88
  },
  marketCompetitiveness: "该房源在同区域同户型中排名前 30%",
  amenities: {
    transportation: [
      { name: "地铁5号线", distance: "500米" },
      { name: "公交站", distance: "200米" },
      { name: "出租车站", distance: "300米" }
    ],
    education: [
      { name: "实验小学", distance: "800米" },
      { name: "第一中学", distance: "1.2公里" },
      { name: "幼儿园", distance: "600米" }
    ],
    medical: [
      { name: "社区医院", distance: "1公里" },
      { name: "药店", distance: "300米" },
      { name: "诊所", distance: "500米" }
    ],
    lifestyle: [
      { name: "超市", distance: "200米" },
      { name: "菜市场", distance: "500米" },
      { name: "购物中心", distance: "1.5公里" }
    ]
  },
  successRate: {
    rate: 89,
    analysis: "基于当前市场需求和房源特点的综合评估",
    marketAnalysis: "近期有大量租客在寻找相同户型的房源，市场需求旺盛。",
    suggestion: "建议尽快完善房源信息并开放预约看房，把握当前市场机会。"
  }
};
const mdRawRes ={data:{
  "message": "报告生成成功",
  "report": "### 综合评估\n- 房屋竞争力：3分。评分依据为仅知道房屋的大概位置、户型和价格，缺乏更多关键信息如房龄、装修新旧程度、是否电梯房等，信息的不完整性使得房屋竞争力较低。\n- 房屋优势：\n    - 面积较大，120㎡的三室两厅能满足家庭居住需求。\n    - 位于杨浦区，区域发展相对较好，可能周边机会较多。\n    - 户型为三室两厅，功能分区可能较为合理。\n- 房屋劣势：\n    - 楼层在6层，如果没有电梯会对上下楼造成不便。\n    - 租金价格信息不明确是否合理，缺乏对比。\n    - 没有关于小区、周边设施等情况，可能存在潜在的不利因素。\n\n### 改进建议\n- 房屋装修建议：由于缺乏装修新旧程度信息，如果装修较旧，可以考虑进行简单翻新，如重新粉刷墙面（预算约5000元），更换客厅和卧室的地板（预算约15000元）。\n- 房屋设施建议：不知道现有设施情况，如果缺乏基本家电，可以考虑购置空调（预算约6000元）、洗衣机（预算约2000元）等常用家电。\n\n### 分项评分\n- 交通便利性：3分。理由是仅知道在杨浦区仁德路，不清楚附近是否有地铁、公交站等公共交通设施。\n- 性价比：3分。理由是在不清楚房屋具体情况（如装修、设施等）下，难以准确判断2200元/月是否性价比高。\n- 环境优质：3分。由于不知道小区情况和周边环境，只能给予中等评分。\n- 居住舒适：3分。因为不清楚是否有电梯、装修情况等影响居住舒适度的因素。\n- 生活配套：3分。缺乏周边设施信息，无法确定生活是否便利。\n\n### 市场预测\n- 出租成功率预测：\n  - 3天出租成功率：10%。\n  - 市场分析：由于缺乏很多关键信息，在当前租房市场上，租客更倾向于信息全面、性价比高、居住舒适的房源，此房源竞争力较低。\n  - 行动建议：完善房屋信息并在各大租房平台发布，适当降低租金以吸引租客，可提供一定期限的优惠政策。"
}}
// ... existing code ...
const PropertyDetails = () => {
  const location = useLocation();
  const [reportData, setReportData] = useState(null)
  const [propertyData, setPropertyData] = useState(mockPropertyData)
  useEffect(() => {
    (async () => {
      const prevPageData = location.state;
      const { rentEstateDetail } = prevPageData;
      setPropertyData({...mockPropertyData, ...rentEstateDetail})
      console.log({prevPageData})
      const mdRawRes = await axios.post('/api/report', {
          id: prevPageData.id
      });
      try{
        console.log(mdRawRes);
        const result = markdownToJSON(mdRawRes.data.report);
        setReportData(result)
  
      }catch(e){
        console.log(e)
      }
    })();
  },[])

  const livingIndex = reportData?.itemizedScores ? Object.keys(reportData.itemizedScores).reduce((acc, key) => {
    acc[key] = reportData.itemizedScores[key].score;
    return acc;
  }, {score: 3}): null;
  return (
    <div className="max-w-5xl mx-auto">
      <SuccessNotification />
      <div className="space-y-6 mt-4">
        <PropertyInfo propertyData={propertyData} />
        {livingIndex? <LivingIndexAnalysis indexData={livingIndex} competitiveness={reportData.comprehensiveEval} />: null}
        {/* <SurroundingAmenities amenities={propertyData.amenities || {}} /> */}
        {reportData ? <>
          <RentalSuggestions suggestions={reportData.improveSuggest} />
          <RentalSuccessPrediction successData={reportData.marketPred?.rentalSuccessPred} />
          </>:null}
      </div>
    </div>
  )
};

export default PropertyDetails;
