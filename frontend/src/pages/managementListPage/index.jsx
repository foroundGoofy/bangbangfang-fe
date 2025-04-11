
import React, { useState } from 'react';
import Header from '../HomePage/components/Header';
import FeedbackReportList from './components/FeedbackReportList';
import FeedbackReportDetail from './components/FeedbackReportDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock data for feedback reports
  const reports = [
    {
      id: 1,
      date: '2025年03月21日',
      totalTransactions: 156,
      averageRating: 4.8,
      details: {
        customerSatisfaction: 95,
        responseTime: '2.5小时',
        completionRate: '98%',
        comments: [
          { user: '用户A', content: '服务非常好，非常满意', rating: 5 },
          { user: '用户B', content: '房源信息准确，很快找到合适的房子', rating: 5 },
          { user: '用户C', content: '客服回复有点慢，但整体还不错', rating: 4 }
        ]
      }
    },
    {
      id: 2,
      date: '2025年03月20日',
      totalTransactions: 142,
      averageRating: 4.6,
      details: {
        customerSatisfaction: 92,
        responseTime: '2.8小时',
        completionRate: '96%',
        comments: [
          { user: '用户D', content: '服务态度很好', rating: 5 },
          { user: '用户E', content: '找房体验不错', rating: 4 },
          { user: '用户F', content: '有些房源信息不太准确', rating: 3 }
        ]
      }
    },
    {
      id: 3,
      date: '2025年03月19日',
      totalTransactions: 138,
      averageRating: 4.7,
      details: {
        customerSatisfaction: 94,
        responseTime: '2.3小时',
        completionRate: '97%',
        comments: [
          { user: '用户G', content: '很快就找到了合适的房子', rating: 5 },
          { user: '用户H', content: '服务很周到', rating: 5 },
          { user: '用户I', content: '价格有点高', rating: 4 }
        ]
      }
    }
  ];

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setCurrentPage('detail');
  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedReport(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {currentPage === 'list' ? (
          <FeedbackReportList reports={reports} onViewDetails={handleViewDetails} />
        ) : (
          <FeedbackReportDetail report={selectedReport} onBack={handleBackToList} />
        )}
      </div>
    </div>
  );
}

export default App;
