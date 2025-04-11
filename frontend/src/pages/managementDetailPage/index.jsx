
import React, { useState } from 'react';
import Header from './components/Header';
import ReportTitle from './components/ReportTitle';
import DataCard from './components/DataCard';
import TransactionChart from './components/charts/TransactionChart';
import ConsultationChart from './components/charts/ConsultationChart';
import UserFeedbackChart from './components/charts/UserFeedbackChart';
import UserBehaviorChart from './components/charts/UserBehaviorChart';
import MarketAnalysisChart from './components/charts/MarketAnalysisChart';
import SwotAnalysisChart from './components/charts/SwotAnalysisChart';
import ProductRecommendations from './components/ProductRecommendations';
import OperationStrategy from './components/OperationStrategy';
import ActionButton from './components/ActionButton';

function App() {
  const [currentDate] = useState('2025年03月21日');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <ReportTitle date={currentDate} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataCard title="成交数据">
            <TransactionChart />
          </DataCard>
          
          <DataCard title="咨询数据">
            <ConsultationChart />
          </DataCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataCard title="用户反馈">
            <UserFeedbackChart />
          </DataCard>
          
          <DataCard title="用户访问行为">
            <UserBehaviorChart />
          </DataCard>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DataCard title="竞品分析">
            <MarketAnalysisChart />
          </DataCard>
          
          <DataCard title="SWOT分析">
            <SwotAnalysisChart />
          </DataCard>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <DataCard title="产品优化建议">
            <ProductRecommendations />
          </DataCard>
          
          <DataCard title="运营方案">
            <OperationStrategy />
          </DataCard>
        </div>
        
        <div className="flex justify-center mt-8 mb-12">
          <ActionButton />
        </div>
      </main>
    </div>
  );
}

export default App;
