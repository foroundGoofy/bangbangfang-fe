
import React,{ useState } from 'react';
import SearchInput from './components/SearchInput';
import HousingForm from './components/HousingForm';
import SearchModal from './components/SearchModal';
import Header from '../rentEstatePage/components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const parseReportText = (reportText) => {
  const lines = reportText.split('\n');
  const result = [];
  let currentItem = {};

  lines.forEach((line) => {
      if (line.trim() === '') {
          return;
      }
      const [key, value] = line.slice(2).split("：");
      if (key === '匹配值') {
          if (Object.keys(currentItem).length > 0) {
              result.push(currentItem);
              currentItem = {};
          }
      }
      currentItem[key] = value;
  });

  // 添加最后一个项目
  if (Object.keys(currentItem).length > 0) {
      result.push(currentItem);
  }

  return result;
};
const findEstate = async (formData = {}) => {
  const { city, district, neighborhood} = formData.preferredArea || {}

    var data = {
      "quick_search_input": "两居室",
      "region_preference": {
          "city": city,
          "area": district,
          "street": neighborhood
      },
      "house_type": formData.roomType,
      "rent_budget": {
          "min": formData.budgetRange[0],
          "max": formData.budgetRange[1]
      },
      "max_commute_time": 30
    };

    const res = await axios.post('/api/property/match',data)
    const reportText = res.data.report;
    return parseReportText(reportText);

}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [extractedTags, setExtractedTags] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (formData) => {
    console.log("formData", formData);
    findEstate(formData).then((estateList) => {
      navigate('/estate-list', { state:{list:estateList} });
    });
    setShowModal(true);
    setProgress(0);
    const searchText = "我需要一个杨浦区的房子，最好是朝南的，可以养猫，离地铁站近一点，预算7000左右，最好是电梯房"
    // Extract tags from search text
    const possibleTags = ['一室一厅', '朝南', '可以养猫', '居住证', '两室一厅', '电梯房', '地铁附近', '安静'];
    const extractedKeywords = possibleTags.filter(tag => 
      searchText.toLowerCase().includes(tag.toLowerCase())
    );
    
    // Add some default tags if none were found
    const finalTags = extractedKeywords.length > 0 
      ? extractedKeywords 
      : ['一室一厅', '朝南', '可以养猫'];
      
    setExtractedTags(finalTags);
    
    // Simulate search process
    let currentProgress = 0;
    
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      
      if (currentProgress <= 30) {
        setCurrentStep('正在分析房屋需求');
      } else if (currentProgress <= 70) {
        setCurrentStep('正在查找合适房源');
      } else {
        setCurrentStep('正在生成匹配报告');
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div>

    <Header/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
{/*         
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">快速找房</h2>
          <SearchInput onSearch={handleSearch} />
        </div> */}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">详细需求</h2>
          <HousingForm onSearch={handleSearch} />
        </div>
      </div>
      
      {showModal && (
        <SearchModal 
          progress={progress} 
          currentStep={currentStep}
          extractedTags={extractedTags}
        />
      )}
    </div>

    </div>
  );
}

export default App;
