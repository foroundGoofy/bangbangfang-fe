import React, { useState } from 'react';

function FeedbackReportList({ reports, onViewDetails }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">反馈报告列表</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold mb-4">{report.date}反馈报告</h2>
            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                成交总量: <span className="font-medium">{report.totalTransactions}</span>
              </p>
              <p className="text-gray-700">
                平均评分: <span className="font-medium">{report.averageRating}</span>
              </p>
            </div>
            <button
              onClick={() => onViewDetails(report)}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300"
            >
              查看详情
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackReportList;
